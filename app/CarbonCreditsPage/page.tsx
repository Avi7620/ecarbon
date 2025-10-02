// app/carbon-credits/page.tsx
import React from "react";

import type { Metadata } from "next";

const title = "Carbon Credit — What They Are, Trading, Prices & How They Work";
const description =
  "Carbon credit explained: what carbon credits are, how carbon credit trading works, carbon offset credits, and carbon credit prices (2025). Learn how businesses and projects earn and trade carbon credits.";
const url = "https://yourdomain.com/carbon-credits";
const image = "https://yourdomain.com/images/carbon-credits-hero.jpg"; // replace with your image

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: "EcoCarbon",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
  alternates: { canonical: url },
  metadataBase: new URL("https://yourdomain.com"),
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url,
  image,
  author: {
    "@type": "Organization",
    name: "EcoCarbon Solutions",
    url: "https://yourdomain.com",
  },
  publisher: {
    "@type": "Organization",
    name: "EcoCarbon Solutions",
    logo: {
      "@type": "ImageObject",
      url: "https://yourdomain.com/images/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
  keywords:
    "carbon credit, carbon credits explained, carbon credit trading, carbon offset credits, carbon credit price 2025",
};

export default function CarbonCreditsPage() {
  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero + client interactive area */}
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Carbon Credit — <span className="text-emerald-600">Explained</span>
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                Learn what carbon credits are, how carbon credit trading works,
                what carbon offset credits mean, and the outlook for carbon credit
                prices in 2025. Practical examples, FAQs and interactive tools.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li className="flex items-start gap-3">
                  <strong className="text-emerald-600">•</strong>
                  <span>
                    Clear definitions for{" "}
                    <em className="font-semibold">carbon credits</em> & offsets.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <strong className="text-emerald-600">•</strong>
                  <span>
                    Trading mechanics & how companies buy/sell credits.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <strong className="text-emerald-600">•</strong>
                  <span>
                    Practical examples, price signals and market dynamics.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <strong className="text-emerald-600">•</strong>
                  <span>Interactive price widget & FAQ for quick answers.</span>
                </li>
              </ul>
            </div>

            <div>
              {/* Client interactive component (animations, price widget, FAQ, etc.) */}
              {/* This is a client component to keep SEO on server page but dynamic behaviour client-side */}
              {/* <CarbonCreditsClient /> */}
            </div>
          </div>
        </section>

        {/* Long-form content block for SEO (server rendered) */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 prose lg:prose-xl max-w-none">
          <h2 id="what-are-carbon-credits">What are carbon credits?</h2>
          <p>
            A <strong>carbon credit</strong> represents one metric ton of CO₂ (or
            equivalent greenhouse gas) prevented from entering the atmosphere
            or removed from it. Companies can purchase credits to{" "}
            <strong>offset</strong> emissions they cannot avoid.
          </p>

          <h3 id="carbon-credit-trading">How carbon credit trading works</h3>
          <p>
            There are three main parts: projects that reduce or remove emissions,
            verification/registration platforms that certify reductions, and
            buyers who purchase credits to meet voluntary or regulatory targets.
          </p>

          <h3 id="carbon-offset-credits">Carbon offset credits</h3>
          <p>
            Offset credits are generated by activities like reforestation,
            renewable energy deployment, or methane capture. Trusted standards
            include Verra (VCS), Gold Standard, and others.
          </p>

          <h3 id="carbon-credit-price-2025">Carbon credit price — 2025 outlook</h3>
          <p>
            Prices vary by standard, project type, and jurisdiction. Factors
            influencing price include demand from corporate buyers, regulation,
            vintage, and co-benefits. Use our price widget above for a snapshot.
          </p>

          <h3 id="how-people-make-money">How people & projects make money</h3>
          <p>
            Project developers generate credits by implementing eligible
            activities and selling credits to buyers or through exchanges.
            Traders also profit from price arbitrage and portfolio strategies.
          </p>

          <h3>FAQs</h3>
          <h4>Is buying carbon credits the same as reducing emissions?</h4>
          <p>
            No — buying credits offsets emissions, but the best strategy pairs
            offsetting with direct emission reductions.
          </p>

          <h4>How can I buy or sell credits?</h4>
          <p>
            Organizations can buy from registries, marketplaces, brokers or
            directly from project developers.
          </p>
        </article>
      </main>
    </>
  );
}
