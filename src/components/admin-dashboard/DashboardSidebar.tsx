"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  CarFront,
  FileBarChart2,
  LayoutGrid,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { DashboardNavItem } from "@/components/admin-dashboard/types";

const items: DashboardNavItem[] = [
  { label: "Dashboard", icon: LayoutGrid, href: "/admin-dashboard" },
  { label: "User Management", icon: Users, href: "/admin-users" },
  { label: "Verification", icon: ShieldCheck, href: "/admin-dashboard" },
  { label: "Ride Management", icon: CarFront, href: "/admin-rides" },
  { label: "Reports & Safety", icon: FileBarChart2, href: "/admin-dashboard" },
  { label: "Notifications", icon: Bell, href: "/admin-notifications" },
  { label: "Settings", icon: Settings, href: "/admin-dashboard" },
];

export default function DashboardSidebar({
  activeLabel,
  profileName,
}: {
  activeLabel: string;
  profileName?: string;
}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

    try {
      setIsLoggingOut(true);

      if (apiBaseUrl) {
        await fetch(`${apiBaseUrl}/admin/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      }
    } finally {
      window.localStorage.removeItem("syinqAdmin");
      setIsLoggingOut(false);
      router.replace("/admin-portal");
    }
  };

  return (
    <aside className="flex min-h-[760px] w-full max-w-[250px] flex-col justify-between border-r border-slate-100 bg-[#fbfcff] p-5">
      <div>
        <nav className="space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeLabel;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-white text-[#3568da] shadow-[inset_3px_0_0_0_#3568da]"
                    : "text-slate-500 hover:bg-white hover:text-slate-900",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-5">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#f05d5e]"
        >
          <LogOut className="h-4 w-4" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>

        <div className="rounded-2xl bg-[#111827] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f6bff] text-sm font-bold">
              {(profileName || "A").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold">{profileName || "Super Admin"}</p>
              <p className="text-[11px] text-white/50">v2.4.0-stable</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
