import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

/** Adds `.in-view` once the element scrolls into view, then stops observing. */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion visitors get the resting state immediately.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in-view");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          el.classList.add("in-view");
          io.unobserve(el);
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

/** Single element that eases in on scroll. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}) {
  const ref = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Container whose direct children cascade in one after another.
 * Children need no wrapper of their own — the CSS targets `> *`.
 */
export function RevealGroup({
  children,
  className = "",
  step = 70,
  direction = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds between each child. */
  step?: number;
  direction?: Direction;
  as?: "div" | "ul" | "section";
}) {
  const ref = useInView<HTMLDivElement>(0.1);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLUListElement>}
      className={`reveal-group reveal-${direction} ${className}`}
      style={{ ["--reveal-step" as string]: `${step}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Headline that assembles itself word by word. */
export function SplitText({
  text,
  className = "",
  innerClassName = "",
  step = 55,
  startDelay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  /**
   * Applied to each animating word. Anything that paints the text itself — a
   * gradient with `background-clip: text`, for instance — must live here, not
   * on an ancestor: the words are transformed, so they paint in their own
   * layer and an ancestor's clipped background never reaches them.
   */
  innerClassName?: string;
  step?: number;
  startDelay?: number;
  /** Skip the observer and animate on mount — for above-the-fold headings. */
  immediate?: boolean;
}) {
  const ref = useInView<HTMLSpanElement>(0.2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (immediate) setMounted(true);
  }, [immediate]);

  const words = text.split(" ");

  return (
    <span
      ref={immediate ? undefined : ref}
      className={`split-text ${immediate && mounted ? "in-view" : ""} ${className}`}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="split-word">
            <span
              className={`split-inner ${innerClassName}`}
              style={{ transitionDelay: `${startDelay + i * step}ms` }}
            >
              {word}
            </span>
          </span>
          {/* The separator must sit outside the clipped word box — inside it,
              the trailing space collapses and the words run together. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/** Counts up to `to` when scrolled into view. */
export function CountUp({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${to}${suffix}`;
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = `${Math.round(eased * to)}${suffix}`;
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

/** Thin progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.transform = `scaleX(${pct})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}

/** Card that tilts very slightly toward the pointer. */
export function TiltCard({
  children,
  className = "",
  strength = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(hover: none)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-4px)`;
      el.style.setProperty("--glow-x", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--glow-y", `${(py + 0.5) * 100}%`);
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}
