"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { goalOptions } from "@/lib/data/site";

const bullets = [
  "Personalized training + nutrition",
  "Weekly check-ins and adjustments",
  "Competition prep available",
];

const fieldClass =
  "w-full rounded-input border border-white/10 bg-white/[0.02] px-4 py-3 font-body text-sm text-text-primary placeholder:text-white/30 outline-none transition-all duration-200 focus:border-accent focus:bg-white/[0.06] focus:shadow-glow min-h-12";

const errorFieldClass = "border-red-400/60 focus:border-red-400";

type Status = "idle" | "loading" | "success";
type FieldName = "name" | "email";

function validate(name: FieldName, value: string) {
  if (name === "name" && value.trim().length < 2) return "Name must be at least 2 characters";
  if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email address";
  return "";
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "" });
  const [touched, setTouched] = useState({ name: false, email: false });
  const [errors, setErrors] = useState({ name: "", email: "" });

  const handleChange = (field: FieldName, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validate(field, value) }));
    }
  };

  const handleBlur = (field: FieldName) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validate(field, values[field]) }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = validate("name", values.name);
    const emailError = validate("email", values.email);
    if (nameError || emailError) {
      setTouched({ name: true, email: true });
      setErrors({ name: nameError, email: emailError });
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      window.setTimeout(() => {
        setStatus("idle");
        setValues({ name: "", email: "" });
        setTouched({ name: false, email: false });
        setErrors({ name: "", email: "" });
      }, 3000);
    }, 1200);
  };

  return (
    <section id="apply" className="w-full bg-bg-primary px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-display text-5xl text-text-primary md:text-6xl">Ready to Start?</h2>
          <p className="mt-4 max-w-md font-body text-text-secondary">
            Apply for coaching and Som will personally review your application within 48 hours.
          </p>
          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 font-body text-sm text-text-secondary">
                <span className="text-accent">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass relative overflow-hidden rounded-card p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-4 py-16 text-center"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex size-14 items-center justify-center rounded-full bg-accent"
                >
                  <Check className="size-7 text-bg-primary" strokeWidth={2.5} />
                </motion.span>
                <p className="font-heading text-xl font-bold text-text-primary">
                  Thanks! We&rsquo;ll be in touch within 48 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 md:gap-5"
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={values.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    aria-invalid={Boolean(errors.name)}
                    className={`${fieldClass} ${errors.name ? errorFieldClass : ""}`}
                  />
                  <FieldError message={errors.name} />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    aria-invalid={Boolean(errors.email)}
                    className={`${fieldClass} ${errors.email ? errorFieldClass : ""}`}
                  />
                  <FieldError message={errors.email} />
                </div>

                <input type="tel" name="phone" placeholder="Phone / WhatsApp" className={fieldClass} />
                <select name="goal" defaultValue="" required className={fieldClass}>
                  <option value="" disabled>
                    Select Your Goal
                  </option>
                  {goalOptions.map((goal) => (
                    <option key={goal} value={goal} className="bg-bg-card">
                      {goal}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  placeholder="Tell us about your goals..."
                  rows={4}
                  className={`${fieldClass} min-h-[100px] resize-none`}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="interactive mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-accent px-6 py-3.5 font-body text-sm font-bold tracking-wide text-bg-primary transition-all duration-200 ease-out-soft active:scale-[0.97] disabled:opacity-70 [@media(hover:hover)]:hover:bg-accent-hover [@media(hover:hover)]:hover:shadow-glow"
                >
                  {status === "loading" && (
                    <span className="size-4 animate-spin rounded-full border-2 border-bg-primary/30 border-t-bg-primary" />
                  )}
                  {status === "loading" ? "Submitting…" : "Apply for Coaching"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 font-body text-xs text-red-400"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
