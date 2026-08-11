import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionRail } from "./SectionRail";

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
      <section className="relative bg-[color:var(--void)] overflow-hidden">
        <div className="glow glow-blue w-[520px] h-[520px] -top-48 right-0 opacity-25" />
        <div className="absolute inset-0 grid-fade opacity-30 pointer-events-none" />
        <SectionRail num="01" label="Legal" />

        <div className="container-wide relative z-10 pt-32 pb-14">
          <div className="stagger">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-5 h1">{title}</h1>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              Last updated · {updated}
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-[color:var(--ink)] py-16">
        <div className="container-wide max-w-[780px]">
          <Reveal>
            <div className="space-y-6 body-text text-[15.5px]">{children}</div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
