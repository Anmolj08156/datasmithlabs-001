import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { toast } from "sonner";
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Briefcase,
  MessageCircle,
  Clock
} from "lucide-react";

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
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("Genomic & Clinical Data Analysis");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildWhatsAppMessage = () => {
    const formattedDate = date 
      ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
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

    const waText = buildWhatsAppMessage();
    const encodedMessage = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/917017283915?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      toast.success("Redirected to WhatsApp!", {
        description: "Please press 'Send' in WhatsApp to dispatch your consultation request.",
      });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <section className="bg-[color:var(--off-white)] pt-[140px] pb-28 min-h-screen">
      <div className="container-wide max-w-[1000px]">
        <Reveal>
          <p className="eyebrow text-center">Get in Touch</p>
          <h1 className="mt-6 font-serif italic text-[clamp(36px,5vw,52px)] leading-[1.1] text-center text-[color:var(--ink)]">
            Let's build something meaningful.
          </h1>
          <p className="mt-6 text-[17px] text-[color:var(--text-body)] text-center max-w-[600px] mx-auto">
            Send us a note about your institution, your data, or the research
            question you're trying to answer.
          </p>
        </Reveal>

        <div className="mt-16 max-w-[680px] mx-auto">
          {/* Form */}
          <Reveal>
            <form
              className="bg-white border border-[color:var(--border)] rounded-xl p-8 space-y-6 shadow-xs"
              onSubmit={handleSubmit}
            >
              <h2 className="text-xl font-serif border-b border-[color:var(--border)] pb-4 font-semibold text-[color:var(--ink)]">
                Consultation Request Form
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-5">
                <Field 
                  label="Name" 
                  name="name" 
                  placeholder="Dr. Jane Doe" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  icon={User}
                />
                <Field 
                  label="Institution" 
                  name="institution" 
                  placeholder="University / Company" 
                  required 
                  value={institution} 
                  onChange={(e) => setInstitution(e.target.value)} 
                  icon={Building2}
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
                  icon={Mail}
                />
                <Field 
                  label="Phone (optional)" 
                  name="phone" 
                  placeholder="+91 99999 99999" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  icon={Phone}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)] flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[color:var(--text-muted)]" />
                    <span>Research Area</span>
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    name="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                    className="mt-2 w-full bg-white border border-[color:var(--border)] rounded-md p-3 text-[14px] text-[color:var(--ink)] focus:border-[color:var(--blue)] focus:ring-1 focus:ring-[color:var(--blue)] outline-none transition-all duration-200 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1.25rem",
                      backgroundRepeat: "no-repeat",
                      paddingRight: "2.5rem"
                    }}
                  >
                    <option value="Genomic & Clinical Data Analysis">Genomic & Clinical Data Analysis</option>
                    <option value="Public Health & Epidemiological Modeling">Public Health & Epidemiological Modeling</option>
                    <option value="Biostatistics & Experimental Design">Biostatistics & Experimental Design</option>
                    <option value="Machine Learning & Predictive Modeling">Machine Learning & Predictive Modeling</option>
                    <option value="Econometrics & Quantitative Finance">Econometrics & Quantitative Finance</option>
                    <option value="General Data Science & Consulting">General Data Science & Consulting</option>
                  </select>
                </div>
                
                <Field 
                  label="Preferred Date" 
                  name="date" 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  icon={Calendar}
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[color:var(--text-muted)]" />
                  <span>Message / Project Brief</span>
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project, dataset, or question."
                  className="mt-2 w-full bg-white border border-[color:var(--border)] rounded-md p-3 text-[15px] text-[color:var(--ink)] focus:border-[color:var(--blue)] focus:ring-1 focus:ring-[color:var(--blue)] outline-none transition-all duration-200 resize-y"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`btn btn-ink btn-lg w-full flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden select-none ${
                  isSubmitting ? "opacity-90 bg-emerald-700 cursor-not-allowed" : "hover:bg-emerald-600"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting to WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 fill-current text-white" />
                    <span>Send Inquiry via WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Contact details section at bottom */}
        <Reveal className="mt-20 pt-10 border-t border-[color:var(--border)]">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Founder & Lead Architect</p>
              <p className="mt-2 text-[17px] font-serif text-[color:var(--ink)] font-medium">
                Anmol Jain
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Email</p>
              <a href="mailto:datasmithlabs@gmail.com" className="link-cyan mt-2 block text-[17px] font-serif font-medium">
                datasmithlabs@gmail.com
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Phone</p>
              <a href="tel:+917017283915" className="link-cyan mt-2 block text-[17px] font-serif font-medium">
                +91 7017 283 915
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Office Hours</p>
              <p className="mt-2 text-[14px] text-[color:var(--text-body)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[color:var(--text-muted)]" />
                <span>Mon — Fri | 09:30 – 18:30 IST</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
  icon: Icon 
}: { 
  label: string; 
  name: string; 
  type?: string; 
  placeholder?: string; 
  required?: boolean; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  icon?: any; 
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-muted)] flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-[color:var(--text-muted)]" />}
        <span>{label}</span>
        {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-2 w-full bg-white border border-[color:var(--border)] rounded-md p-3 text-[14px] text-[color:var(--ink)] focus:border-[color:var(--blue)] focus:ring-1 focus:ring-[color:var(--blue)] outline-none transition-all duration-200"
      />
    </div>
  );
}