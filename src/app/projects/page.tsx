import { Metadata } from "next";
import ProjectCategoryGrid from "@/components/portfolio/ProjectCategoryGrid";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Projects | Paragon",
  description: "A selection of our work across video, design, funnels, and websites.",
};

export default function ProjectsPage() {
  return (
    <div className="w-full bg-background text-text flex flex-col min-h-screen">
      <header className="w-full pt-28 sm:pt-36 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-strong uppercase mb-4">
            PROJECTS
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-secondary font-normal max-w-2xl text-pretty">
            A selection of our work across video, design, funnels, and websites.
          </p>
        </div>
      </header>

      <main className="w-full flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <ProjectCategoryGrid />
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
