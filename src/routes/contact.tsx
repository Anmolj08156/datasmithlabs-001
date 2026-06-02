import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DataSmith Research Labs" },
      { name: "description", content: "Book a free consultation with DataSmith Research Labs." },
      { property: "og:title", content: "Contact — DataSmith Research Labs" },
      { property: "og:description", content: "Book a free consultation with DataSmith Research Labs." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="bg-[color:var(--off-white)] pt-[140px] pb-28 min-h-screen">
      <div className="container-wide max-w-[920px]">
        <Reveal>
          <p className="eyebrow text-center">Get in Touch</p>
          <h1 className="mt-6 font-serif italic text-[clamp(36px,5vw,52px)] leading-[1.1] text-center">
            Let's build something meaningful.
          </h1>
          <p className="mt-6 text-[17px] text-[color:var(--text-body)] text-center max-w-[600px] mx-auto">
            Send us a note about your institution, your data, or the research
            question you're trying to answer.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-5 gap-12">
          <Reveal className="lg:col-span-3">
            <form
              className="bg-white border border-[color:var(--border)] rounded-lg p-8 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" placeholder="Dr. Jane Doe" />
                <Field label="Institution" placeholder="University / Company" />
              </div>
              <Field label="Email" type="email" placeholder="you@institution.edu" />
              <Field label="Phone (optional)" placeholder="+91 ..." />
              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project, dataset, or question."
                  className="mt-2 w-full bg-white border border-[color:var(--border)] rounded-md p-3 text-[15px] text-[color:var(--ink)] focus:border-[color:var(--blue)] outline-none"
                />
              </div>
              <button type="submit" className="btn btn-ink btn-lg w-full">
                Book a Free Consultation →
              </button>
            </form>
          </Reveal>

          <Reveal className="lg:col-span-2 space-y-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Email</p>
              <a href="mailto:datasmithlabs@gmail.com" className="link-cyan mt-2 block text-[18px] font-serif">
                datasmithlabs@gmail.com
              </a>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Phone</p>
              <a href="tel:+917017283915" className="link-cyan mt-2 block text-[18px] font-serif">
                +91 7017 283 915
              </a>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Social</p>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="link-cyan mt-2 block text-[18px] font-serif">
                LinkedIn →
              </a>
            </div>
            <div className="pt-6 border-t border-[color:var(--border)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Office Hours</p>
              <p className="mt-2 text-[15px] text-[color:var(--text-body)]">
                Monday — Friday<br />09:30 – 18:30 IST
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full bg-white border border-[color:var(--border)] rounded-md p-3 text-[15px] text-[color:var(--ink)] focus:border-[color:var(--blue)] outline-none"
      />
    </div>
  );
}