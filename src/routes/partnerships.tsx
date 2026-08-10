import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { Canvas3D } from "../components/three/Canvas3D";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Cloud,
  FlaskConical,
  GraduationCap,
  Handshake,
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
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400",
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
    logoClass: "h-11",
    category: "Event Partner",
    badgeCls: "bg-[color:var(--gold)]/10 text-[color:var(--gold)]",
    tagline: "Where our programs meet their audience.",
    desc: "Unstop is our event partner for hackathons, challenges and workshops — the platform that carries our programs to learners across campuses in India and handles discovery, registration and participation end to end.",
    meta: ["Hackathons", "Challenges", "Campus Programs"],
    href: "https://unstop.com",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    logo: "/partners/aws.svg",
    logoClass: "h-14",
    category: "Cloud Partner",
    badgeCls: "bg-[color:var(--blue)]/10 text-[color:var(--blue)]",
    tagline: "Infrastructure for research at scale.",
    desc: "AWS is our cloud partner for the heavy end of the work — GPU compute for model development, storage for research datasets, and the managed services that keep delivered systems reliable in production.",
    meta: ["Compute", "Storage", "MLOps"],
    href: "https://aws.amazon.com",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    logo: "/partners/gcp.svg",
    logoClass: "h-8",
    category: "Cloud & AI Partner",
    badgeCls: "bg-[color:var(--cyan)]/10 text-[color:var(--cyan)]",
    tagline: "Applied AI and large-scale analytics.",
    desc: "Google Cloud supports our applied-AI practice — model workflows on Vertex AI and the analytics layer behind our data science engagements, from experiment tracking to production inference.",
    meta: ["Vertex AI", "BigQuery", "Data Platform"],
    href: "https://cloud.google.com",
  },
];

const principles = [
  {
    n: "01",
    icon: Cloud,
    title: "Shared infrastructure",
    desc: "Our partners give us the compute, storage and tooling to run real experiments — not toy notebooks. Research that can be reproduced needs infrastructure that can be trusted.",
  },
  {
    n: "02",
    icon: CalendarDays,
    title: "Joint programs",
    desc: "Hackathons, challenges and workshops are designed with our partners and run on their platforms, so the reach matches the effort that goes into the curriculum.",
  },
  {
    n: "03",
    icon: Users,
    title: "Talent pipeline",
    desc: "Every program is also a search. The learners who do well in our challenges are the ones we mentor, hire and collaborate with on live research.",
  },
  {
    n: "04",
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
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative pt-[140px] pb-20 sm:pb-24 overflow-hidden bg-[color:var(--navy)] text-white">
        {/* One orbiting ring per partner. */}
        <Canvas3D variant="orbit" className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[color:var(--navy)]/45 via-[color:var(--ink)]/30 to-[color:var(--ink)]" />
        {/* Keeps the headline crisp where it crosses the orbit rings. */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--ink)]/75 via-[color:var(--ink)]/10 to-transparent" />

        <div className="container-wide relative z-10">
          <div className="stagger max-w-[720px]">
            <p className="eyebrow">Partnerships</p>
            <h1 className="mt-6 font-serif italic font-light text-white leading-[1.06] text-[clamp(36px,6vw,64px)]">
              We build with people who
              <br className="hidden sm:block" /> move at the speed of the work.
            </h1>
            <p className="mt-7 text-[16px] sm:text-[17px] leading-[1.65] text-white/70 max-w-[560px]">
              Research-led work is rarely done alone. These are the organisations whose
              infrastructure, platforms and audiences make our programs and our engineering
              possible.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                to="/contact"
                className="btn btn-white w-full sm:w-auto text-center justify-center"
              >
                Partner With Us
              </Link>
              <a
                href="#partners"
                className="btn btn-ghost-light w-full sm:w-auto text-center justify-center"
              >
                Meet the Partners →
              </a>
            </div>
          </div>

          {/* Partner logo strip */}
          <Reveal className="mt-14 sm:mt-16">
            <p className="eyebrow-muted">Current Partners</p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {partners.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-lg h-[92px] px-6 flex items-center justify-center"
                >
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className={`${p.logoClass} w-auto max-w-full object-contain`}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── 01 PARTNER ROSTER ───────────────── */}
      <section id="partners" className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">01 — Our Partners</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,4.2vw,44px)] leading-[1.15] max-w-[720px]">
              Three partners, three different kinds of leverage.
            </h2>
            <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[color:var(--text-body)] max-w-[620px]">
              Each partnership solves a specific constraint — reach, compute, or applied AI
              capability. None of them are logos on a wall.
            </p>
          </Reveal>

          <div className="mt-12 sm:mt-16 grid md:grid-cols-3 gap-6">
            {partners.map((p) => (
              <Reveal key={p.id}>
                <div className="product-card h-full flex flex-col border border-[color:var(--border)] rounded-xl overflow-hidden bg-white">
                  <div className="h-[120px] bg-[color:var(--off-white)] border-b border-[color:var(--border)] flex items-center justify-center px-8">
                    <img
                      src={p.logo}
                      alt={`${p.name} logo`}
                      loading="lazy"
                      className={`${p.logoClass} w-auto max-w-full object-contain`}
                    />
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <span
                      className={`self-start px-2.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.14em] font-semibold ${p.badgeCls}`}
                    >
                      {p.category}
                    </span>

                    <h3 className="mt-4 font-serif text-[21px] text-[color:var(--ink)] leading-tight">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 font-mono text-[12px] text-[color:var(--cyan)]">
                      {p.tagline}
                    </p>
                    <p className="mt-4 text-[14px] leading-[1.7] text-[color:var(--text-body)] flex-1">
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
                      className="mt-6 pt-5 border-t border-[color:var(--border)] font-sans text-[13px] font-semibold text-[color:var(--ink)] hover:text-[color:var(--cyan)] transition-colors inline-flex items-center gap-1.5 group"
                    >
                      Visit {p.name}
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── 02 HOW WE PARTNER (DARK) ───────────────── */}
      <section className="bg-[color:var(--navy)] py-20 sm:py-[120px] text-white">
        <div className="container-wide">
          <Reveal className="max-w-[720px]">
            <p className="eyebrow-muted">02 — How We Partner</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,3.6vw,42px)] leading-[1.15] text-white">
              A partnership should change what the work can do.
            </h2>
            <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-white/65">
              We keep the list short on purpose. Every partner here removes a real constraint from
              the research or the programs we run.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.n}>
                  <div className="border-t border-[color:var(--border-dark)] pt-7 h-full">
                    <div className="flex items-center gap-4">
                      <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[color:var(--cyan)] shrink-0">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.14em] text-white/35">
                        {p.n}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif text-[20px] sm:text-[22px] text-white leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.7] text-white/65 max-w-[440px]">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── 03 PARTNERSHIP TRACKS ───────────────── */}
      <section className="bg-[color:var(--off-white)] border-b border-[color:var(--border)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="max-w-[720px]">
              <p className="eyebrow">03 — Where We're Open</p>
              <h2 className="mt-5 font-serif italic text-[clamp(28px,4.2vw,44px)] leading-[1.15]">
                Four kinds of collaboration we actively look for.
              </h2>
              <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.7] text-[color:var(--text-body)]">
                If your institution sits in one of these, there is probably something worth building
                together.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((t) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.title}>
                  <div className="bg-white border border-[color:var(--border)] rounded-xl p-6 h-full hover:border-[color:var(--blue)] hover:shadow-xs transition-all duration-200">
                    <div className="w-10 h-10 rounded-lg bg-[color:var(--blue)]/5 text-[color:var(--blue)] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="mt-5 font-serif text-[18px] text-[color:var(--ink)] leading-tight">
                      {t.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.65] text-[color:var(--text-body)]">
                      {t.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide max-w-[820px] text-center">
          <Reveal>
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--cyan)]/10 text-[color:var(--cyan)]">
              <Handshake className="w-5 h-5" />
            </span>
            <p className="mt-6 eyebrow">Become a Partner</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,4.2vw,52px)] leading-[1.15]">
              Tell us what you're trying to build.
            </h2>
            <p className="mt-6 text-[15px] sm:text-[17px] text-[color:var(--text-body)]">
              Whether it's a joint program, a research collaboration, or infrastructure that would
              make our work better — we'd like to hear about it.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-8 sm:gap-x-12 gap-y-4 text-[15px] sm:text-[16px]">
              <a href="mailto:datasmithlabs@gmail.com" className="link-cyan">
                datasmithlabs@gmail.com
              </a>
              <span className="hidden sm:inline text-black/20">·</span>
              <a href="tel:+917017283915" className="link-cyan">
                +91 7017 283 915
              </a>
              <span className="hidden sm:inline text-black/20">·</span>
              <a
                href="https://www.linkedin.com/company/datasmith-labs"
                target="_blank"
                rel="noreferrer"
                className="link-cyan"
              >
                LinkedIn
              </a>
            </div>

            <div className="mt-10">
              <Link
                to="/contact"
                className="btn btn-ink btn-lg w-full sm:w-auto text-center justify-center"
              >
                Start a Conversation →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
