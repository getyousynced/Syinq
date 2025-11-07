"use client";
import { useMemo } from "react";
import { PillTabs } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Sidebar({
  filter,
  setFilter,
  stats,
}: {
  filter: string;
  setFilter: (v: string) => void;
  stats: { pending: number; accepted: number; rejected: number };
}) {
  const tabs = useMemo(
    () => [
      { value: "pending", label: `Pending (${stats.pending})` },
      { value: "accepted", label: `Accepted (${stats.accepted})` },
      { value: "rejected", label: `Rejected (${stats.rejected})` },
      { value: "all", label: "All" },
    ],
    [stats]
  );

  return (
    <aside className="card p-4 h-fit">
      <h3 className="text-sm uppercase tracking-wide font-bold mb-3">Overview</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="rounded-xl  text-black text-center font-bold p-3 bg-yellow-400">Pending: {stats.pending}</div>
        <div className="rounded-xl  text-black text-center font-bold p-3 bg-green-400">Accepted: {stats.accepted}</div>
        <div className="rounded-xl  text-black text-center font-bold p-3 bg-red-400">Rejected: {stats.rejected}</div>
      </div>
      <h3 className="text-sm uppercase tracking-wide font-bold mb-2">Filters</h3>
      <PillTabs value={filter} onValueChange={setFilter} items={tabs} />
    </aside>
  );
}
