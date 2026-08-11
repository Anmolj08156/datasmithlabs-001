import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText } from "../components/site/Reveal";
import { SectionRail } from "../components/site/SectionRail";
import { Canvas3D } from "../components/three/Canvas3D";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  BarChart3,
  Calendar,
  Check,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  Layers,
  LineChart,
  MessagesSquare,
  RotateCcw,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Services — DataSmith Research Labs" },
      {
        name: "description",
        content:
          "Our services across AI, data science, research and training — plus StudNexus and the products we are building for institutions.",
      },
      { property: "og:title", content: "Products & Services — DataSmith Research Labs" },
      {
        property: "og:description",
        content:
          "AI, data science, research and training services, plus StudNexus and upcoming institutional products.",
      },
    ],
  }),
  component: ProductsPage,
});

const services = [
  {
    id: "ai-ml",
    icon: Brain,
    title: "AI & Machine Learning",
    tagline: "Intelligent systems that learn, adapt and scale.",
    desc: "We design and ship production machine learning — from framing the problem and building the model to the pipelines that keep it healthy once it is live.",
    points: [
      "Custom model development",
      "Neural networks & deep learning",
      "MLOps and deployment pipelines",
      "Monitoring and model retraining",
    ],
  },
  {
    id: "data-science",
    icon: BarChart3,
    title: "Data Science & Analytics",
    tagline: "Transforming data into actionable insights.",
    desc: "We turn raw, messy institutional data into decisions people actually make — with statistical honesty about what the data does and does not support.",
    points: [
      "Statistical analysis and modelling",
      "Forecasting and scenario planning",
      "Business intelligence dashboards",
      "Data pipelines and warehousing",
    ],
  },
  {
    id: "research",
    icon: FlaskConical,
    title: "Research & Innovation",
    tagline: "Solving complex problems through rigorous research.",
    desc: "We partner with universities, public institutions and R&D divisions to take a problem from open question to publishable, deployable result.",
    points: [
      "Applied research programs",
      "Experimental design and review",
      "Publication and peer-review support",
      "Long-term R&D partnerships",
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training & Workshops",
    tagline: "Building capability through knowledge and hands-on experience.",
    desc: "Programs built and taught by practising researchers, measured against real organisational outcomes rather than attendance sheets.",
    points: [
      "Corporate workshops (2–5 days)",
      "Faculty development programs",
      "Certification courses",
      "Cohort mentoring",
    ],
  },
];

const products = [
  {
    id: "studnexus",
    name: "StudNexus",
    status: "Live",
    live: true,
    tagline: "One platform. Every learner.",
    desc: "The learning operating system that helps learners organise knowledge, understand concepts, practise effectively, and retain information long-term — all powered by AI, all in one place.",
    points: [
      "AI workspace for all your material",
      "Smart practice and mock tests",
      "Spaced-repetition revision vault",
      "Learning analytics by topic",
    ],
    href: "https://studnexus.com",
  },
  {
    id: "exam-management",
    name: "Exam Management System",
    status: "In Development",
    live: false,
    tagline: "Run an exam cycle without the spreadsheets.",
    desc: "An end-to-end system for institutions running large examinations — automating the allocation work that currently eats weeks of staff time before every cycle.",
    points: [
      "Automatic seat allocation for students",
      "Automatic invigilator allocation and duty rosters",
      "Exam scheduling and timetabling",
      "Room and capacity planning",
      "Hall ticket generation",
      "Seating charts and attendance tracking",
    ],
  },
  {
    id: "online-counselling",
    name: "Online Counselling for Institutions",
    status: "In Development",
    live: false,
    tagline: "Admissions counselling, run online end to end.",
    desc: "A counselling platform for institutions managing admission rounds — choice filling, merit lists and seat allotment handled in one auditable workflow.",
    points: [
      "Online choice filling for candidates",
      "Merit list generation",
      "Automated seat allotment rounds",
      "Document verification workflow",
      "Live admission dashboards",
    ],
  },
];

const capabilities = [
  {
    icon: Layers,
    title: "AI Workspace",
    tagline: "Upload. Understand. Explore.",
    desc: "Bring your PDFs, notes and resources into one intelligent workspace that reads, structures and indexes everything for you.",
  },
  {
    icon: Sparkles,
    title: "Smart Practice",
    tagline: "Generate intelligent assessments.",
    desc: "Turn any topic into targeted questions and mock tests calibrated to where you are and where you need to be.",
  },
  {
    icon: Users,
    title: "Community",
    tagline: "Learn together, not alone.",
    desc: "A shared library where serious learners upload, discover and upvote the best notes for every exam.",
  },
  {
    icon: Calendar,
    title: "Study Planner",
    tagline: "Your exam, perfectly paced.",
    desc: "An adaptive plan that decides what to study and when — built around your syllabus, your exam date and your real progress.",
  },
  {
    icon: RotateCcw,
    title: "Revision Vault",
    tagline: "Never forget important concepts.",
    desc: "A spaced-repetition vault resurfaces the right concept at the right moment — so what you learn actually sticks.",
  },
  {
    icon: Brain,
    title: "Deep Learning Assistant",
    tagline: "Learn concepts deeply.",
    desc: "Ask anything and get clear, grounded explanations that adapt to your level — from first principles to exam-ready depth.",
  },
  {
    icon: Search,
    title: "Cross-Document Intelligence",
    tagline: "Connect knowledge across resources.",
    desc: "StudNexus links ideas across all your material, surfacing connections you'd never spot reading one file at a time.",
  },
  {
    icon: Sparkles,
    title: "Flashcards",
    tagline: "Active recall, automated.",
    desc: "Auto-generate flashcards from your material and master them with spaced, self-graded recall sessions.",
  },
  {
    icon: LineChart,
    title: "Learning Analytics",
    tagline: "Measure progress objectively.",
    desc: "See mastery by topic, spot weak areas early, and watch real, measurable progress toward your goal.",
  },
];

const audiences = [
  "Engineering",
  "Medical",
  "UPSC",
  "CAT",
  "GATE",
  "State Exams",
  "Certifications",
  "University",
];

function ProductsPage() {
  return (
    <>
      {/* ═══════ 01 · HERO ═══════ */}
      <section className="relative min-h-[74vh] flex items-center overflow-hidden bg-[color:var(--void)]">
        <div className="absolute inset-0 grid-fade opacity-35 pointer-events-none" />
        <div className="glow glow-blue w-[560px] h-[560px] top-[6%] right-[4%] opacity-40" />
        <Canvas3D
          variant="constellation"
          className="absolute inset-y-0 right-0 w-full lg:w-[60%] opacity-60 lg:opacity-90"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[color:var(--void)] to-transparent" />
        <SectionRail num="01" label="Overview" />

        <div className="container-wide relative z-10 pt-32 pb-20">
          <div className="stagger max-w-[620px]">
            <p className="eyebrow">Products & Services</p>
            <h1 className="mt-6 h1">
              What we build.
              <br />
              What we deliver.
            </h1>
            <p className="mt-7 body-text text-[16px] max-w-[470px]">
              Four service lines for institutions that need research done properly — and a growing
              set of products we build and run ourselves.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#services" className="btn btn-primary">
                Our Services <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#products" className="btn btn-outline">
                Our Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 02 · SERVICES ═══════ */}
      <section id="services" className="section relative bg-[color:var(--ink)] py-24">
        <div className="glow glow-blue w-[520px] h-[520px] -top-32 left-1/4 opacity-22" />
        <SectionRail num="02" label="Services" />

        <div className="container-wide relative z-10">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Our Services</p>
                <h2 className="mt-5 h2">
                  <SplitText text="Solutions built on deep expertise." />
                </h2>
              </div>
              <p className="lg:col-span-5 body-text text-[14px] max-w-[340px]">
                We combine academic rigor with real-world application to deliver solutions that
                matter.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid md:grid-cols-2 gap-5" step={110}>
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  className="card product-card p-7 h-full flex flex-col scroll-mt-28 group"
                >
                  <span className="w-11 h-11 rounded-xl bg-[color:var(--blue)]/12 flex items-center justify-center text-[color:var(--blue-bright)] transition-transform duration-500 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-6 h3">{s.title}</h3>
                  <p className="mt-1.5 font-sans text-[12.5px] text-[color:var(--blue-bright)]">
                    {s.tagline}
                  </p>
                  <p className="mt-4 body-text text-[13.5px]">{s.desc}</p>

                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5 items-start">
                        <Check className="w-3.5 h-3.5 mt-1 text-[color:var(--blue-bright)] shrink-0" />
                        <span className="font-sans text-[13px] text-[color:var(--text-body)]">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="mt-7 pt-5 border-t border-[color:var(--hairline)] inline-flex items-center gap-2 font-sans text-[13.5px] font-semibold text-white hover:text-[color:var(--blue-bright)] transition-colors group/link"
                  >
                    Discuss a project
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 03 · PRODUCTS ═══════ */}
      <section id="products" className="section relative bg-[color:var(--void)] py-24">
        <div className="absolute inset-0 grid-fade opacity-25 pointer-events-none" />
        <SectionRail num="03" label="Products" />

        <div className="container-wide relative z-10">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Our Products</p>
                <h2 className="mt-5 h2">
                  <SplitText text="Software we build and run ourselves." />
                </h2>
              </div>
              <p className="lg:col-span-5 body-text text-[14px] max-w-[340px]">
                One platform live today, and two more in development for institutions that run
                examinations and admissions at scale.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid lg:grid-cols-3 gap-5" step={120}>
            {products.map((p) => (
              <div
                key={p.id}
                id={p.id}
                className="card product-card p-7 h-full flex flex-col scroll-mt-28"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={p.live ? "pill pill-live gap-2" : "badge-gold"}>
                    {p.live && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--blue)] pulse-dot" />
                    )}
                    {p.status}
                  </span>
                  {p.id === "exam-management" && (
                    <ClipboardList className="w-5 h-5 text-[color:var(--text-muted)]" />
                  )}
                  {p.id === "online-counselling" && (
                    <MessagesSquare className="w-5 h-5 text-[color:var(--text-muted)]" />
                  )}
                  {p.live && <Layers className="w-5 h-5 text-[color:var(--text-muted)]" />}
                </div>

                <h3 className="mt-6 font-display font-medium text-[22px] tracking-[-0.03em] text-white">
                  {p.name}
                </h3>
                <p className="mt-1.5 font-sans text-[12.5px] text-[color:var(--blue-bright)]">
                  {p.tagline}
                </p>
                <p className="mt-4 body-text text-[13.5px]">{p.desc}</p>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 items-start">
                      <Check className="w-3.5 h-3.5 mt-1 text-[color:var(--blue-bright)] shrink-0" />
                      <span className="font-sans text-[13px] text-[color:var(--text-body)]">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>

                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 btn btn-primary btn-sm w-full"
                  >
                    Sign up at studnexus.com <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link to="/contact" className="mt-7 btn btn-outline btn-sm w-full">
                    Register interest <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══════ 04 · STUDNEXUS SPOTLIGHT ═══════ */}
      <section className="section relative bg-[color:var(--ink)] py-24 overflow-hidden">
        <Canvas3D variant="flowfield" className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[color:var(--ink)] via-transparent to-[color:var(--ink)]" />
        <SectionRail num="04" label="StudNexus" />

        <div className="container-wide relative z-10">
          <Reveal className="max-w-[600px]">
            <p className="eyebrow">Spotlight</p>
            <h2 className="mt-5 h2">
              <a
                href="https://studnexus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group hover:text-[color:var(--blue-bright)] transition-colors"
              >
                StudNexus
                <ArrowUpRight className="w-6 h-6 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </h2>
            <p className="mt-3 font-display font-medium text-[clamp(18px,2vw,26px)] tracking-[-0.03em] text-gradient">
              One platform. Every learner.
            </p>
            <p className="mt-6 body-text text-[15px]">
              StudNexus brings the entire learning loop together — understand, practise, revise,
              track — so progress compounds instead of leaking between apps. Sign up directly on
              studnexus.com.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://studnexus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Sign up at studnexus.com <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" step={80}>
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="card product-card p-6 h-full flex flex-col group">
                  <span className="w-10 h-10 rounded-xl bg-[color:var(--blue)]/12 flex items-center justify-center text-[color:var(--blue-bright)] transition-transform duration-500 group-hover:scale-110">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h3 className="mt-5 h3">{c.title}</h3>
                  <p className="mt-1.5 font-sans text-[12px] text-[color:var(--blue-bright)]">
                    {c.tagline}
                  </p>
                  <p className="mt-3 body-text text-[13px] flex-1">{c.desc}</p>
                </div>
              );
            })}
          </RevealGroup>

          <Reveal className="mt-12">
            <p className="label text-[color:var(--text-muted)]">Built for</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {audiences.map((a) => (
                <span key={a} className="pill">
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ 05 · CTA ═══════ */}
      <section className="section relative min-h-[64vh] flex items-center bg-[color:var(--void)] overflow-hidden">
        <Canvas3D variant="tunnel" className="absolute inset-0 opacity-85" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[color:var(--void)] via-[color:var(--void)]/72 to-transparent" />
        <SectionRail num="05" label="Lets Talk" />

        <div className="container-wide relative z-10 py-24">
          <Reveal className="max-w-[520px]" direction="left">
            <p className="eyebrow">Ready to Start?</p>
            <h2 className="mt-5 h2">
              <SplitText text="Tell us what you need built." />
            </h2>
            <p className="mt-6 body-text text-[15px] max-w-[400px]">
              Whether it's a service engagement or early access to a product we're building — we'd
              like to hear about it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://studnexus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Visit studnexus.com <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
