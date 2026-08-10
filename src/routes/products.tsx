import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { Canvas3D } from "../components/three/Canvas3D";
import { toast } from "sonner";

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
    title: "Scattered notes",
    desc: "PDFs, screenshots, and handwritten notes spread across a dozen places you can never find again.",
  },
  {
    title: "Too many apps",
    desc: "A notes app, a flashcard app, a planner, a PDF reader — none of them talk to each other.",
  },
  {
    title: "Poor revision",
    desc: "You study hard once, then forget most of it because nothing reminds you to review at the right time.",
  },
  {
    title: "No progress visibility",
    desc: "You feel busy but have no real signal on whether you're actually getting closer to mastery.",
  },
  {
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
    n: "01",
    title: "AI Workspace",
    badge: "Core AI Module",
    tagline: "Upload. Understand. Explore.",
    desc: "Bring your PDFs, notes and resources into one intelligent workspace that reads, structures and indexes everything for you.",
  },
  {
    n: "02",
    title: "Smart Practice",
    badge: "Practice Advanced",
    tagline: "Generate intelligent assessments.",
    desc: "Turn any topic into targeted questions and mock tests calibrated to where you are and where you need to be.",
  },
  {
    n: "03",
    title: "Community",
    badge: "Advanced",
    tagline: "Learn together, not alone.",
    desc: "A shared library where serious learners upload, discover and upvote the best notes for every exam — the smartest study group you'll ever have.",
  },
  {
    n: "04",
    title: "Study Planner",
    badge: "Advanced",
    tagline: "Your exam, perfectly paced.",
    desc: "An adaptive plan that decides what to study and when — built around your syllabus, your exam date and your real progress.",
  },
  {
    n: "05",
    title: "Revision Vault",
    badge: "Advanced",
    tagline: "Never forget important concepts.",
    desc: "A spaced-repetition vault resurfaces the right concept at the right moment — so what you learn actually sticks.",
  },
  {
    n: "06",
    title: "Deep Learning Assistant",
    badge: "AI Assistant",
    tagline: "Learn concepts deeply.",
    desc: "Ask anything and get clear, grounded explanations that adapt to your level — from first principles to exam-ready depth.",
  },
  {
    n: "07",
    title: "Cross-Document Intelligence",
    badge: "Cross-Ref AI",
    tagline: "Connect knowledge across resources.",
    desc: "StudNexus links ideas across all your material, surfacing connections you'd never spot reading one file at a time.",
  },
  {
    n: "08",
    title: "Flashcards",
    badge: "Active Recall",
    tagline: "Active recall, automated.",
    desc: "Auto-generate flashcards from your material and master them with spaced, self-graded recall sessions.",
  },
  {
    n: "09",
    title: "Learning Analytics",
    badge: "Progress Tracker",
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
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden pt-[72px]">
        <Canvas3D variant="constellation" className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--ink)] via-[color:var(--ink)]/70 to-[color:var(--ink)]/25" />

        <div className="container-wide relative z-10 pt-16 pb-14 sm:pt-24 sm:pb-20 stagger">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2.5 label text-[10px] text-[color:var(--cyan)] border border-[color:var(--cyan)] px-3 py-2">
              <span className="w-1.5 h-1.5 bg-[color:var(--cyan)] animate-pulse" />
              Early access is now open
            </span>
            <span className="label text-[10px] text-white/45">
              A Product of DataSmith Research Labs
            </span>
          </div>

          <h1 className="mt-8 display display-xl">
            <a
              href="https://studnexus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[color:var(--cyan)] transition-colors"
              title="Visit studnexus.com"
            >
              StudNexus ↗
            </a>
          </h1>

          <p className="mt-6 display text-[clamp(20px,3.4vw,46px)] text-[color:var(--cyan)]">
            One Platform. Every Learner.
          </p>
          <p className="mt-4 label text-[10px] text-white/40">The Learning Operating System</p>

          <div className="mt-12 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <p className="lg:col-span-5 font-sans text-[16px] sm:text-[18px] leading-[1.55] text-white/75">
              StudNexus helps learners organize knowledge, understand concepts, practice
              effectively, and retain information long-term — all powered by AI, all in one place.
            </p>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="border-2 border-[color:var(--cyan)] p-6">
                  <p className="label text-[10px] text-[color:var(--cyan)]">Confirmed</p>
                  <p className="mt-3 font-sans text-[15px] text-white/85">
                    Thank you! You are on the waitlist for early access.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    aria-label="Email address"
                    className="flex-1 h-[64px] px-5 bg-transparent border-2 border-white/40 font-mono text-[13px] text-white placeholder-white/35 focus:border-[color:var(--cyan)] outline-none transition-colors sm:border-r-0"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-cyan btn-lg shrink-0 disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending…" : "Request Early Access"}
                  </button>
                </form>
              )}
              <p className="mt-4 label text-[9px] text-white/40">
                No spam. Early access invites only. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t-2 border-white/20">
          <div className="container-wide grid grid-cols-2">
            <div className="py-8 pr-4 border-r-2 border-white/20">
              <p className="display text-[clamp(30px,5vw,64px)]">500+</p>
              <p className="mt-3 label text-[10px] text-white/45">Learners on the list</p>
            </div>
            <div className="py-8 pl-4 sm:pl-8">
              <p className="display text-[clamp(30px,5vw,64px)]">20+</p>
              <p className="mt-3 label text-[10px] text-white/45">Campuses loving early tests</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EXAM MARQUEE ═══════════ */}
      <section className="bg-[color:var(--cyan)] text-[color:var(--ink)] border-y-2 border-[color:var(--ink)] overflow-hidden py-5">
        <div className="marquee-track marquee-fast">
          {[...targetExams, ...targetExams, ...targetExams].map((exam, i) => (
            <span
              key={i}
              className="display text-[clamp(22px,3.4vw,44px)] px-7 whitespace-nowrap flex items-center gap-7"
            >
              {exam}
              <span className="text-[color:var(--ink)]/40">✳</span>
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════ 01 · THE PROBLEM ═══════════ */}
      <section className="bg-white text-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-12">
              <div className="lg:col-span-7">
                <p className="label text-[color:var(--cyan)]">
                  01 — The Current Learning Experience
                </p>
                <h2 className="mt-6 display display-lg">
                  Studying today
                  <br />
                  is broken.
                </h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)]">
                Most learners aren't short on effort or material. They're short on a system that
                turns all of it into real understanding.
              </p>
            </div>
          </Reveal>

          <div>
            {painPoints.map((item, i) => (
              <Reveal key={item.title}>
                <div className="brut-row brut-row-light group px-2 sm:px-5 py-7 grid grid-cols-12 gap-x-6 gap-y-3 items-baseline">
                  <span className="col-span-2 md:col-span-1 label text-[10px] opacity-50">
                    0{i + 1}
                  </span>
                  <h3 className="col-span-10 md:col-span-4 display text-[clamp(20px,2.6vw,34px)]">
                    {item.title}
                  </h3>
                  <p className="col-span-12 md:col-span-7 font-sans text-[14px] sm:text-[15px] leading-[1.7] opacity-70">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 bg-[color:var(--ink)] text-white p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <p className="label text-[10px] text-white/45">The Outcome</p>
                <p className="mt-5 display text-[clamp(22px,3.6vw,50px)]">
                  You feel busy, but rarely in control of what you actually know.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <a href="#approach" className="btn btn-cyan">
                  There's a better way ↓
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 02 · THE APPROACH ═══════════ */}
      <section id="approach" className="bg-[color:var(--ink)] text-white py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="max-w-[760px]">
            <p className="label text-[color:var(--cyan)]">02 — The StudNexus Approach</p>
            <h2 className="mt-6 display display-md">
              Everything you need
              <br />
              to learn, in one flow.
            </h2>
            <p className="mt-8 font-sans text-[16px] leading-[1.65] text-white/70 max-w-[54ch]">
              StudNexus brings the entire learning loop together — so progress compounds instead of
              leaking between apps.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/20 border-2 border-white/20">
            {approachSteps.map((item, i) => (
              <Reveal key={item.title}>
                <div className="bg-[color:var(--ink)] p-7 h-full">
                  <span className="ghost-num text-[42px] text-[color:var(--cyan)]">{i + 1}</span>
                  <p className="mt-5 label text-[9px] text-[color:var(--cyan)]">{item.step}</p>
                  <h3 className="mt-2 display text-[clamp(18px,2vw,26px)]">{item.title}</h3>
                  <p className="mt-3 font-sans text-[13px] leading-[1.6] text-white/65">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 03 · CAPABILITIES ═══════════ */}
      <section className="bg-[color:var(--off-white)] text-[color:var(--ink)] border-t-2 border-[color:var(--ink)] py-20 sm:py-28 grid-lines">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-12">
              <div className="lg:col-span-7">
                <p className="label text-[color:var(--cyan)]">03 — Capabilities</p>
                <h2 className="mt-6 display display-lg">
                  An intelligent
                  <br />
                  layer over
                  <br />
                  everything.
                </h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)]">
                Core capabilities working as one system — built to deepen understanding, not just
                store notes.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--ink)] border-2 border-[color:var(--ink)]">
            {capabilities.map((c) => (
              <Reveal key={c.n}>
                <div className="product-card bg-white hover:bg-[color:var(--ink)] hover:text-white p-7 sm:p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="ghost-num text-[40px]">{c.n}</span>
                    <span className="pill shrink-0">{c.badge}</span>
                  </div>
                  <h3 className="mt-7 display text-[clamp(19px,2.1vw,27px)]">{c.title}</h3>
                  <p className="mt-2.5 label text-[9px] text-[color:var(--cyan)]">{c.tagline}</p>
                  <p className="mt-4 font-sans text-[14px] leading-[1.65] opacity-70 flex-1">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 04 · AUDIENCES ═══════════ */}
      <section className="bg-[color:var(--gold)] text-[color:var(--ink)] border-y-2 border-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-12">
              <div className="lg:col-span-7">
                <p className="label">04 — Built for Every Learner</p>
                <h2 className="mt-6 display display-lg">
                  One platform,
                  <br />
                  tuned to your goal.
                </h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[16px] leading-[1.6]">
                Whatever you're preparing for, StudNexus adapts to the way your field actually
                demands you learn.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--ink)] border-2 border-[color:var(--ink)]">
            {audiences.map((item) => (
              <Reveal key={item.title}>
                <div className="bg-[color:var(--gold)] p-7 h-full">
                  <h3 className="display text-[clamp(19px,2.2vw,28px)]">{item.title}</h3>
                  <p className="mt-3 font-sans text-[13px] leading-[1.6] opacity-75">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 05 · HOW IT WORKS ═══════════ */}
      <section className="bg-white text-[color:var(--ink)] py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-12">
              <div className="lg:col-span-7">
                <p className="label text-[color:var(--cyan)]">05 — How It Works</p>
                <h2 className="mt-6 display display-lg">
                  Scattered material
                  <br />
                  to mastery,
                  <br />
                  in six steps.
                </h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[16px] leading-[1.6] text-[color:var(--text-body)]">
                A simple, repeatable loop that compounds every time you sit down to study.
              </p>
            </div>
          </Reveal>

          <div>
            {workflows.map((step) => (
              <Reveal key={step.num}>
                <div className="brut-row brut-row-light group px-2 sm:px-5 py-7 grid grid-cols-12 gap-x-6 gap-y-3 items-baseline">
                  <span className="col-span-2 md:col-span-1 ghost-num text-[clamp(28px,4vw,52px)]">
                    {step.num}
                  </span>
                  <h3 className="col-span-10 md:col-span-4 display text-[clamp(20px,2.6vw,34px)]">
                    {step.title}
                  </h3>
                  <p className="col-span-12 md:col-span-7 font-sans text-[14px] sm:text-[15px] leading-[1.7] opacity-70">
                    {step.desc}
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
            <p className="label">Ready to upgrade your system?</p>
            <h2 className="mt-7 display text-[clamp(34px,8vw,124px)]">
              Learn deeper.
              <br />
              Remember
              <br />
              longer.
            </h2>

            <div className="mt-12 grid lg:grid-cols-12 gap-8 items-end">
              <p className="lg:col-span-5 font-sans text-[16px] sm:text-[17px] leading-[1.6]">
                Get started on the waitlist to secure early access invites for StudNexus.
              </p>
              <div className="lg:col-span-7 lg:justify-self-end flex flex-wrap gap-3">
                <a
                  href="https://studnexus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ink btn-lg"
                >
                  Visit studnexus.com →
                </a>
                <a href="#approach" className="btn btn-outline-ink btn-lg">
                  Learn the Approach
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
