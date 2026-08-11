import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText } from "../components/site/Reveal";
import { SectionRail } from "../components/site/SectionRail";
import { Canvas3D } from "../components/three/Canvas3D";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Cloud,
  FlaskConical,
  GraduationCap,
  Users,
} from "lucide-react";

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
    id: "unstop",
    name: "Unstop",
    logo: "/partners/unstop.svg",
    logoClass: "h-8",
    category: "Event Partner",
    tagline: "Where our programs meet their audience.",
    desc: "Unstop is our event partner for hackathons, challenges and workshops — the platform that carries our programs to learners across campuses in India and handles discovery, registration and participation end to end.",
    meta: ["Hackathons", "Challenges", "Campus Programs"],
    href: "https://unstop.com",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    logo: "/partners/aws.svg",
    logoClass: "h-11",
    category: "Cloud Partner",
    tagline: "Infrastructure for research at scale.",
    desc: "AWS is our cloud partner for the heavy end of the work — GPU compute for model development, storage for research datasets, and the managed services that keep delivered systems reliable in production.",
    meta: ["Compute", "Storage", "MLOps"],
    href: "https://aws.amazon.com",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    logo: "/partners/gcp.svg",
    logoClass: "h-6",
    category: "Cloud & AI Partner",
    tagline: "Applied AI and large-scale analytics.",
    desc: "Google Cloud supports our applied-AI practice — model workflows on Vertex AI and the analytics layer behind our data science engagements, from experiment tracking to production inference.",
    meta: ["Vertex AI", "BigQuery", "Data Platform"],
    href: "https://cloud.google.com",
  },
];

const principles = [
  {
    icon: Cloud,
    title: "Shared infrastructure",
    desc: "Our partners give us the compute, storage and tooling to run real experiments — not toy notebooks. Research that can be reproduced needs infrastructure that can be trusted.",
  },
  {
    icon: CalendarDays,
    title: "Joint programs",
    desc: "Hackathons, challenges and workshops are designed with our partners and run on their platforms, so the reach matches the effort that goes into the curriculum.",
  },
  {
    icon: Users,
    title: "Talent pipeline",
    desc: "Every program is also a search. The learners who do well in our challenges are the ones we mentor, hire and collaborate with on live research.",
  },
  {
    icon: FlaskConical,
    title: "Outcomes in the open",
    desc: "Engagements end with something you can inspect — a paper, a reproducible codebase, or a system in production. Partnerships are measured the same way.",
  },
];

const tracks = [
  {
    icon: GraduationCap,
    title: "Academic & Research",
    desc: "Universities and research institutions collaborating on applied studies, publications and faculty development programs.",
  },
  {
    icon: Building2,
    title: "Industry R&D",
    desc: "Corporate research divisions bringing hard problems that need scientific method and production engineering at the same table.",
  },
  {
    icon: Cloud,
    title: "Cloud & Technology",
    desc: "Infrastructure and platform partners whose tooling underpins our model development, data platforms and deployments.",
  },
  {
    icon: CalendarDays,
    title: "Community & Events",
    desc: "Platforms and communities that help us take competitions, workshops and training programs to learners at scale.",
  },
];

function PartnershipsPage() {
  return (
    <>
      {/* ═══════ 01 · HERO ═══════ */}
      <section className="relative min-h-[78vh] flex items-center overflow-hidden bg-[color:var(--void)]">
        <Canvas3D variant="globe" className="absolute inset-0 opacity-90" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[color:var(--void)] to-transparent" />
        <SectionRail num="01" label="Partners" />

        <div className="container-wide relative z-10 pt-32 pb-20">
          <div className="stagger max-w-[600px]">
            <p className="eyebrow">Partnerships</p>
            <h1 className="mt-6 h1">
              We build with
              <br />
              people who move.
            </h1>
            <p className="mt-7 body-text text-[16px] max-w-[440px]">
              Research-led work is rarely done alone. These are the organisations whose
              infrastructure, platforms and audiences make our programs and our engineering
              possible.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Partner With Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#partners" className="btn btn-outline">
                Meet the Partners
              </a>
            </div>
          </div>

          <RevealGroup className="mt-16 grid sm:grid-cols-3 gap-4 max-w-[760px]" step={120}>
            {partners.map((p) => (
              <div
                key={p.id}
                className="card hover-lift h-[92px] flex items-center justify-center px-6 bg-white/95"
              >
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className={`${p.logoClass} w-auto max-w-full object-contain`}
                />
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 02 · ROSTER ═══════ */}
      <section id="partners" className="section relative bg-[color:var(--ink)] py-24">
        <div className="glow glow-blue w-[560px] h-[560px] -top-32 right-1/4 opacity-25" />
        <SectionRail num="02" label="Roster" />

        <div className="container-wide relative z-10">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Our Partners</p>
                <h2 className="mt-5 h2">
                  <SplitText text="Three partners, three kinds of leverage." />
                </h2>
              </div>
              <p className="lg:col-span-5 body-text text-[14px] max-w-[340px]">
                Each partnership solves a specific constraint — reach, compute, or applied AI
                capability. None of them are logos on a wall.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid md:grid-cols-3 gap-5" step={120}>
            {partners.map((p) => (
              <div key={p.id} className="card product-card h-full flex flex-col overflow-hidden">
                <div className="h-[104px] bg-white/95 flex items-center justify-center px-7">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    loading="lazy"
                    className={`${p.logoClass} w-auto max-w-full object-contain`}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="pill self-start">{p.category}</span>
                  <h3 className="mt-4 h3">{p.name}</h3>
                  <p className="mt-1.5 font-sans text-[12.5px] text-[color:var(--blue-bright)]">
                    {p.tagline}
                  </p>
                  <p className="mt-4 body-text text-[13.5px] flex-1">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
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
                    className="mt-6 pt-5 border-t border-[color:var(--hairline)] inline-flex items-center gap-2 font-sans text-[13.5px] font-semibold text-white hover:text-[color:var(--blue-bright)] transition-colors group/link"
                  >
                    Visit {p.name}
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 03 · HOW WE PARTNER ═══════ */}
      <section className="section relative bg-[color:var(--void)] py-24">
        <div className="absolute inset-0 grid-fade opacity-30 pointer-events-none" />
        <SectionRail num="03" label="Method" />

        <div className="container-wide relative z-10">
          <Reveal className="max-w-[560px]">
            <p className="eyebrow">How We Partner</p>
            <h2 className="mt-5 h2">
              <SplitText text="A partnership should change what the work can do." />
            </h2>
            <p className="mt-6 body-text text-[15px]">
              We keep the list short on purpose. Every partner here removes a real constraint from
              the research or the programs we run.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 gap-5" step={110}>
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="card hover-lift p-7 group">
                  <span className="w-11 h-11 rounded-xl bg-white/5 border border-[color:var(--hairline)] flex items-center justify-center text-[color:var(--blue-bright)] transition-transform duration-500 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-6 h3">{p.title}</h3>
                  <p className="mt-3 body-text text-[13.5px]">{p.desc}</p>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 04 · TRACKS ═══════ */}
      <section className="section relative bg-[color:var(--ink)] py-24">
        <div className="glow glow-cyan w-[460px] h-[460px] top-0 left-0 opacity-25" />
        <SectionRail num="04" label="Open" />

        <div className="container-wide relative z-10">
          <Reveal>
            <p className="eyebrow">Where We're Open</p>
            <h2 className="mt-5 h2 max-w-[520px]">
              <SplitText text="Four kinds of collaboration we actively look for." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5" step={100}>
            {tracks.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="card hover-lift p-6 h-full group">
                  <span className="w-11 h-11 rounded-xl bg-[color:var(--blue)]/12 flex items-center justify-center text-[color:var(--blue-bright)] transition-transform duration-500 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-5 h3">{t.title}</h3>
                  <p className="mt-3 body-text text-[13.5px]">{t.desc}</p>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 05 · CTA ═══════ */}
      <section className="section relative min-h-[64vh] flex items-center bg-[color:var(--void)] overflow-hidden">
        <Canvas3D variant="tunnel" className="absolute inset-0 opacity-85" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/72 to-transparent" />
        <SectionRail num="05" label="Lets Talk" />

        <div className="container-wide relative z-10 py-24">
          <Reveal className="max-w-[520px]" direction="left">
            <p className="eyebrow">Become a Partner</p>
            <h2 className="mt-5 h2">
              <SplitText text="Tell us what you're trying to build." />
            </h2>
            <p className="mt-6 body-text text-[15px] max-w-[400px]">
              Whether it's a joint program, a research collaboration, or infrastructure that would
              make our work better — we'd like to hear about it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="mailto:datasmithlabs@gmail.com" className="btn btn-outline">
                Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
