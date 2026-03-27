"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, CircleHelp, Search, Settings2 } from "lucide-react";

type StoredAdmin = {
  name?: string;
  email?: string;
};

export default function AdminTopBar({
  profileName,
  profileSubtitle,
}: {
  profileName?: string;
  profileSubtitle?: string;
}) {
  const [storedAdmin, setStoredAdmin] = useState<StoredAdmin | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("syinqAdmin");
    if (stored) {
      setStoredAdmin(JSON.parse(stored) as StoredAdmin);
    }
  }, []);

  const resolvedName = useMemo(() => {
    if (profileName && profileName !== "Admin Central") {
      return profileName;
    }

    return storedAdmin?.name || profileName || "Admin Central";
  }, [profileName, storedAdmin?.name]);

  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-slate-100 bg-[#fbfcff] px-4 py-3">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search operational data..."
          className="w-full bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-slate-400">
          <Bell className="h-5 w-5" />
          <CircleHelp className="h-5 w-5" />
          <Settings2 className="h-5 w-5" />
        </div>

        <div className="hidden h-9 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">
              {resolvedName}
            </p>
            <p className="text-[11px] text-slate-400">
              {profileSubtitle || "System Owner"}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7fb0ff,#3b6be8)] text-sm font-bold text-white">
            {(resolvedName || "A").slice(0, 1).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
