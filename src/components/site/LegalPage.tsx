import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden">
        <div className="aurora opacity-55" />
        <div className="container-wide relative z-10 pt-32 pb-14 sm:pt-40 sm:pb-16">
          <div className="stagger">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-5 h1">{title}</h1>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
              Last updated · {updated}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-wide max-w-[760px]">
          <Reveal>
            <div className="space-y-6 font-sans text-[16px] leading-[1.75] text-[color:var(--text-body)]">
              {children}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
