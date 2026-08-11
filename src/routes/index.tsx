import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText, CountUp } from "../components/site/Reveal";
import { SectionRail } from "../components/site/SectionRail";
import { Canvas3D } from "../components/three/Canvas3D";
import { ArrowRight, Ear, FlaskConical, Rocket, Search, Target } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DataSmith Research Labs — Into Discovery. Into Impact." },
      {
        name: "description",
        content:
          "We build intelligent systems and deliver research-driven solutions that solve real problems and create lasting value.",
      },
      { property: "og:title", content: "DataSmith Research Labs" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://datasmithlabs.com" },
    ],
  }),
  component: Index,
});

const solutions = [
  {
    title: "AI & Machine Learning",
    desc: "Intelligent systems that learn, adapt and scale.",
    tags: ["Neural Networks", "MLOps"],
  },
  {
    title: "Data Science & Analytics",
    desc: "Transforming data into actionable insights.",
    tags: ["Forecasting", "Dashboards"],
  },
  {
    title: "Research & Innovation",
    desc: "Solving complex problems through rigorous research.",
    tags: ["Applied Research", "Publications"],
  },
  {
    title: "Training & Workshops",
    desc: "Building capability through knowledge and hands-on experience.",
    tags: ["Certifications", "Faculty Dev"],
  },
];

const stats = [
  { n: 40, suffix: "+", label: "Projects Delivered" },
  { n: 25, suffix: "+", label: "Institutional Partners" },
  { n: 15, suffix: "+", label: "Researchers & Data Scientists" },
  { n: 6, suffix: "+", label: "Years of Collective Experience" },
];

const approach = [
  {
    icon: Ear,
    title: "Understand",
    desc: "We listen, learn and define the right questions.",
  },
  {
    icon: Search,
    title: "Analyze",
    desc: "We dive deep into data to uncover patterns.",
  },
  {
    icon: FlaskConical,
    title: "Innovate",
    desc: "We design intelligent solutions tailored to your needs.",
  },
  {
    icon: Rocket,
    title: "Deliver",
    desc: "We build, test and deploy systems that work.",
  },
  {
    icon: Target,
    title: "Impact",
    desc: "We measure results and drive continuous improvement.",
  },
];

function Index() {
  return (
    <>
      {/* ═══════ 01 · HERO ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[color:var(--void)]">
        <div className="absolute inset-0 grid-fade opacity-40 pointer-events-none" />
        <div className="glow glow-blue w-[560px] h-[560px] top-[8%] right-[4%] opacity-45" />
        {/* Globe holds the right half on desktop; full-bleed behind the copy on mobile. */}
        <Canvas3D
          variant="globe"
          className="absolute inset-y-0 right-0 w-full lg:w-[64%] opacity-70 lg:opacity-100"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[color:var(--void)] to-transparent" />
        <SectionRail num="01" label="Welcome" />

        <div className="container-wide relative z-10 pt-28 pb-20">
          <div className="stagger max-w-[620px]">
            <p className="eyebrow">We Transform Data</p>
            <h1 className="mt-6 h1">
              Into Discovery.
              <br />
              Into Impact.
            </h1>
            <p className="mt-7 body-text text-[16px] max-w-[440px]">
              We build intelligent systems and deliver research-driven solutions that solve real
              problems and create lasting value.
            </p>
            <div className="mt-9">
              <Link to="/products" className="btn btn-primary">
                Explore Our Work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <span className="hidden lg:block absolute right-8 bottom-10 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--text-muted)] [writing-mode:vertical-rl] float-chevron">
          Scroll
        </span>
      </section>

      {/* ═══════ 02 · ORIGIN ═══════ */}
      <section className="section relative min-h-[80vh] flex items-center bg-[color:var(--ink)]">
        <Canvas3D variant="terrain" className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--ink)] via-[color:var(--ink)]/60 to-transparent" />
        <SectionRail num="02" label="Origin" />

        <div className="container-wide relative z-10 py-24">
          <Reveal className="max-w-[520px]" direction="left">
            <p className="eyebrow">Our Origin</p>
            <h2 className="mt-5 h2">
              <SplitText text="Every dataset has a story." />
            </h2>
            <p className="mt-6 body-text text-[15px] max-w-[400px]">
              We help you uncover it. From raw data to reliable insights, we turn complexity into
              clarity using the power of AI, statistics, and domain expertise.
            </p>
            <Link to="/about" className="mt-8 btn btn-outline">
              Our Mission <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* Stage labels riding the terrain, as in the reference. */}
        <RevealGroup
          className="hidden lg:block absolute inset-0 z-10 pointer-events-none"
          step={180}
        >
          {[
            { label: "Raw Data", left: "38%", top: "62%" },
            { label: "Analysis", left: "58%", top: "44%" },
            { label: "Insight", left: "78%", top: "32%" },
          ].map((m) => (
            <div key={m.label} className="absolute" style={{ left: m.left, top: m.top }}>
              <span className="font-sans text-[13px] text-white/85">{m.label}</span>
              <span className="block mt-2 w-4 h-4 rounded-full border border-[color:var(--blue-bright)]/60 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[color:var(--blue-bright)]" />
              </span>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* ═══════ 03 · SOLUTIONS ═══════ */}
      <section className="section relative bg-[color:var(--void)] py-24">
        <div className="glow glow-blue w-[600px] h-[600px] -top-40 left-1/3 opacity-25" />
        <div className="absolute inset-0 grid-fade opacity-30 pointer-events-none" />
        <SectionRail num="03" label="What We Do" />

        <div className="container-wide relative z-10">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Our Solutions</p>
                <h2 className="mt-5 h2">
                  <SplitText text="Solutions built on deep expertise." />
                </h2>
              </div>
              <p className="lg:col-span-5 body-text text-[14px] max-w-[330px]">
                We combine academic rigor with real-world application to deliver solutions that
                matter.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5" step={110}>
            {solutions.map((s, i) => (
              <div key={s.title} className="group flex flex-col h-full">
                {/* Wireframe artifact floating above each card. */}
                <div className="relative h-[168px] shrink-0 -mb-4">
                  <Canvas3D
                    variant="artifact"
                    option={i}
                    quality={0.55}
                    className="absolute inset-0"
                  />
                </div>

                <div className="card product-card p-6 flex-1 flex flex-col">
                  <h3 className="h3">{s.title}</h3>
                  <p className="mt-3 body-text text-[13.5px] flex-1">{s.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/products"
                    className="mt-6 inline-flex items-center gap-2 text-[color:var(--blue-bright)]"
                    aria-label={`More about ${s.title}`}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 04 · IMPACT ═══════ */}
      <section className="section relative bg-[color:var(--ink)] py-24 overflow-hidden">
        <Canvas3D variant="flowfield" className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[color:var(--ink)] via-transparent to-[color:var(--ink)]" />
        <SectionRail num="04" label="Impact" />

        <div className="container-wide relative z-10">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Our Impact</p>
                <h2 className="mt-5 h2">
                  <SplitText text="Numbers that reflect impact." />
                </h2>
              </div>
              <p className="lg:col-span-5 body-text text-[14px] max-w-[330px]">
                The outcomes of our work speak for the trust our partners place in us.
              </p>
            </div>
          </Reveal>

          <RevealGroup
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6"
            step={110}
            direction="scale"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-medium text-[clamp(34px,4vw,52px)] tracking-[-0.04em] text-white leading-none">
                  <CountUp to={s.n} suffix={s.suffix} />
                </p>
                <p className="mt-3 font-sans text-[12.5px] leading-snug text-[color:var(--text-muted)] max-w-[150px] mx-auto">
                  {s.label}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 05 · APPROACH ═══════ */}
      <section className="section relative bg-[color:var(--void)] py-24">
        <div className="glow glow-cyan w-[520px] h-[520px] top-10 right-0 opacity-30" />
        <SectionRail num="05" label="Approach" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-4" direction="left">
              <p className="eyebrow">Our Approach</p>
              <h2 className="mt-5 h2">
                <SplitText text="A journey from question to impact." />
              </h2>
            </Reveal>

            <div className="lg:col-span-8 relative">
              {/* Connector behind the nodes. */}
              <div className="hidden md:block absolute top-[27px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[color:var(--hairline-strong)] to-[color:var(--blue)]" />

              <RevealGroup className="grid grid-cols-2 md:grid-cols-5 gap-6" step={110}>
                {approach.map((a, i) => {
                  const Icon = a.icon;
                  const isLast = i === approach.length - 1;
                  return (
                    <div key={a.title} className="step-group relative text-center">
                      <div className={`step-node mx-auto ${isLast ? "step-node-active" : ""}`}>
                        <Icon
                          className={`w-5 h-5 ${isLast ? "text-white" : "text-[color:var(--blue-bright)]"}`}
                        />
                      </div>
                      <h3 className="mt-5 font-display font-medium text-[14px] tracking-[-0.02em] text-white">
                        {a.title}
                      </h3>
                      <p className="mt-2 font-sans text-[11.5px] leading-[1.55] text-[color:var(--text-muted)]">
                        {a.desc}
                      </p>
                    </div>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 06 · CTA ═══════ */}
      <section className="section relative min-h-[78vh] flex items-center bg-[color:var(--void)] overflow-hidden">
        <Canvas3D variant="tunnel" className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/72 to-transparent" />
        <SectionRail num="06" label="Lets Talk" />

        <div className="container-wide relative z-10 py-24">
          <Reveal className="max-w-[520px]" direction="left">
            <p className="eyebrow">Ready to Build Impact?</p>
            <h2 className="mt-5 h2">
              <SplitText text="Let's build something extraordinary together." />
            </h2>
            <p className="mt-6 body-text text-[15px] max-w-[380px]">
              Whether you have a challenge, an idea or a vision — we're here to help you turn it
              into impact.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="btn btn-outline">
                Browse Our Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
