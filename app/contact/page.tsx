// app/contact/page.tsx
import ContactComponent from "@/components/contact";

// Page-specific metadata
export const metadata = {
  title: "Contact ECarbon | Carbon Offset & Sustainability Solutions",
  metadataBase: new URL("https://ecarbon5.onrender.com"),
  description: "Get in touch with EcoCarbon to discuss carbon offset and sustainability solutions. Contact us via form, email, or phone.",
 keywords: [
  "eCarbon contact",
  "carbon offset",
  "sustainability solutions",
  "renewable energy",
  "forest conservation",
  "sustainability consulting",
  "phone number",
  "email",
  "address",
  "contact form",
  "customer support",
  "inquiries",
  "partnerships",
  "collaborations",
  "feedback",
  "sustainability goals",
  "carbon footprint",
  "environmental impact",
  "corporate social responsibility",
  "CSR",
  "green initiatives",
  "eco-friendly practices",
  "sustainable development",
  "climate action",
  "net zero",
  "carbon neutrality",
  "GHG emissions",
  "carbon management",
  "carbon reduction strategies",
  "sustainability reporting",
  "ESG (Environmental, Social, and Governance)",
  "sustainable business practices",
  "green business solutions",
  "environmental consulting",
  "sustainability workshops",
  "community engagement",
  "stakeholder collaboration",
  "ecarbon support",
  "ecarbon help",
  "ecarbon inquiries",
  "ecarbon feedback",
  "ecarbon partnerships",
  "ecarbon collaborations"
],
 robots: "index, follow",
  openGraph: {
    title: "Contact ECarbon | Carbon Offset & Sustainability Solutions",
    description: "Reach out to ECarbon to discuss your carbon offset and sustainability goals.",
    url: "https://ecarbon5.onrender.com/contact",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ECarbon | Carbon Offset & Sustainability Solutions",
    description: "Reach out to EcoCarbon to discuss your carbon offset and sustainability goals.",
    images: ["https://images.pexels.com/photos/1108175/pexels-photo-1108175.jpeg"],
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
          "https://www.facebook.com/ecocarbon"
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            "telephone": "+91 XXX XXX XXX",
            "contactType": "Customer Service"
          }
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Konark Alpha, Sr No 50, 2, Nagar Road, Kharadi",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "411014",
          addressCountry: "IN"
        }
      }
    }
  ]
};

export default function ContactPage() {
  return <ContactComponent />;
}
