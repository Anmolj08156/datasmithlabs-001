import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { Canvas3D } from "../components/three/Canvas3D";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Partnerships — DataSmith Research Labs" },
      {
        name: "description",
        content:
          "The organisations we build with — Unstop as our event partner, and AWS and Google Cloud as our cloud and AI partners.",
      },
      { property: "og:title", content: "Partnerships — DataSmith Research Labs" },
      {
        property: "og:description",
        content:
          "Event, cloud, and AI partners powering research-led work at DataSmith Research Labs.",
      },
    ],
  }),
  component: PartnershipsPage,
});

const partners = [
  {
    n: "01",
    id: "unstop",
    name: "Unstop",
    logo: "/partners/unstop.svg",
    logoClass: "h-10 sm:h-12",
    category: "Event Partner",
    tagline: "Where our programs meet their audience.",
    desc: "Unstop is our event partner for hackathons, challenges and workshops — the platform that carries our programs to learners across campuses in India and handles discovery, registration and participation end to end.",
    meta: ["Hackathons", "Challenges", "Campus Programs"],
    href: "https://unstop.com",
  },
  {
    n: "02",
    id: "aws",
    name: "Amazon Web Services",
    logo: "/partners/aws.svg",
    logoClass: "h-14 sm:h-16",
    category: "Cloud Partner",
    tagline: "Infrastructure for research at scale.",
    desc: "AWS is our cloud partner for the heavy end of the work — GPU compute for model development, storage for research datasets, and the managed services that keep delivered systems reliable in production.",
    meta: ["Compute", "Storage", "MLOps"],
    href: "https://aws.amazon.com",
  },
  {
    n: "03",
    id: "gcp",
    name: "Google Cloud",
    logo: "/partners/gcp.svg",
    logoClass: "h-7 sm:h-9",
    category: "Cloud & AI Partner",
    tagline: "Applied AI and large-scale analytics.",
    desc: "Google Cloud supports our applied-AI practice — model workflows on Vertex AI and the analytics layer behind our data science engagements, from experiment tracking to production inference.",
    meta: ["Vertex AI", "BigQuery", "Data Platform"],
    href: "https://cloud.google.com",
  },
];

const principles = [
  {
    n: "01",
    title: "Shared infrastructure",
    desc: "Our partners give us the compute, storage and tooling to run real experiments — not toy notebooks. Research that can be reproduced needs infrastructure that can be trusted.",
  },
  {
    n: "02",
    title: "Joint programs",
    desc: "Hackathons, challenges and workshops are designed with our partners and run on their platforms, so the reach matches the effort that goes into the curriculum.",
  },
  {
    n: "03",
    title: "Talent pipeline",
    desc: "Every program is also a search. The learners who do well in our challenges are the ones we mentor, hire and collaborate with on live research.",
  },
  {
    n: "04",
    title: "Outcomes in the open",
    desc: "Engagements end with something you can inspect — a paper, a reproducible codebase, or a system in production. Partnerships are measured the same way.",
  },
];

const tracks = [
  {
    title: "Academic & Research",
    desc: "Universities and research institutions collaborating on applied studies, publications and faculty development programs.",
  },
  {
    title: "Industry R&D",
    desc: "Corporate research divisions bringing hard problems that need scientific method and production engineering at the same table.",
  },
  {
    title: "Cloud & Technology",
    desc: "Infrastructure and platform partners whose tooling underpins our model development, data platforms and deployments.",
  },
  {
    title: "Community & Events",
    desc: "Platforms and communities that help us take competitions, workshops and training programs to learners at scale.",
  },
];

function PartnershipsPage() {
  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden pt-[72px]">
        {/* One orbiting ring per partner. */}
        <Canvas3D variant="orbit" className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--ink)] via-[color:var(--ink)]/45 to-transparent" />

        <div className="container-wide relative z-10 pt-16 pb-14 sm:pt-24 sm:pb-20 stagger">
          <p className="label text-[color:var(--cyan)]">Partnerships</p>
          <h1 className="mt-8 display display-xl">
            We build
            <br />
            with people
            <br />
            <span className="text-[color:var(--cyan)]">who move.</span>
          </h1>
          <div className="mt-12 grid lg:grid-cols-12 gap-8 items-end">
            <p className="lg:col-span-5 font-sans text-[16px] sm:text-[18px] leading-[1.55] text-white/75">
              Research-led work is rarely done alone. These are the organisations whose
              infrastructure, platforms and audiences make our programs and our engineering
              possible.
            </p>
            <div className="lg:col-span-7 flex flex-wrap gap-3 lg:justify-end">
              <Link to="/contact" className="btn btn-cyan btn-lg">
                Partner With Us
              </Link>
              <a href="#partners" className="btn btn-outline-light btn-lg">
                Meet the Partners ↓
              </a>
            </div>
          </div>
        </div>

        {/* Logo strip as hard white tiles bolted to the base of the hero. */}
        <div className="relative z-10 border-t-2 border-white/20">
          <div className="container-wide grid sm:grid-cols-3">
            {partners.map((p, i) => (
              <div
                key={p.id}
                className={`bg-white h-[110px] sm:h-[128px] flex items-center justify-center px-8 border-[color:var(--ink)] ${
                  i < partners.length - 1 ? "border-b-2 sm:border-b-0 sm:border-r-2" : ""
                }`}
              >
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className={`${p.logoClass} w-auto max-w-full object-contain`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 01 · PARTNER ROSTER ═══════════ */}
      <section id="partners" className="bg-white text-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-12">
              <div className="lg:col-span-7">
                <p className="label text-[color:var(--cyan)]">01 — Our Partners</p>
                <h2 className="mt-6 display display-lg">
                  Three partners.
                  <br />
                  Three kinds
                  <br />
                  of leverage.
                </h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)]">
                Each partnership solves a specific constraint — reach, compute, or applied AI
                capability. None of them are logos on a wall.
              </p>
            </div>
          </Reveal>

          <div>
            {partners.map((p) => (
              <Reveal key={p.id}>
                <div className="brut-row brut-row-light group px-2 sm:px-5 py-10 grid grid-cols-12 gap-x-6 gap-y-6">
                  <span className="col-span-2 md:col-span-1 ghost-num text-[clamp(30px,4.5vw,58px)]">
                    {p.n}
                  </span>

                  <div className="col-span-10 md:col-span-5">
                    <span className="pill">{p.category}</span>
                    <h3 className="mt-5 display text-[clamp(22px,3.2vw,44px)]">{p.name}</h3>
                    <p className="mt-3 label text-[10px] text-[color:var(--cyan)]">{p.tagline}</p>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <p className="font-sans text-[14px] sm:text-[15px] leading-[1.7] opacity-75">
                      {p.desc}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.meta.map((m) => (
                        <span key={m} className="pill">
                          {m}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center gap-3 label text-[10px] border-b-2 border-current pb-1.5"
                    >
                      Visit {p.name}
                      <span className="row-arrow">↗</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 02 · HOW WE PARTNER ═══════════ */}
      <section className="bg-[color:var(--ink)] text-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="max-w-[760px]">
            <p className="label text-[color:var(--cyan)]">02 — How We Partner</p>
            <h2 className="mt-6 display display-md">
              A partnership
              <br />
              should change
              <br />
              what the work can do.
            </h2>
            <p className="mt-8 font-sans text-[16px] leading-[1.65] text-white/70 max-w-[54ch]">
              We keep the list short on purpose. Every partner here removes a real constraint from
              the research or the programs we run.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 gap-px bg-white/20 border-2 border-white/20">
            {principles.map((p) => (
              <Reveal key={p.n}>
                <div className="bg-[color:var(--ink)] p-8 sm:p-10 h-full">
                  <span className="ghost-num text-[44px] text-[color:var(--cyan)]">{p.n}</span>
                  <h3 className="mt-6 display text-[clamp(20px,2.4vw,30px)]">{p.title}</h3>
                  <p className="mt-4 font-sans text-[14px] sm:text-[15px] leading-[1.7] text-white/70">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 03 · TRACKS ═══════════ */}
      <section className="bg-[color:var(--gold)] text-[color:var(--ink)] border-y-2 border-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-12">
              <div className="lg:col-span-7">
                <p className="label">03 — Where We're Open</p>
                <h2 className="mt-6 display display-lg">
                  Four kinds of
                  <br />
                  collaboration.
                </h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[16px] leading-[1.6]">
                If your institution sits in one of these, there is probably something worth building
                together.
              </p>
            </div>
          </Reveal>

          <div>
            {tracks.map((t, i) => (
              <Reveal key={t.title}>
                <div className="brut-row brut-row-light group px-2 sm:px-5 py-8 grid grid-cols-12 gap-x-6 gap-y-3 items-baseline">
                  <span className="col-span-2 md:col-span-1 label text-[10px] opacity-60">
                    0{i + 1}
                  </span>
                  <h3 className="col-span-10 md:col-span-5 display text-[clamp(20px,2.6vw,34px)]">
                    {t.title}
                  </h3>
                  <p className="col-span-12 md:col-span-6 font-sans text-[14px] sm:text-[15px] leading-[1.7] opacity-75">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="bg-[color:var(--cyan)] text-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="label">Become a Partner</p>
            <h2 className="mt-7 display text-[clamp(34px,8vw,124px)]">
              Tell us what
              <br />
              you're trying
              <br />
              to build.
            </h2>

            <div className="mt-12 grid lg:grid-cols-12 gap-8 items-end">
              <p className="lg:col-span-5 font-sans text-[16px] sm:text-[17px] leading-[1.6]">
                Whether it's a joint program, a research collaboration, or infrastructure that would
                make our work better — we'd like to hear about it.
              </p>
              <div className="lg:col-span-7 lg:justify-self-end">
                <Link to="/contact" className="btn btn-ink btn-lg">
                  Start a Conversation →
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
