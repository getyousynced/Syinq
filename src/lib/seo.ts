import type { Metadata } from "next";
import { SITE } from "@/lib/site";

const OG_IMAGE = "/revamp/og/og-default.png";

/**
 * Build a complete, unique per-page Metadata object with canonical + OG/Twitter.
 * `path` must start with "/". The root layout's title template appends " | Syinq",
 * so the page title here is the bare title (no manual suffix). Set `rawTitle` to
 * bypass the template entirely (absolute title).
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  rawTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  const image = opts.image ?? OG_IMAGE;
  const socialTitle = opts.rawTitle ? opts.title : `${opts.title} | ${SITE.name}`;
  return {
    title: opts.rawTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    robots: opts.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: socialTitle,
      description: opts.description,
      locale: SITE.locale,
      images: [{ url: image, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: opts.description,
      images: [image],
    },
  };
}
