import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home", index: "01" },
  { to: "/about", label: "About", index: "02" },
  { to: "/products", label: "Products", index: "03" },
  { to: "/partnerships", label: "Partners", index: "04" },
  { to: "/contact", label: "Contact", index: "05" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-[color:var(--ink)] transition-colors duration-200 ${
          scrolled ? "bg-white" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <nav className="container-wide flex items-stretch justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-3.5 relative z-50 shrink-0 pr-6">
            <span className="display text-[21px] tracking-[-0.015em] text-[color:var(--ink)] whitespace-nowrap">
              DataSmith
            </span>
            <span className="label text-[8px] text-[color:var(--text-muted)] hidden sm:block leading-[1.35]">
              Research
              <br />
              Labs
            </span>
          </Link>

          {/* Links, CTA and burger stay welded together as one cell strip. */}
          <div className="flex items-stretch">
            <div className="hidden lg:flex items-stretch">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="label text-[10px] px-6 flex items-center text-[color:var(--ink)] border-l-2 border-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white transition-colors duration-150"
                  activeProps={{ className: "bg-[color:var(--ink)] text-white" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              className="hidden md:flex items-center label text-[10px] px-7 bg-[color:var(--cyan)] text-[color:var(--ink)] border-l-2 border-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white transition-colors duration-150"
            >
              Book a Consultation
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative z-50 w-[72px] flex flex-col items-center justify-center gap-[5px] border-l-2 border-[color:var(--ink)] transition-colors ${
                isOpen ? "bg-white" : "bg-[color:var(--ink)]"
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <span
                className={`block w-6 h-[2px] transition-all duration-200 ${
                  isOpen ? "bg-[color:var(--ink)] translate-y-[7px] rotate-45" : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-[2px] transition-all duration-200 ${
                  isOpen ? "opacity-0" : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-[2px] transition-all duration-200 ${
                  isOpen ? "bg-[color:var(--ink)] -translate-y-[7px] -rotate-45" : "bg-white"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay — full-bleed ink with oversized indexed entries. */}
      <div
        className={`fixed inset-0 z-40 bg-[color:var(--ink)] lg:hidden flex flex-col justify-center transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container-wide">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-baseline gap-5 border-t-2 border-white/20 last:border-b-2 py-5 text-white"
              activeProps={{ className: "text-[color:var(--cyan)]" }}
              activeOptions={{ exact: l.to === "/" }}
              style={{
                transitionDelay: isOpen ? `${80 + i * 60}ms` : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(16px)",
                opacity: isOpen ? 1 : 0,
                transitionDuration: "400ms",
                transitionProperty: "transform, opacity",
              }}
            >
              <span className="label text-[10px] text-white/40">{l.index}</span>
              <span className="display text-[clamp(30px,10vw,52px)] group-hover:text-[color:var(--cyan)] transition-colors">
                {l.label}
              </span>
            </Link>
          ))}

          <div className="mt-10 flex flex-col gap-4">
            <Link to="/contact" className="btn btn-cyan btn-lg w-full">
              Book a Free Consultation
            </Link>
            <div className="flex flex-col gap-1 label text-[10px] text-white/50">
              <a href="mailto:datasmithlabs@gmail.com" className="hover:text-white">
                datasmithlabs@gmail.com
              </a>
              <a href="tel:+917017283915" className="hover:text-white">
                +91 7017 283 915
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
