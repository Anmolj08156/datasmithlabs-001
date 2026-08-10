import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText, TiltCard } from "../components/site/Reveal";
import { Canvas3D } from "../components/three/Canvas3D";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Calendar,
  CheckCircle2,
  Database,
  FileText,
  Layers,
  LineChart,
  Mail,
  RotateCcw,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "StudNexus — One Platform. Every Learner." },
      {
        name: "description",
        content:
          "The learning operating system that helps learners organize knowledge, understand concepts, practice effectively, and retain information.",
      },
      { property: "og:title", content: "StudNexus — One Platform. Every Learner." },
      { property: "og:description", content: "AI-powered learning operating system." },
    ],
  }),
  component: ProductsPage,
});

const targetExams = [
  "IIT Aspirants",
  "AIIMS Track",
  "UPSC 2026",
  "IIM Bound",
  "GATE CSE",
  "State PSC",
];

const painPoints = [
  {
    icon: FileText,
    title: "Scattered notes",
    desc: "PDFs, screenshots, and handwritten notes spread across a dozen places you can never find again.",
  },
  {
    icon: Layers,
    title: "Too many apps",
    desc: "A notes app, a flashcard app, a planner, a PDF reader — none of them talk to each other.",
  },
  {
    icon: RotateCcw,
    title: "Poor revision",
    desc: "You study hard once, then forget most of it because nothing reminds you to review at the right time.",
  },
  {
    icon: AlertCircle,
    title: "No progress visibility",
    desc: "You feel busy but have no real signal on whether you're actually getting closer to mastery.",
  },
  {
    icon: Database,
    title: "Information overload",
    desc: "Endless material, infinite tabs, and no system to turn all of it into understanding.",
  },
];

const approachSteps = [
  {
    step: "Step 1",
    title: "Understand",
    desc: "Ingest resources and decode complex theories instantly.",
  },
  {
    step: "Step 2",
    title: "Practice",
    desc: "Auto-generate questions calibrated to your skill level.",
  },
  {
    step: "Step 3",
    title: "Revise",
    desc: "Trigger active recall with automated spaced-repetition.",
  },
  { step: "Step 4", title: "Track", desc: "View detailed topic mastery reports objectively." },
  { step: "Step 5", title: "Master", desc: "Lock concepts into long-term memory for good." },
];

const capabilities = [
  {
    icon: Layers,
    title: "AI Workspace",
    badge: "Core",
    tagline: "Upload. Understand. Explore.",
    desc: "Bring your PDFs, notes and resources into one intelligent workspace that reads, structures and indexes everything for you.",
  },
  {
    icon: Sparkles,
    title: "Smart Practice",
    badge: "Practice",
    tagline: "Generate intelligent assessments.",
    desc: "Turn any topic into targeted questions and mock tests calibrated to where you are and where you need to be.",
  },
  {
    icon: Users,
    title: "Community",
    badge: "Advanced",
    tagline: "Learn together, not alone.",
    desc: "A shared library where serious learners upload, discover and upvote the best notes for every exam — the smartest study group you'll ever have.",
  },
  {
    icon: Calendar,
    title: "Study Planner",
    badge: "Advanced",
    tagline: "Your exam, perfectly paced.",
    desc: "An adaptive plan that decides what to study and when — built around your syllabus, your exam date and your real progress.",
  },
  {
    icon: RotateCcw,
    title: "Revision Vault",
    badge: "Advanced",
    tagline: "Never forget important concepts.",
    desc: "A spaced-repetition vault resurfaces the right concept at the right moment — so what you learn actually sticks.",
  },
  {
    icon: Brain,
    title: "Deep Learning Assistant",
    badge: "AI Assistant",
    tagline: "Learn concepts deeply.",
    desc: "Ask anything and get clear, grounded explanations that adapt to your level — from first principles to exam-ready depth.",
  },
  {
    icon: Search,
    title: "Cross-Document Intelligence",
    badge: "Cross-Ref AI",
    tagline: "Connect knowledge across resources.",
    desc: "StudNexus links ideas across all your material, surfacing connections you'd never spot reading one file at a time.",
  },
  {
    icon: Sparkles,
    title: "Flashcards",
    badge: "Active Recall",
    tagline: "Active recall, automated.",
    desc: "Auto-generate flashcards from your material and master them with spaced, self-graded recall sessions.",
  },
  {
    icon: LineChart,
    title: "Learning Analytics",
    badge: "Progress",
    tagline: "Measure progress objectively.",
    desc: "See mastery by topic, spot weak areas early, and watch real, measurable progress toward your goal.",
  },
];

const audiences = [
  { title: "Engineering", desc: "Core subjects, labs & semesters" },
  { title: "Medical", desc: "NEET PG, high-volume retention" },
  { title: "UPSC", desc: "Vast syllabus, made manageable" },
  { title: "CAT", desc: "Quant, VARC & LRDI mastery" },
  { title: "GATE", desc: "Concept depth + problem solving" },
  { title: "State Exams", desc: "Region-specific preparation" },
  { title: "Certifications", desc: "Professional & upskilling tracks" },
  { title: "University", desc: "Coursework, projects & exams" },
];

const workflows = [
  {
    num: "1",
    title: "Create a workspace",
    desc: "Spin up a dedicated space for a subject, exam or semester.",
  },
  {
    num: "2",
    title: "Upload learning resources",
    desc: "Drop in PDFs, notes and material — we structure it instantly.",
  },
  {
    num: "3",
    title: "Learn with AI",
    desc: "Explore concepts with an assistant that knows your material.",
  },
  {
    num: "4",
    title: "Practice",
    desc: "Generate intelligent questions and assessments on demand.",
  },
  {
    num: "5",
    title: "Track progress",
    desc: "Watch mastery grow across every topic, objectively.",
  },
  {
    num: "6",
    title: "Master concepts",
    desc: "Revise at the right time and retain knowledge for good.",
  },
];

function ProductsPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxgb_5tjfz4rw1wafg5RezCXbzDVSExLneSo-m7ydCxUIdM9gl28BQbAibll0sBgml9hg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            id: "wl_" + Math.random().toString(36).substring(2, 9),
            email: email.trim().toLowerCase(),
            name: "",
            created_at: new Date().toISOString(),
            source: "website",
            device: typeof window !== "undefined" ? window.navigator.userAgent : "ssr",
          }),
        },
      );

      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Welcome aboard!", {
        description: "You've successfully joined the StudNexus early access waitlist.",
      });
      try {
        localStorage.setItem("studnexus_waitlist_email", email);
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      toast.error("Subscription failed. Please try again.");
    }
  };

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden">
        <Canvas3D variant="constellation" className="absolute inset-0 opacity-70" />
        <div className="aurora opacity-55" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[color:var(--ink)]/55 via-transparent to-[color:var(--ink)]" />

        <div className="container-wide relative z-10 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="stagger max-w-[760px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--cyan)] pulse-dot" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--cyan)]">
                  Early access is now open
                </span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                A product of DataSmith Research Labs
              </span>
            </div>

            <h1 className="mt-6 h1">
              <a
                href="https://studnexus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group hover:text-[color:var(--cyan)] transition-colors"
                title="Visit studnexus.com"
              >
                StudNexus
                <ArrowUpRight className="w-7 h-7 opacity-45 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </h1>

            <p className="mt-3 font-display font-semibold text-[clamp(20px,2.4vw,30px)] tracking-[-0.025em] text-gradient">
              One platform. Every learner.
            </p>
            <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
              The learning operating system
            </p>

            <p className="mt-6 font-sans text-[17px] leading-[1.6] text-white/65 max-w-[560px]">
              StudNexus helps learners organize knowledge, understand concepts, practice
              effectively, and retain information long-term — all powered by AI, all in one place.
            </p>

            <div className="mt-8 max-w-[500px]">
              {submitted ? (
                <div className="card-dark p-5 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[color:var(--cyan)] shrink-0" />
                  <p className="font-sans text-[14px] text-white/85">
                    Thank you! You are on the waitlist for early access.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      aria-label="Email address"
                      className="w-full h-[46px] pl-11 pr-4 rounded-full bg-white/6 border border-white/15 font-sans text-[14px] text-white placeholder-white/35 outline-none focus:border-[color:var(--cyan)] focus:bg-white/10 transition-all"
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn btn-cyan shrink-0">
                    {isSubmitting ? "Sending…" : "Request early access"}
                  </button>
                </form>
              )}
              <p className="mt-3 font-sans text-[12px] text-white/40">
                No spam. Early access invites only. Unsubscribe anytime.
              </p>
            </div>
          </div>

          <RevealGroup
            className="mt-14 grid grid-cols-2 gap-4 max-w-[440px]"
            step={110}
            direction="scale"
          >
            <div className="card-dark p-5">
              <p className="font-display font-semibold text-[30px] tracking-[-0.03em] leading-none">
                500+
              </p>
              <p className="mt-2 font-sans text-[13px] text-white/55">Learners on the list</p>
            </div>
            <div className="card-dark p-5">
              <p className="font-display font-semibold text-[30px] tracking-[-0.03em] leading-none">
                20+
              </p>
              <p className="mt-2 font-sans text-[13px] text-white/55">Campuses in early tests</p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ───────── EXAM MARQUEE ───────── */}
      <section className="bg-white border-b border-[color:var(--border)] py-10 overflow-hidden">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)] mb-6">
          Trusted by ambitious learners preparing for
        </p>
        <div className="marquee-wrap relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="marquee-track marquee-fast gap-3">
            {[...targetExams, ...targetExams, ...targetExams].map((exam, i) => (
              <span
                key={i}
                className="shrink-0 px-5 py-2.5 rounded-full border border-[color:var(--border)] bg-[color:var(--off-white)] font-sans text-[14px] font-medium text-[color:var(--text-body)] whitespace-nowrap hover:border-[color:var(--cyan)] transition-colors"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PROBLEM ───────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="text-center max-w-[640px] mx-auto">
            <p className="eyebrow">The current learning experience</p>
            <h2 className="mt-4 h2">
              <SplitText text="Studying today is broken into disconnected pieces." />
            </h2>
            <p className="mt-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)]">
              Most learners aren't short on effort or material. They're short on a system that turns
              all of it into real understanding.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" step={85}>
            {painPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card p-6 h-full hover-lift group">
                  <span className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-red-500 transition-transform duration-400 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-5 h3">{item.title}</h3>
                  <p className="mt-2.5 font-sans text-[14px] leading-[1.65] text-[color:var(--text-body)]">
                    {item.desc}
                  </p>
                </div>
              );
            })}

            <div className="rounded-[var(--radius)] bg-[color:var(--ink)] text-white p-6 h-full flex flex-col justify-between hover-lift">
              <div>
                <p className="eyebrow">The outcome</p>
                <p className="mt-4 font-display font-semibold text-[19px] leading-[1.4] tracking-[-0.02em]">
                  "You feel busy, but rarely in control of what you actually know."
                </p>
              </div>
              <a
                href="#approach"
                className="mt-7 inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-[color:var(--cyan)] group/link"
              >
                There's a better way
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ───────── APPROACH ───────── */}
      <section
        id="approach"
        className="relative bg-[color:var(--ink)] text-white py-20 sm:py-28 overflow-hidden"
      >
        <div className="aurora opacity-50" />
        <div className="container-wide relative">
          <Reveal className="text-center max-w-[620px] mx-auto">
            <p className="eyebrow">The StudNexus approach</p>
            <h2 className="mt-4 h2">
              <SplitText text="Everything you need to learn, finally in one flow." />
            </h2>
            <p className="mt-5 font-sans text-[16px] leading-[1.6] text-white/65">
              StudNexus brings the entire learning loop together — so progress compounds instead of
              leaking between apps.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4" step={95}>
            {approachSteps.map((item, i) => (
              <div key={item.title} className="card-dark p-6 h-full hover-lift group">
                <span className="w-9 h-9 rounded-full bg-[color:var(--cyan)]/15 flex items-center justify-center font-display font-semibold text-[14px] text-[color:var(--cyan)] transition-transform duration-400 group-hover:scale-110">
                  {i + 1}
                </span>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--cyan)]">
                  {item.step}
                </p>
                <h3 className="mt-1.5 h3">{item.title}</h3>
                <p className="mt-2.5 font-sans text-[13px] leading-[1.6] text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── CAPABILITIES ───────── */}
      <section className="bg-[color:var(--off-white)] border-y border-[color:var(--border)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="text-center max-w-[640px] mx-auto">
            <p className="eyebrow">Capabilities</p>
            <h2 className="mt-4 h2">
              <SplitText text="An intelligent layer over everything you study." />
            </h2>
            <p className="mt-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)]">
              Core capabilities working as one system — built to deepen understanding, not just
              store notes.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" step={80}>
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <TiltCard key={c.title} className="h-full">
                  <div className="card p-6 h-full flex flex-col product-card group">
                    <div className="flex items-start justify-between gap-3">
                      <span className="w-11 h-11 rounded-xl bg-[color:var(--cyan)]/10 flex items-center justify-center text-[color:var(--cyan)] transition-transform duration-400 group-hover:scale-110">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="pill shrink-0">{c.badge}</span>
                    </div>
                    <h3 className="mt-5 h3">{c.title}</h3>
                    <p className="mt-1.5 font-sans text-[13px] text-[color:var(--cyan)]">
                      {c.tagline}
                    </p>
                    <p className="mt-3 font-sans text-[14px] leading-[1.65] text-[color:var(--text-body)] flex-1">
                      {c.desc}
                    </p>
                  </div>
                </TiltCard>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── AUDIENCES ───────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="text-center max-w-[600px] mx-auto">
            <p className="eyebrow">Built for every learner</p>
            <h2 className="mt-4 h2">
              <SplitText text="One platform, tuned to your goal." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" step={70}>
            {audiences.map((item) => (
              <div key={item.title} className="card p-6 text-center h-full hover-lift">
                <h3 className="h3">{item.title}</h3>
                <p className="mt-2 font-sans text-[13px] leading-[1.55] text-[color:var(--text-muted)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="bg-[color:var(--off-white)] border-t border-[color:var(--border)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="text-center max-w-[620px] mx-auto">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 h2">
              <SplitText text="From scattered material to mastery, in six steps." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" step={85}>
            {workflows.map((step) => (
              <div key={step.num} className="card p-6 h-full hover-lift group">
                <span className="w-9 h-9 rounded-full bg-[color:var(--ink)] flex items-center justify-center font-display font-semibold text-[14px] text-[color:var(--cyan)] transition-transform duration-400 group-hover:scale-110">
                  {step.num}
                </span>
                <h3 className="mt-5 h3">{step.title}</h3>
                <p className="mt-2.5 font-sans text-[14px] leading-[1.65] text-[color:var(--text-body)]">
                  {step.desc}
                </p>
              </div>
            ))}
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
                <p className="eyebrow">Ready to upgrade your system?</p>
                <h2 className="mt-4 h2">
                  <SplitText text="Learn deeper. Remember longer." />
                </h2>
                <p className="mt-5 font-sans text-[16px] leading-[1.6] text-white/65 max-w-[480px] mx-auto">
                  Get started on the waitlist to secure early access invites for StudNexus.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://studnexus.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-cyan btn-lg"
                  >
                    Visit studnexus.com <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a href="#approach" className="btn btn-outline-light btn-lg">
                    Learn the approach
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
