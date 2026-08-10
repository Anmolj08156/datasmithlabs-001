import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Reveal, CountUp } from "../components/site/Reveal";
import { Canvas3D } from "../components/three/Canvas3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Datasmith Labs | AI Solutions & Research" },
      {
        name: "description",
        content:
          "Datasmith Labs provides AI solutions, enterprise automation, research services and intelligent digital products.",
      },
      { property: "og:title", content: "Datasmith Labs" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://datasmithlabs.com" },
    ],
  }),
  component: Index,
});

const services = [
  {
    n: "01",
    title: "AI & Machine Learning Solutions",
    desc: "Custom intelligent systems built for production.",
    tags: ["Machine Learning", "Neural Networks", "MLOps"],
  },
  {
    n: "02",
    title: "Data Science & Business Intelligence",
    desc: "From raw data to decisions that drive growth.",
    tags: ["Analytics", "Forecasting", "Dashboards"],
  },
  {
    n: "03",
    title: "Research Consulting & Innovation",
    desc: "Academic rigor applied to industry problems.",
    tags: ["Applied Research", "Publications", "R&D"],
  },
  {
    n: "04",
    title: "Corporate Training & Workshops",
    desc: "Bridging the gap between knowledge and capability.",
    tags: ["Workshops", "Certifications", "Faculty Dev"],
  },
];

const trustLogos = [
  "IIT Delhi",
  "IIM Bangalore",
  "ISRO",
  "TIFR",
  "Nature Index",
  "NeurIPS Reviewers",
  "ACM Members",
  "IEEE",
  "Springer",
  "Elsevier",
];

const stats = [
  { n: 10, suffix: "+", label: "Ongoing Projects" },
  { n: 15, suffix: "+", label: "Partner Institutions" },
  { n: 2, suffix: "+", label: "Years of Practice" },
  { n: 4, suffix: "", label: "Core Service Areas" },
];

const programs = [
  {
    name: "Corporate Workshops",
    desc: "Intensive on-site or virtual sessions tailored to your team's data maturity.",
    meta: "2–5 Days · On-site / Remote",
  },
  {
    name: "Faculty Development Programs",
    desc: "Multi-week programs equipping academic faculty with applied AI methodology.",
    meta: "4 Weeks · Cohort",
  },
  {
    name: "Certification Courses",
    desc: "Structured certifications in AI, ML, and applied data science.",
    meta: "8–12 Weeks · Certified",
  },
];

function Index() {
  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden pt-[72px]">
        <Canvas3D variant="constellation" className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--ink)] via-[color:var(--ink)]/70 to-[color:var(--ink)]/25" />
        <div className="absolute inset-0 pointer-events-none grid-lines-dark" />

        <div className="container-wide relative z-10 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="stagger">
            <p className="label text-[color:var(--cyan)]">Research · Intelligence · Innovation</p>

            <h1 className="mt-8 display display-xl">
              Transforming
              <br />
              Data into
              <br />
              <span className="text-[color:var(--cyan)]">Discovery</span>
            </h1>

            <div className="mt-12 grid lg:grid-cols-12 gap-8 items-end">
              <p className="lg:col-span-5 font-sans text-[16px] sm:text-[18px] leading-[1.55] text-white/75">
                We don't just analyze data — we transform it into intelligent systems, meaningful
                research, and sustainable growth for institutions that take their work seriously.
              </p>
              <div className="lg:col-span-7 flex flex-wrap gap-3 lg:justify-end">
                <Link to="/contact" className="btn btn-cyan btn-lg">
                  Book a Consultation
                </Link>
                <a href="#services" className="btn btn-outline-light btn-lg">
                  Explore Services ↓
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip closes the hero with hard dividers. */}
        <div className="relative z-10 border-t-2 border-white/20">
          <div className="container-wide grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-7 lg:py-9 lg:px-8 lg:first:pl-0 border-white/20
                  ${i % 2 === 0 ? "pr-4 border-r-2 lg:border-r-2" : "pl-4 lg:pl-8"}
                  ${i < 2 ? "border-b-2 lg:border-b-0" : ""}
                  ${i === 1 ? "lg:border-r-2" : ""}
                  ${i === 2 ? "lg:border-r-2" : ""}`}
              >
                <p className="display text-[clamp(34px,5.5vw,68px)] text-white leading-none">
                  <CountUp to={s.n} suffix={s.suffix} />
                </p>
                <p className="mt-3 label text-[10px] text-white/45">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST MARQUEE ═══════════ */}
      <section className="bg-[color:var(--cyan)] text-[color:var(--ink)] border-y-2 border-[color:var(--ink)] overflow-hidden py-5">
        <div className="marquee-track marquee-fast">
          {[...trustLogos, ...trustLogos].map((l, i) => (
            <span
              key={i}
              className="display text-[clamp(22px,3.4vw,44px)] px-7 whitespace-nowrap flex items-center gap-7"
            >
              {l}
              <span className="text-[color:var(--ink)]/40">✳</span>
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════ 01 · SERVICES ═══════════ */}
      <section id="services" className="bg-white text-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-12">
              <div className="lg:col-span-7">
                <p className="label text-[color:var(--cyan)]">01 — What We Do</p>
                <h2 className="mt-6 display display-lg">
                  A portfolio
                  <br />
                  for the serious.
                </h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)]">
                Services for institutions that demand both rigor and outcomes.
              </p>
            </div>
          </Reveal>

          <div>
            {services.map((s) => (
              <Reveal key={s.n}>
                <div className="brut-row brut-row-light group cursor-pointer px-2 sm:px-5 py-8 sm:py-10 grid grid-cols-12 gap-x-4 gap-y-5 items-center">
                  <span className="col-span-2 md:col-span-1 ghost-num text-[clamp(30px,4.5vw,58px)]">
                    {s.n}
                  </span>

                  <div className="col-span-10 md:col-span-6">
                    <h3 className="display display-sm">{s.title}</h3>
                    <p className="mt-3 font-sans text-[14px] sm:text-[15px] opacity-60">{s.desc}</p>
                  </div>

                  <div className="col-span-12 md:col-span-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="hidden md:block md:col-span-1 text-right row-arrow display text-[28px]">
                    →
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 02 · ORIGIN (GOLD BLOCK) ═══════════ */}
      <section className="bg-[color:var(--gold)] text-[color:var(--ink)] border-y-2 border-[color:var(--ink)]">
        <div className="container-wide py-20 sm:py-28">
          <Reveal>
            <p className="label">02 — Our Origin</p>
            <blockquote className="mt-8 display text-[clamp(28px,5.4vw,82px)] max-w-[15ch]">
              We transform data into intelligent solutions.
            </blockquote>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-2 gap-px bg-[color:var(--ink)] border-2 border-[color:var(--ink)]">
            <Reveal>
              <div className="bg-[color:var(--gold)] p-8 sm:p-10 h-full">
                <p className="label">Mission</p>
                <p className="mt-5 font-sans text-[16px] sm:text-[17px] leading-[1.6]">
                  To advance research-led innovation by embedding scientific method into every
                  product we ship and every institution we partner with.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-[color:var(--gold)] p-8 sm:p-10 h-full">
                <p className="label">Vision</p>
                <p className="mt-5 font-sans text-[16px] sm:text-[17px] leading-[1.6]">
                  A future where every decision — academic, industrial, social — is informed by
                  intelligence systems we can trust and inspect.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ 03 · TRAINING ═══════════ */}
      <section className="bg-[color:var(--ink)] text-white py-20 sm:py-28">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="label text-[color:var(--cyan)]">03 — Training</p>
            <h2 className="mt-6 display display-md">
              Knowledge
              <br />
              into capability.
            </h2>
            <p className="mt-7 font-sans text-[16px] leading-[1.6] text-white/70">
              We design and deliver corporate workshops, faculty development programs, and
              certifications grounded in current research and shipped to production teams.
            </p>

            <ul className="mt-9">
              {[
                "Live, applied, project-based curriculum",
                "Designed and taught by practicing researchers",
                "Outcomes measured against real organizational KPIs",
                "Cohort sizes that allow real mentorship",
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-4 py-3.5 border-t border-white/20 last:border-b font-sans text-[14px] sm:text-[15px] text-white/85"
                >
                  <span className="text-[color:var(--cyan)]">◆</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <Link to="/contact" className="mt-9 btn btn-cyan">
              Discuss a Program
            </Link>
          </Reveal>

          <div className="lg:col-span-7">
            {programs.map((c, i) => (
              <Reveal key={c.name}>
                <div className="brut-row brut-row-dark group px-1 sm:px-4 py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  <span className="label text-[10px] opacity-45 sm:pt-2 shrink-0">0{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="display text-[clamp(20px,2.4vw,32px)]">{c.name}</h3>
                    <p className="mt-3 font-sans text-[14px] sm:text-[15px] opacity-70 max-w-[46ch]">
                      {c.desc}
                    </p>
                  </div>
                  <span className="label text-[10px] opacity-45 sm:pt-2 sm:text-right shrink-0 sm:max-w-[120px]">
                    {c.meta}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 04 · RESEARCH ═══════════ */}
      <section className="bg-[color:var(--off-white)] text-[color:var(--ink)] border-t-2 border-[color:var(--ink)] py-20 sm:py-28 grid-lines">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal className="lg:col-span-6">
            <p className="label text-[color:var(--cyan)]">04 — Research & Innovation</p>
            <h2 className="mt-6 display display-md">
              Academic depth,
              <br />
              industry application.
            </h2>
            <div className="mt-8 space-y-5 font-sans text-[15px] sm:text-[16px] leading-[1.65] text-[color:var(--text-body)] max-w-[52ch]">
              <p>
                Our research consulting practice partners with universities, public institutions,
                and R&D divisions of industry to take problems from question to publishable,
                deployable result.
              </p>
              <p>
                We bring scientific method, statistical honesty, and production-engineering
                discipline to the same table — a combination that's rarer than it should be.
              </p>
              <p>
                Every engagement ends with shipped artifacts: a paper, a reproducible codebase, a
                system in production, or all three.
              </p>
            </div>
            <Link to="/contact" className="mt-9 btn btn-outline-ink">
              Learn More →
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-6">
            <div className="relative h-[340px] sm:h-[440px] bg-[color:var(--ink)] border-2 border-[color:var(--ink)] overflow-hidden">
              <Canvas3D variant="wave" className="absolute inset-0" trackPointer={false} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[color:var(--ink)] via-transparent to-transparent" />
              <p className="absolute top-5 left-5 label text-[10px] text-[color:var(--cyan)]">
                Live Surface
              </p>
              <p className="absolute bottom-5 left-5 right-5 display text-[clamp(18px,2.2vw,28px)] text-white">
                Every dataset has a shape.
              </p>
            </div>

            <div className="mt-px grid grid-cols-3 border-2 border-t-0 border-[color:var(--ink)]">
              {[
                { k: "12", v: "Publications" },
                { k: "08", v: "Active Studies" },
                { k: "20+", v: "Researchers" },
              ].map((s, i) => (
                <div
                  key={s.v}
                  className={`bg-white py-6 px-4 text-center ${i < 2 ? "border-r-2 border-[color:var(--ink)]" : ""}`}
                >
                  <p className="display text-[clamp(22px,3vw,36px)]">{s.k}</p>
                  <p className="mt-2 label text-[9px] text-[color:var(--text-muted)]">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="bg-[color:var(--cyan)] text-[color:var(--ink)] border-t-2 border-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="label">Get in Touch</p>
            <h2 className="mt-7 display text-[clamp(34px,8vw,124px)]">
              Let's build
              <br />
              something
              <br />
              meaningful.
            </h2>

            <div className="mt-12 grid lg:grid-cols-12 gap-8 items-end">
              <p className="lg:col-span-5 font-sans text-[16px] sm:text-[17px] leading-[1.6]">
                Tell us about your institution, your data, or the question you're trying to answer.
                We'll set up a free consultation.
              </p>
              <div className="lg:col-span-7 lg:justify-self-end">
                <Link to="/contact" className="btn btn-ink btn-lg">
                  Book a Free Consultation →
                </Link>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t-2 border-[color:var(--ink)] flex flex-wrap gap-x-10 gap-y-3 font-sans text-[15px] sm:text-[16px]">
              <a href="mailto:datasmithlabs@gmail.com" className="link-cyan">
                datasmithlabs@gmail.com
              </a>
              <a href="tel:+917017283915" className="link-cyan">
                +91 7017 283 915
              </a>
              <a
                href="https://www.linkedin.com/company/datasmith-labs"
                target="_blank"
                rel="noreferrer"
                className="link-cyan"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
