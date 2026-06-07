import { createFileRoute } from "@tanstack/react-router";
import {
  Header, Hero, Ticker, Search_, Programs, NextSteps, Research,
  WhatsNew, Events, Support, Vision, Mosaic, Lead, Footer, FloatingCTAs,
} from "@/components/sections/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhiteHouse College of Business & Technology — KU Affiliated IT College in Nepal" },
      { name: "description", content: "WhiteHouse Education Foundation (WEF) & WCBT — Kathmandu University affiliated BIT, B.Tech Ed IT, AI & technology programs in Damak, Nepal." },
      { name: "keywords", content: "WhiteHouse College, WhiteHouse Education Foundation, BIT Nepal, B.Tech Education IT, Kathmandu University Affiliated College, IT College in Nepal, Technology Education Nepal" },
      { property: "og:title", content: "WhiteHouse College of Business & Technology" },
      { property: "og:description", content: "Empowering future innovators, technologists and leaders. KU affiliated programs in Eastern Nepal." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        name: "WhiteHouse College of Business & Technology",
        url: "/",
        address: { "@type": "PostalAddress", addressLocality: "Damak", addressRegion: "Jhapa", addressCountry: "NP" },
        telephone: "01-5199456",
        email: "info@whitehouseeducation.edu.np",
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-full">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Search_ />
        <Programs />
        <NextSteps />
        <Research />
        <WhatsNew />
        <Events />
        <Support />
        <Vision />
        <Mosaic />
        <Lead />
      </main>
      <Footer />
      <FloatingCTAs />
    </>
  );
}
