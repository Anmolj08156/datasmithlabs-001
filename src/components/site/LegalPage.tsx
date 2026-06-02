import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="bg-white pt-[140px] pb-28 min-h-screen">
      <div className="container-wide max-w-[760px]">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-5 font-serif italic text-[clamp(36px,5vw,52px)] leading-[1.1]">{title}</h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
          Last updated · {updated}
        </p>
        <div className="mt-12 space-y-6 text-[16px] leading-[1.75] text-[color:var(--text-body)]">
          {children}
        </div>
      </div>
    </section>
  );
}