import { ServiceType } from "@/lib/portfolioData";
import { getTestimonialsByService } from "@/lib/testimonialsData";
import TestimonialSlider from "./TestimonialSlider";

interface ServiceTestimonialsProps {
  service: ServiceType;
}

export default function ServiceTestimonials({ service }: ServiceTestimonialsProps) {
  const testimonials = getTestimonialsByService(service);
  if (testimonials.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-strong tracking-tight text-center mb-10 md:mb-14">
          WHAT CLIENTS SAY
        </h2>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
}
