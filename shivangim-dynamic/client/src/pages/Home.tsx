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
import Testimonials from "@/components/sections/Testimonials";
import Credentials from "@/components/sections/Credentials";
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

/**
 * Handles arriving at shivangim.com/#proof from a bookmark, an email link, or a
 * "Book a call" button on a case study page. The target may mount a beat after
 * the route does, hence the short retry.
 *
 * Takes the segment after the LAST "#" so it also behaves in the hash-routed
 * preview build, where the hash already holds the route.
 */
function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    const id = hash.slice(hash.lastIndexOf("#") + 1);
    if (!id || id.includes("/")) return;

    let tries = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 10) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  }, []);
}

export default function Home() {
  useDocumentMeta();
  useHashScroll();

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "DM Sans, system-ui, sans-serif", background: "oklch(0.98 0.01 80)" }}
    >
      <Navbar />
      <main>
        <Story />
        <OffersSection />
        <OperatingAreasSection />
        <ProcessSection />
        <ProofSection />
        <Testimonials />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
