export type ServiceType = "video-editing" | "ghl" | "graphic-design" | "wordpress";

export interface Project {
  id: string;
  service: ServiceType;
  title: string;
  description: string;
  externalUrl?: string;
  gallery?: string[];
  featured: boolean;
}

export const SERVICES_INFO: Record<
  ServiceType,
  { slug: ServiceType; title: string; intro: string }
> = {
  "video-editing": {
    slug: "video-editing",
    title: "VIDEO EDITING",
    intro: "Cinematic edits with clear pacing, strong visual flow, and attention to detail.",
  },
  ghl: {
    slug: "ghl",
    title: "GHL",
    intro: "Funnels and automated experiences designed around a clear customer journey.",
  },
  "graphic-design": {
    slug: "graphic-design",
    title: "GRAPHIC DESIGN",
    intro: "Visual design focused on clarity, consistency, and purpose.",
  },
  wordpress: {
    slug: "wordpress",
    title: "WORDPRESS",
    intro: "Websites designed to be clear, practical, responsive, and easy to manage.",
  },
};

// GHL and WordPress projects are not ready yet — CLAUDE.md is explicit that
// placeholder/invented projects must not exist here. Add real entries
// (title, description, externalUrl) once real work is supplied.
//
// Graphic Design entries below are real client work from
// public/media/Graphic Design/ — title and description are drawn directly
// from each project's own supplied brief (public/media/Graphic Design/<folder>/*.docx),
// not invented. Multi-image projects (Guacado Paterson, Move N Groove) are
// grouped into one gallery per the brief's own "what we did" listing.
export const ALL_PROJECTS: Project[] = [
  {
    id: "des-benetton",
    service: "graphic-design",
    title: "Flash Sale Campaign Poster",
    description:
      "A promotional poster communicating Benetton's flash sale with a clear, attention-focused layout.",
    gallery: ["/media/Graphic%20Design/Benetton/Benetton.jpg"],
    featured: true,
  },
  {
    id: "des-guacado-paterson",
    service: "graphic-design",
    title: "Social Media Food Series",
    description:
      "A set of social posts showcasing Guacado Paterson's menu items through appetizing food visuals.",
    gallery: [
      "/media/Graphic%20Design/Guacado%20Paterson/chips%20%26%20Queso.png",
      "/media/Graphic%20Design/Guacado%20Paterson/nacho%20cheese%20fries.jpg",
      "/media/Graphic%20Design/Guacado%20Paterson/TACO.png",
    ],
    featured: true,
  },
  {
    id: "des-moven-groove",
    service: "graphic-design",
    title: "Social Media Content Series",
    description:
      "A clean, consistent social content series created for Move N Groove, a Pilates studio.",
    gallery: [
      "/media/Graphic%20Design/MovenGroove/post%201.jpg",
      "/media/Graphic%20Design/MovenGroove/POST%203.jpg",
      "/media/Graphic%20Design/MovenGroove/post%205.jpg",
    ],
    featured: false,
  },
  {
    id: "des-nandos",
    service: "graphic-design",
    title: "High-Protein Meal Poster",
    description:
      "A promotional poster presenting Nando's high-protein meal in a clear, visually appealing way.",
    gallery: ["/media/Graphic%20Design/Nandos/nandos%20high%20proteien%20meal.jpg"],
    featured: false,
  },
  {
    id: "des-ravo-flavour",
    service: "graphic-design",
    title: "Coffee Poster",
    description:
      "A coffee-focused promotional poster for Ravo Flavour, emphasizing the product with strong visual presentation.",
    gallery: ["/media/Graphic%20Design/Ravo%20Flavour/ravo%20flavour.png"],
    featured: false,
  },
  {
    id: "des-scalevexo",
    service: "graphic-design",
    title: "Marketing Social Post",
    description:
      "A marketing-focused social post for Scalevexo, communicating its presence through a concise visual message.",
    gallery: ["/media/Graphic%20Design/Scalevexo/scalevexo.jpg"],
    featured: false,
  },
  {
    id: "des-becon-partners",
    service: "graphic-design",
    title: "Services Overview Post",
    description: "A clear social post communicating what Becon Partners does and the services it provides.",
    gallery: ["/media/Graphic%20Design/beconpartner/beaconpartners.jpg"],
    featured: false,
  },
];

export function getProjectsByService(service: ServiceType): Project[] {
  return ALL_PROJECTS.filter((p) => p.service === service);
}
