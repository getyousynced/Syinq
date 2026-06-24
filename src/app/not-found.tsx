import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { CTAButton } from "@/components/site/buttons";

export default function NotFound() {
  return (
    <section className="bg-brand-soft">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="bg-brand-gradient bg-clip-text text-[110px] font-bold leading-none text-transparent sm:text-[150px]">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          You&apos;ve gone <span className="text-brand-600">off-campus</span>
        </h1>
        <p className="mt-4 max-w-md text-base text-slate-600">
          The page you&apos;re looking for isn&apos;t on this route. Let&apos;s get you back to
          familiar ground.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <CTAButton href="/" variant="primary">
            <Home size={18} />
            Back to home
          </CTAButton>
          <CTAButton href="/how-it-works" variant="secondary">
            <Compass size={18} />
            How Syinq works
          </CTAButton>
        </div>
        <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          Need help?{" "}
          <Link href="/contact" className="font-medium text-brand-600 hover:underline">
            Contact support
          </Link>
        </p>
      </Container>
    </section>
  );
}
