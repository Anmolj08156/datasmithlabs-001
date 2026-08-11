import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText } from "../components/site/Reveal";
import { SectionRail } from "../components/site/SectionRail";
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
      {/* ═══════ 01 · HERO ═══════ */}
      <section className="relative min-h-[86vh] flex items-center overflow-hidden bg-[color:var(--void)]">
        <Canvas3D variant="constellation" className="absolute inset-0 opacity-70" />
        <div className="glow glow-blue w-[620px] h-[620px] -top-32 right-0 opacity-35" />
        <div className="absolute inset-0 grid-fade opacity-35 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/70 to-transparent" />
        <SectionRail num="01" label="Product" />

        <div className="container-wide relative z-10 pt-32 pb-20">
          <div className="stagger max-w-[640px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-[color:var(--hairline-strong)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--blue)] pulse-dot" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[color:var(--blue-bright)]">
                  Early access is now open
                </span>
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                A product of DataSmith Research Labs
              </span>
            </div>

            <h1 className="mt-7 h1">
              <a
                href="https://studnexus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group hover:text-[color:var(--blue-bright)] transition-colors"
                title="Visit studnexus.com"
              >
                StudNexus
                <ArrowUpRight className="w-7 h-7 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </h1>

            <p className="mt-3 font-display font-medium text-[clamp(19px,2.2vw,28px)] tracking-[-0.03em] text-gradient">
              One platform. Every learner.
            </p>
            <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              The learning operating system
            </p>

            <p className="mt-6 body-text text-[16px] max-w-[470px]">
              StudNexus helps learners organize knowledge, understand concepts, practice
              effectively, and retain information long-term — all powered by AI, all in one place.
            </p>

            <div className="mt-8 max-w-[480px]">
              {submitted ? (
                <div className="card p-5 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[color:var(--blue-bright)] shrink-0" />
                  <p className="font-sans text-[14px] text-white/85">
                    Thank you! You are on the waitlist for early access.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      aria-label="Email address"
                      className="w-full h-[46px] pl-11 pr-4 rounded-full bg-white/5 border border-[color:var(--hairline-strong)] font-sans text-[14px] text-white placeholder-[color:var(--text-muted)] outline-none focus:border-[color:var(--blue)] focus:bg-white/8 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary shrink-0"
                  >
                    {isSubmitting ? "Sending…" : "Request Early Access"}
                  </button>
                </form>
              )}
              <p className="mt-3 font-sans text-[12px] text-[color:var(--text-muted)]">
                No spam. Early access invites only. Unsubscribe anytime.
              </p>
            </div>
          </div>

          <RevealGroup
            className="mt-14 grid grid-cols-2 gap-4 max-w-[420px]"
            step={120}
            direction="scale"
          >
            <div className="card p-5">
              <p className="font-display font-medium text-[30px] tracking-[-0.04em] leading-none">
                500+
              </p>
              <p className="mt-2 font-sans text-[12.5px] text-[color:var(--text-muted)]">
                Learners on the list
              </p>
            </div>
            <div className="card p-5">
              <p className="font-display font-medium text-[30px] tracking-[-0.04em] leading-none">
                20+
              </p>
              <p className="mt-2 font-sans text-[12.5px] text-[color:var(--text-muted)]">
                Campuses in early tests
              </p>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section className="section bg-[color:var(--ink)] py-8 overflow-hidden">
        <p className="text-center font-mono text-[9.5px] uppercase tracking-[0.22em] text-[color:var(--text-muted)] mb-5">
          Trusted by ambitious learners preparing for
        </p>
        <div className="marquee-wrap relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--ink)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--ink)] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track marquee-fast gap-3">
            {[...targetExams, ...targetExams, ...targetExams].map((exam, i) => (
              <span
                key={i}
                className="shrink-0 px-5 py-2.5 rounded-full border border-[color:var(--hairline)] bg-white/[0.03] font-sans text-[13.5px] text-[color:var(--text-body)] whitespace-nowrap hover:border-[color:var(--blue)] hover:text-white transition-colors"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 02 · PROBLEM ═══════ */}
      <section className="section relative bg-[color:var(--void)] py-24">
        <div className="absolute inset-0 grid-fade opacity-30 pointer-events-none" />
        <SectionRail num="02" label="Problem" />

        <div className="container-wide relative z-10">
          <Reveal className="max-w-[560px]">
            <p className="eyebrow">The Current Learning Experience</p>
            <h2 className="mt-5 h2">
              <SplitText text="Studying today is broken into disconnected pieces." />
            </h2>
            <p className="mt-6 body-text text-[15px]">
              Most learners aren't short on effort or material. They're short on a system that turns
              all of it into real understanding.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" step={90}>
            {painPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card hover-lift p-6 h-full group">
                  <span className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-5 h3">{item.title}</h3>
                  <p className="mt-3 body-text text-[13.5px]">{item.desc}</p>
                </div>
              );
            })}

            <div className="card p-6 h-full flex flex-col justify-between border-[color:var(--blue)]/35 bg-[color:var(--blue)]/[0.07]">
              <div>
                <p className="eyebrow">The Outcome</p>
                <p className="mt-4 font-display font-medium text-[18px] leading-[1.45] tracking-[-0.02em] text-white">
                  "You feel busy, but rarely in control of what you actually know."
                </p>
              </div>
              <a
                href="#approach"
                className="mt-7 inline-flex items-center gap-2 font-sans text-[13.5px] font-semibold text-[color:var(--blue-bright)] group/link"
              >
                There's a better way
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 03 · APPROACH ═══════ */}
      <section
        id="approach"
        className="section relative bg-[color:var(--ink)] py-24 overflow-hidden"
      >
        <Canvas3D variant="flowfield" className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[color:var(--ink)] via-transparent to-[color:var(--ink)]" />
        <SectionRail num="03" label="Approach" />

        <div className="container-wide relative z-10">
          <Reveal className="max-w-[560px]">
            <p className="eyebrow">The StudNexus Approach</p>
            <h2 className="mt-5 h2">
              <SplitText text="Everything you need to learn, in one flow." />
            </h2>
            <p className="mt-6 body-text text-[15px]">
              StudNexus brings the entire learning loop together — so progress compounds instead of
              leaking between apps.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-4" step={100}>
            {approachSteps.map((item, i) => (
              <div key={item.title} className="card hover-lift p-6 h-full group">
                <span className="w-10 h-10 rounded-full bg-[color:var(--blue)]/15 border border-[color:var(--blue)]/30 flex items-center justify-center font-display font-medium text-[14px] text-[color:var(--blue-bright)] transition-transform duration-500 group-hover:scale-110">
                  {i + 1}
                </span>
                <p className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[color:var(--blue-bright)]">
                  {item.step}
                </p>
                <h3 className="mt-1.5 h3">{item.title}</h3>
                <p className="mt-3 body-text text-[12.5px]">{item.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 04 · CAPABILITIES ═══════ */}
      <section className="section relative bg-[color:var(--void)] py-24">
        <div className="glow glow-blue w-[560px] h-[560px] top-1/4 left-1/3 opacity-20" />
        <SectionRail num="04" label="Features" />

        <div className="container-wide relative z-10">
          <Reveal className="max-w-[560px]">
            <p className="eyebrow">Capabilities</p>
            <h2 className="mt-5 h2">
              <SplitText text="An intelligent layer over everything you study." />
            </h2>
            <p className="mt-6 body-text text-[15px]">
              Core capabilities working as one system — built to deepen understanding, not just
              store notes.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" step={80}>
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="card product-card p-6 h-full flex flex-col group">
                  <div className="flex items-start justify-between gap-3">
                    <span className="w-11 h-11 rounded-xl bg-[color:var(--blue)]/12 flex items-center justify-center text-[color:var(--blue-bright)] transition-transform duration-500 group-hover:scale-110">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="pill shrink-0">{c.badge}</span>
                  </div>
                  <h3 className="mt-5 h3">{c.title}</h3>
                  <p className="mt-1.5 font-sans text-[12.5px] text-[color:var(--blue-bright)]">
                    {c.tagline}
                  </p>
                  <p className="mt-3 body-text text-[13.5px] flex-1">{c.desc}</p>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 05 · AUDIENCES ═══════ */}
      <section className="section relative bg-[color:var(--ink)] py-24">
        <SectionRail num="05" label="For Whom" />
        <div className="container-wide relative z-10">
          <Reveal className="max-w-[520px]">
            <p className="eyebrow">Built for Every Learner</p>
            <h2 className="mt-5 h2">
              <SplitText text="One platform, tuned to your goal." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" step={70}>
            {audiences.map((item) => (
              <div key={item.title} className="card hover-lift p-6 h-full">
                <h3 className="h3">{item.title}</h3>
                <p className="mt-2.5 body-text text-[12.5px]">{item.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 06 · HOW IT WORKS ═══════ */}
      <section className="section relative bg-[color:var(--void)] py-24">
        <div className="absolute inset-0 grid-fade opacity-25 pointer-events-none" />
        <SectionRail num="06" label="Workflow" />

        <div className="container-wide relative z-10">
          <Reveal className="max-w-[540px]">
            <p className="eyebrow">How It Works</p>
            <h2 className="mt-5 h2">
              <SplitText text="From scattered material to mastery, in six steps." />
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" step={85}>
            {workflows.map((step) => (
              <div key={step.num} className="card hover-lift p-6 h-full group">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[color:var(--blue)] to-[#1b4bd0] flex items-center justify-center font-display font-medium text-[14px] text-white transition-transform duration-500 group-hover:scale-110">
                  {step.num}
                </span>
                <h3 className="mt-5 h3">{step.title}</h3>
                <p className="mt-3 body-text text-[13.5px]">{step.desc}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 07 · CTA ═══════ */}
      <section className="section relative min-h-[64vh] flex items-center bg-[color:var(--void)] overflow-hidden">
        <Canvas3D variant="tunnel" className="absolute inset-0 opacity-85" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/72 to-transparent" />
        <SectionRail num="07" label="Join" />

        <div className="container-wide relative z-10 py-24">
          <Reveal className="max-w-[520px]" direction="left">
            <p className="eyebrow">Ready to Upgrade Your System?</p>
            <h2 className="mt-5 h2">
              <SplitText text="Learn deeper. Remember longer." />
            </h2>
            <p className="mt-6 body-text text-[15px] max-w-[400px]">
              Get started on the waitlist to secure early access invites for StudNexus.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://studnexus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit studnexus.com <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#approach" className="btn btn-outline">
                Learn the Approach
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
