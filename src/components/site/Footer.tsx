import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[color:var(--ink)] text-white">
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-3 items-center gap-8 pb-10 border-b border-[color:var(--border-dark)]">
          <Link to="/" className="flex items-center justify-center md:justify-start gap-3 flex-nowrap shrink-0">
            <span className="font-serif text-[22px] font-medium whitespace-nowrap">DataSmith</span>
            <span className="h-4 w-px bg-white/20 shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55 whitespace-nowrap">
              Research Labs
            </span>
          </Link>

          <p className="font-serif italic text-[20px] text-white/85 text-center">
            Research. Intelligence. Innovation.
          </p>

          <a
            href="https://www.linkedin.com/company/datasmith-labs"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-[14px] text-white/70 hover:text-[color:var(--cyan)] text-center md:text-right w-full md:w-auto md:justify-self-end"
          >
            LinkedIn →
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
          <div className="flex flex-wrap gap-6 text-[13px] text-white/45">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/disclaimer" className="hover:text-white">Disclaimer</Link>
            <Link to="/refund" className="hover:text-white">Refund</Link>
          </div>
          <p className="font-mono text-[11px] text-white/30">
            © 2025 DataSmith Research Labs
          </p>
        </div>
      </div>
    </footer>
  );
}