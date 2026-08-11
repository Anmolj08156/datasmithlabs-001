import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { RevealGroup } from "./Reveal";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/partnerships", label: "Partners" },
  { to: "/contact", label: "Contact" },
];

const services = [
  "AI & Machine Learning",
  "Data Science",
  "Research Consulting",
  "Training & Workshops",
];

const legal = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/disclaimer", label: "Disclaimer" },
  { to: "/refund", label: "Refund" },
];

export function Footer() {
  return (
    <footer className="relative bg-[color:var(--void)] border-t border-[color:var(--hairline)] overflow-hidden">
      <div className="glow glow-blue w-[560px] h-[560px] -bottom-72 left-1/4 opacity-30" />

      <div className="container-wide relative z-10 pt-16 pb-9">
        <RevealGroup className="grid md:grid-cols-12 gap-y-10 gap-x-8" step={80}>
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <img
                src="/logo-mark.png"
                alt=""
                width={36}
                height={36}
                className="w-9 h-9 rounded-[10px] transition-transform duration-500 group-hover:scale-105"
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
            <p className="mt-6 font-sans text-[14px] leading-[1.7] text-[color:var(--text-body)] max-w-[290px]">
              Transforming data into discovery for institutions that take their work seriously.
            </p>
            <a
              href="https://www.linkedin.com/company/datasmith-labs"
              target="_blank"
              rel="noreferrer"
              aria-label="DataSmith Research Labs on LinkedIn"
              className="mt-7 w-10 h-10 rounded-full border border-[color:var(--hairline-strong)] flex items-center justify-center text-[color:var(--text-body)] hover:text-white hover:border-[color:var(--blue-bright)] hover:bg-white/5 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <nav className="md:col-span-3">
            <p className="label text-[color:var(--text-muted)]">Navigation</p>
            <ul className="mt-6 space-y-3">
              {navigation.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-sans text-[14px] text-[color:var(--text-body)] link-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="label text-[color:var(--text-muted)]">Services</p>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="font-sans text-[14px] text-[color:var(--text-body)] leading-snug"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-[color:var(--text-muted)]">Contact</p>
            <ul className="mt-6 space-y-3 font-sans text-[14px]">
              <li>
                <a
                  href="mailto:datasmithlabs@gmail.com"
                  className="text-[color:var(--text-body)] link-underline"
                >
                  datasmithlabs@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+917017283915"
                  className="text-[color:var(--text-body)] link-underline"
                >
                  +91 7017 283 915
                </a>
              </li>
              <li className="text-[color:var(--text-muted)]">Jaipur, India</li>
            </ul>
          </div>
        </RevealGroup>

        <div className="mt-14 pt-6 border-t border-[color:var(--hairline)] flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[color:var(--text-muted)]">
            © 2025 DataSmith Research Labs. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {legal.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-mono text-[11px] text-[color:var(--text-muted)] hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
