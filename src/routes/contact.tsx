import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { toast } from "sonner";

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
  { label: "Founder & Lead Architect", value: "Anmol Jain" },
  { label: "Email", value: "datasmithlabs@gmail.com", href: "mailto:datasmithlabs@gmail.com" },
  { label: "Phone", value: "+91 7017 283 915", href: "tel:+917017283915" },
  { label: "Office Hours", value: "Mon — Fri · 09:30–18:30 IST" },
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
      {/* ═══════════ HERO ═══════════ */}
      <section className="bg-[color:var(--ink)] text-white pt-[72px]">
        <div className="container-wide pt-16 pb-14 sm:pt-24 sm:pb-20 stagger">
          <p className="label text-[color:var(--cyan)]">Get in Touch</p>
          <h1 className="mt-8 display display-xl">
            Let's build
            <br />
            something
            <br />
            <span className="text-[color:var(--cyan)]">meaningful.</span>
          </h1>
          <p className="mt-12 font-sans text-[16px] sm:text-[18px] leading-[1.55] text-white/75 max-w-[52ch]">
            Send us a note about your institution, your data, or the research question you're trying
            to answer.
          </p>
        </div>

        <div className="border-t-2 border-white/20">
          <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-4">
            {details.map((d, i) => (
              <div
                key={d.label}
                className={`py-7 lg:px-8 lg:first:pl-0 border-white/20 ${
                  i < details.length - 1 ? "border-b-2 sm:border-b-0 lg:border-r-2" : ""
                } ${i === 0 ? "sm:border-r-2" : ""} ${i === 1 ? "sm:border-b-2 lg:border-b-0" : ""} ${
                  i === 2 ? "sm:border-r-2" : ""
                }`}
              >
                <p className="label text-[9px] text-white/40">{d.label}</p>
                {d.href ? (
                  <a
                    href={d.href}
                    className="mt-3 block font-sans text-[15px] text-white hover:text-[color:var(--cyan)] transition-colors break-all"
                  >
                    {d.value}
                  </a>
                ) : (
                  <p className="mt-3 font-sans text-[15px] text-white">{d.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FORM ═══════════ */}
      <section className="bg-[color:var(--off-white)] text-[color:var(--ink)] border-t-2 border-[color:var(--ink)] py-16 sm:py-24 grid-lines">
        <div className="container-wide">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-10">
              <div className="lg:col-span-7">
                <p className="label text-[color:var(--cyan)]">Consultation Request</p>
                <h2 className="mt-6 display display-md">Tell us the question.</h2>
              </div>
              <p className="lg:col-span-5 font-sans text-[15px] leading-[1.6] text-[color:var(--text-body)]">
                Fields marked with an asterisk are required. Submitting opens WhatsApp with your
                details pre-filled — you still press send.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <form onSubmit={handleSubmit} className="border-2 border-[color:var(--ink)] bg-white">
              <div className="grid sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Dr. Jane Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-b-2 sm:border-r-2 border-[color:var(--ink)]"
                />
                <Field
                  label="Institution"
                  name="institution"
                  placeholder="University / Company"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="border-b-2 border-[color:var(--ink)]"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@institution.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b-2 sm:border-r-2 border-[color:var(--ink)]"
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  placeholder="+91 99999 99999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-b-2 border-[color:var(--ink)]"
                />

                <div className="p-6 sm:p-7 border-b-2 sm:border-r-2 border-[color:var(--ink)]">
                  <label
                    htmlFor="area"
                    className="label text-[10px] text-[color:var(--text-muted)]"
                  >
                    Research Area <span className="text-[color:var(--cyan)]">*</span>
                  </label>
                  <select
                    id="area"
                    name="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                    className="mt-3 w-full bg-transparent border-0 border-b-2 border-[color:var(--ink)] pb-2 font-sans text-[15px] text-[color:var(--ink)] outline-none focus:border-[color:var(--cyan)] transition-colors cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%230b1526' stroke-linecap='round' stroke-width='2' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: "right 0 center",
                      backgroundSize: "1.15rem",
                      backgroundRepeat: "no-repeat",
                      paddingRight: "1.75rem",
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
                  label="Preferred Date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-b-2 border-[color:var(--ink)]"
                />
              </div>

              <div className="p-6 sm:p-7 border-b-2 border-[color:var(--ink)]">
                <label
                  htmlFor="message"
                  className="label text-[10px] text-[color:var(--text-muted)]"
                >
                  Message / Project Brief <span className="text-[color:var(--cyan)]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project, dataset, or question."
                  className="mt-3 w-full bg-transparent border-0 border-b-2 border-[color:var(--ink)] pb-2 font-sans text-[15px] text-[color:var(--ink)] placeholder-[color:var(--text-muted)] outline-none focus:border-[color:var(--cyan)] transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-ink btn-lg w-full !border-0 disabled:opacity-70"
              >
                {isSubmitting ? "Connecting to WhatsApp…" : "Send Inquiry via WhatsApp →"}
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
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <div className={`p-6 sm:p-7 ${className}`}>
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
        className="mt-3 w-full bg-transparent border-0 border-b-2 border-[color:var(--ink)] pb-2 font-sans text-[15px] text-[color:var(--ink)] placeholder-[color:var(--text-muted)] outline-none focus:border-[color:var(--cyan)] transition-colors"
      />
    </div>
  );
}
