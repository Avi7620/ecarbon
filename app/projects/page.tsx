// app/projects/page.tsx
import ProjectsComponent from "@/components/projects";

// Page-specific metadata
export const metadata = {
  title: "ECarbon Projects - Verified Carbon Offset Initiatives",
  description:
    "Explore ECarbon's verified carbon offset projects worldwide, including forest conservation, renewable energy, and marine restoration.",
  keywords: [
    "ecarbon projects",
    "carbon offset",
    "forest conservation",
    "renewable energy",
    "marine restoration",
    "sustainable projects",
    "carbon reduction",
    "climate action",
    "net zero","ecarbon projects","ecarbon render projects","ecarbon verified projects","carbon offset initiatives","carbon offset programs","carbon offset solutions",
    "carbon offset strategies","carbon offset technologies","carbon offset innovations","carbon offset research","carbon offset development",
    "carbon offset education","carbon offset awareness","carbon offset advocacy","carbon offset activism","carbon offset community","carbon offset network",
  ],
  robots: "index, follow",
  openGraph: {
    title: "EcoCarbon Projects - Verified Carbon Offset Initiatives",
    description: "Explore EcoCarbon's verified carbon offset projects worldwide.",
    url: "https://ecarbon5.onrender.com/projects",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoCarbon Projects",
    description: "Explore EcoCarbon's verified carbon offset projects worldwide.",
    images: ["https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg"],
  },
  other: [
    {
      type: "application/ld+json",
      json: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "EcoCarbon",
        url: "https://ecarbon5.onrender.com",
        logo: "https://www.ecocarbon.com/logo.png",
        sameAs: [
          "https://www.linkedin.com/company/ecocarbon",
          "https://www.facebook.com/ecocarbon",
        ],
      },
    },
  ],
};

export default function ProjectsPage() {
  return <ProjectsComponent />;
}
