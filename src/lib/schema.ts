import { SITE, STORE, SOCIAL, APP_FACTS, FOUNDERS } from "@/lib/site";

/**
 * JSON-LD builders for entity resolution + AEO.
 * Only confirmed, resolvable URLs go into `sameAs`.
 */

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

// Confirmed, resolvable profiles (app stores + official social). Add Crunchbase/
// Wikidata here once those entities exist.
const CONFIRMED_SAME_AS = [STORE.apple, STORE.google, SOCIAL.instagram, SOCIAL.linkedin];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/revamp/brand/syinq-icon.png`,
    description: SITE.description,
    email: SITE.email,
    foundingDate: "2025",
    areaServed: { "@type": "Country", name: "India" },
    founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name })),
    sameAs: CONFIRMED_SAME_AS,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE.name,
    operatingSystem: APP_FACTS.operatingSystem,
    applicationCategory: APP_FACTS.applicationCategory,
    description: SITE.description,
    url: SITE.url,
    installUrl: [STORE.apple, STORE.google],
    publisher: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: APP_FACTS.priceINR,
      priceCurrency: "INR",
    },
  };
}

export function personSchema(founder: (typeof FOUNDERS)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    worksFor: { "@id": ORG_ID },
    knowsAbout: [...founder.knowsAbout],
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  };
}

export function howToSchema(
  name: string,
  steps: { name: string; text: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    url: `${SITE.url}/blog/${a.slug}`,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

