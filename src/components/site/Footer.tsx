import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import { SITE, SOCIAL, FOOTER_NAV } from "@/lib/site";
import { StoreButtons } from "@/components/site/buttons";
import Lottie from "@/components/site/Lottie";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="w-full overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50/40 to-white">
        <Lottie
          src="/revamp/lottie/footer-loading.lottie"
          label="Syinq — campus commute, in motion"
          className="mx-auto h-44 w-full max-w-content sm:h-60"
        />
      </div>
      <div className="container-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Image
              src="/revamp/brand/syinq-wordmark.png"
              alt="Syinq"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              India&apos;s verified campus commute network. Find trusted people from your
              campus going the same way — and split the cost fairly.
            </p>
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Get the app
              </p>
              <StoreButtons />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Syinq on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 ring-1 ring-slate-200 transition-colors hover:text-brand-600 hover:ring-brand-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Syinq on LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 ring-1 ring-slate-200 transition-colors hover:text-brand-600 hover:ring-brand-200"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-1">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-[40px] items-center text-sm text-slate-600 transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
