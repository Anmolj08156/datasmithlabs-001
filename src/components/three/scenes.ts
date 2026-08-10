import type * as ThreeNS from "three";

type Three = typeof ThreeNS;

export type SceneVariant = "constellation" | "orbit" | "wave";

export type Pointer = { x: number; y: number };

export type SceneHandle = {
  /** Advance the simulation. `elapsed` and `delta` are in seconds. */
  update: (elapsed: number, delta: number, pointer: Pointer) => void;
  resize: (width: number, height: number, pixelRatio: number) => void;
  dispose: () => void;
};

type FactoryArgs = {
  THREE: Three;
  scene: ThreeNS.Scene;
  camera: ThreeNS.PerspectiveCamera;
  /** 0..1 — scales particle counts down on small or low-power devices. */
  quality: number;
  pixelRatio: number;
};

/* ------------------------------------------------------------------ *
 * Shared shaders
 * ------------------------------------------------------------------ */

/** Soft round point sprite with per-point colour, size and depth fade. */
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
    // smoothstep is only defined for edge0 < edge1, hence the explicit invert.
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

/** Recursively dispose every geometry/material under `root`, then detach it. */
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

/* ------------------------------------------------------------------ *
 * Constellation — a drifting field of data points wired to their
 * nearest neighbours. Used on the home and product heroes.
 * ------------------------------------------------------------------ */

function constellation({ THREE, scene, camera, quality, pixelRatio }: FactoryArgs): SceneHandle {
  const COUNT = Math.max(60, Math.round(340 * quality));
  const MAX_LINKS = Math.max(200, Math.round(1400 * quality));
  const LINK_DIST = 5.6;
  const BOUND = { x: 30, y: 17, z: 14 };

  camera.fov = 55;
  camera.position.set(0, 0, 40);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  scene.add(group);

  // Weighted palette: mostly cool neutrals, with rare gold "highlight" nodes.
  const palette = [
    { color: new THREE.Color("#ffffff"), weight: 0.3 },
    { color: new THREE.Color("#8ed8f0"), weight: 0.24 },
    { color: new THREE.Color("#0ea5c9"), weight: 0.24 },
    { color: new THREE.Color("#4d82e8"), weight: 0.16 },
    { color: new THREE.Color("#c9a84c"), weight: 0.06 },
  ];
  const pickColor = () => {
    let r = Math.random();
    for (const entry of palette) {
      r -= entry.weight;
      if (r <= 0) return entry.color;
    }
    return palette[0].color;
  };

  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);
  const velocities = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() * 2 - 1) * BOUND.x;
    positions[i3 + 1] = (Math.random() * 2 - 1) * BOUND.y;
    positions[i3 + 2] = (Math.random() * 2 - 1) * BOUND.z;

    velocities[i3] = (Math.random() * 2 - 1) * 0.42;
    velocities[i3 + 1] = (Math.random() * 2 - 1) * 0.3;
    velocities[i3 + 2] = (Math.random() * 2 - 1) * 0.24;

    const c = pickColor();
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    // A handful of larger "hub" nodes give the field a sense of hierarchy.
    sizes[i] = Math.random() < 0.12 ? 2.4 + Math.random() * 1.1 : 0.75 + Math.random() * 0.85;
  }

  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dotGeometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  dotGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const dotMaterial = makeDotMaterial(THREE, pixelRatio, 20, 95);
  const dots = new THREE.Points(dotGeometry, dotMaterial);
  group.add(dots);

  const linkPositions = new Float32Array(MAX_LINKS * 6);
  const linkColors = new Float32Array(MAX_LINKS * 6);
  const linkGeometry = new THREE.BufferGeometry();
  linkGeometry.setAttribute("position", new THREE.BufferAttribute(linkPositions, 3));
  linkGeometry.setAttribute("color", new THREE.BufferAttribute(linkColors, 3));
  linkGeometry.setDrawRange(0, 0);

  const linkMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const links = new THREE.LineSegments(linkGeometry, linkMaterial);
  group.add(links);

  const LINK_TINT = new THREE.Color("#3fc9e8");
  let frame = 0;
  let camX = 0;
  let camY = 0;

  const rebuildLinks = () => {
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
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq > LINK_DIST * LINK_DIST) continue;

        // Fade each strand out as its endpoints drift apart.
        const strength = 1 - Math.sqrt(distSq) / LINK_DIST;
        const a = strength * 0.95;
        const o = n * 6;

        linkPositions[o] = xi;
        linkPositions[o + 1] = yi;
        linkPositions[o + 2] = zi;
        linkPositions[o + 3] = positions[j3];
        linkPositions[o + 4] = positions[j3 + 1];
        linkPositions[o + 5] = positions[j3 + 2];

        for (let k = 0; k < 2; k++) {
          linkColors[o + k * 3] = LINK_TINT.r * a;
          linkColors[o + k * 3 + 1] = LINK_TINT.g * a;
          linkColors[o + k * 3 + 2] = LINK_TINT.b * a;
        }
        n++;
      }
    }

    linkGeometry.setDrawRange(0, n * 2);
    linkGeometry.attributes.position.needsUpdate = true;
    linkGeometry.attributes.color.needsUpdate = true;
  };

  rebuildLinks();

  return {
    update(elapsed, delta, pointer) {
      const step = Math.min(delta, 0.05);

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3] * step;
        positions[i3 + 1] += velocities[i3 + 1] * step;
        positions[i3 + 2] += velocities[i3 + 2] * step;

        // Wrap rather than bounce, so the field never visibly "pools".
        if (positions[i3] > BOUND.x) positions[i3] = -BOUND.x;
        else if (positions[i3] < -BOUND.x) positions[i3] = BOUND.x;
        if (positions[i3 + 1] > BOUND.y) positions[i3 + 1] = -BOUND.y;
        else if (positions[i3 + 1] < -BOUND.y) positions[i3 + 1] = BOUND.y;
        if (positions[i3 + 2] > BOUND.z) positions[i3 + 2] = -BOUND.z;
        else if (positions[i3 + 2] < -BOUND.z) positions[i3 + 2] = BOUND.z;
      }
      dotGeometry.attributes.position.needsUpdate = true;

      // Neighbour search is the expensive part — halve its rate.
      if (frame++ % 2 === 0) rebuildLinks();

      group.rotation.y = elapsed * 0.028;
      group.rotation.x = Math.sin(elapsed * 0.12) * 0.05;

      camX = damp(camX, pointer.x * 4.5, 2.2, step);
      camY = damp(camY, pointer.y * 2.8, 2.2, step);
      camera.position.x = camX;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);
    },
    resize(_width, _height, ratio) {
      dotMaterial.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Orbit — a core with three inclined rings carrying travelling nodes.
 * One ring per partner on the partnerships hero.
 * ------------------------------------------------------------------ */

function orbit({ THREE, scene, camera, quality, pixelRatio }: FactoryArgs): SceneHandle {
  camera.fov = 50;
  camera.position.set(0, 4, 42);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  group.rotation.x = 0.34;
  scene.add(group);

  const core = new THREE.Group();
  group.add(core);

  // Solid shell writes depth so the wireframe's back edges stay hidden.
  const shellMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color("#0b1526") });
  core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(3.5, 1), shellMaterial));

  // WireframeGeometry copies the vertices it needs, so the source is disposed here.
  const wireSource = new THREE.IcosahedronGeometry(3.58, 1);
  const wireGeometry = new THREE.WireframeGeometry(wireSource);
  wireSource.dispose();
  const wireMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color("#0ea5c9"),
    transparent: true,
    opacity: 0.65,
  });
  core.add(new THREE.LineSegments(wireGeometry, wireMaterial));

  const RING_SEGMENTS = 160;
  const ringSpecs = [
    { radius: 8.4, color: "#c9a84c", tilt: [0.0, 0.0, 0.0], speed: 0.55 },
    { radius: 11.8, color: "#0ea5c9", tilt: [0.62, 0.4, 0.18], speed: -0.4 },
    { radius: 15.2, color: "#4d82e8", tilt: [-0.5, -0.3, 0.42], speed: 0.29 },
  ];

  type Ring = {
    pivot: ThreeNS.Group;
    radius: number;
    speed: number;
    nodes: ThreeNS.Mesh[];
  };

  const rings: Ring[] = ringSpecs.map((spec) => {
    const pivot = new THREE.Group();
    pivot.rotation.set(spec.tilt[0], spec.tilt[1], spec.tilt[2]);
    group.add(pivot);

    const pts: number[] = [];
    for (let i = 0; i <= RING_SEGMENTS; i++) {
      const a = (i / RING_SEGMENTS) * Math.PI * 2;
      pts.push(Math.cos(a) * spec.radius, 0, Math.sin(a) * spec.radius);
    }
    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const ringMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(spec.color),
      transparent: true,
      opacity: 0.5,
    });
    pivot.add(new THREE.Line(ringGeometry, ringMaterial));

    // A bright leading node plus two fading followers reads as motion.
    const nodes = [0.54, 0.34, 0.2].map((radius, idx) => {
      const geometry = new THREE.SphereGeometry(radius, 18, 18);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spec.color),
        transparent: true,
        opacity: [1, 0.55, 0.3][idx],
      });
      const mesh = new THREE.Mesh(geometry, material);
      pivot.add(mesh);
      return mesh;
    });

    return { pivot, radius: spec.radius, speed: spec.speed, nodes };
  });

  // Faint halo shell so the rings do not float in an empty void.
  const HALO = Math.max(80, Math.round(280 * quality));
  const haloPositions = new Float32Array(HALO * 3);
  const haloColors = new Float32Array(HALO * 3);
  const haloSizes = new Float32Array(HALO);
  const haloTint = new THREE.Color("#8ed8f0");

  for (let i = 0; i < HALO; i++) {
    const i3 = i * 3;
    // Even distribution over a spherical shell.
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const r = 17 + Math.random() * 9;
    const s = Math.sqrt(1 - u * u);
    haloPositions[i3] = Math.cos(theta) * s * r;
    haloPositions[i3 + 1] = u * r * 0.55;
    haloPositions[i3 + 2] = Math.sin(theta) * s * r;

    const shade = 0.45 + Math.random() * 0.55;
    haloColors[i3] = haloTint.r * shade;
    haloColors[i3 + 1] = haloTint.g * shade;
    haloColors[i3 + 2] = haloTint.b * shade;
    haloSizes[i] = 0.5 + Math.random() * 0.9;
  }

  const haloGeometry = new THREE.BufferGeometry();
  haloGeometry.setAttribute("position", new THREE.BufferAttribute(haloPositions, 3));
  haloGeometry.setAttribute("aColor", new THREE.BufferAttribute(haloColors, 3));
  haloGeometry.setAttribute("aSize", new THREE.BufferAttribute(haloSizes, 1));
  const haloMaterial = makeDotMaterial(THREE, pixelRatio, 22, 90);
  group.add(new THREE.Points(haloGeometry, haloMaterial));

  let tiltX = 0;
  let tiltY = 0;

  return {
    update(elapsed, delta, pointer) {
      const step = Math.min(delta, 0.05);

      core.rotation.y = elapsed * 0.16;
      core.rotation.x = elapsed * 0.09;

      for (const ring of rings) {
        ring.pivot.rotation.y += ring.speed * 0.06 * step;
        ring.nodes.forEach((node, idx) => {
          const angle = elapsed * ring.speed - idx * 0.13;
          node.position.set(Math.cos(angle) * ring.radius, 0, Math.sin(angle) * ring.radius);
        });
      }

      tiltY = damp(tiltY, pointer.x * 0.42, 2.4, step);
      tiltX = damp(tiltX, 0.34 + pointer.y * 0.22, 2.4, step);
      group.rotation.y = elapsed * 0.05 + tiltY;
      group.rotation.x = tiltX;
    },
    resize(_width, _height, ratio) {
      haloMaterial.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
    },
  };
}

/* ------------------------------------------------------------------ *
 * Wave — a point grid displaced by layered sines, entirely on the GPU.
 * Reads as a live data surface behind editorial copy.
 * ------------------------------------------------------------------ */

const WAVE_VERTEX = /* glsl */ `
  attribute float aSize;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vHeight;
  varying float vFade;

  void main() {
    vec3 pos = position;
    float h = sin(pos.x * 0.16 + uTime * 0.50) * 1.20
            + sin(pos.z * 0.21 - uTime * 0.38) * 0.95
            + sin((pos.x + pos.z) * 0.10 + uTime * 0.27) * 1.50;
    pos.y += h;

    vHeight = clamp(h * 0.26 + 0.5, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = max(-mv.z, 0.001);
    vFade = 1.0 - smoothstep(18.0, 115.0, dist);
    gl_PointSize = aSize * uPixelRatio * (150.0 / dist);
    gl_Position = projectionMatrix * mv;
  }
`;

const WAVE_FRAGMENT = /* glsl */ `
  uniform vec3 uLow;
  uniform vec3 uHigh;
  varying float vHeight;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.05, 0.5, d);
    vec3 tint = mix(uLow, uHigh, vHeight);
    gl_FragColor = vec4(tint, alpha * vFade * (0.28 + vHeight * 0.72));
  }
`;

function wave({ THREE, scene, camera, quality, pixelRatio }: FactoryArgs): SceneHandle {
  const COLS = Math.max(40, Math.round(118 * quality));
  const ROWS = Math.max(26, Math.round(68 * quality));
  const WIDTH = 78;
  const DEPTH = 46;

  camera.fov = 50;
  camera.position.set(0, 14, 24);
  camera.lookAt(0, -1, -8);
  camera.updateProjectionMatrix();

  const group = new THREE.Group();
  scene.add(group);

  const total = COLS * ROWS;
  const positions = new Float32Array(total * 3);
  const sizes = new Float32Array(total);

  for (let ix = 0; ix < COLS; ix++) {
    for (let iz = 0; iz < ROWS; iz++) {
      const i = ix * ROWS + iz;
      const i3 = i * 3;
      positions[i3] = (ix / (COLS - 1) - 0.5) * WIDTH;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (iz / (ROWS - 1) - 0.5) * DEPTH;
      sizes[i] = 0.6 + Math.random() * 0.6;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uLow: { value: new THREE.Color("#1849a9") },
      uHigh: { value: new THREE.Color("#79e2f7") },
    },
    vertexShader: WAVE_VERTEX,
    fragmentShader: WAVE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  group.add(new THREE.Points(geometry, material));

  let driftX = 0;
  let driftY = 0;

  return {
    update(elapsed, delta, pointer) {
      const step = Math.min(delta, 0.05);
      material.uniforms.uTime.value = elapsed;

      driftX = damp(driftX, pointer.x * 3.2, 1.8, step);
      driftY = damp(driftY, 14 - pointer.y * 2.4, 1.8, step);
      camera.position.x = driftX;
      camera.position.y = driftY;
      camera.lookAt(0, -1, -8);
    },
    resize(_width, _height, ratio) {
      material.uniforms.uPixelRatio.value = ratio;
    },
    dispose() {
      teardown(group);
    },
  };
}

export const sceneFactories: Record<SceneVariant, (args: FactoryArgs) => SceneHandle> = {
  constellation,
  orbit,
  wave,
};
