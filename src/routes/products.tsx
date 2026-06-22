import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowRight,
  Mail,
  BookOpen,
  Users,
  Brain,
  Clock,
  Database,
  GraduationCap,
  LineChart,
  CheckCircle2,
  AlertCircle,
  Calendar,
  RotateCcw,
  Activity,
  Laptop,
  Check,
  Plus,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Search,
  BookMarked,
  HelpCircle,
  Layers,
  Map,
} from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "StudNexus — One Platform. Every Learner." },
      { name: "description", content: "The learning operating system that helps learners organize knowledge, understand concepts, practice effectively, and retain information." },
      { property: "og:title", content: "StudNexus — One Platform. Every Learner." },
      { property: "og:description", content: "AI-powered learning operating system." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400" },
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
  { step: "Step 1", title: "Understand", desc: "Ingest resources and decode complex theories instantly." },
  { step: "Step 2", title: "Practice", desc: "Auto-generate questions calibrated to your skill level." },
  { step: "Step 3", title: "Revise", desc: "Trigger active recall with automated spaced-repetition." },
  { step: "Step 4", title: "Track", desc: "View detailed topic mastery reports objectively." },
  { step: "Step 5", title: "Master", desc: "Lock concepts into long-term memory for good." },
];

const capabilities = [
  {
    id: "workspace",
    title: "AI Workspace",
    badge: "Core",
    tagline: "Upload. Understand. Explore.",
    desc: "Bring your PDFs, notes and resources into one intelligent workspace that reads, structures and indexes everything for you.",
    type: "workspace-mockup",
  },
  {
    id: "practice",
    title: "Smart Practice",
    badge: "Practice Advanced",
    desc: "Turn any topic into targeted questions and mock tests calibrated to where you are and where you need to be.",
  },
  {
    id: "community",
    title: "Community",
    badge: "Advanced",
    tagline: "Learn together, not alone.",
    desc: "A shared library where serious learners upload, discover and upvote the best notes for every exam — the smartest study group you'll ever have.",
  },
  {
    id: "planner",
    title: "Study Planner",
    badge: "Advanced",
    tagline: "Your exam, perfectly paced.",
    desc: "An adaptive plan that decides what to study and when — built around your syllabus, your exam date and your real progress.",
  },
  {
    id: "vault",
    title: "Revision Vault",
    badge: "Advanced",
    tagline: "Never forget important concepts.",
    desc: "A spaced-repetition vault resurfaces the right concept at the right moment — so what you learn actually sticks.",
  },
  {
    id: "assistant",
    title: "Deep Learning Assistant",
    tagline: "Learn concepts deeply.",
    desc: "Ask anything and get clear, grounded explanations that adapt to your level — from first principles to exam-ready depth.",
  },
  {
    id: "cross-doc",
    title: "Cross-Document Intelligence",
    tagline: "Connect knowledge across resources.",
    desc: "StudNexus links ideas across all your material, surfacing connections you'd never spot reading one file at a time.",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    tagline: "Active recall, automated.",
    desc: "Auto-generate flashcards from your material and master them with spaced, self-graded recall sessions.",
  },
  {
    id: "analytics",
    title: "Learning Analytics",
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
  { num: "1", title: "Create a workspace", desc: "Spin up a dedicated space for a subject, exam or semester." },
  { num: "2", title: "Upload learning resources", desc: "Drop in PDFs, notes and material — we structure it instantly." },
  { num: "3", title: "Learn with AI", desc: "Explore concepts with an assistant that knows your material." },
  { num: "4", title: "Practice", desc: "Generate intelligent questions and assessments on demand." },
  { num: "5", title: "Track progress", desc: "Watch mastery grow across every topic, objectively." },
  { num: "6", title: "Master concepts", desc: "Revise at the right time and retain knowledge for good." },
];

function ProductsPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("Understand");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxgb_5tjfz4rw1wafg5RezCXbzDVSExLneSo-m7ydCxUIdM9gl28BQbAibll0sBgml9hg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          id: "wl_" + Math.random().toString(36).substring(2, 9),
          email: email.trim().toLowerCase(),
          name: "",
          created_at: new Date().toISOString(),
          source: "website",
          device: typeof window !== "undefined" ? window.navigator.userAgent : "ssr",
        }),
      });

      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Welcome aboard!", {
        description: "You've successfully joined the StudNexus early access waitlist.",
      });
      // Save locally to remember
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
    <div className="bg-[color:var(--off-white)] min-h-screen text-[color:var(--ink)]">
      {/* ───────────────── HERO SECTION ───────────────── */}
      <section className="relative pt-[140px] pb-24 overflow-hidden bg-[color:var(--navy)] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--ink)]/40 to-[color:var(--ink)]" />
        
        <div className="container-wide relative z-10 max-w-[1200px]">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Main Rebranding Info */}
            <div className="lg:col-span-7 stagger">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[color:var(--cyan)] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--cyan)] font-medium">
                  Early access is now open
                </span>
              </div>
              
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                A Product of DataSmith Research Labs
              </p>
              
              {/* Product Rebrand Title */}
              <h1 className="mt-4 font-serif text-[clamp(44px,6vw,72px)] leading-[1.05] tracking-tight text-white">
                <a 
                  href="https://studnexus.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[color:var(--cyan)] transition-colors inline-flex items-center gap-2 group"
                  title="Visit studnexus.com"
                >
                  StudNexus
                  <ArrowUpRight className="w-8 h-8 opacity-45 group-hover:opacity-100 group-hover:text-[color:var(--cyan)] transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </h1>
              
              <p className="mt-3 font-serif italic text-[clamp(20px,3vw,30px)] text-[color:var(--cyan)] leading-tight">
                One Platform. Every Learner.
              </p>
              
              <p className="mt-2 font-mono text-[12px] text-white/40 uppercase tracking-[0.14em]">
                The Learning Operating System
              </p>
              
              <p className="mt-6 text-[17px] text-white/80 leading-[1.65] max-w-[580px]">
                StudNexus helps learners organize knowledge, understand concepts, practice effectively, and retain information long-term — all powered by AI, all in one place.
              </p>

              {/* Waitlist subscription form */}
              <div className="mt-8 max-w-[480px]">
                {submitted ? (
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-[color:var(--cyan)] flex items-center gap-3 backdrop-blur-xs">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <p className="font-sans text-[14px]">
                      Thank you! You are on the waitlist for early access.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/10 rounded-md text-[14px] placeholder-white/35 focus:bg-white/10 focus:border-[color:var(--cyan)] focus:ring-1 focus:ring-[color:var(--cyan)] outline-none transition-all duration-200 text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-cyan h-11 w-full sm:w-auto relative"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                      ) : (
                        "Request Early Access"
                      )}
                    </button>
                  </form>
                )}
                <p className="mt-3 text-[11px] text-white/45 font-sans leading-relaxed">
                  No spam. Early access invites only. Unsubscribe anytime.
                </p>
              </div>

              {/* Social Proof metrics */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-4 text-white/70">
                <div className="flex items-center gap-2">
                  <span className="font-serif italic text-2xl text-white font-bold">500+</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-white/50">learners on the list</span>
                </div>
                <div className="w-px h-6 bg-white/10 hidden sm:block align-middle self-center" />
                <div className="flex items-center gap-2">
                  <span className="font-serif italic text-2xl text-white font-bold">20+</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-white/50">campuses loving early tests</span>
                </div>
              </div>
            </div>

            {/* Right side: Mock User Dashboard Widget */}
            <div className="lg:col-span-5 relative">
              <Reveal>
                <div className="bg-[color:var(--navy-mid)] border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
                  
                  {/* Dashboard header bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <span className="font-mono text-[11px] text-white/40 ml-2">studnexus.app/dashboard</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[color:var(--cyan)]/15 text-[color:var(--cyan)] font-mono text-[9px] uppercase tracking-wider">
                      Live Preview
                    </span>
                  </div>

                  {/* Dashboard Tabs from copy */}
                  <div className="flex border-b border-white/5 pb-2 mb-4 overflow-x-auto gap-3 scrollbar-none">
                    {["Understand", "Practice", "Track", "Revise", "Connect"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 border-b-2 whitespace-nowrap cursor-pointer ${
                          activeTab === tab 
                            ? "text-[color:var(--cyan)] border-[color:var(--cyan)] font-bold" 
                            : "text-white/40 border-transparent hover:text-white/70"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents: Dynamic representation of features */}
                  <div className="space-y-4 min-h-[220px]">
                    
                    {/* Thermodynamics Mastery widget */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-mono text-[10px] text-white/45 uppercase tracking-wider">Concept Mastered</p>
                          <h4 className="font-serif italic text-lg text-white mt-1">Thermodynamics</h4>
                        </div>
                        <span className="font-mono text-[13px] text-[color:var(--cyan)] font-bold">92%</span>
                      </div>
                      <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[color:var(--cyan)] rounded-full transition-all duration-500" style={{ width: "92%" }} />
                      </div>
                    </div>

                    {/* Stats List from copy */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 border border-white/5 rounded-lg p-3.5 flex flex-col justify-between">
                        <span className="font-mono text-[10px] text-white/45 uppercase tracking-wider">Smart Practice</span>
                        <p className="font-serif italic text-xl text-white mt-1.5">12 Questions</p>
                        <span className="font-mono text-[9px] text-[color:var(--cyan)]/80 uppercase mt-0.5">generated</span>
                      </div>
                      
                      <div className="bg-white/5 border border-white/5 rounded-lg p-3.5 flex flex-col justify-between">
                        <span className="font-mono text-[10px] text-white/45 uppercase tracking-wider">Difficulty Setting</span>
                        <p className="font-serif italic text-xl text-white mt-1.5">Adaptive</p>
                        <span className="font-mono text-[9px] text-green-400 uppercase mt-0.5">Calibrated</span>
                      </div>
                    </div>

                    {/* Revision Due card */}
                    <div className="bg-[color:var(--navy)] border border-white/10 rounded-lg p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[color:var(--gold)]/10 flex items-center justify-center text-[color:var(--gold)]">
                          <RotateCcw className="w-4 h-4 animate-spin-slow" />
                        </div>
                        <div>
                          <h5 className="font-serif text-white text-[14px]">Revision due today</h5>
                          <p className="font-mono text-[9px] text-white/40 uppercase mt-0.5">Spaced repetition schedule</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[12px] text-[color:var(--gold)] font-bold">6 cards</span>
                        <p className="font-mono text-[9px] text-white/30 uppercase mt-0.5">~ 4 min</p>
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────── TRUSTED MARQUEE BANNER ───────────────── */}
      <section className="bg-white py-12 border-b border-[color:var(--border)] overflow-hidden">
        <div className="container-wide">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--text-muted)] mb-6">
            Trusted by ambitious learners preparing for
          </p>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="marquee-track flex py-2 gap-4">
              {[...targetExams, ...targetExams, ...targetExams].map((exam, idx) => (
                <div
                  key={idx}
                  className="px-6 py-2.5 rounded-md border border-[color:var(--border)] bg-[color:var(--off-white)] hover:border-[color:var(--blue)] hover:shadow-xs transition-all duration-200 shrink-0 font-sans font-semibold text-[14px]"
                >
                  {exam}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── THE CURRENT LEARNING EXPERIENCE (PROBLEM) ───────────────── */}
      <section className="py-24 bg-white">
        <div className="container-wide max-w-[1000px]">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">The current learning experience</p>
              <h2 className="mt-5 font-serif italic text-[clamp(32px,4vw,48px)] leading-[1.1] text-[color:var(--ink)]">
                Studying today is broken into a dozen disconnected pieces
              </h2>
              <p className="mt-6 text-[17px] text-[color:var(--text-body)] max-w-[680px] mx-auto leading-relaxed">
                Most learners aren't short on effort or material. They're short on a system that turns all of it into real understanding.
              </p>
            </div>
          </Reveal>

          {/* Pain points grid */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Reveal key={idx}>
                  <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-red-400/40 hover:bg-red-50/10 transition-all duration-200 h-full flex flex-col">
                    <div className="w-9 h-9 rounded-lg bg-red-500/5 text-red-500 flex items-center justify-center mb-5 border border-red-500/10">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-[18px] text-[color:var(--ink)] font-semibold leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-[color:var(--text-body)] leading-[1.6] flex-1">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
            
            {/* final card representing the transition */}
            <Reveal>
              <div className="bg-[color:var(--ink)] text-white rounded-xl p-6 h-full flex flex-col justify-between border border-transparent shadow-md">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">The outcome</p>
                  <p className="mt-4 font-serif italic text-lg leading-relaxed text-white/95">
                    "You feel busy, but rarely in control of what you actually know."
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10">
                  <a 
                    href="#approach" 
                    className="font-mono text-[12px] font-bold text-[color:var(--cyan)] hover:text-white transition-colors inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span>There's a better way</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────── THE APPROACH SECTION (SOLUTION) ───────────────── */}
      <section id="approach" className="py-24 bg-[color:var(--navy)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--ink)] to-[color:var(--navy-mid)] opacity-90" />
        
        <div className="container-wide relative z-10 max-w-[1000px]">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow-muted">The StudNexus approach</p>
              <h2 className="mt-5 font-serif italic text-[clamp(32px,4vw,48px)] leading-[1.1] text-white">
                Everything you need to learn, finally in one flow
              </h2>
              <p className="mt-6 text-[16px] text-white/70 max-w-[620px] mx-auto leading-relaxed">
                StudNexus brings the entire learning loop together — so progress compounds instead of leaking between apps.
              </p>
            </div>
          </Reveal>

          {/* Interactive Steps Visual Map */}
          <div className="mt-16 grid sm:grid-cols-5 gap-4 relative">
            
            {/* Flow Connector Line (Desktop) */}
            <div className="hidden sm:block absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-white/10 z-0" />

            {approachSteps.map((item, idx) => (
              <Reveal key={idx}>
                <div className="relative z-10 text-center bg-white/5 border border-white/5 rounded-xl p-5 hover:border-[color:var(--cyan)]/30 hover:bg-white/10 transition-all duration-200">
                  <div className="w-10 h-10 rounded-full bg-[color:var(--navy-mid)] border border-white/10 flex items-center justify-center font-serif text-[14px] font-bold text-[color:var(--cyan)] mx-auto shadow-md">
                    {idx + 1}
                  </div>
                  
                  <span className="font-mono text-[9px] text-[color:var(--cyan)] uppercase tracking-wider block mt-4 font-semibold">
                    {item.step}
                  </span>
                  
                  <h4 className="font-serif italic text-[16px] text-white mt-1">
                    {item.title}
                  </h4>
                  
                  <p className="mt-2 text-[12px] text-white/60 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CAPABILITIES SECTION ───────────────── */}
      <section className="py-24 bg-white border-b border-[color:var(--border)]">
        <div className="container-wide max-w-[1100px]">
          <Reveal>
            <div className="text-center max-w-[760px] mx-auto">
              <p className="eyebrow">Capabilities</p>
              <h2 className="mt-5 font-serif italic text-[clamp(32px,4vw,48px)] leading-[1.1] text-[color:var(--ink)]">
                An intelligent layer over everything you study
              </h2>
              <p className="mt-6 text-[17px] text-[color:var(--text-body)] leading-relaxed">
                Six core capabilities working as one system — built to deepen understanding, not just store notes.
              </p>
            </div>
          </Reveal>

          {/* Capabilities layouts */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Highlighted AI Workspace Card (Takes larger footprint or renders details) */}
            <div className="md:col-span-2 border border-[color:var(--border)] rounded-xl p-8 hover:border-[color:var(--blue)] transition-all duration-200 bg-[color:var(--off-white)] flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1">
                <span className="px-2.5 py-0.5 rounded bg-[color:var(--blue)]/10 text-[color:var(--blue)] font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Core AI Module
                </span>
                <h3 className="font-serif text-2xl text-[color:var(--ink)] font-bold mt-4">
                  AI Workspace
                </h3>
                <p className="font-mono text-[12px] text-[color:var(--cyan)] mt-1 font-semibold">
                  Upload. Understand. Explore.
                </p>
                <p className="mt-4 text-[15px] text-[color:var(--text-body)] leading-relaxed">
                  Bring your PDFs, notes and resources into one intelligent workspace that reads, structures and indexes everything for you.
                </p>
              </div>
              
              {/* Document indexer visual mockup */}
              <div className="w-full lg:w-[320px] bg-white border border-[color:var(--border)] rounded-lg p-5 shadow-xs font-mono text-[11px]">
                <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-3 mb-3">
                  <span className="font-semibold text-[color:var(--ink)] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[color:var(--blue)]" />
                    AI Workspace
                  </span>
                  <span className="text-[color:var(--text-muted)] text-[10px]">3 files</span>
                </div>
                
                <div className="space-y-2">
                  {[
                    { name: "lecture-notes.pdf", status: "Indexed", active: true },
                    { name: "chapter-4-summary.pdf", status: "Linked", active: true },
                    { name: "previous-papers.pdf", status: "Ready", active: false }
                  ].map((file) => (
                    <div 
                      key={file.name} 
                      className={`p-2.5 rounded border flex items-center justify-between transition-colors ${
                        file.active 
                          ? "bg-[color:var(--off-white)] border-[color:var(--blue)]/20 text-[color:var(--ink)]" 
                          : "bg-white border-[color:var(--border)] text-[color:var(--text-muted)]"
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className={`w-3.5 h-3.5 flex-shrink-0 ${file.active ? "text-[color:var(--cyan)]" : "text-gray-300"}`} />
                        <span className="truncate">{file.name}</span>
                      </div>
                      <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-semibold tracking-wider ${
                        file.status === "Indexed" 
                          ? "bg-green-100 text-green-700" 
                          : file.status === "Linked" 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-gray-100 text-gray-600"
                      }`}>
                        {file.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart Practice Card */}
            <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] transition-all duration-200 bg-white h-full flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-[color:var(--cyan)]/10 text-[color:var(--cyan)] font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Practice Advanced
                </span>
                <h3 className="font-serif text-[20px] text-[color:var(--ink)] font-semibold mt-4">
                  Smart Practice
                </h3>
                <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-relaxed">
                  Generate intelligent assessments. Turn any topic into targeted questions and mock tests calibrated to where you are and where you need to be.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[color:var(--border)] font-mono text-[10px] text-[color:var(--text-muted)] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span>Topic Calibration Active</span>
              </div>
            </div>

            {/* Community Card */}
            <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] transition-all duration-200 bg-white h-full flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-[color:var(--gold)]/10 text-[color:var(--gold)] font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Advanced
                </span>
                <h3 className="font-serif text-[20px] text-[color:var(--ink)] font-semibold mt-4">
                  Community
                </h3>
                <p className="font-mono text-[12px] text-[color:var(--cyan)] mt-0.5">Learn together, not alone.</p>
                <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-relaxed">
                  A shared library where serious learners upload, discover and upvote the best notes for every exam — the smartest study group you'll ever have.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[color:var(--border)] font-mono text-[10px] text-[color:var(--text-muted)] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[color:var(--blue)]" />
                <span>Interactive Library Sharing</span>
              </div>
            </div>

            {/* Study Planner Card */}
            <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] transition-all duration-200 bg-white h-full flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-[color:var(--gold)]/10 text-[color:var(--gold)] font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Advanced
                </span>
                <h3 className="font-serif text-[20px] text-[color:var(--ink)] font-semibold mt-4">
                  Study Planner
                </h3>
                <p className="font-mono text-[12px] text-[color:var(--cyan)] mt-0.5">Your exam, perfectly paced.</p>
                <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-relaxed">
                  An adaptive plan that decides what to study and when — built around your syllabus, your exam date and your real progress.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[color:var(--border)] font-mono text-[10px] text-[color:var(--text-muted)] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[color:var(--blue)]" />
                <span>Adaptive Schedules</span>
              </div>
            </div>

            {/* Revision Vault Card */}
            <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] transition-all duration-200 bg-white h-full flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-[color:var(--gold)]/10 text-[color:var(--gold)] font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Advanced
                </span>
                <h3 className="font-serif text-[20px] text-[color:var(--ink)] font-semibold mt-4">
                  Revision Vault
                </h3>
                <p className="font-mono text-[12px] text-[color:var(--cyan)] mt-0.5">Never forget important concepts.</p>
                <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-relaxed">
                  A spaced-repetition vault resurfaces the right concept at the right moment — so what you learn actually sticks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[color:var(--border)] font-mono text-[10px] text-[color:var(--text-muted)] flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[color:var(--cyan)] animate-spin-slow" />
                <span>Spaced-Repetition Active</span>
              </div>
            </div>

            {/* Deep Learning Assistant Card */}
            <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] transition-all duration-200 bg-white h-full flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[9px] uppercase tracking-wider font-semibold">
                  AI Assistant
                </span>
                <h3 className="font-serif text-[20px] text-[color:var(--ink)] font-semibold mt-4">
                  Deep Learning Assistant
                </h3>
                <p className="font-mono text-[12px] text-[color:var(--cyan)] mt-0.5">Learn concepts deeply.</p>
                <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-relaxed">
                  Ask anything and get clear, grounded explanations that adapt to your level — from first principles to exam-ready depth.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[color:var(--border)] font-mono text-[10px] text-[color:var(--text-muted)] flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-[color:var(--cyan)]" />
                <span>Dual Explanation Depth</span>
              </div>
            </div>

            {/* Cross-Document Intelligence Card */}
            <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] transition-all duration-200 bg-white h-full flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Cross-Ref AI
                </span>
                <h3 className="font-serif text-[20px] text-[color:var(--ink)] font-semibold mt-4">
                  Cross-Document Intelligence
                </h3>
                <p className="font-mono text-[12px] text-[color:var(--cyan)] mt-0.5">Connect knowledge across resources.</p>
                <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-relaxed">
                  StudNexus links ideas across all your material, surfacing connections you'd never spot reading one file at a time.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[color:var(--border)] font-mono text-[10px] text-[color:var(--text-muted)] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[color:var(--blue)]" />
                <span>Multi-Resource Linking</span>
              </div>
            </div>

            {/* Flashcards Card */}
            <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] transition-all duration-200 bg-white h-full flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Active Recall
                </span>
                <h3 className="font-serif text-[20px] text-[color:var(--ink)] font-semibold mt-4">
                  Flashcards
                </h3>
                <p className="font-mono text-[12px] text-[color:var(--cyan)] mt-0.5">Active recall, automated.</p>
                <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-relaxed">
                  Auto-generate flashcards from your material and master them with spaced, self-graded recall sessions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[color:var(--border)] font-mono text-[10px] text-[color:var(--text-muted)] flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[color:var(--gold)]" />
                <span>Automated Generation</span>
              </div>
            </div>

            {/* Learning Analytics Card */}
            <div className="border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] transition-all duration-200 bg-white h-full flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[9px] uppercase tracking-wider font-semibold">
                  Progress Tracker
                </span>
                <h3 className="font-serif text-[20px] text-[color:var(--ink)] font-semibold mt-4">
                  Learning Analytics
                </h3>
                <p className="font-mono text-[12px] text-[color:var(--cyan)] mt-0.5">Measure progress objectively.</p>
                <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-relaxed">
                  See mastery by topic, spot weak areas early, and watch real, measurable progress toward your goal.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[color:var(--border)] font-mono text-[10px] text-[color:var(--text-muted)] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span>Real-Time Performance Indices</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────── BUILT FOR EVERY LEARNER ───────────────── */}
      <section className="py-24 bg-[color:var(--off-white)] border-b border-[color:var(--border)]">
        <div className="container-wide max-w-[1000px]">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Built for every learner</p>
              <h2 className="mt-5 font-serif italic text-[clamp(32px,4vw,48px)] leading-[1.1] text-[color:var(--ink)]">
                One platform, tuned to your goal
              </h2>
              <p className="mt-6 text-[17px] text-[color:var(--text-body)] max-w-[620px] mx-auto leading-relaxed">
                Whatever you're preparing for, StudNexus adapts to the way your field actually demands you learn.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((item, idx) => (
              <Reveal key={idx}>
                <div className="bg-white border border-[color:var(--border)] rounded-xl p-6 hover:border-[color:var(--blue)] hover:shadow-xs transition-all duration-200 text-center h-full flex flex-col justify-center">
                  <div className="w-10 h-10 rounded-full bg-[color:var(--blue)]/5 text-[color:var(--blue)] flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-[18px] text-[color:var(--ink)] font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-[color:var(--text-muted)] leading-[1.5]">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── HOW IT WORKS (ROADMAP) ───────────────── */}
      <section className="py-24 bg-white">
        <div className="container-wide max-w-[1000px]">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">How it works</p>
              <h2 className="mt-5 font-serif italic text-[clamp(32px,4vw,48px)] leading-[1.1] text-[color:var(--ink)]">
                From scattered material to mastery, in six steps
              </h2>
              <p className="mt-6 text-[17px] text-[color:var(--text-body)] max-w-[620px] mx-auto leading-relaxed">
                A simple, repeatable loop that compounds every time you sit down to study.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflows.map((step, idx) => (
              <Reveal key={idx}>
                <div className="flex gap-4 items-start h-full">
                  <div className="font-serif italic text-4xl text-[color:var(--cyan)] font-extrabold leading-none pt-1">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-serif text-[18px] text-[color:var(--ink)] font-semibold leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-[color:var(--text-body)] leading-[1.65]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CALL TO ACTION SECTION ───────────────── */}
      <section className="bg-[color:var(--navy)] text-white py-20 relative overflow-hidden">
        <div className="container-wide text-center relative z-10 max-w-[800px]">
          <Reveal>
            <p className="eyebrow-muted">Ready to upgrade your system?</p>
            <h2 className="mt-5 font-serif italic text-[clamp(32px,4.5vw,56px)] leading-[1.1] text-white">
              Learn deeper. Remember longer.
            </h2>
            <p className="mt-6 text-[16px] text-white/70">
              Get started on the waitlist to secure early access invites for StudNexus.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://studnexus.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-cyan btn-lg w-full sm:w-auto"
              >
                Visit studnexus.com →
              </a>
              <a 
                href="#approach" 
                className="btn btn-ghost-light btn-lg w-full sm:w-auto"
              >
                Learn the Approach
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}