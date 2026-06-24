import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { StoreButtons } from "@/components/site/buttons";
import Lottie from "@/components/site/Lottie";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = pageMeta({
  title: "Resources & Blog",
  description:
    "Answer-first guides to campus commuting in India, carpooling legality, proof-of-pool explained, and how to start a campus carpool that lasts.",
  path: "/blog",
});

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export default function BlogHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/blog" },
        ])}
      />

      {/* Page hero */}
      <section className="bg-page py-16 sm:py-20 lg:py-24">
        <Container className="relative">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Resources</span>
            <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Campus commuting, explained
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Clear, answer-first guides for verified campus members, the legality of carpooling in
              India, how proof-of-pool builds trust, and a playbook for starting a campus carpool
              that actually keeps running. Written to be read in minutes.
            </p>
          </Reveal>

          <div className="pointer-events-none absolute right-0 top-1/2 hidden h-48 w-48 -translate-y-1/2 lg:block xl:h-56 xl:w-56">
            <Lottie
              src="/revamp/lottie/map-browsing.lottie"
              label="Animated map browsing for campus routes and resources"
              className="h-full w-full"
            />
          </div>
        </Container>
      </section>

      {/* Post grid */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {post.tag}
                  </span>
                  <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-brand-700">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{post.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Clock size={14} aria-hidden="true" />
                      <span className="tnum">{post.readingMins} min read</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      Read
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA band */}
      <section className="bg-page py-16 sm:py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center sm:px-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="relative mx-auto max-w-2xl">
                <Image
                  src="/revamp/brand/syinq-wordmark.png"
                  alt="Syinq"
                  width={140}
                  height={42}
                  className="mx-auto h-9 w-auto brightness-0 invert"
                />
                <h2 className="mt-6 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Stop reading. Start pooling.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                  Join the verified campus network, find your route, and split the running cost with
                  people from your own university. Free on iOS and Android.
                </p>
                <div className="mt-8 flex justify-center">
                  <StoreButtons />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
