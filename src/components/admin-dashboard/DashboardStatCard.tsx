import type { DashboardMetric } from "@/components/admin-dashboard/types";

const toneStyles: Record<NonNullable<DashboardMetric["tone"]>, string> = {
  blue: "bg-[#edf3ff] text-[#3568da]",
  green: "bg-[#ecf9ef] text-[#28a55f]",
  dark: "bg-[#262f3f] text-white",
};

export default function DashboardStatCard({
  label,
  value,
  meta,
  tone = "blue",
}: DashboardMetric) {
  return (
    <div className={`rounded-[28px] p-6 ${toneStyles[tone]}`}>
      <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">{label}</p>
      <p className="mt-4 text-[2.6rem] font-extrabold leading-none">{value}</p>
      {meta ? <p className="mt-3 text-sm opacity-70">{meta}</p> : null}
    </div>
  );
}
