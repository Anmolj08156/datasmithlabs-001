import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DataSmith Research Labs" },
      { name: "description", content: "Our origin, mission, and the team building research-led AI at DataSmith Research Labs." },
      { property: "og:title", content: "About — DataSmith Research Labs" },
      { property: "og:description", content: "Research-led AI for serious institutions." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900" },
    ],
  }),
  component: AboutPage,
});

const team = [
  {
    name: "Anmol Jain",
    role: "Founder and Lead Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Dr. Udit Jain",
    role: "Professor and Head VPH Department DUVASU Mathura (Lead Researcher)",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Vidhi Khandelwal",
    role: "Intern",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
  },
];

function AboutPage() {
  return (
    <>
      <section className="pt-[140px] pb-20 bg-white">
        <div className="container-wide max-w-[920px]">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-6 font-serif italic text-[clamp(40px,5vw,64px)] leading-[1.08]">
              A research lab disguised as a company.
            </h1>
            <p className="mt-7 text-[18px] text-[color:var(--text-body)] leading-[1.65] max-w-[680px]">
              DataSmith Research Labs was founded by researchers who got tired
              of watching good science die in PDFs. We build the systems, the
              partnerships, and the training programs that move research from
              the page into production.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[color:var(--navy)] text-white py-[120px]">
        <div className="container-wide grid lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow-muted">Our Story</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,3.6vw,40px)] leading-[1.15] text-white">
              Built at the seam between academia and industry.
            </h2>
            <div className="mt-7 space-y-5 text-[16px] leading-[1.7] text-white/70 max-w-[560px]">
              <p>
                The lab grew out of a simple frustration: most "AI consultancies"
                don't read papers, and most research labs don't ship. We sit
                deliberately in between.
              </p>
              <p>
                Every engagement we take on is treated as a small research
                project — with hypotheses, controls, peer review, and reproducible
                code — and then handed off as production-grade software.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div
              className="h-full min-h-[380px] rounded-lg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,35,71,0.15), rgba(15,35,71,0.15)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">The Team</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,3.6vw,42px)] leading-[1.15] max-w-[640px]">
              Researchers, engineers, and educators working in one room.
            </h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((m) => (
              <Reveal key={m.name}>
                <div className="border border-[color:var(--border)] rounded-lg p-7 hover:border-[color:var(--blue)] transition-colors">
                  <div className="aspect-[4/3] rounded-md overflow-hidden bg-gradient-to-br from-[color:var(--off-white)] to-[color:var(--border)] mb-5">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    ) : null}
                  </div>
                  <h3 className="font-serif text-[22px] text-[color:var(--ink)]">{m.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-muted)]">
                    {m.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}