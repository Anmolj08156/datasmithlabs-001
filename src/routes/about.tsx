import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText } from "../components/site/Reveal";
import { Canvas3D } from "../components/three/Canvas3D";
import { ArrowRight, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DataSmith Research Labs" },
      {
        name: "description",
        content:
          "Our origin, mission, and the team building research-led AI at DataSmith Research Labs.",
      },
      { property: "og:title", content: "About — DataSmith Research Labs" },
      { property: "og:description", content: "Research-led AI for serious institutions." },
    ],
  }),
  component: AboutPage,
});

const team = [
  {
    name: "Anmol Jain",
    role: "Founder and Lead Architect",
    education: "LNMIIT Jaipur — Alumni",
    initials: "AJ",
  },
  {
    name: "Divyansh Agarwal",
    role: "Co-Founder",
    education: "LNMIIT Jaipur — Alumni",
    initials: "DA",
  },
];

function AboutPage() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden">
        <div className="aurora opacity-70" />
        <div className="absolute inset-0 dot-grid-dark opacity-40 pointer-events-none" />

        <div className="container-wide relative z-10 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="stagger max-w-[720px]">
            <p className="eyebrow">About</p>
            <h1 className="mt-5 h1">
              A research lab <span className="text-gradient">disguised</span> as a company.
            </h1>
            <p className="mt-7 font-sans text-[17px] leading-[1.6] text-white/65 max-w-[560px]">
              DataSmith Research Labs was founded by researchers who got tired of watching good
              science die in PDFs. We build the systems, the partnerships, and the training programs
              that move research from the page into production.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── OUR STORY ───────── */}
      <section className="relative bg-[color:var(--navy)] text-white py-20 sm:py-28 overflow-hidden">
        <Canvas3D variant="wave" className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--navy)] via-[color:var(--navy)]/75 to-transparent" />

        <div className="container-wide relative z-10">
          <Reveal className="max-w-[640px]" direction="left">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4 h2">
              <SplitText text="Built at the seam between academia and industry." />
            </h2>
            <div className="mt-7 space-y-5 font-sans text-[15px] sm:text-[16px] leading-[1.7] text-white/70">
              <p>
                The lab grew out of a simple frustration: most "AI consultancies" don't read papers,
                and most research labs don't ship. We sit deliberately in between.
              </p>
              <p>
                Every engagement we take on is treated as a small research project — with
                hypotheses, controls, peer review, and reproducible code — and then handed off as
                production-grade software.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── TEAM ───────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">The team</p>
            <h2 className="mt-4 h2 max-w-[540px]">
              <SplitText text="Researchers, engineers, and educators working in one room." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid sm:grid-cols-2 gap-5 max-w-[820px]" step={110}>
            {team.map((m) => (
              <div key={m.name} className="card p-7 hover-lift group">
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-2xl bg-[color:var(--ink)] flex items-center justify-center font-display font-semibold text-[17px] text-[color:var(--cyan)] transition-transform duration-400 group-hover:scale-105">
                    {m.initials}
                  </span>
                  <div>
                    <h3 className="h3">{m.name}</h3>
                    <p className="mt-1 font-sans text-[14px] text-[color:var(--text-body)]">
                      {m.role}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[color:var(--border)] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[color:var(--cyan)]" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--text-muted)]">
                    {m.education}
                  </span>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-[color:var(--off-white)] border-t border-[color:var(--border)] py-20 sm:py-24">
        <div className="container-wide">
          <Reveal direction="scale">
            <div className="relative rounded-3xl overflow-hidden bg-[color:var(--ink)] text-white px-7 py-12 sm:px-12 sm:py-16 grid lg:grid-cols-12 gap-8 items-center">
              <div className="aurora opacity-60" />
              <div className="relative lg:col-span-8">
                <p className="eyebrow">Work with us</p>
                <h2 className="mt-4 h2">Bring us a hard question.</h2>
              </div>
              <div className="relative lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                <Link to="/contact" className="btn btn-cyan">
                  Book a consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/partnerships" className="btn btn-outline-light">
                  See partners
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
