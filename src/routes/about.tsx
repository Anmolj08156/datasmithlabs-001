import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText } from "../components/site/Reveal";
import { SectionRail } from "../components/site/SectionRail";
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

const values = [
  {
    title: "Scientific method",
    desc: "Every engagement is treated as a research project — hypotheses, controls, peer review, reproducible code.",
  },
  {
    title: "Production discipline",
    desc: "Research that cannot ship is not finished. We hand off production-grade software, not notebooks.",
  },
  {
    title: "Statistical honesty",
    desc: "We report what the data supports, including when the answer is inconvenient or the effect is small.",
  },
];

function AboutPage() {
  return (
    <>
      {/* ═══════ 01 · ABOUT ═══════ */}
      <section className="relative min-h-[72vh] flex items-center overflow-hidden bg-[color:var(--void)]">
        <div className="glow glow-blue w-[620px] h-[620px] -top-40 right-0 opacity-35" />
        <div className="absolute inset-0 grid-fade opacity-40 pointer-events-none" />
        <SectionRail num="01" label="About" />

        <div className="container-wide relative z-10 pt-32 pb-20">
          <div className="stagger max-w-[640px]">
            <p className="eyebrow">About Us</p>
            <h1 className="mt-6 h1">
              A research lab
              <br />
              disguised as a company.
            </h1>
            <p className="mt-7 body-text text-[16px] max-w-[470px]">
              DataSmith Research Labs was founded by researchers who got tired of watching good
              science die in PDFs. We build the systems, the partnerships, and the training programs
              that move research from the page into production.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ 02 · STORY ═══════ */}
      <section className="section relative min-h-[70vh] flex items-center bg-[color:var(--ink)]">
        <Canvas3D variant="terrain" className="absolute inset-0 opacity-90" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--ink)] via-[color:var(--ink)]/65 to-transparent" />
        <SectionRail num="02" label="Story" />

        <div className="container-wide relative z-10 py-24">
          <Reveal className="max-w-[540px]" direction="left">
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-5 h2">
              <SplitText text="Built at the seam between academia and industry." />
            </h2>
            <div className="mt-7 space-y-5 body-text text-[15px] max-w-[440px]">
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

      {/* ═══════ 03 · VALUES ═══════ */}
      <section className="section relative bg-[color:var(--void)] py-24">
        <div className="glow glow-cyan w-[480px] h-[480px] top-0 left-1/4 opacity-25" />
        <SectionRail num="03" label="Values" />

        <div className="container-wide relative z-10">
          <Reveal>
            <p className="eyebrow">How We Work</p>
            <h2 className="mt-5 h2 max-w-[520px]">
              <SplitText text="Three commitments we do not trade away." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid md:grid-cols-3 gap-5" step={110}>
            {values.map((v, i) => (
              <div key={v.title} className="card hover-lift p-7 h-full">
                <span className="font-mono text-[11px] text-[color:var(--blue-bright)]">
                  0{i + 1}
                </span>
                <h3 className="mt-5 h3">{v.title}</h3>
                <p className="mt-3 body-text text-[13.5px]">{v.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 04 · TEAM ═══════ */}
      <section className="section relative bg-[color:var(--ink)] py-24">
        <div className="absolute inset-0 grid-fade opacity-30 pointer-events-none" />
        <SectionRail num="04" label="Team" />

        <div className="container-wide relative z-10">
          <Reveal>
            <p className="eyebrow">The Team</p>
            <h2 className="mt-5 h2 max-w-[520px]">
              <SplitText text="Researchers, engineers, and educators in one room." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 gap-5 max-w-[780px]" step={130}>
            {team.map((m) => (
              <div key={m.name} className="card hover-lift p-7 group">
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[color:var(--blue)] to-[#1b4bd0] flex items-center justify-center font-display font-medium text-[16px] text-white transition-transform duration-500 group-hover:scale-105">
                    {m.initials}
                  </span>
                  <div>
                    <h3 className="h3">{m.name}</h3>
                    <p className="mt-1 font-sans text-[13.5px] text-[color:var(--text-body)]">
                      {m.role}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-[color:var(--hairline)] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[color:var(--blue-bright)]" />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                    {m.education}
                  </span>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 05 · CTA ═══════ */}
      <section className="section relative min-h-[62vh] flex items-center bg-[color:var(--void)] overflow-hidden">
        <Canvas3D variant="tunnel" className="absolute inset-0 opacity-85" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/72 to-transparent" />
        <SectionRail num="05" label="Lets Talk" />

        <div className="container-wide relative z-10 py-24">
          <Reveal className="max-w-[520px]" direction="left">
            <p className="eyebrow">Work With Us</p>
            <h2 className="mt-5 h2">
              <SplitText text="Bring us a hard question." />
            </h2>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/partnerships" className="btn btn-outline">
                See Our Partners
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
