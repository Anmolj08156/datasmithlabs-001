import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/partnerships", label: "Partners" },
  { to: "/contact", label: "Contact" },
];

export function Nav({ variant = "auto" }: { variant?: "auto" | "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Disable scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
  const burgerColor = scrolled || !isLight ? (isOpen ? "text-white" : "text-[color:var(--ink)]") : "text-white";
  
  // Five nav links + the CTA no longer fit at md, so the CTA only appears from lg up.
  const ctaCls = scrolled || !isLight
    ? "btn btn-ink !h-10 !text-[12px] !hidden lg:!inline-flex"
    : "btn !h-10 !text-[12px] bg-white text-[color:var(--ink)] hover:bg-[color:var(--off-white)] !hidden lg:!inline-flex";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
        <nav className="container-wide flex items-center justify-between h-[68px]">
          <Link to="/" className="flex items-center gap-3 relative z-50 flex-nowrap shrink-0">
            <span className={`font-serif text-[20px] font-medium tracking-tight whitespace-nowrap ${isOpen ? "text-white" : logoColor}`}>
              DataSmith
            </span>
            <span className={`h-4 w-px shrink-0 ${isOpen ? "bg-white/20" : scrolled || !isLight ? "bg-[color:var(--border)]" : "bg-white/30"}`} />
            <span className={`font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap ${isOpen ? "text-white/55" : scrolled || !isLight ? "text-[color:var(--text-muted)]" : "text-white/55"}`}>
              Research Labs
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
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

          <div className="flex items-center gap-4">
            <Link to="/contact" className={ctaCls}>
              Book a Consultation
            </Link>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 focus:outline-none relative z-50 ${burgerColor}`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[color:var(--ink)] transition-all duration-500 md:hidden flex flex-col justify-center px-8 sm:px-12 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 max-w-[480px] w-full mx-auto text-left">
          <p 
            className="eyebrow-muted"
            style={{
              transitionDelay: isOpen ? "100ms" : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 0.4 : 0,
              transitionDuration: "400ms",
              transitionProperty: "transform, opacity",
            }}
          >
            00 — Navigation
          </p>
          <div className="flex flex-col gap-6">
            {links.map((l, index) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-serif italic text-4xl text-white hover:text-[color:var(--cyan)] transition-colors inline-block"
                activeProps={{ className: "font-serif italic text-4xl text-[color:var(--cyan)] not-italic" }}
                activeOptions={{ exact: l.to === "/" }}
                style={{
                  transitionDelay: isOpen ? `${150 + index * 75}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isOpen ? 1 : 0,
                  transitionDuration: "400ms",
                  transitionProperty: "transform, opacity, color",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          
          <div
            className="mt-6 pt-8 border-t border-[color:var(--border-dark)] flex flex-col gap-6"
            style={{
              transitionDelay: isOpen ? "450ms" : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transitionDuration: "400ms",
              transitionProperty: "transform, opacity",
            }}
          >
            <Link to="/contact" className="btn btn-cyan btn-lg w-full text-center">
              Book a Free Consultation
            </Link>
            <div className="flex flex-col gap-2 mt-2 text-[13px] text-white/55 font-mono">
              <a href="mailto:datasmithlabs@gmail.com" className="hover:text-white transition-colors">
                datasmithlabs@gmail.com
              </a>
              <a href="tel:+917017283915" className="hover:text-white transition-colors">
                +91 7017 283 915
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}