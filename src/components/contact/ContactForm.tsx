"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
}

const projectTypes = [
  "Video Editing",
  "GHL",
  "Graphic Design",
  "WordPress",
  "Other"
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+"
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "Video Editing",
    budget: "$5,000 – $10,000",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please provide your name or organization.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please provide a valid email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email format.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us a few details about your project.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      projectType: "Video Editing",
      budget: "$5,000 – $10,000",
      message: ""
    });
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="p-8 md:p-12 rounded-2xl border border-border bg-surface flex flex-col items-center text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-strong/10 flex items-center justify-center text-strong mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="font-display text-2xl md:text-3xl text-strong mb-3 uppercase">
          THANK YOU.
        </h3>

        <p className="text-sm text-secondary max-w-md leading-relaxed mb-8">
          We&apos;ll get back to you soon.
        </p>

        <button
          onClick={handleReset}
          className="text-xs text-strong hover:text-secondary uppercase tracking-wider underline underline-offset-4 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-8 md:p-12 rounded-2xl border border-border bg-surface space-y-8 shadow-sm"
    >
      <div className="border-b border-border pb-4">
        <span className="text-[11px] text-secondary uppercase tracking-widest">
          All fields required
        </span>
      </div>

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs text-strong uppercase tracking-wider">
            NAME
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className={`w-full px-4 py-3.5 rounded-lg border bg-background font-sans text-sm text-text placeholder:text-secondary/50 focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-red-500/50 focus:ring-red-500/20"
                : "border-border focus:border-strong focus:ring-strong/10"
            }`}
          />
          {errors.name && (
            <p className="text-[11px] text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs text-strong uppercase tracking-wider">
            EMAIL
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className={`w-full px-4 py-3.5 rounded-lg border bg-background font-sans text-sm text-text placeholder:text-secondary/50 focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? "border-red-500/50 focus:ring-red-500/20"
                : "border-border focus:border-strong focus:ring-strong/10"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Project Type & Budget Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Type */}
        <div className="space-y-2">
          <label htmlFor="projectType" className="block text-xs text-strong uppercase tracking-wider">
            SERVICE
          </label>
          <select
            id="projectType"
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full px-4 py-3.5 rounded-lg border border-border bg-background font-sans text-sm text-text focus:outline-none focus:border-strong focus:ring-2 focus:ring-strong/10 transition-all cursor-pointer"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label htmlFor="budget" className="block text-xs text-strong uppercase tracking-wider">
            BUDGET
          </label>
          <select
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3.5 rounded-lg border border-border bg-background font-sans text-sm text-text focus:outline-none focus:border-strong focus:ring-2 focus:ring-strong/10 transition-all cursor-pointer"
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs text-strong uppercase tracking-wider">
          MESSAGE
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project..."
          className={`w-full px-4 py-3.5 rounded-lg border bg-background font-sans text-sm text-text placeholder:text-secondary/50 focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.message
              ? "border-red-500/50 focus:ring-red-500/20"
              : "border-border focus:border-strong focus:ring-strong/10"
          }`}
        />
        {errors.message && (
          <p className="text-[11px] text-red-600">{errors.message}</p>
        )}
      </div>

      {/* Submit CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-8 rounded-full bg-strong text-background hover:bg-text active:scale-[0.99] disabled:opacity-70 transition-all duration-300 font-sans text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 group shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Inquiry</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
