import { useEffect, useRef } from "react";
import type { SceneVariant } from "./scenes";

type Canvas3DProps = {
  variant: SceneVariant;
  className?: string;
  /** Extra multiplier on particle counts, on top of the device heuristic. */
  quality?: number;
  /** Set false for scenes inside a card, where window-wide tracking feels wrong. */
  trackPointer?: boolean;
};

const MAX_PIXEL_RATIO = 1.75;

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** Rough device budget — phones and low-core machines get a thinner field. */
function deviceQuality() {
  const narrow = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (narrow) return 0.4;
  if (cores <= 4) return 0.65;
  return 1;
}

/**
 * Renders a decorative WebGL layer behind its parent section.
 *
 * Everything is client-only and defensive: three.js is code-split out of the
 * initial bundle, the loop is paused whenever the element is offscreen or the
 * tab is hidden, reduced-motion visitors get a single static frame, and any
 * failure (no WebGL, lost context) simply leaves the parent background as-is.
 */
export function Canvas3D({
  variant,
  className = "",
  quality = 1,
  trackPointer = true,
}: Canvas3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    void (async () => {
      const THREE = await import("three");
      if (cancelled) return;

      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: pixelRatio < 1.5,
          powerPreference: "high-performance",
        });
      } catch {
        return; // No WebGL — the section keeps its flat background.
      }

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);

      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200);

      const { sceneFactories } = await import("./scenes");
      if (cancelled) {
        renderer.dispose();
        canvas.remove();
        return;
      }

      const handle = sceneFactories[variant]({
        THREE,
        scene,
        camera,
        quality: Math.min(1, deviceQuality() * quality),
        pixelRatio,
      });

      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
      };
      if (trackPointer) window.addEventListener("pointermove", onPointerMove, { passive: true });

      let visible = true;
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => (visible = entry.isIntersecting)),
        { rootMargin: "120px" },
      );
      observer.observe(host);

      const resizeObserver = new ResizeObserver(() => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        handle.resize(w, h, pixelRatio);
      });
      resizeObserver.observe(host);

      const contextLost = (event: Event) => {
        event.preventDefault();
        visible = false;
      };
      canvas.addEventListener("webglcontextlost", contextLost);

      const clock = new THREE.Clock();
      let frameId = 0;

      if (prefersReducedMotion()) {
        // One representative frame, then stop — no animation, no rAF loop.
        handle.update(0, 0, pointer);
        renderer.render(scene, camera);
      } else {
        const tick = () => {
          frameId = requestAnimationFrame(tick);
          const delta = clock.getDelta();
          if (!visible || document.hidden) return;
          handle.update(clock.elapsedTime, delta, pointer);
          renderer.render(scene, camera);
        };
        frameId = requestAnimationFrame(tick);
      }

      cleanup = () => {
        cancelAnimationFrame(frameId);
        observer.disconnect();
        resizeObserver.disconnect();
        canvas.removeEventListener("webglcontextlost", contextLost);
        if (trackPointer) window.removeEventListener("pointermove", onPointerMove);
        handle.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [variant, quality, trackPointer]);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
