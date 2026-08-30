"use client";

import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="p-6 md:p-8 rounded-xl border border-border bg-surface">
        <div className="flex items-center gap-2 text-xs text-secondary uppercase tracking-widest mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Email</span>
        </div>
        <a
          href="mailto:hello@paragon.com"
          className="text-xl md:text-2xl text-strong hover:text-secondary transition-colors block"
        >
          hello@paragon.com
        </a>
      </div>

      <div className="p-6 md:p-8 rounded-xl border border-border bg-surface grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-secondary uppercase tracking-widest mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Location</span>
          </div>
          <p className="text-base text-strong font-medium">City, Country</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-secondary uppercase tracking-widest mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Hours</span>
          </div>
          <p className="text-base text-strong font-medium">Mon &ndash; Fri</p>
        </div>
      </div>

      <div className="p-6 md:p-8 rounded-xl border border-border bg-surface">
        <span className="text-xs text-secondary uppercase tracking-widest block mb-4">Social</span>

        <div className="flex flex-wrap gap-3 text-xs">
          {[
            { label: "Instagram", url: "#" },
            { label: "Behance", url: "#" },
            { label: "LinkedIn", url: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.url}
              className="px-4 py-2 rounded-lg border border-border bg-background text-text hover:bg-strong hover:text-background hover:border-strong transition-all duration-300 inline-flex items-center gap-1 group"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
