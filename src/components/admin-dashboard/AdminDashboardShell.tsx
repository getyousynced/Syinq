"use client";

import { useAdminSession } from "@/hooks/useAdminSession";
import {
  Users,
} from "lucide-react";
import AdminTopBar from "@/components/admin-dashboard/AdminTopBar";
import DashboardEventList from "@/components/admin-dashboard/DashboardEventList";
import DashboardSidebar from "@/components/admin-dashboard/DashboardSidebar";
import DashboardStatCard from "@/components/admin-dashboard/DashboardStatCard";
import type { DashboardEvent } from "@/components/admin-dashboard/types";

const events: DashboardEvent[] = [
  {
    title: "New Institution Verified",
    description: "Technical University of Central Lagos",
    time: "2 mins ago",
    tone: "green",
  },
  {
    title: "Flagged Ride: Safety Alert",
    description: "Driver ID #8812 • Route Deviation",
    time: "14 mins ago",
    tone: "orange",
  },
  {
    title: "Batch Onboarding",
    description: "154 new alumni profiles activated",
    time: "1 hour ago",
    tone: "blue",
  },
  {
    title: "System Maintenance",
    description: "Fleet tracking module updated to v2.4.9",
    time: "4 hours ago",
    tone: "slate",
  },
];

export default function AdminDashboardShell() {
  const { admin, loading } = useAdminSession();

  if (loading) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5f7ff] p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 text-xl font-semibold text-[#4e7ccf]">Admin Dashboard</div>

        <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_22px_70px_rgba(72,101,167,0.16)]">
          <div className="flex flex-col lg:flex-row">
            <DashboardSidebar activeLabel="Dashboard" profileName={admin?.name} />

            <div className="flex-1 p-6 lg:p-7">
              <AdminTopBar
                profileName={admin?.name || "Admin Central"}
                profileSubtitle="System Owner"
              />

              <div className="mt-7">
                <h1 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-slate-900">
                  Operational Awareness
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="text-[#28a55f]">●</span>
                  <span>System Status: 100% Operational</span>
                  <span>•</span>
                  <span>March 14, 2026</span>
                  {admin?.email ? <span>• {admin.email}</span> : null}
                </p>
              </div>

              <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_1.25fr_0.9fr]">
                <div className="rounded-[30px] bg-[#fcfdff] p-6 shadow-[0_8px_30px_rgba(73,92,142,0.08)]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#3568da]">
                      Total Users
                    </p>
                    <span className="rounded-full bg-[#dff8df] px-3 py-1 text-xs font-semibold text-[#28a55f]">
                      +12.5%
                    </span>
                  </div>
                  <p className="mt-5 text-[3.5rem] font-extrabold leading-none text-slate-900">
                    42,891
                  </p>
                  <div className="mt-8 space-y-4 text-sm">
                    <div>
                      <div className="flex justify-between text-slate-500">
                        <span>Students</span>
                        <span className="font-semibold text-slate-800">28,120</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                        <div className="h-1.5 w-[66%] rounded-full bg-[#3568da]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-500">
                        <span>Staff & Alumni</span>
                        <span className="font-semibold text-slate-800">14,771</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                        <div className="h-1.5 w-[39%] rounded-full bg-[#30ad66]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] bg-[#f4f7ff] p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Verification Status
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(104,123,173,0.08)]">
                      <Users className="h-5 w-5 text-[#3568da]" />
                      <p className="mt-5 text-3xl font-extrabold text-slate-900">31.2k</p>
                      <p className="mt-1 text-sm text-slate-500">Institutional</p>
                    </div>
                    <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(104,123,173,0.08)]">
                      <Users className="h-5 w-5 text-[#30ad66]" />
                      <p className="mt-5 text-3xl font-extrabold text-slate-900">11.6k</p>
                      <p className="mt-1 text-sm text-slate-500">Personal ID</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-[20px] bg-white px-4 py-3 text-sm text-slate-500">
                    892 accounts are currently in the verification queue.
                  </div>
                </div>

                <DashboardStatCard
                  label="Live Activity"
                  value="1,248"
                  meta="Inter-campus 842 • City Commutes 406"
                  tone="dark"
                />
              </div>

              <div className="mt-6 grid gap-5 xl:grid-cols-[1.7fr_0.8fr]">
                <div className="rounded-[30px] bg-white p-6 shadow-[0_8px_30px_rgba(73,92,142,0.08)]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900">Daily Ride Activity</h3>
                    <div className="inline-flex rounded-full bg-[#f3f6fc] p-1 text-xs font-semibold">
                      <span className="rounded-full bg-white px-4 py-2 text-slate-900 shadow-sm">
                        Weekly
                      </span>
                      <span className="px-4 py-2 text-slate-400">Monthly</span>
                    </div>
                  </div>

                  <div className="mt-8 flex h-[320px] items-end justify-between gap-4 rounded-[24px] bg-[linear-gradient(180deg,#ffffff_0%,#f9fbff_100%)] px-6 pb-8 pt-10">
                    {[
                      42, 58, 70, 65, 88, 54, 49,
                    ].map((height, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center justify-end gap-4">
                        <div className="w-full rounded-full bg-[#edf2ff]">
                          <div
                            className="w-full rounded-full bg-gradient-to-t from-[#3568da] to-[#7aa1ff]"
                            style={{ height: `${height * 2}px` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-400">
                          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <DashboardEventList events={events} />
              </div>

              <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Syinq Operational Network • Distributed Ledger Active
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
