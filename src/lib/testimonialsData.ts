import { ServiceType } from "./portfolioData";

export interface Testimonial {
  id: string;
  service: ServiceType;
  name: string;
  role?: string;
  quote: string;
}

// Dummy placeholder testimonials — temporary project data, not real reviews.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-ve-01",
    service: "video-editing",
    name: "Client Name",
    role: "Client",
    quote: "Great communication and a fast turnaround on every edit.",
  },
  {
    id: "t-ve-02",
    service: "video-editing",
    name: "Client Name",
    role: "Client",
    quote: "The pacing and style were exactly what we were looking for.",
  },
  {
    id: "t-ghl-01",
    service: "ghl",
    name: "Client Name",
    role: "Client",
    quote: "Our funnel was set up quickly and has been running smoothly.",
  },
  {
    id: "t-ghl-02",
    service: "ghl",
    name: "Client Name",
    role: "Client",
    quote: "Clear explanations and responsive support throughout the build.",
  },
  {
    id: "t-gd-01",
    service: "graphic-design",
    name: "Client Name",
    role: "Client",
    quote: "The designs captured our brand better than we expected.",
  },
  {
    id: "t-gd-02",
    service: "graphic-design",
    name: "Client Name",
    role: "Client",
    quote: "Easy to work with and open to feedback at every step.",
  },
  {
    id: "t-wp-01",
    service: "wordpress",
    name: "Client Name",
    role: "Client",
    quote: "Our new site is fast, clean, and easy to update ourselves.",
  },
  {
    id: "t-wp-02",
    service: "wordpress",
    name: "Client Name",
    role: "Client",
    quote: "Delivered on time and handled every revision we asked for.",
  },
];

export function getTestimonialsByService(service: ServiceType): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.service === service);
}
