import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText, CountUp, TiltCard } from "../components/site/Reveal";
import { Canvas3D } from "../components/three/Canvas3D";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  BarChart3,
  FlaskConical,
  GraduationCap,
  Check,
} from "lucide-react";

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
    icon: Brain,
    title: "AI & Machine Learning Solutions",
    desc: "Custom intelligent systems built for production.",
    tags: ["Machine Learning", "Neural Networks", "MLOps"],
  },
  {
    n: "02",
    icon: BarChart3,
    title: "Data Science & Business Intelligence",
    desc: "From raw data to decisions that drive growth.",
    tags: ["Analytics", "Forecasting", "Dashboards"],
  },
  {
    n: "03",
    icon: FlaskConical,
    title: "Research Consulting & Innovation",
    desc: "Academic rigor applied to industry problems.",
    tags: ["Applied Research", "Publications", "R&D"],
  },
  {
    n: "04",
    icon: GraduationCap,
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
  { n: 10, suffix: "+", label: "Ongoing projects" },
  { n: 15, suffix: "+", label: "Partner institutions" },
  { n: 2, suffix: "+", label: "Years of practice" },
  { n: 4, suffix: "", label: "Core service areas" },
];

const programs = [
  {
    name: "Corporate Workshops",
    desc: "Intensive on-site or virtual sessions tailored to your team's data maturity.",
    meta: "2–5 days · On-site / Remote",
  },
  {
    name: "Faculty Development Programs",
    desc: "Multi-week programs equipping academic faculty with applied AI methodology.",
    meta: "4 weeks · Cohort",
  },
  {
    name: "Certification Courses",
    desc: "Structured certifications in AI, ML, and applied data science.",
    meta: "8–12 weeks · Certified",
  },
];

function Index() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden">
        <Canvas3D variant="constellation" className="absolute inset-0 opacity-70" />
        <div className="aurora opacity-60" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[color:var(--ink)]/60 via-transparent to-[color:var(--ink)]" />

        <div className="container-wide relative z-10 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="max-w-[760px]">
            <div className="stagger">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--cyan)] pulse-dot" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/75">
                  Research · Intelligence · Innovation
                </span>
              </span>
            </div>

            <h1 className="mt-7 h1">
              <SplitText text="Transforming data into" immediate startDelay={150} />{" "}
              <SplitText
                text="discovery"
                innerClassName="text-gradient"
                immediate
                startDelay={520}
              />
            </h1>

            <div className="stagger mt-7">
              <p className="font-sans text-[17px] leading-[1.6] text-white/65 max-w-[560px]">
                We don't just analyze data — we transform it into intelligent systems, meaningful
                research, and sustainable growth for institutions that take their work seriously.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-cyan btn-lg">
                  Book a consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#services" className="btn btn-outline-light btn-lg">
                  Explore services
                </a>
              </div>
            </div>
          </div>

          <RevealGroup
            className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4"
            step={90}
            direction="scale"
          >
            {stats.map((s) => (
              <div key={s.label} className="card-dark p-5 sm:p-6 hover-lift">
                <p className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] tracking-[-0.03em] text-white leading-none">
                  <CountUp to={s.n} suffix={s.suffix} />
                </p>
                <p className="mt-2.5 font-sans text-[13px] text-white/55">{s.label}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── TRUST MARQUEE ───────── */}
      <section className="bg-white border-b border-[color:var(--border)] py-10 overflow-hidden">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)] mb-6">
          Trusted across research and industry
        </p>
        <div className="marquee-wrap relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="marquee-track marquee-fast gap-3">
            {[...trustLogos, ...trustLogos].map((l, i) => (
              <span
                key={i}
                className="shrink-0 px-5 py-2.5 rounded-full border border-[color:var(--border)] bg-[color:var(--off-white)] font-sans text-[14px] font-medium text-[color:var(--text-body)] whitespace-nowrap hover:border-[color:var(--cyan)] hover:text-[color:var(--ink)] transition-colors"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SERVICES ───────── */}
      <section id="services" className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-4 h2 max-w-[620px]">
              <SplitText text="A portfolio for institutions that demand rigor and outcomes." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid md:grid-cols-2 gap-5" step={90}>
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <TiltCard key={s.n} className="h-full">
                  <div className="card p-7 sm:p-8 h-full product-card group">
                    <div className="flex items-start justify-between">
                      <span className="w-11 h-11 rounded-xl bg-[color:var(--off-white)] border border-[color:var(--border)] flex items-center justify-center text-[color:var(--cyan)] transition-colors group-hover:bg-[color:var(--ink)]">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="font-mono text-[11px] text-[color:var(--text-muted)]">
                        {s.n}
                      </span>
                    </div>

                    <h3 className="mt-6 h3">{s.title}</h3>
                    <p className="mt-2.5 font-sans text-[15px] leading-[1.6] text-[color:var(--text-body)]">
                      {s.desc}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── ORIGIN ───────── */}
      <section className="relative bg-[color:var(--off-white)] border-y border-[color:var(--border)] py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
        <div className="container-wide relative grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-7" direction="left">
            <p className="eyebrow">Our origin</p>
            <blockquote className="mt-5 font-display font-semibold text-[clamp(22px,2.6vw,34px)] leading-[1.25] tracking-[-0.025em] text-[color:var(--ink)] max-w-[620px]">
              "We don't just analyze data — we transform it into intelligent solutions, meaningful
              discoveries, and sustainable growth."
            </blockquote>

            <RevealGroup className="mt-10 grid sm:grid-cols-2 gap-5" step={110}>
              <div className="card p-6 hover-lift">
                <p className="label text-[10px] text-[color:var(--cyan)]">Mission</p>
                <p className="mt-3.5 font-sans text-[15px] leading-[1.65] text-[color:var(--text-body)]">
                  To advance research-led innovation by embedding scientific method into every
                  product we ship and every institution we partner with.
                </p>
              </div>
              <div className="card p-6 hover-lift">
                <p className="label text-[10px] text-[color:var(--cyan)]">Vision</p>
                <p className="mt-3.5 font-sans text-[15px] leading-[1.65] text-[color:var(--text-body)]">
                  A future where every decision — academic, industrial, social — is informed by
                  intelligence systems we can trust and inspect.
                </p>
              </div>
            </RevealGroup>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="right">
            <div className="relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-[color:var(--ink)] border border-[color:var(--border)] shadow-[var(--shadow-lift)]">
              <Canvas3D variant="wave" className="absolute inset-0" trackPointer={false} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[color:var(--ink)] via-transparent to-transparent" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--cyan)] pulse-dot" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                  Live surface
                </span>
              </div>
              <p className="absolute bottom-5 left-5 right-5 font-display font-semibold text-[18px] tracking-[-0.02em] text-white">
                Every dataset has a shape.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── TRAINING ───────── */}
      <section className="relative bg-[color:var(--ink)] text-white py-20 sm:py-28 overflow-hidden">
        <div className="aurora opacity-40" />
        <div className="container-wide relative grid lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-5" direction="left">
            <p className="eyebrow">Training</p>
            <h2 className="mt-4 h2">
              <SplitText text="Programs that turn knowledge into capability." />
            </h2>
            <p className="mt-6 font-sans text-[16px] leading-[1.65] text-white/65">
              We design and deliver corporate workshops, faculty development programs, and
              certifications grounded in current research and shipped to production teams.
            </p>

            <RevealGroup className="mt-8 space-y-3" step={80}>
              {[
                "Live, applied, project-based curriculum",
                "Designed and taught by practicing researchers",
                "Outcomes measured against real organizational KPIs",
                "Cohort sizes that allow real mentorship",
              ].map((t) => (
                <div key={t} className="flex gap-3 items-start">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[color:var(--cyan)]/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[color:var(--cyan)]" />
                  </span>
                  <span className="font-sans text-[15px] text-white/80">{t}</span>
                </div>
              ))}
            </RevealGroup>

            <Link to="/contact" className="mt-9 btn btn-cyan">
              Discuss a program <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <RevealGroup className="lg:col-span-7 space-y-4" step={110} direction="right">
            {programs.map((c) => (
              <div
                key={c.name}
                className="row-item row-item-dark card-dark p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 group cursor-default"
              >
                <div className="flex-1">
                  <h3 className="h3">{c.name}</h3>
                  <p className="mt-2 font-sans text-[14px] leading-[1.6] text-white/60 max-w-[46ch]">
                    {c.desc}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 sm:text-right sm:max-w-[110px]">
                    {c.meta}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-white/30 row-arrow group-hover:text-[color:var(--cyan)] transition-colors" />
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── RESEARCH ───────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-6" direction="left">
            <p className="eyebrow">Research & innovation</p>
            <h2 className="mt-4 h2">
              <SplitText text="Where academic depth meets industry application." />
            </h2>
            <div className="mt-7 space-y-4 font-sans text-[15px] sm:text-[16px] leading-[1.7] text-[color:var(--text-body)] max-w-[54ch]">
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
            <Link to="/contact" className="mt-8 btn btn-outline-ink">
              Learn more <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <RevealGroup
            className="lg:col-span-6 grid sm:grid-cols-3 gap-4"
            step={100}
            direction="scale"
          >
            {[
              { k: "12", v: "Publications" },
              { k: "08", v: "Active studies" },
              { k: "20+", v: "Researchers" },
            ].map((s) => (
              <div key={s.v} className="card p-6 text-center hover-lift">
                <p className="font-display font-semibold text-[32px] tracking-[-0.03em] text-[color:var(--ink)]">
                  {s.k}
                </p>
                <p className="mt-2 font-sans text-[13px] text-[color:var(--text-muted)]">{s.v}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-[color:var(--off-white)] border-t border-[color:var(--border)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal direction="scale">
            <div className="relative rounded-3xl overflow-hidden bg-[color:var(--ink)] text-white px-7 py-14 sm:px-14 sm:py-20 text-center">
              <div className="aurora opacity-70" />
              <div className="relative">
                <p className="eyebrow">Get in touch</p>
                <h2 className="mt-4 h2 max-w-[620px] mx-auto">
                  <SplitText text="Let's build something meaningful." />
                </h2>
                <p className="mt-5 font-sans text-[16px] leading-[1.6] text-white/65 max-w-[520px] mx-auto">
                  Tell us about your institution, your data, or the question you're trying to
                  answer. We'll set up a free consultation.
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Link to="/contact" className="btn btn-cyan btn-lg">
                    Book a free consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="mailto:datasmithlabs@gmail.com" className="btn btn-outline-light btn-lg">
                    Email us
                  </a>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-x-8 gap-y-2 font-sans text-[14px] text-white/60">
                  <a href="mailto:datasmithlabs@gmail.com" className="link-underline">
                    datasmithlabs@gmail.com
                  </a>
                  <a href="tel:+917017283915" className="link-underline">
                    +91 7017 283 915
                  </a>
                  <a
                    href="https://www.linkedin.com/company/datasmith-labs"
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
