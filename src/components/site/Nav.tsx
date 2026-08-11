import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/partnerships", label: "Partners" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-[color:var(--void)]/85 backdrop-blur-xl border-b border-[color:var(--hairline)]"
            : "bg-transparent"
        }`}
      >
        <nav className="container-wide flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-3 group shrink-0 relative z-50">
            <img
              src="/logo-mark.png"
              alt=""
              width={34}
              height={34}
              className="w-[34px] h-[34px] rounded-[10px] transition-transform duration-500 group-hover:scale-105"
            />
            <span className="leading-[1.15]">
              <span className="block font-display font-medium text-[15px] tracking-[-0.02em] text-white">
                DataSmith
              </span>
              <span className="block font-mono text-[8.5px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                Research Labs
              </span>
            </span>
          </Link>

          {/* Centred link cluster, as in the reference layout. */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 rounded-full font-sans text-[13.5px] font-medium text-[color:var(--text-body)] hover:text-white hover:bg-white/5 transition-colors duration-200"
                activeProps={{ className: "text-white bg-white/[0.07]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden sm:inline-flex btn btn-outline btn-sm">
              Let's Talk <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/8 transition-colors relative z-50"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[color:var(--void)]">
          <div className="glow glow-blue w-[420px] h-[420px] -top-24 -right-24 opacity-60" />
          <div className="absolute inset-0 grid-fade opacity-50" />
        </div>

        <div className="relative h-full flex flex-col justify-center container-wide">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3.5 border-b border-[color:var(--hairline)] font-display font-medium text-[27px] tracking-[-0.03em] text-white hover:text-[color:var(--blue-bright)] transition-colors"
              activeProps={{ className: "text-[color:var(--blue-bright)]" }}
              activeOptions={{ exact: l.to === "/" }}
              style={{
                transitionDelay: isOpen ? `${90 + i * 55}ms` : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(18px)",
                opacity: isOpen ? 1 : 0,
                transitionDuration: "450ms",
                transitionProperty: "transform, opacity, color",
              }}
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-9 flex flex-col gap-3">
            <Link to="/contact" className="btn btn-primary btn-lg w-full">
              Schedule a consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex flex-col gap-1.5 mt-2 font-mono text-[12px] text-[color:var(--text-muted)]">
              <a
                href="mailto:datasmithlabs@gmail.com"
                className="hover:text-white transition-colors"
              >
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
