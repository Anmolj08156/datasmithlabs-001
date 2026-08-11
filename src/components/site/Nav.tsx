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

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 px-3 sm:pt-4 sm:px-5">
        <nav
          className={`mx-auto max-w-[1180px] flex items-center justify-between h-[60px] pl-5 pr-2 rounded-full transition-all duration-400 ${
            scrolled
              ? "bg-white/85 backdrop-blur-xl border border-[color:var(--border)] shadow-[0_8px_30px_-12px_rgba(11,21,38,0.18)]"
              : "bg-white/85 backdrop-blur-md border border-white/60"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="/logo-mark.png"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-[9px] transition-transform duration-400 group-hover:scale-105"
            />
            <span className="font-display font-semibold text-[15px] sm:text-[16px] tracking-[-0.02em] text-[color:var(--ink)] whitespace-nowrap">
              DataSmith{" "}
              <span className="font-medium text-[color:var(--text-body)]">Research Labs</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative px-4 py-2 rounded-full font-sans text-[14px] font-medium text-[color:var(--text-body)] hover:text-[color:var(--ink)] hover:bg-[color:var(--off-white)] transition-colors duration-200"
                activeProps={{ className: "text-[color:var(--ink)] bg-[color:var(--off-white)]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden sm:inline-flex btn btn-ink btn-sm">
              Book a call
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[color:var(--ink)] hover:bg-[color:var(--off-white)] transition-colors relative z-50"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[color:var(--ink)]">
          <div className="aurora opacity-60" />
        </div>

        <div className="relative h-full flex flex-col justify-center container-wide">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="py-3.5 border-b border-white/10 font-display font-semibold text-[28px] tracking-[-0.02em] text-white hover:text-[color:var(--cyan)] transition-colors"
              activeProps={{ className: "text-[color:var(--cyan)]" }}
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
            <Link to="/contact" className="btn btn-cyan btn-lg w-full">
              Book a free consultation
            </Link>
            <div className="flex flex-col gap-1.5 mt-2 font-mono text-[12px] text-white/50">
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
