import { Link } from "@tanstack/react-router";
import { RevealGroup } from "./Reveal";

const sitemap = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/partnerships", label: "Partners" },
  { to: "/contact", label: "Contact" },
];

const legal = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/disclaimer", label: "Disclaimer" },
  { to: "/refund", label: "Refund" },
];

export function Footer() {
  return (
    <footer className="relative bg-[color:var(--ink)] text-white overflow-hidden">
      <div className="aurora opacity-40" />

      <div className="container-wide relative z-10 pt-16 pb-10">
        <RevealGroup className="grid md:grid-cols-12 gap-y-10 gap-x-8" step={80}>
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center transition-transform duration-400 group-hover:rotate-[18deg]">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-[color:var(--cyan)]" />
              </span>
              <span className="font-display font-semibold text-[17px] tracking-[-0.02em]">
                DataSmith
              </span>
            </Link>
            <p className="mt-5 font-sans text-[15px] leading-[1.65] text-white/60 max-w-[300px]">
              Transforming data into discovery for institutions that take their work seriously.
            </p>
            <a
              href="https://www.linkedin.com/company/datasmith-labs"
              target="_blank"
              rel="noreferrer"
              className="mt-6 btn btn-outline-light btn-sm"
            >
              LinkedIn →
            </a>
          </div>

          <nav className="md:col-span-3">
            <p className="label text-[10px] text-white/35">Sitemap</p>
            <ul className="mt-5 space-y-3">
              {sitemap.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-sans text-[15px] text-white/75 link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2">
            <p className="label text-[10px] text-white/35">Legal</p>
            <ul className="mt-5 space-y-3">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-sans text-[15px] text-white/75 link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="label text-[10px] text-white/35">Contact</p>
            <ul className="mt-5 space-y-3 font-sans text-[15px]">
              <li>
                <a
                  href="mailto:datasmithlabs@gmail.com"
                  className="text-white/75 link-underline break-all"
                >
                  datasmithlabs@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917017283915" className="text-white/75 link-underline">
                  +91 7017 283 915
                </a>
              </li>
            </ul>
          </div>
        </RevealGroup>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-white/35">© 2025 DataSmith Research Labs</p>
          <p className="font-mono text-[11px] text-white/35">Built in India</p>
        </div>
      </div>
    </footer>
  );
}
