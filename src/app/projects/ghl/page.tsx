import { Metadata } from "next";
import { SERVICES_INFO, getProjectsByService } from "@/lib/portfolioData";
import ExternalProjectCard from "@/components/portfolio/ExternalProjectCard";
import EmptyServiceState from "@/components/portfolio/EmptyServiceState";
import ServiceTestimonials from "@/components/testimonials/ServiceTestimonials";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "GHL | Paragon",
  description: "Funnels and automated experiences designed around a clear customer journey.",
};

export default function GHLPage() {
  const service = SERVICES_INFO["ghl"];
  const projects = getProjectsByService("ghl");

  return (
    <div className="w-full bg-background text-text flex flex-col min-h-screen">
      <header className="w-full pt-28 sm:pt-36 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-strong uppercase mb-4">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary font-normal max-w-2xl text-pretty">
            {service.intro}
          </p>
        </div>
      </header>

      <main className="w-full flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.length > 0 ? (
              projects.map((project) => <ExternalProjectCard key={project.id} project={project} />)
            ) : (
              <EmptyServiceState message={`New ${service.title} projects are on their way.`} />
            )}
          </div>
        </Reveal>
      </main>

      <ServiceTestimonials service="ghl" />

      <Footer />
    </div>
  );
}
