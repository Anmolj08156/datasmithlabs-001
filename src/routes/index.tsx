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
        content: "Datasmith Labs provides AI solutions, enterprise automation, research services and intelligent digital products.",
      },
      { property: "og:title", content: "Datasmith Labs" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://datasmithlabs.com" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600" },
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
  "IIT Delhi", "IIM Bangalore", "ISRO", "TIFR", "Nature Index", "NeurIPS Reviewers",
  "ACM Members", "IEEE", "Springer", "Elsevier",
];

function Index() {
  return (
    <>
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[color:var(--ink)]">
        <Canvas3D variant="constellation" className="absolute inset-0" />
        {/* Scrim: opaque enough on the left for the headline, open on the right
            so the constellation stays the visual subject. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(11,21,38,0.94) 32%, rgba(11,21,38,0.28) 66%, rgba(11,21,38,0.45) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[color:var(--ink)] to-transparent" />

        {/* w-full: as a flex item this div would otherwise shrink to its content
            width, pulling the hero copy out of line with the nav and the
            sections below it. */}
        <div className="container-wide relative z-10 w-full pt-32 sm:pt-40 pb-20 sm:pb-32">
          <div className="stagger max-w-[640px]">
            <p className="eyebrow">Research · Intelligence · Innovation</p>
            <h1 className="mt-6 text-white font-serif italic font-light leading-[1.05] text-[clamp(36px,7vw,72px)]">
              Transforming Data
              <br />
              into <span className="not-italic font-normal">Discovery</span>
            </h1>
            <p className="mt-7 text-[16px] sm:text-[17px] leading-[1.6] text-white/70 max-w-[500px]">
              We don't just analyze data — we transform it into intelligent systems,
              meaningful research, and sustainable growth for institutions that take
              their work seriously.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link to="/contact" className="btn btn-white w-full sm:w-auto text-center">
                Book a Consultation
              </Link>
              <a href="#services" className="btn btn-ghost-light w-full sm:w-auto text-center justify-center">
                Explore Services →
              </a>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 overflow-hidden z-10">
          <div className="marquee-track">
            {[...trustLogos, ...trustLogos].map((l, i) => (
              <span
                key={i}
                className="font-mono text-[12px] text-white/45 px-6 whitespace-nowrap"
              >
                {l} <span className="px-2">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Chevron */}
        <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-10 float-chevron text-white/60">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* ───────────────── 01 SERVICES ───────────────── */}
      <section id="services" className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">01 — What We Do</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,4.2vw,44px)] leading-[1.15] max-w-[720px]">
              A portfolio of services for institutions that demand both rigor
              and outcomes.
            </h2>
          </Reveal>

          <div className="mt-12 sm:mt-16 border-t border-[color:var(--border)]">
            {services.map((s) => (
              <Reveal key={s.n}>
                <div className="service-row grid grid-cols-12 items-start md:items-center gap-x-4 gap-y-5 py-8 sm:py-9 px-2 sm:px-4 border-b border-[color:var(--border)] cursor-pointer">
                  <div className="col-span-2 md:col-span-1 font-mono text-[13px] text-[color:var(--text-muted)] pt-1 md:pt-0">
                    {s.n}
                  </div>
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="font-serif text-[clamp(20px,3vw,36px)] text-[color:var(--ink)] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[14px] sm:text-[15px] text-[color:var(--text-muted)]">{s.desc}</p>
                  </div>
                  <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-auto flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                  <div className="hidden md:block md:col-span-1 text-right arrow text-[color:var(--ink)] text-2xl">
                    →
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── 02 BRAND STORY (DARK) ───────────────── */}
      <section className="bg-[color:var(--navy)] py-20 sm:py-[120px] text-white">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow-muted">02 — Our Origin</p>
            <blockquote className="mt-7 font-serif italic font-light text-[clamp(24px,3.6vw,48px)] leading-[1.15]">
              "We don't just analyze data — we transform it into intelligent
              solutions, meaningful discoveries, and sustainable growth."
            </blockquote>

            <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-[color:var(--border-dark)] grid sm:grid-cols-2 gap-8 sm:gap-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Mission</p>
                <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.65] text-white/65">
                  To advance research-led innovation by embedding scientific
                  method into every product we ship and every institution we
                  partner with.
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Vision</p>
                <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.65] text-white/65">
                  A future where every decision — academic, industrial, social
                  — is informed by intelligence systems we can trust and
                  inspect.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="relative h-full min-h-[300px] sm:min-h-[420px] rounded-lg overflow-hidden bg-[color:var(--ink)] border border-[color:var(--border-dark)]">
              <Canvas3D variant="wave" className="absolute inset-0" trackPointer={false} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[color:var(--ink)] via-transparent to-[color:var(--ink)]/40" />
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--cyan)]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--cyan)] mr-2 align-middle animate-pulse" />
                  Live surface
                </p>
                <p className="mt-2 font-serif italic text-[18px] text-white/85 leading-snug">
                  Every dataset has a shape. We find it.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── STATS ───────────────── */}
      <section className="bg-[color:var(--off-white)] border-y border-[color:var(--border)]">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4">
          {[
            { n: 10, suffix: "+", label: "Ongoing Projects" },
            { n: 15, suffix: "+", label: "Partner Institutions" },
            { n: 2, suffix: "+", label: "Years of Practice" },
            { n: 4, suffix: "", label: "Core Service Areas" },
          ].map((s, index) => (
            <div 
              key={s.label} 
              className={`py-10 md:py-14 px-4 sm:px-6 text-center border-[color:var(--border)]
                ${index < 2 ? "border-b" : ""} 
                ${index % 2 === 0 ? "border-r" : ""} 
                md:border-b-0 md:border-r md:last:border-r-0`}
            >
              <p className="font-serif italic text-[clamp(32px,5vw,64px)] text-[color:var(--ink)] leading-none">
                <CountUp to={s.n} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-sans text-[12px] sm:text-[13px] text-[color:var(--text-muted)] tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── 03 TRAINING (DARK PHOTO) ───────────────── */}
      <section className="relative py-20 sm:py-[120px] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400')`,
          }}
        />
        <div className="absolute inset-0 bg-[rgba(11,21,38,0.78)]" />

        <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <Reveal>
            <p className="eyebrow-muted">03 — Training</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,4.2vw,52px)] leading-[1.1] text-white">
              Programs that turn knowledge into capability.
            </h2>
            <p className="mt-6 text-[16px] sm:text-[17px] text-white/70 max-w-[500px]">
              We design and deliver corporate workshops, faculty development
              programs, and certifications grounded in current research and
              shipped to production teams.
            </p>

            <ul className="mt-8 space-y-3 text-white/80">
              {[
                "Live, applied, project-based curriculum",
                "Designed and taught by practicing researchers",
                "Outcomes measured against real organizational KPIs",
                "Cohort sizes that allow real mentorship",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-[14px] sm:text-[15px]">
                  <span className="text-[color:var(--cyan)]">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link to="/contact" className="btn btn-white w-full sm:w-auto text-center justify-center">
                Discuss a Program
              </Link>
            </div>
          </Reveal>

          <Reveal className="space-y-5">
            {[
              { name: "Corporate Workshops", desc: "Intensive on-site or virtual sessions tailored to your team's data maturity.", meta: "2–5 DAYS · ON-SITE / REMOTE" },
              { name: "Faculty Development Programs", desc: "Multi-week programs equipping academic faculty with applied AI methodology.", meta: "4 WEEKS · COHORT" },
              { name: "Certification Courses", desc: "Structured certifications in AI, ML, and applied data science.", meta: "8–12 WEEKS · CERTIFIED" },
            ].map((c) => (
              <div key={c.name} className="bg-white text-[color:var(--ink)] rounded-lg p-6 sm:p-7">
                <h3 className="font-serif text-[18px] sm:text-[20px] leading-tight">{c.name}</h3>
                <p className="mt-2 text-[13px] sm:text-[14px] text-[color:var(--text-body)]">{c.desc}</p>
                <p className="mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] text-[color:var(--text-muted)]">
                  {c.meta}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ───────────────── 04 RESEARCH & INNOVATION ───────────────── */}
      <section className="bg-white py-20 sm:py-28 overflow-hidden">
        <div className="container-wide grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <p className="eyebrow">04 — Research & Innovation</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,4.2vw,48px)] leading-[1.15]">
              Where academic depth meets industry application.
            </h2>
            <div className="mt-7 space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-[color:var(--text-body)]">
              <p>
                Our research consulting practice partners with universities,
                public institutions, and R&D divisions of industry to take
                problems from question to publishable, deployable result.
              </p>
              <p>
                We bring scientific method, statistical honesty, and
                production-engineering discipline to the same table — a
                combination that's rarer than it should be.
              </p>
              <p>
                Every engagement ends with shipped artifacts: a paper, a
                reproducible codebase, a system in production, or all three.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/contact" className="font-sans text-[15px] font-semibold text-[color:var(--ink)] hover:text-[color:var(--cyan)] transition-colors">
                Learn More →
              </Link>
            </div>
          </Reveal>

          <Reveal className="relative">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
              alt="Circuit board macro detail"
              className="rounded-xl w-full object-cover aspect-[4/3] lg:scale-[1.05] lg:translate-x-6"
            />
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { k: "12", v: "Publications" },
                { k: "08", v: "Active Studies" },
                { k: "20+", v: "Researchers" },
              ].map((s) => (
                <div key={s.v} className="border-t border-[color:var(--border)] pt-4">
                  <p className="font-mono text-[18px] sm:text-[20px] text-[color:var(--ink)]">{s.k}</p>
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-muted)] mt-1">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── CONTACT (HOME) ───────────────── */}
      <section className="bg-[color:var(--off-white)] py-20 sm:py-28">
        <div className="container-wide max-w-[820px] text-center">
          <Reveal>
            <p className="eyebrow">Get in Touch</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,4.2vw,52px)] leading-[1.15]">
              Let's build something meaningful.
            </h2>
            <p className="mt-6 text-[15px] sm:text-[17px] text-[color:var(--text-body)]">
              Tell us about your institution, your data, or the question
              you're trying to answer. We'll set up a free consultation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-8 sm:gap-x-12 gap-y-4 text-[15px] sm:text-[16px]">
              <a href="mailto:datasmithlabs@gmail.com" className="link-cyan">datasmithlabs@gmail.com</a>
              <span className="hidden sm:inline text-black/20">·</span>
              <a href="tel:+917017283915" className="link-cyan">+91 7017 283 915</a>
              <span className="hidden sm:inline text-black/20">·</span>
              <a href="https://www.linkedin.com/company/datasmith-labs" target="_blank" rel="noreferrer" className="link-cyan">LinkedIn</a>
            </div>

            <div className="mt-10">
              <Link to="/contact" className="btn btn-ink btn-lg w-full sm:w-auto text-center justify-center">
                Book a Free Consultation →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
