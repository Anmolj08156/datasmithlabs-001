import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — DataSmith Research Labs" },
      { name: "description", content: "Built on research, powered by AI. Explore our active and upcoming products." },
      { property: "og:title", content: "Products — DataSmith Research Labs" },
      { property: "og:description", content: "Active and upcoming research-led AI products from DataSmith." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400" },
    ],
  }),
  component: ProductsPage,
});

const upcoming = [
  {
    name: "ResearchGraph",
    desc: "A knowledge graph engine that maps the citation, author, and concept relationships across a domain's literature.",
  },
  {
    name: "Insight Studio",
    desc: "A no-code analytics environment for academic teams to model, visualize, and publish findings.",
  },
  {
    name: "Cohort OS",
    desc: "A learning operations platform for institutions running multi-cohort certification programs.",
  },
];

function ProductsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-[140px] pb-24 overflow-hidden bg-[color:var(--off-white)]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.15]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400')`,
          }}
        />
        <div className="container-wide relative z-10 text-center max-w-[900px]">
          <p className="eyebrow">Products</p>
          <h1 className="mt-6 font-serif italic text-[clamp(36px,5.5vw,60px)] leading-[1.1]">
            Built on Research. Powered by AI.
          </h1>
          <p className="mt-6 text-[17px] text-[color:var(--text-body)] max-w-[640px] mx-auto">
            Every product we ship begins as a research question and ends as
            a system that holds up in production.
          </p>
        </div>
      </section>

      {/* Active product */}
      <section className="bg-white py-20">
        <div className="container-wide">
          <Reveal>
            <div className="bg-[color:var(--ink)] text-white rounded-xl p-10 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--cyan)]">
                  Active Product · AI-Powered Learning
                </p>
                <h2 className="mt-5 font-serif italic text-[clamp(32px,4.2vw,48px)] leading-[1.1] text-white">
                  AI Study Companion
                </h2>
                <p className="mt-5 text-[16px] text-white/70 leading-[1.65] max-w-[520px]">
                  An intelligent learning platform that transforms study materials into personalized learning experiences. Upload documents, generate AI-powered summaries, explore concepts in depth, create practice quizzes, and chat directly with your notes for faster and more effective learning.
                </p>

                <ul className="mt-7 space-y-2.5 text-[14px] text-white/85">
                  {[
                    "Upload PDFs and generate structured AI summaries",
                    "Highlight any keyword to get detailed explanations and context",
                    "Create AI-powered quizzes from your study material",
                    "Chat with your notes using a document-grounded AI assistant",
                    "Export enriched notes with annotations and insights",
                    "Discover, share, and bookmark community-created study resources",
                  ].map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-[color:var(--cyan)]">→</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    "AI Summary",
                    "Keyword Explanation",
                    "Quiz Generator",
                    "AI Chat",
                    "PDF Export",
                    "Community Module",
                    "Reward Ecosystem",
                  ].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded bg-white/10 text-white/80 font-mono text-[10px] uppercase tracking-wider border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-9 flex items-center gap-5">
                  <button className="btn btn-cyan">Explore Platform →</button>
                  <span className="font-mono text-[11px] flex items-center gap-2 text-white/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    🟢 Live
                  </span>
                </div>
              </div>

              {/* Mock dashboard */}
              <div className="bg-[color:var(--navy-mid)] rounded-lg p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] text-white/55 uppercase tracking-[0.14em]">
                    COHORT • ACTIVE USERS
                  </p>
                  <span className="font-mono text-[10px] text-[color:var(--cyan)]">LIVE</span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { k: "287", v: "STUDENTS" },
                    { k: "94%", v: "ENGAGEMENT" },
                    { k: "+38%", v: "LEARNING EFFICIENCY" },
                  ].map((s) => (
                    <div key={s.v}>
                      <p className="font-serif italic text-[28px] text-white">{s.k}</p>
                      <p className="font-mono text-[9px] text-white/50 uppercase tracking-[0.08em] mt-1 leading-tight">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-[11px] text-white/55">Knowledge Mastery</p>
                    <p className="font-mono text-[11px] text-white/85">72%</p>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[color:var(--cyan)] rounded-full" style={{ width: "72%" }} />
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  {[
                    { label: "AI Summary Generation", val: "ACTIVE" },
                    { label: "Smart Quiz Builder", val: "UP NEXT" },
                    { label: "AI Notes Chat", val: "LIVE" },
                    { label: "Community Learning", val: "ACTIVE" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between border-t border-white/10 pt-3">
                      <p className="font-mono text-[12px] text-white/75">{r.label}</p>
                      <p className="font-mono text-[10px] text-white/45 uppercase tracking-[0.12em]">{r.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Coming soon */}
      <section className="bg-[color:var(--off-white)] py-24">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">On the Roadmap</p>
            <h2 className="mt-5 font-serif italic text-[clamp(28px,3.6vw,42px)] leading-[1.15] max-w-[640px]">
              Three more products in development.
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {upcoming.map((p) => (
              <Reveal key={p.name}>
                <div className="product-card relative bg-white border border-[color:var(--border)] rounded-[10px] p-7 h-full flex flex-col">
                  <span className="badge-gold absolute top-5 right-5">Coming Soon</span>
                  <h3 className="font-serif text-[24px] text-[color:var(--ink)] leading-tight pr-24">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[14px] text-[color:var(--text-body)] leading-[1.65] flex-1">
                    {p.desc}
                  </p>
                  <div className="mt-7">
                    <Link to="/contact" className="btn btn-outline-ink !h-10 !text-[12px]">
                      Notify Me
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}