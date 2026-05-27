"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  type: z.enum(["job", "collaboration", "opensource", "general"], {
    required_error: "Select an inquiry type",
  }),
  message: z.string().min(20, "Message must be at least 20 characters"),
  companyWebsite: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const INQUIRY_TYPES: { value: FormValues["type"]; label: string }[] = [
  { value: "job", label: "Job Opportunity" },
  { value: "collaboration", label: "Collaboration" },
  { value: "opensource", label: "Open Source" },
  { value: "general", label: "General" },
];

const inputCls =
  "w-full px-3 py-2.5 rounded-lg text-sm font-ui bg-white/[0.04] border border-white/10 text-(--text-primary) placeholder:text-muted-foreground outline-none focus:border-white/35 transition-colors";

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: "general" },
  });

  const selectedType = watch("type");

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSuccess(true);
    } catch {
      setServerError("Something went wrong. Please try again or email me directly.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        {...register("companyWebsite")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      />
      {/* Name */}
      <div>
        <label className="block text-[0.625rem] font-mono uppercase tracking-wide text-muted-foreground mb-1.5">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Your name"
          className={inputCls}
        />
        {errors.name && (
          <p className="text-xs mt-1.5 font-ui" style={{ color: "var(--error)" }}>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-[0.625rem] font-mono uppercase tracking-wide text-muted-foreground mb-1.5">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className={inputCls}
        />
        {errors.email && (
          <p className="text-xs mt-1.5 font-ui" style={{ color: "var(--error)" }}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Inquiry type */}
      <div>
        <label className="block text-[0.625rem] font-mono uppercase tracking-wide text-muted-foreground mb-2">
          Inquiry Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {INQUIRY_TYPES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue("type", value, { shouldValidate: true })}
              className={cn(
                "text-xs px-3 py-1.5 rounded-lg border font-ui transition-all duration-150",
                selectedType === value
                  ? "border-white/30 text-(--text-primary) bg-white/8"
                  : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-(--text-secondary)"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="text-xs mt-1.5 font-ui" style={{ color: "var(--error)" }}>
            {errors.type.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-[0.625rem] font-mono uppercase tracking-wide text-muted-foreground mb-1.5">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell me about your project or what you'd like to discuss..."
          className={cn(inputCls, "resize-none")}
        />
        {errors.message && (
          <p className="text-xs mt-1.5 font-ui" style={{ color: "var(--error)" }}>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit / success */}
      {success ? (
        <div
          className="flex items-center gap-2 py-3 px-4 rounded-lg text-sm font-ui"
          style={{ background: "var(--success-subtle)", color: "var(--success)" }}
        >
          <CheckCircle2 size={15} />
          Message sent! I&apos;ll get back to you within 24–48 hours.
        </div>
      ) : (
        <>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-lg border border-white/20 text-sm font-ui text-(--text-primary) hover:bg-white/6 hover:border-white/30 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>
          {serverError && (
            <p className="text-xs font-ui" style={{ color: "var(--error)" }}>
              {serverError}
            </p>
          )}
        </>
      )}
    </form>
  );
}
