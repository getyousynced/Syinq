"use client";

const bannerItems = [
  "Your petrol bill needs therapy",
  "That ₹300 cab could have been ₹60",
  "Your classmates are already going there",
  "Stop going solo. Start carpooling",
  "Because petrol isn't getting cheaper",
  "Split the ride. Not your wallet",
  "Less cabs. More carpools"
];

const repeatedItems = [...bannerItems, ...bannerItems];

export default function SiteWideCtaBanner() {
  return (
    <div className="border-t border-white/10 bg-[#0b0d12] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#0b0d12] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#0b0d12] to-transparent" />

        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">

          <div className="sitewide-marquee flex-1">
            <div className="sitewide-marquee-track">
              {repeatedItems.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-4 pr-4 text-sm text-white/90"
                >
                  <span>{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-syinq-blue/80" />
                </span>
              ))}
            </div>
            <div className="sitewide-marquee-track" aria-hidden="true">
              {repeatedItems.map((item, index) => (
                <span
                  key={`${item}-duplicate-${index}`}
                  className="inline-flex items-center gap-4 pr-4 text-sm text-white/90"
                >
                  <span>{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-syinq-green/80" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
