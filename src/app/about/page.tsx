import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import TeamSection from "@/components/team/TeamSection";
import CapabilitiesList from "@/components/about/CapabilitiesList";
import ProcessSection from "@/components/about/ProcessSection";
import FinalCTA from "@/components/ui/FinalCTA";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About | Paragon",
  description: "Three creators working across video, design, and digital experiences.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-background text-text flex flex-col min-h-screen">
      <AboutHero />
      <TeamSection />
      <CapabilitiesList />
      <ProcessSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
