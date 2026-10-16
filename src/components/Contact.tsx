import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { profile, socials } from "@/data/profile";

const emptyForm = { name: "", email: "", message: "" };

// FormSubmit relays the form to the inbox without a backend. The very first submission
// sends a one-time activation email to profile.email; messages arrive after that.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  // Fallback when the relay is unreachable: hand the message to the visitor's mail client.
  const openMailClient = () => {
    const subject = encodeURIComponent(`Hello from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast("Opening your email client…", { description: "Your message is pre-filled and ready to send." });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "Send failed");
      toast.success("Message sent!", { description: "Thanks — I'll get back to you soon." });
      setForm(emptyForm);
    } catch (err) {
      // e.g. "This form needs Activation…" until the FormSubmit activation link is clicked
      console.error("Contact form relay failed:", err);
      openMailClient();
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fieldClass =
    "h-11 bg-background transition-[border-color,box-shadow] focus-visible:border-primary/50 focus-visible:ring-ring/30 focus-visible:ring-offset-0";

  return (
    <Section
      id="contact"
      label="Contact"
      title="Have a role or a project in mind?"
      description="I'm open to new opportunities and full-stack .NET and Angular projects. Email is the fastest way to reach me."
    >
      <Reveal variant="scale">
        <div className="relative mb-5 overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-[0_30px_60px_-30px_hsl(var(--foreground)/0.5)] md:p-10">
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-tight md:text-3xl">Let's build something reliable.</p>
              <p className="mt-2 max-w-xl text-primary-foreground/75">
                APIs, Angular frontends and data models — from first schema to production.
              </p>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="btn group h-11 shrink-0 bg-primary-foreground px-5 font-semibold text-primary shadow-lg hover:-translate-y-0.5 hover:bg-primary-foreground/90"
            >
              Email me <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </Reveal>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <Reveal variant="left">
          <div className="card relative isolate flex h-full flex-col overflow-hidden p-6 md:p-8">
            <p className="label text-[11px]">Email</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="text-gradient relative break-all text-xl font-semibold tracking-tight md:text-2xl">
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="btn btn-outline h-8 gap-1.5 px-2.5 text-xs"
                aria-label="Copy email address"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <p className="label mt-10 text-[11px]">Elsewhere</p>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 py-3.5 text-sm transition-colors hover:text-primary"
                    >
                      <span className="icon-tile h-8 w-8 bg-primary/10 text-primary ring-primary/20 group-hover:scale-110">
                        <s.icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{s.label}</span>
                      <span className="text-muted-foreground">/{s.handle}</span>
                      <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                  </li>
                ))}
            </ul>

            <a href={profile.resume} download className="btn btn-outline group mt-8 h-10 w-fit px-4">
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download CV (PDF)
            </a>

            <p className="mt-auto pt-10 text-sm text-muted-foreground">
              {profile.location} · {profile.timezone}
            </p>
          </div>
        </Reveal>

        <Reveal variant="right" delay={80}>
          <form onSubmit={handleSubmit} className="card relative space-y-5 overflow-hidden p-6 md:p-8" aria-label="Contact form">
            <span className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" aria-hidden />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" name="name" autoComplete="name" placeholder="Jane Doe" value={form.name} onChange={handleChange} required className={fieldClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} required className={fieldClass} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="A few lines about the role or project…"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className={`${fieldClass} h-auto resize-none`}
              />
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">Goes straight to my inbox — I usually reply within a day.</p>
              <button type="submit" disabled={sending} className="btn btn-primary group h-11 px-5">
                {sending ? (
                  <>
                    Sending… <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message{" "}
                    <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
};

export default Contact;
