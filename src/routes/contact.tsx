import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal, RevealGroup, SplitText } from "../components/site/Reveal";
import { toast } from "sonner";
import { Clock, Mail, MessageCircle, Phone, User } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DataSmith Research Labs" },
      { name: "description", content: "Book a free consultation with DataSmith Research Labs." },
      { property: "og:title", content: "Contact — DataSmith Research Labs" },
      {
        property: "og:description",
        content: "Book a free consultation with DataSmith Research Labs.",
      },
    ],
  }),
  component: ContactPage,
});

const researchAreas = [
  "Genomic & Clinical Data Analysis",
  "Public Health & Epidemiological Modeling",
  "Biostatistics & Experimental Design",
  "Machine Learning & Predictive Modeling",
  "Econometrics & Quantitative Finance",
  "General Data Science & Consulting",
];

const details = [
  { icon: User, label: "Founder & Lead Architect", value: "Anmol Jain" },
  {
    icon: Mail,
    label: "Email",
    value: "datasmithlabs@gmail.com",
    href: "mailto:datasmithlabs@gmail.com",
  },
  { icon: Phone, label: "Phone", value: "+91 7017 283 915", href: "tel:+917017283915" },
  { icon: Clock, label: "Office hours", value: "Mon–Fri · 09:30–18:30 IST" },
];

function ContactPage() {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState(researchAreas[0]);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildWhatsAppMessage = () => {
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—";

    return `Hello DataSmith Research Labs,

I'd like to book a free research consultation. Here are my details:

*Name:* ${name || "—"}
*Institution:* ${institution || "—"}
*Email:* ${email || "—"}
*Phone:* ${phone || "—"}
*Research Area:* ${area}
*Preferred Date:* ${formattedDate}

*Message/Project Brief:*
${message || "—"}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !institution || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    toast.info("Preparing your WhatsApp message...", {
      description: "Redirecting you to WhatsApp shortly.",
    });

    const encodedMessage = encodeURIComponent(buildWhatsAppMessage());
    const whatsappUrl = `https://wa.me/917017283915?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      toast.success("Redirected to WhatsApp!", {
        description: "Please press 'Send' in WhatsApp to dispatch your consultation request.",
      });
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative bg-[color:var(--ink)] text-white overflow-hidden">
        <div className="aurora opacity-70" />
        <div className="absolute inset-0 dot-grid-dark opacity-40 pointer-events-none" />

        <div className="container-wide relative z-10 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="stagger max-w-[680px]">
            <p className="eyebrow">Get in touch</p>
            <h1 className="mt-5 h1">
              Let's build something <span className="text-gradient">meaningful</span>.
            </h1>
            <p className="mt-7 font-sans text-[17px] leading-[1.6] text-white/65 max-w-[520px]">
              Send us a note about your institution, your data, or the research question you're
              trying to answer.
            </p>
          </div>

          <RevealGroup
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            step={90}
            direction="scale"
          >
            {details.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.label} className="card-dark p-5 hover-lift">
                  <Icon className="w-4 h-4 text-[color:var(--cyan)]" />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="mt-2 block font-sans text-[15px] text-white link-underline break-all"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-2 font-sans text-[15px] text-white">{d.value}</p>
                  )}
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── FORM ───────── */}
      <section className="bg-[color:var(--off-white)] border-t border-[color:var(--border)] py-16 sm:py-24">
        <div className="container-wide max-w-[860px]">
          <Reveal className="text-center">
            <p className="eyebrow">Consultation request</p>
            <h2 className="mt-4 h2">
              <SplitText text="Tell us the question." />
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-[1.6] text-[color:var(--text-body)] max-w-[480px] mx-auto">
              Submitting opens WhatsApp with your details pre-filled — you still press send.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <form onSubmit={handleSubmit} className="card p-6 sm:p-9 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Dr. Jane Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Field
                  label="Institution"
                  name="institution"
                  placeholder="University / Company"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@institution.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  placeholder="+91 99999 99999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="area"
                    className="label text-[10px] text-[color:var(--text-muted)]"
                  >
                    Research area <span className="text-[color:var(--cyan)]">*</span>
                  </label>
                  <select
                    id="area"
                    name="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                    className="mt-2.5 w-full h-[46px] px-4 rounded-xl bg-white border border-[color:var(--border)] font-sans text-[14px] text-[color:var(--ink)] outline-none focus:border-[color:var(--cyan)] focus:ring-2 focus:ring-[color:var(--cyan)]/20 transition-all cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%238b93a3' stroke-linecap='round' stroke-width='1.6' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: "right 0.9rem center",
                      backgroundSize: "1.15rem",
                      backgroundRepeat: "no-repeat",
                      paddingRight: "2.5rem",
                    }}
                  >
                    {researchAreas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <Field
                  label="Preferred date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="label text-[10px] text-[color:var(--text-muted)]"
                >
                  Message / project brief <span className="text-[color:var(--cyan)]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project, dataset, or question."
                  className="mt-2.5 w-full px-4 py-3 rounded-xl bg-white border border-[color:var(--border)] font-sans text-[14px] text-[color:var(--ink)] placeholder-[color:var(--text-muted)] outline-none focus:border-[color:var(--cyan)] focus:ring-2 focus:ring-[color:var(--cyan)]/20 transition-all resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-ink btn-lg w-full disabled:opacity-70"
              >
                {isSubmitting ? (
                  "Connecting to WhatsApp…"
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Send inquiry via WhatsApp
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="label text-[10px] text-[color:var(--text-muted)]">
        {label} {required && <span className="text-[color:var(--cyan)]">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-2.5 w-full h-[46px] px-4 rounded-xl bg-white border border-[color:var(--border)] font-sans text-[14px] text-[color:var(--ink)] placeholder-[color:var(--text-muted)] outline-none focus:border-[color:var(--cyan)] focus:ring-2 focus:ring-[color:var(--cyan)]/20 transition-all"
      />
    </div>
  );
}
