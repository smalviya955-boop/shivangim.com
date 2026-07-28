/**
 * Shivangi Malviya — Product & GTM Strategy Consultant
 *
 * Scroll-driven narrative landing page. Structure follows the brand video
 * script: hook, three proof beats, meta-line, then the supporting detail
 * (operating areas, process, offers, proof, contact).
 *
 * All copy lives in client/src/content/site.ts — edit there, not here.
 */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Story from "@/components/sections/Story";
import {
  OperatingAreasSection,
  ProcessSection,
  OffersSection,
  ProofSection,
} from "@/components/sections/Sections";
import Contact from "@/components/sections/Contact";
import { SEO } from "@/content/site";

function useDocumentMeta() {
  useEffect(() => {
    document.title = SEO.title;

    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
      }
    };

    setMeta('meta[name="description"]', { name: "description", content: SEO.description });
    setMeta('meta[property="og:title"]', { property: "og:title", content: SEO.title });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: SEO.description,
    });
  }, []);
}

export default function Home() {
  useDocumentMeta();

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "DM Sans, system-ui, sans-serif", background: "oklch(0.98 0.01 80)" }}
    >
      <Navbar />
      <main>
        <Story />
        <OperatingAreasSection />
        <ProcessSection />
        <OffersSection />
        <ProofSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
