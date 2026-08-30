import ProjectCategoryGrid from "./ProjectCategoryGrid";

export default function HomeFeaturedWork() {
  return (
    <section className="w-full py-12 md:py-16" id="featured-work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-strong tracking-tight">
            FEATURED WORK
          </h2>
        </div>

        <ProjectCategoryGrid />
      </div>
    </section>
  );
}
