import { Link } from "@tanstack/react-router";

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
    <footer className="bg-[color:var(--ink)] text-white">
      {/* Oversized wordmark band */}
      <div className="border-b-2 border-white/20 overflow-hidden">
        <div className="container-wide py-10 sm:py-14">
          <p className="display text-[clamp(48px,15vw,220px)] leading-[0.8] text-white/95">
            DataSmith
          </p>
        </div>
      </div>

      <div className="container-wide grid md:grid-cols-12 gap-y-10 py-14">
        <div className="md:col-span-5">
          <p className="label text-[10px] text-white/40">Research · Intelligence · Innovation</p>
          <p className="mt-5 font-sans text-[15px] leading-[1.6] text-white/70 max-w-[320px]">
            Transforming data into discovery for institutions that take their work seriously.
          </p>
          <a
            href="https://www.linkedin.com/company/datasmith-labs"
            target="_blank"
            rel="noreferrer"
            className="mt-7 btn btn-outline-light btn-sm"
          >
            LinkedIn →
          </a>
        </div>

        <nav className="md:col-span-3">
          <p className="label text-[10px] text-white/40">Sitemap</p>
          <ul className="mt-5 space-y-2.5">
            {sitemap.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-sans text-[15px] text-white/85 hover:text-[color:var(--cyan)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-2">
          <p className="label text-[10px] text-white/40">Legal</p>
          <ul className="mt-5 space-y-2.5">
            {legal.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-sans text-[15px] text-white/85 hover:text-[color:var(--cyan)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="label text-[10px] text-white/40">Contact</p>
          <ul className="mt-5 space-y-2.5 font-sans text-[15px]">
            <li>
              <a
                href="mailto:datasmithlabs@gmail.com"
                className="text-white/85 hover:text-[color:var(--cyan)] transition-colors break-all"
              >
                datasmithlabs@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+917017283915"
                className="text-white/85 hover:text-[color:var(--cyan)] transition-colors"
              >
                +91 7017 283 915
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-white/20">
        <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="label text-[10px] text-white/35">© 2025 DataSmith Research Labs</p>
          <p className="label text-[10px] text-white/35">Built in India</p>
        </div>
      </div>
    </footer>
  );
}
