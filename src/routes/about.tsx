import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { Canvas3D } from "../components/three/Canvas3D";

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
    n: "01",
    name: "Anmol Jain",
    role: "Founder and Lead Architect",
    education: "LNMIIT Jaipur — Alumni",
  },
  {
    n: "02",
    name: "Divyansh Agarwal",
    role: "Co-Founder",
    education: "LNMIIT Jaipur — Alumni",
  },
];

function AboutPage() {
  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="bg-[color:var(--ink)] text-white pt-[72px] border-b-2 border-[color:var(--ink)]">
        <div className="container-wide pt-16 pb-16 sm:pt-24 sm:pb-24 stagger">
          <p className="label text-[color:var(--cyan)]">About</p>
          <h1 className="mt-8 display display-xl">
            A research lab
            <br />
            <span className="text-[color:var(--cyan)]">disguised</span>
            <br />
            as a company.
          </h1>
          <p className="mt-12 font-sans text-[16px] sm:text-[18px] leading-[1.55] text-white/75 max-w-[54ch]">
            DataSmith Research Labs was founded by researchers who got tired of watching good
            science die in PDFs. We build the systems, the partnerships, and the training programs
            that move research from the page into production.
          </p>
        </div>
      </section>

      {/* ═══════════ 01 · OUR STORY ═══════════ */}
      <section className="relative bg-[color:var(--navy)] text-white overflow-hidden py-20 sm:py-28">
        <Canvas3D variant="wave" className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--navy)] via-[color:var(--navy)]/75 to-transparent" />

        <div className="container-wide relative z-10">
          <Reveal className="max-w-[760px]">
            <p className="label text-[color:var(--cyan)]">01 — Our Story</p>
            <h2 className="mt-6 display display-md">
              Built at the seam
              <br />
              between academia
              <br />
              and industry.
            </h2>
            <div className="mt-9 space-y-6 font-sans text-[15px] sm:text-[16px] leading-[1.65] text-white/75 max-w-[56ch]">
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

      {/* ═══════════ 02 · THE TEAM ═══════════ */}
      <section className="bg-white text-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-12">
              <div className="lg:col-span-7">
                <p className="label text-[color:var(--cyan)]">02 — The Team</p>
                <h2 className="mt-6 display display-lg">
                  Researchers.
                  <br />
                  Engineers.
                  <br />
                  Educators.
                </h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)]">
                Working in one room.
              </p>
            </div>
          </Reveal>

          <div>
            {team.map((m) => (
              <Reveal key={m.name}>
                <div className="brut-row brut-row-light group px-2 sm:px-5 py-9 sm:py-12 grid grid-cols-12 gap-x-4 gap-y-4 items-baseline">
                  <span className="col-span-2 md:col-span-1 ghost-num text-[clamp(30px,4.5vw,58px)]">
                    {m.n}
                  </span>
                  <h3 className="col-span-10 md:col-span-6 display text-[clamp(26px,4vw,58px)]">
                    {m.name}
                  </h3>
                  <div className="col-span-12 md:col-span-5 md:text-right">
                    <p className="label text-[10px] opacity-70">{m.role}</p>
                    <p className="mt-2.5 label text-[10px] text-[color:var(--cyan)] group-hover:text-[color:var(--cyan)]">
                      {m.education}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="bg-[color:var(--ink)] text-white border-t-2 border-[color:var(--ink)] py-20 sm:py-24">
        <div className="container-wide grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="label text-[color:var(--cyan)]">Work With Us</p>
            <h2 className="mt-6 display text-[clamp(30px,6vw,86px)]">
              Bring us a
              <br />
              hard question.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-cyan btn-lg">
              Book a Consultation
            </Link>
            <Link to="/partnerships" className="btn btn-outline-light btn-lg">
              See Partners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
