import type { ReactNode } from "react";

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
      <section className="bg-[color:var(--ink)] text-white pt-[72px]">
        <div className="container-wide pt-16 pb-14 sm:pt-20 sm:pb-16">
          <p className="label text-[color:var(--cyan)]">Legal</p>
          <h1 className="mt-7 display display-lg">{title}</h1>
        </div>
        <div className="border-t-2 border-white/20">
          <div className="container-wide py-5">
            <p className="label text-[10px] text-white/45">Last updated · {updated}</p>
          </div>
        </div>
      </section>

      <section className="bg-white text-[color:var(--ink)] border-t-2 border-[color:var(--ink)] py-16 sm:py-24">
        <div className="container-wide max-w-[820px]">
          <div className="space-y-6 font-sans text-[16px] leading-[1.75] text-[color:var(--text-body)]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
