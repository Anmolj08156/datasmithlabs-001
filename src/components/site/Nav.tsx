import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

export function Nav({ variant = "auto" }: { variant?: "auto" | "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On home (which opens with a dark hero), nav is transparent + light until scrolled.
  const onHomeHero = variant === "auto" && pathname === "/" && !scrolled;
  const isLight = variant === "light" || onHomeHero;

  const bg = scrolled
    ? "bg-[rgba(255,255,255,0.94)] backdrop-blur-xl border-b border-[color:var(--border)]"
    : isLight
      ? "bg-transparent"
      : "bg-[rgba(255,255,255,0.94)] backdrop-blur-xl border-b border-[color:var(--border)]";

  const textColor = scrolled ? "text-[color:var(--text-body)]" : isLight ? "text-white/85" : "text-[color:var(--text-body)]";
  const logoColor = scrolled || !isLight ? "text-[color:var(--ink)]" : "text-white";
  const ctaCls = scrolled || !isLight
    ? "btn btn-ink !h-10 !text-[12px]"
    : "btn !h-10 !text-[12px] bg-white text-[color:var(--ink)] hover:bg-[color:var(--off-white)]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
      <nav className="container-wide flex items-center justify-between h-[68px]">
        <Link to="/" className="flex items-center gap-3">
          <span className={`font-serif text-[20px] font-medium tracking-tight ${logoColor}`}>
            DataSmith
          </span>
          <span className={`h-4 w-px ${scrolled || !isLight ? "bg-[color:var(--border)]" : "bg-white/30"}`} />
          <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${scrolled || !isLight ? "text-[color:var(--text-muted)]" : "text-white/55"}`}>
            Research Labs
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-sans text-[14px] font-medium transition-colors ${textColor} hover:text-[color:var(--cyan)]`}
              activeProps={{ className: `font-sans text-[14px] font-medium ${scrolled || !isLight ? "text-[color:var(--ink)]" : "text-white"}` }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link to="/contact" className={ctaCls}>
          Book a Consultation
        </Link>
      </nav>
    </header>
  );
}