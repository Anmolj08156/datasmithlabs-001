import type * as ThreeNS from "three";

type Three = typeof ThreeNS;

export type SceneVariant =
  | "globe"
  | "terrain"
  | "flowfield"
  | "tunnel"
  | "constellation"
  | "artifact";

export type Pointer = { x: number; y: number };

export type SceneHandle = {
  update: (elapsed: number, delta: number, pointer: Pointer) => void;
  resize: (width: number, height: number, pixelRatio: number) => void;
  dispose: () => void;
};

type FactoryArgs = {
  THREE: Three;
  scene: ThreeNS.Scene;
  camera: ThreeNS.PerspectiveCamera;
  /** 0..1 — scales geometry counts down on small or low-power devices. */
  quality: number;
  pixelRatio: number;
  /** Scene-specific selector, e.g. which artifact shape to build. */
  option: number;
};

/* ------------------------------------------------------------------ *
 * Shared
 * ------------------------------------------------------------------ */

const DOT_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uPixelRatio;
  uniform float uNear;
  uniform float uFar;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float dist = max(-mv.z, 0.001);
    vFade = 1.0 - smoothstep(uNear, uFar, dist);
    gl_PointSize = aSize * uPixelRatio * (180.0 / dist);
    gl_Position = projectionMatrix * mv;
  }
`;

const DOT_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.02, 0.5, d);
    gl_FragColor = vec4(vColor, alpha * vFade);
  }
`;

function makeDotMaterial(THREE: Three, pixelRatio: number, near: number, far: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uPixelRatio: { value: pixelRatio },
      uNear: { value: near },
      uFar: { value: far },
    },
    vertexShader: DOT_VERTEX,
    fragmentShader: DOT_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function teardown(root: ThreeNS.Object3D) {
  root.traverse((obj) => {
    const node = obj as ThreeNS.Mesh;
    node.geometry?.dispose();
    const material = node.material;
    if (Array.isArray(material)) material.forEach((m) => m.dispose());
    else material?.dispose();
  });
  root.removeFromParent();
}

function damp(current: number, target: number, lambda: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

/** Deterministic pseudo-random so scenes look identical between reloads. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const PALETTE = {
  blue: "#2b6bff",
  blueBright: "#5b95ff",
  cyan: "#22d3ee",
  ice: "#bcd8ff",
  white: "#ffffff",
  amber: "#f0c07a",
};

/* ------------------------------------------------------------------ *
 * Globe — particle sphere wrapped in orbital light arcs. Hero centrepiece.
 * ------------------------------------------------------------------ */

function globe({ THREE, scene, camera, quality, pixelRatio }: FactoryArgs): SceneHandle {
  const R = 10;
  const COUNT = Math.max(2200, Math.round(12000 * quality));
  const rand = rng(20260811);

  camera.fov = 45;
  camera.position.set(0, 1.5, 32);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  group.rotation.z = -0.32;
  scene.add(group);

  const spin = new THREE.Group();
  group.add(spin);

  // --- Surface points, denser and hotter toward the terminator ------------
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);

  const cBlue = new THREE.Color(PALETTE.blue);
  const cIce = new THREE.Color(PALETTE.ice);
  const cAmber = new THREE.Color(PALETTE.amber);
  const tmp = new THREE.Color();

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    // Even distribution over the sphere.
    const u = rand() * 2 - 1;
    const theta = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const x = Math.cos(theta) * s;
    const y = u;
    const z = Math.sin(theta) * s;

    positions[i3] = x * R;
    positions[i3 + 1] = y * R;
    positions[i3 + 2] = z * R;

    // Light rakes across from the lower-left, as in the reference.
    const lit = Math.max(0, -x * 0.5 - y * 0.3 + z * 0.72);
    tmp.copy(cBlue).lerp(cIce, Math.pow(lit, 1.25));
    if (rand() < 0.06) tmp.lerp(cAmber, 0.6);
    const shade = 0.5 + lit * 1.5;

    colors[i3] = tmp.r * shade;
    colors[i3 + 1] = tmp.g * shade;
    colors[i3 + 2] = tmp.b * shade;
    sizes[i] = 0.55 + rand() * (lit > 0.55 ? 1.7 : 0.8);
  }

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dotGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  dotGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  const dotMat = makeDotMaterial(THREE, pixelRatio, 12, 62);
  spin.add(new THREE.Points(dotGeo, dotMat));

  // --- Latitude rings give the globe its wireframe read -------------------
  const ringMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(PALETTE.blueBright),
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  for (let k = -4; k <= 4; k++) {
    const lat = (k / 5) * (Math.PI / 2);
    const r = Math.cos(lat) * R;
    const y = Math.sin(lat) * R;
    const pts: number[] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    spin.add(new THREE.Line(g, ringMat));
  }

  // --- Long light streaks sweeping past the globe -------------------------
  const streaks: { line: ThreeNS.Line; mat: ThreeNS.LineBasicMaterial; phase: number }[] = [];
  const STREAKS = 7;
  for (let i = 0; i < STREAKS; i++) {
    const a0 = rand() * Math.PI * 2;
    const start = new THREE.Vector3(
      Math.cos(a0) * (R + 16 + rand() * 12),
      (rand() * 2 - 1) * 9,
      (rand() * 2 - 1) * 6,
    );
    const end = new THREE.Vector3(
      Math.cos(a0 + Math.PI) * (R + 16 + rand() * 14),
      (rand() * 2 - 1) * 9,
      (rand() * 2 - 1) * 6,
    );
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(R * (0.85 + rand() * 0.5));
    mid.y += (rand() * 2 - 1) * 4;

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(120));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(rand() < 0.35 ? PALETTE.amber : PALETTE.blueBright),
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(g, mat);
    group.add(line);
    streaks.push({ line, mat, phase: rand() * Math.PI * 2 });
  }

  // --- Ambient dust so the frame never feels empty ------------------------
  const DUST = Math.max(150, Math.round(520 * quality));
  const dPos = new Float32Array(DUST * 3);
  const dCol = new Float32Array(DUST * 3);
  const dSize = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    const i3 = i * 3;
    dPos[i3] = (rand() * 2 - 1) * 46;
    dPos[i3 + 1] = (rand() * 2 - 1) * 24;
    dPos[i3 + 2] = (rand() * 2 - 1) * 20 - 6;
    const sh = 0.25 + rand() * 0.6;
    dCol[i3] = cIce.r * sh;
    dCol[i3 + 1] = cIce.g * sh;
    dCol[i3 + 2] = cIce.b * sh;
    dSize[i] = 0.25 + rand() * 0.6;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
  dustGeo.setAttribute("aColor", new THREE.BufferAttribute(dCol, 3));
  dustGeo.setAttribute("aSize", new THREE.BufferAttribute(dSize, 1));
  const dustMat = makeDotMaterial(THREE, pixelRatio, 10, 90);
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  let camX = 0;
  let camY = 1.5;

  return {
    update(elapsed, delta, pointer) {
      const step = Math.min(delta, 0.05);
      spin.rotation.y = elapsed * 0.055;
      dust.rotation.y = elapsed * 0.012;

      for (const s of streaks) {
        s.mat.opacity = 0.16 + Math.abs(Math.sin(elapsed * 0.35 + s.phase)) * 0.4;
      }

      camX = damp(camX, pointer.x * 2.6, 1.8, step);
      camY = damp(camY, 1.5 + pointer.y * 1.6, 1.8, step);
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);
    },
    resize(_w, _h, ratio) {
      dotMat.uniforms.uPixelRatio.value = ratio;
      dustMat.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
      teardown(dust);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Terrain — particle landscape whose ridges read as a data distribution.
 * ------------------------------------------------------------------ */

const TERRAIN_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vH;
  varying float vFade;

  // Layered ridges: sharper toward the centre of the field.
  float ridge(vec2 p) {
    float h = 0.0;
    h += sin(p.x * 0.20 + uTime * 0.16) * 1.5;
    h += sin(p.y * 0.26 - uTime * 0.12) * 1.1;
    h += sin((p.x + p.y) * 0.13 + uTime * 0.09) * 1.8;
    h += sin(p.x * 0.52 - p.y * 0.33 + uTime * 0.2) * 0.7;
    float falloff = exp(-pow(length(p * vec2(0.052, 0.075)), 2.0));
    return h * (0.35 + falloff * 2.3);
  }

  void main() {
    vec3 pos = position;
    float h = ridge(pos.xz);
    pos.y += h;

    vH = clamp(h * 0.17 + 0.42, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = max(-mv.z, 0.001);
    vFade = 1.0 - smoothstep(22.0, 135.0, dist);
    gl_PointSize = aSize * uPixelRatio * (150.0 / dist) * (0.7 + vH * 0.9);
    gl_Position = projectionMatrix * mv;
  }
`;

const TERRAIN_FRAGMENT = /* glsl */ `
  uniform vec3 uLow;
  uniform vec3 uHigh;
  varying float vH;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.05, 0.5, d);
    vec3 tint = mix(uLow, uHigh, pow(vH, 1.4));
    gl_FragColor = vec4(tint, alpha * vFade * (0.3 + vH * 1.6));
  }
`;

function terrain({ THREE, scene, camera, quality, pixelRatio }: FactoryArgs): SceneHandle {
  const COLS = Math.max(70, Math.round(190 * quality));
  const ROWS = Math.max(45, Math.round(120 * quality));
  const WIDTH = 130;
  const DEPTH = 78;
  const rand = rng(773311);

  camera.fov = 42;
  camera.position.set(0, 15, 44);
  camera.lookAt(0, 1, -6);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  scene.add(group);

  const total = COLS * ROWS;
  const positions = new Float32Array(total * 3);
  const sizes = new Float32Array(total);
  const seeds = new Float32Array(total);

  for (let ix = 0; ix < COLS; ix++) {
    for (let iz = 0; iz < ROWS; iz++) {
      const i = ix * ROWS + iz;
      const i3 = i * 3;
      positions[i3] = (ix / (COLS - 1) - 0.5) * WIDTH;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (iz / (ROWS - 1) - 0.5) * DEPTH;
      sizes[i] = 0.6 + rand() * 0.95;
      seeds[i] = rand();
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uLow: { value: new THREE.Color("#12306e") },
      uHigh: { value: new THREE.Color("#dbeaff") },
    },
    vertexShader: TERRAIN_VERTEX,
    fragmentShader: TERRAIN_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  group.add(new THREE.Points(geo, mat));

  let camX = 0;
  let camY = 15;

  return {
    update(elapsed, delta, pointer) {
      const step = Math.min(delta, 0.05);
      mat.uniforms.uTime.value = elapsed;
      camX = damp(camX, pointer.x * 4, 1.5, step);
      camY = damp(camY, 15 - pointer.y * 3, 1.5, step);
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(0, 1, -6);
    },
    resize(_w, _h, ratio) {
      mat.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Flowfield — long contour lines drifting behind the stats band.
 * ------------------------------------------------------------------ */

function flowfield({ THREE, scene, camera, quality, pixelRatio }: FactoryArgs): SceneHandle {
  const LINES = Math.max(14, Math.round(34 * quality));
  const SEGMENTS = Math.max(70, Math.round(150 * quality));
  const WIDTH = 150;
  const rand = rng(5150);

  camera.fov = 40;
  camera.position.set(0, 6, 40);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  group.rotation.x = 0.12;
  scene.add(group);

  const strips: {
    geo: ThreeNS.BufferGeometry;
    arr: Float32Array;
    z: number;
    amp: number;
    speed: number;
    phase: number;
  }[] = [];

  const lineMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(PALETTE.blue),
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  for (let l = 0; l < LINES; l++) {
    const arr = new Float32Array((SEGMENTS + 1) * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    group.add(new THREE.Line(geo, lineMat));
    strips.push({
      geo,
      arr,
      z: (l / (LINES - 1) - 0.5) * 60,
      amp: 1.6 + rand() * 3.4,
      speed: 0.25 + rand() * 0.45,
      phase: rand() * Math.PI * 2,
    });
  }

  // Sparse bright nodes riding the field.
  const NODES = Math.max(30, Math.round(90 * quality));
  const nPos = new Float32Array(NODES * 3);
  const nCol = new Float32Array(NODES * 3);
  const nSize = new Float32Array(NODES);
  const cIce = new THREE.Color(PALETTE.ice);
  for (let i = 0; i < NODES; i++) {
    const i3 = i * 3;
    nPos[i3] = (rand() * 2 - 1) * (WIDTH / 2);
    nPos[i3 + 1] = (rand() * 2 - 1) * 3;
    nPos[i3 + 2] = (rand() * 2 - 1) * 30;
    const sh = 0.4 + rand() * 0.6;
    nCol[i3] = cIce.r * sh;
    nCol[i3 + 1] = cIce.g * sh;
    nCol[i3 + 2] = cIce.b * sh;
    nSize[i] = 0.3 + rand() * 0.7;
  }
  const nGeo = new THREE.BufferGeometry();
  nGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));
  nGeo.setAttribute("aColor", new THREE.BufferAttribute(nCol, 3));
  nGeo.setAttribute("aSize", new THREE.BufferAttribute(nSize, 1));
  const nMat = makeDotMaterial(THREE, pixelRatio, 12, 90);
  group.add(new THREE.Points(nGeo, nMat));

  return {
    update(elapsed) {
      for (const s of strips) {
        for (let i = 0; i <= SEGMENTS; i++) {
          const t = i / SEGMENTS;
          const x = (t - 0.5) * WIDTH;
          const y =
            Math.sin(x * 0.055 + elapsed * s.speed + s.phase) * s.amp +
            Math.sin(x * 0.021 - elapsed * 0.18 + s.z * 0.05) * s.amp * 0.6;
          const o = i * 3;
          s.arr[o] = x;
          s.arr[o + 1] = y;
          s.arr[o + 2] = s.z;
        }
        s.geo.attributes.position.needsUpdate = true;
        s.geo.computeBoundingSphere();
      }
    },
    resize(_w, _h, ratio) {
      nMat.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Tunnel — rings and shards rushing past a bright vanishing point.
 * ------------------------------------------------------------------ */

function tunnel({ THREE, scene, camera, quality, pixelRatio }: FactoryArgs): SceneHandle {
  const RINGS = Math.max(14, Math.round(30 * quality));
  const SHARDS = Math.max(16, Math.round(46 * quality));
  const DEPTH = 130;
  const rand = rng(90210);

  camera.fov = 62;
  camera.position.set(0, 0, 16);
  camera.lookAt(0, 0, -60);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  scene.add(group);

  // Bright core.
  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, -DEPTH + 12], 3));
  coreGeo.setAttribute("aColor", new THREE.Float32BufferAttribute([1, 1, 1], 3));
  coreGeo.setAttribute("aSize", new THREE.Float32BufferAttribute([26], 1));
  const coreMat = makeDotMaterial(THREE, pixelRatio, 5, 400);
  group.add(new THREE.Points(coreGeo, coreMat));

  const ringMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(PALETTE.blueBright),
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const rings: { obj: ThreeNS.Line; z: number; r: number; spin: number }[] = [];
  for (let i = 0; i < RINGS; i++) {
    const pts: number[] = [];
    const seg = 72;
    for (let j = 0; j <= seg; j++) {
      const a = (j / seg) * Math.PI * 2;
      pts.push(Math.cos(a), Math.sin(a), 0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const line = new THREE.Line(g, ringMat);
    const z = -(i / RINGS) * DEPTH;
    line.position.z = z;
    group.add(line);
    rings.push({ obj: line, z, r: 9 + rand() * 3, spin: (rand() * 2 - 1) * 0.4 });
  }

  const shardMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(PALETTE.blue),
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const shardGeo = new THREE.PlaneGeometry(1, 1);
  const shards: { mesh: ThreeNS.Mesh; z: number; a: number; r: number; s: number }[] = [];
  for (let i = 0; i < SHARDS; i++) {
    const m = new THREE.Mesh(shardGeo, shardMat);
    const s = 0.6 + rand() * 2.2;
    m.scale.set(s, s, 1);
    group.add(m);
    shards.push({
      mesh: m,
      z: -rand() * DEPTH,
      a: rand() * Math.PI * 2,
      r: 5 + rand() * 11,
      s: 8 + rand() * 14,
    });
  }

  let tiltX = 0;
  let tiltY = 0;

  return {
    update(elapsed, delta, pointer) {
      const step = Math.min(delta, 0.05);
      const speed = 16;

      for (const r of rings) {
        r.z += speed * step;
        if (r.z > 14) r.z -= DEPTH;
        r.obj.position.z = r.z;
        // Rings widen as they approach, then fade out near the camera.
        const t = 1 - Math.abs(r.z) / DEPTH;
        r.obj.scale.setScalar(r.r * (0.35 + t * 0.9));
        r.obj.rotation.z = elapsed * r.spin;
      }

      for (const s of shards) {
        s.z += (speed + s.s * 0.35) * step;
        if (s.z > 14) {
          s.z -= DEPTH;
          s.a = Math.random() * Math.PI * 2;
        }
        const a = s.a + elapsed * 0.1;
        s.mesh.position.set(Math.cos(a) * s.r, Math.sin(a) * s.r, s.z);
        s.mesh.rotation.z = a * 1.6;
      }

      tiltY = damp(tiltY, pointer.x * 0.16, 2, step);
      tiltX = damp(tiltX, -pointer.y * 0.12, 2, step);
      group.rotation.y = tiltY;
      group.rotation.x = tiltX;
    },
    resize(_w, _h, ratio) {
      coreMat.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
      shardGeo.dispose();
    },
  };
}

/* ------------------------------------------------------------------ *
 * Artifact — a small wireframe object that sits above a solution card.
 * `option` selects the shape.
 * ------------------------------------------------------------------ */

function artifact({ THREE, scene, camera, quality, pixelRatio, option }: FactoryArgs): SceneHandle {
  const rand = rng(4400 + option * 97);

  // Pulled back far enough that the lattice and cone variants clear the frame
  // on their diagonals.
  camera.fov = 40;
  camera.position.set(0, 0, 17.5);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  scene.add(group);

  const lineMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(PALETTE.blueBright),
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const addWire = (geom: ThreeNS.BufferGeometry, parent: ThreeNS.Object3D = group) => {
    const wire = new THREE.WireframeGeometry(geom);
    geom.dispose();
    parent.add(new THREE.LineSegments(wire, lineMat));
  };

  if (option === 0) {
    // Neural mass: nested irregular spheres.
    addWire(new THREE.IcosahedronGeometry(3.1, 2));
    const inner = new THREE.Group();
    inner.scale.setScalar(0.62);
    group.add(inner);
    addWire(new THREE.IcosahedronGeometry(3.1, 1), inner);
  } else if (option === 1) {
    // Data lattice: 3x3x3 grid of cubes.
    const step = 1.9;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const box = new THREE.BoxGeometry(1.2, 1.2, 1.2);
          const wire = new THREE.WireframeGeometry(box);
          box.dispose();
          const seg = new THREE.LineSegments(wire, lineMat);
          seg.position.set(x * step, y * step, z * step);
          group.add(seg);
        }
      }
    }
  } else if (option === 2) {
    // Research core: stellated octahedron pair.
    addWire(new THREE.OctahedronGeometry(3.4, 0));
    const flip = new THREE.Group();
    flip.rotation.set(Math.PI / 2, Math.PI / 4, 0);
    group.add(flip);
    addWire(new THREE.OctahedronGeometry(3.4, 0), flip);
  } else {
    // Knowledge prism: cone over a ring.
    addWire(new THREE.ConeGeometry(3.1, 3.4, 4, 1));
    const ring = new THREE.Group();
    ring.position.y = -2.2;
    group.add(ring);
    addWire(new THREE.TorusGeometry(2.4, 0.12, 6, 40), ring);
  }

  // Halo particles.
  const HALO = Math.max(40, Math.round(140 * quality));
  const hPos = new Float32Array(HALO * 3);
  const hCol = new Float32Array(HALO * 3);
  const hSize = new Float32Array(HALO);
  const cIce = new THREE.Color(PALETTE.ice);
  for (let i = 0; i < HALO; i++) {
    const i3 = i * 3;
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const r = 4.4 + rand() * 4.2;
    hPos[i3] = Math.cos(th) * s * r;
    hPos[i3 + 1] = u * r;
    hPos[i3 + 2] = Math.sin(th) * s * r;
    const sh = 0.35 + rand() * 0.65;
    hCol[i3] = cIce.r * sh;
    hCol[i3 + 1] = cIce.g * sh;
    hCol[i3 + 2] = cIce.b * sh;
    hSize[i] = 0.3 + rand() * 0.55;
  }
  const hGeo = new THREE.BufferGeometry();
  hGeo.setAttribute("position", new THREE.BufferAttribute(hPos, 3));
  hGeo.setAttribute("aColor", new THREE.BufferAttribute(hCol, 3));
  hGeo.setAttribute("aSize", new THREE.BufferAttribute(hSize, 1));
  const hMat = makeDotMaterial(THREE, pixelRatio, 8, 42);
  group.add(new THREE.Points(hGeo, hMat));

  return {
    update(elapsed, delta, pointer) {
      const step = Math.min(delta, 0.05);
      group.rotation.y = elapsed * 0.34 + pointer.x * 0.25;
      group.rotation.x = damp(group.rotation.x, 0.22 + pointer.y * 0.18, 2, step);
    },
    resize(_w, _h, ratio) {
      hMat.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Constellation — drifting node field wired to nearest neighbours.
 * ------------------------------------------------------------------ */

function constellation({ THREE, scene, camera, quality, pixelRatio }: FactoryArgs): SceneHandle {
  const COUNT = Math.max(60, Math.round(320 * quality));
  const MAX_LINKS = Math.max(200, Math.round(1400 * quality));
  const LINK_DIST = 5.6;
  const BOUND = { x: 30, y: 17, z: 14 };
  const rand = rng(31337);

  camera.fov = 55;
  camera.position.set(0, 0, 40);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  scene.add(group);

  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);
  const velocities = new Float32Array(COUNT * 3);

  const palette = [
    new THREE.Color(PALETTE.white),
    new THREE.Color(PALETTE.ice),
    new THREE.Color(PALETTE.blueBright),
    new THREE.Color(PALETTE.blue),
  ];

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (rand() * 2 - 1) * BOUND.x;
    positions[i3 + 1] = (rand() * 2 - 1) * BOUND.y;
    positions[i3 + 2] = (rand() * 2 - 1) * BOUND.z;
    velocities[i3] = (rand() * 2 - 1) * 0.42;
    velocities[i3 + 1] = (rand() * 2 - 1) * 0.3;
    velocities[i3 + 2] = (rand() * 2 - 1) * 0.24;
    const c = palette[Math.floor(rand() * palette.length)];
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
    sizes[i] = rand() < 0.12 ? 2.2 + rand() : 0.7 + rand() * 0.8;
  }

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dotGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  dotGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  const dotMat = makeDotMaterial(THREE, pixelRatio, 20, 95);
  group.add(new THREE.Points(dotGeo, dotMat));

  const linkPositions = new Float32Array(MAX_LINKS * 6);
  const linkColors = new Float32Array(MAX_LINKS * 6);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPositions, 3));
  linkGeo.setAttribute("color", new THREE.BufferAttribute(linkColors, 3));
  linkGeo.setDrawRange(0, 0);
  const linkMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  group.add(new THREE.LineSegments(linkGeo, linkMat));

  const TINT = new THREE.Color(PALETTE.blueBright);
  let frame = 0;
  let camX = 0;
  let camY = 0;

  const rebuild = () => {
    let n = 0;
    for (let i = 0; i < COUNT && n < MAX_LINKS; i++) {
      const i3 = i * 3;
      const xi = positions[i3];
      const yi = positions[i3 + 1];
      const zi = positions[i3 + 2];
      for (let j = i + 1; j < COUNT && n < MAX_LINKS; j++) {
        const j3 = j * 3;
        const dx = xi - positions[j3];
        if (dx > LINK_DIST || dx < -LINK_DIST) continue;
        const dy = yi - positions[j3 + 1];
        if (dy > LINK_DIST || dy < -LINK_DIST) continue;
        const dz = zi - positions[j3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 > LINK_DIST * LINK_DIST) continue;
        const a = (1 - Math.sqrt(d2) / LINK_DIST) * 0.9;
        const o = n * 6;
        linkPositions[o] = xi;
        linkPositions[o + 1] = yi;
        linkPositions[o + 2] = zi;
        linkPositions[o + 3] = positions[j3];
        linkPositions[o + 4] = positions[j3 + 1];
        linkPositions[o + 5] = positions[j3 + 2];
        for (let k = 0; k < 2; k++) {
          linkColors[o + k * 3] = TINT.r * a;
          linkColors[o + k * 3 + 1] = TINT.g * a;
          linkColors[o + k * 3 + 2] = TINT.b * a;
        }
        n++;
      }
    }
    linkGeo.setDrawRange(0, n * 2);
    linkGeo.attributes.position.needsUpdate = true;
    linkGeo.attributes.color.needsUpdate = true;
  };
  rebuild();

  return {
    update(elapsed, delta, pointer) {
      const step = Math.min(delta, 0.05);
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3] * step;
        positions[i3 + 1] += velocities[i3 + 1] * step;
        positions[i3 + 2] += velocities[i3 + 2] * step;
        if (positions[i3] > BOUND.x) positions[i3] = -BOUND.x;
        else if (positions[i3] < -BOUND.x) positions[i3] = BOUND.x;
        if (positions[i3 + 1] > BOUND.y) positions[i3 + 1] = -BOUND.y;
        else if (positions[i3 + 1] < -BOUND.y) positions[i3 + 1] = BOUND.y;
        if (positions[i3 + 2] > BOUND.z) positions[i3 + 2] = -BOUND.z;
        else if (positions[i3 + 2] < -BOUND.z) positions[i3 + 2] = BOUND.z;
      }
      dotGeo.attributes.position.needsUpdate = true;
      if (frame++ % 2 === 0) rebuild();

      group.rotation.y = elapsed * 0.028;
      camX = damp(camX, pointer.x * 4.5, 2.2, step);
      camY = damp(camY, pointer.y * 2.8, 2.2, step);
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);
    },
    resize(_w, _h, ratio) {
      dotMat.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
    },
  };
}

export const sceneFactories: Record<SceneVariant, (args: FactoryArgs) => SceneHandle> = {
  globe,
  terrain,
  flowfield,
  tunnel,
  artifact,
  constellation,
};
