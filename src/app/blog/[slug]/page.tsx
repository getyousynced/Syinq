import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";
import { StoreButtons } from "@/components/site/buttons";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { BLOG_POSTS, getPost, type Block } from "@/content/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    rawTitle: false,
  });
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.t) {
    case "answer":
      return (
        <div className="my-8 rounded-r-2xl border-l-4 border-brand-500 bg-brand-50 p-6 sm:p-7">
          <p className="text-lg leading-relaxed text-slate-800 sm:text-xl">{block.text}</p>
        </div>
      );
    case "h2":
      return (
        <h2 className="mt-12 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">{block.text}</p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-relaxed text-slate-700 sm:text-lg"
            >
              <span
                className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-500"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
          }),
        ]}
      />

      {/* Article header on a tinted band */}
      <section className="bg-page pt-10 pb-12 sm:pt-12 sm:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-700">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-brand-700">
                    Resources
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="line-clamp-1 text-slate-700" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>

            <header className="mt-7">
              <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-100">
                {post.tag}
              </span>
              <h1 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={15} aria-hidden="true" />
                  <span className="tnum">{post.readingMins} min read</span>
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              </div>
            </header>
          </div>
        </Container>
      </section>

      {/* Article body */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {post.body.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}

            <p className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
              This guide is general information, not legal advice. Syinq supports safer coordination
              but cannot guarantee any outcome, always use your judgement and the in-app safety
              tools.
            </p>
          </article>
        </Container>
      </section>

      {/* Read more */}
      {related.length > 0 && (
        <section className="bg-page py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Read more
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  More answer-first guides on campus commuting, trust and getting a pool started.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {related.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 2) * 80}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span className="inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                        {p.tag}
                      </span>
                      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-brand-700">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.description}</p>
                      <span
                        className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-brand-600 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        Read article
                        <ArrowRight size={16} />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Closing CTA band */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
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
                  Get the app and pool your campus route.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                  Join the verified network, save your route as Looking, and board with proof-of-pool.
                  Free on iOS and Android.
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
