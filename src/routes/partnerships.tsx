import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText, TiltCard } from "../components/site/Reveal";
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
    logoClass: "h-9",
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
    logoClass: "h-12",
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
    logoClass: "h-7",
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
      {/* ───────── HERO ───────── */}
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden">
        {/* One orbiting ring per partner. */}
        <Canvas3D variant="orbit" className="absolute inset-0 opacity-80" />
        <div className="aurora opacity-45" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--ink)] via-[color:var(--ink)]/55 to-transparent" />

        <div className="container-wide relative z-10 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="stagger max-w-[720px]">
            <p className="eyebrow">Partnerships</p>
            <h1 className="mt-5 h1">
              We build with people who <span className="text-gradient">move fast</span>.
            </h1>
            <p className="mt-7 font-sans text-[17px] leading-[1.6] text-white/65 max-w-[560px]">
              Research-led work is rarely done alone. These are the organisations whose
              infrastructure, platforms and audiences make our programs and our engineering
              possible.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-cyan btn-lg">
                Partner with us <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#partners" className="btn btn-outline-light btn-lg">
                Meet the partners
              </a>
            </div>
          </div>

          <RevealGroup className="mt-14 grid sm:grid-cols-3 gap-4" step={110} direction="scale">
            {partners.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl h-[104px] flex items-center justify-center px-7 hover-lift"
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

      {/* ───────── ROSTER ───────── */}
      <section id="partners" className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">Our partners</p>
            <h2 className="mt-4 h2 max-w-[560px]">
              <SplitText text="Three partners, three kinds of leverage." />
            </h2>
            <p className="mt-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)] max-w-[560px]">
              Each partnership solves a specific constraint — reach, compute, or applied AI
              capability. None of them are logos on a wall.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid md:grid-cols-3 gap-5" step={110}>
            {partners.map((p) => (
              <TiltCard key={p.id} className="h-full">
                <div className="card h-full flex flex-col overflow-hidden product-card">
                  <div className="h-[112px] bg-[color:var(--off-white)] border-b border-[color:var(--border)] flex items-center justify-center px-7">
                    <img
                      src={p.logo}
                      alt={`${p.name} logo`}
                      loading="lazy"
                      className={`${p.logoClass} w-auto max-w-full object-contain`}
                    />
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <span className="pill self-start">{p.category}</span>
                    <h3 className="mt-4 h3">{p.name}</h3>
                    <p className="mt-1.5 font-sans text-[13px] text-[color:var(--cyan)]">
                      {p.tagline}
                    </p>
                    <p className="mt-4 font-sans text-[14px] leading-[1.7] text-[color:var(--text-body)] flex-1">
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
                      className="mt-6 pt-5 border-t border-[color:var(--border)] inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-[color:var(--ink)] hover:text-[color:var(--cyan)] transition-colors group/link"
                    >
                      Visit {p.name}
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── HOW WE PARTNER ───────── */}
      <section className="relative bg-[color:var(--ink)] text-white py-20 sm:py-28 overflow-hidden">
        <div className="aurora opacity-40" />
        <div className="container-wide relative">
          <Reveal className="max-w-[620px]">
            <p className="eyebrow">How we partner</p>
            <h2 className="mt-4 h2">
              <SplitText text="A partnership should change what the work can do." />
            </h2>
            <p className="mt-6 font-sans text-[16px] leading-[1.65] text-white/65">
              We keep the list short on purpose. Every partner here removes a real constraint from
              the research or the programs we run.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid sm:grid-cols-2 gap-5" step={100}>
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="card-dark p-7 hover-lift group">
                  <span className="w-11 h-11 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-[color:var(--cyan)] transition-transform duration-400 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-6 h3">{p.title}</h3>
                  <p className="mt-3 font-sans text-[14px] leading-[1.7] text-white/60">{p.desc}</p>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── TRACKS ───────── */}
      <section className="bg-[color:var(--off-white)] border-y border-[color:var(--border)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">Where we're open</p>
            <h2 className="mt-4 h2 max-w-[560px]">
              <SplitText text="Four kinds of collaboration we actively look for." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5" step={90}>
            {tracks.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="card p-6 h-full hover-lift group">
                  <span className="w-11 h-11 rounded-xl bg-[color:var(--cyan)]/10 flex items-center justify-center text-[color:var(--cyan)] transition-transform duration-400 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-5 h3">{t.title}</h3>
                  <p className="mt-3 font-sans text-[14px] leading-[1.65] text-[color:var(--text-body)]">
                    {t.desc}
                  </p>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal direction="scale">
            <div className="relative rounded-3xl overflow-hidden bg-[color:var(--ink)] text-white px-7 py-14 sm:px-14 sm:py-20 text-center">
              <div className="aurora opacity-70" />
              <div className="relative">
                <p className="eyebrow">Become a partner</p>
                <h2 className="mt-4 h2 max-w-[560px] mx-auto">
                  <SplitText text="Tell us what you're trying to build." />
                </h2>
                <p className="mt-5 font-sans text-[16px] leading-[1.6] text-white/65 max-w-[520px] mx-auto">
                  Whether it's a joint program, a research collaboration, or infrastructure that
                  would make our work better — we'd like to hear about it.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Link to="/contact" className="btn btn-cyan btn-lg">
                    Start a conversation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="mailto:datasmithlabs@gmail.com" className="btn btn-outline-light btn-lg">
                    Email us
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
