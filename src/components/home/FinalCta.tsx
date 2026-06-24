import Image from "next/image";
import { StoreButtons } from "@/components/site/buttons";
import { Container } from "@/components/site/primitives";
import Reveal from "@/components/site/Reveal";

export default function FinalCta() {
  return (
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
                Your campus is already going your way.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                Join the verified network, find your route, and stop paying solo. Free on iOS and
                Android.
              </p>
              <div className="mt-8 flex justify-center">
                <StoreButtons />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
