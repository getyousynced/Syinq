import { GraduationCap } from "lucide-react";
import Marquee from "@/components/site/Marquee";
import Lottie from "@/components/site/Lottie";

const campuses = [
  "Bennett University",
  "Sharda University",
  "Galgotias University",
  "GNIOT",
  "Knowledge Park",
  "Greater Noida",
  "Noida",
  "Delhi-NCR",
];

export default function SocialProof() {
  return (
    <section className="border-y border-slate-200 bg-page py-8">
      <Lottie
        src="/revamp/lottie/drivers-community.lottie"
        label="Verified campus community pooling together"
        className="mx-auto mb-3 h-28 w-full max-w-[300px] sm:h-32"
      />
      <p className="container-shell mb-5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        Rolling out campus-by-campus across the Delhi-NCR belt
      </p>
      <Marquee durationSec={32}>
        {campuses.map((c) => (
          <span
            key={c}
            className="mx-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600"
          >
            <GraduationCap size={16} className="text-brand-500" />
            {c}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
