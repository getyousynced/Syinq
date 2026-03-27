import type { DashboardEvent } from "@/components/admin-dashboard/types";

const toneStyles: Record<DashboardEvent["tone"], string> = {
  green: "bg-[#dff8df] text-[#35a44f]",
  orange: "bg-[#ffe5de] text-[#e56f56]",
  blue: "bg-[#e4ebff] text-[#5b79f3]",
  slate: "bg-[#eceff6] text-[#7a859d]",
};

export default function DashboardEventList({ events }: { events: DashboardEvent[] }) {
  return (
    <div className="rounded-[28px] bg-[#f4f7ff] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Recent Events</h3>
        <span className="text-slate-400">•••</span>
      </div>

      <div className="mt-6 space-y-5">
        {events.map((event) => (
          <div key={event.title} className="flex gap-3">
            <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneStyles[event.tone]}`}>
              <span className="text-sm font-bold">•</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{event.title}</p>
              <p className="text-xs leading-5 text-slate-500">{event.description}</p>
              <p className="mt-1 text-[11px] text-slate-400">{event.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="mt-8 text-sm font-semibold text-[#3568da]">
        View All Activity
      </button>
    </div>
  );
}
