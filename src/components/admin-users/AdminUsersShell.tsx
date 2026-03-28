"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Ban,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Eye,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import AdminTopBar from "@/components/admin-dashboard/AdminTopBar";
import DashboardSidebar from "@/components/admin-dashboard/DashboardSidebar";
import { useAdminSession } from "@/hooks/useAdminSession";

type UserStats = {
  totalActiveUsers: number;
  verifiedPercentage: number;
  pendingUsers: number;
  flaggedUsers: number;
  totalUsers: number;
};

type UserRow = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isProfileCompleted: boolean;
  suspended: boolean;
  joinedDate: string;
  verificationStatus: "VERIFIED" | "PENDING";
};

type UsersResponse = {
  users: UserRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const tabs = ["All Users", "Pending", "Flagged"] as const;
type Tab = (typeof tabs)[number];
const roleFilters = ["All Roles", "Staff", "Alumni", "Student"] as const;
type RoleFilter = (typeof roleFilters)[number];

export default function AdminUsersShell() {
  const { admin, loading: sessionLoading } = useAdminSession();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [usersData, setUsersData] = useState<UsersResponse | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("All Users");
  const [activeRoleFilter, setActiveRoleFilter] = useState<RoleFilter>("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionUserId, setActionUserId] = useState<string | null>(null);

  const fetchUsers = async (page = currentPage) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      return;
    }

    try {
      setLoading(true);

      const [statsResponse, usersResponse] = await Promise.all([
        fetch(`${apiBaseUrl}/admin/user/stats`, {
          credentials: "include",
        }),
        fetch(`${apiBaseUrl}/admin/user?page=${page}&limit=25`, {
          credentials: "include",
        }),
      ]);

      const statsPayload = await statsResponse.json();
      const usersPayload = await usersResponse.json();

      if (!statsResponse.ok || !statsPayload.success) {
        throw new Error(statsPayload.message || "Unable to load user stats.");
      }

      if (!usersResponse.ok || !usersPayload.success) {
        throw new Error(usersPayload.message || "Unable to load users.");
      }

      setStats(statsPayload.data as UserStats);
      setUsersData(usersPayload.data as UsersResponse);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to load users.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUsers();
  }, [currentPage]);

  const filteredUsers = useMemo(() => {
    let users = usersData?.users ?? [];

    if (activeTab === "Pending") {
      users = users.filter((user) => !user.isProfileCompleted);
    }

    if (activeTab === "Flagged") {
      users = users.filter((user) => user.suspended);
    }

    if (activeRoleFilter !== "All Roles") {
      users = users.filter((user) => formatRole(user.role) === activeRoleFilter);
    }

    return users;
  }, [activeRoleFilter, activeTab, usersData]);

  const page = usersData?.pagination.page ?? 1;
  const limit = usersData?.pagination.limit ?? 25;
  const total = usersData?.pagination.total ?? 0;
  const totalPages = usersData?.pagination.totalPages ?? 1;
  const startItem = filteredUsers.length > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = (page - 1) * limit + filteredUsers.length;

  const handleSuspendToggle = async (user: UserRow) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      return;
    }

    try {
      setActionUserId(user.id);

      const response = await fetch(
        `${apiBaseUrl}/admin/user/${user.id}/suspension`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            suspended: !user.suspended,
          }),
        },
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to update user status.");
      }

      toast.success(payload.message || "User status updated.");
      await fetchUsers(currentPage);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update user status.",
      );
    } finally {
      setActionUserId(null);
    }
  };

  return (
    sessionLoading ? null : (
    <main className="min-h-screen bg-[#f5f7ff] p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 text-xl font-semibold text-[#4e7ccf]">User Management</div>

        <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_22px_70px_rgba(72,101,167,0.16)]">
          <div className="flex flex-col lg:flex-row">
            <DashboardSidebar activeLabel="User Management" profileName={admin?.name} />

            <div className="flex-1 p-6 lg:p-7">
              <AdminTopBar profileName="Admin Central" profileSubtitle="Superuser" />

              <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h1 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-slate-900">
                    User Management
                  </h1>
                  <p className="mt-2 max-w-2xl text-base leading-7 text-slate-500">
                    Manage institutional access, verify identities, and monitor user
                    health across the Syinq network.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="rounded-xl bg-[#eef2ff] px-4 py-2 text-sm font-semibold text-slate-400"
                  >
                    Export CSV
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#3568da] px-4 py-2 text-sm font-semibold text-white"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>New User</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  icon={<Users className="h-5 w-5" />}
                  label="Total Users"
                  value={stats?.totalUsers ?? 0}
                  tone="blue"
                />
                <StatCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  label="Verified"
                  value={`${stats?.verifiedPercentage ?? 0}%`}
                  tone="green"
                />
                <StatCard
                  icon={<CircleAlert className="h-5 w-5" />}
                  label="Pending"
                  value={stats?.pendingUsers ?? 0}
                  tone="orange"
                />
                <StatCard
                  icon={<Ban className="h-5 w-5" />}
                  label="Flagged"
                  value={stats?.flaggedUsers ?? 0}
                  tone="red"
                />
              </div>

              <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="inline-flex w-fit rounded-2xl bg-[#f4f7ff] p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={[
                        "rounded-xl px-5 py-2 text-sm font-semibold transition",
                        activeTab === tab
                          ? "bg-white text-[#3568da] shadow-sm"
                          : "text-slate-500",
                      ].join(" ")}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#f4f7ff] p-1.5">
                    {roleFilters.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setActiveRoleFilter(role)}
                        className={[
                          "rounded-xl px-4 py-2 text-sm font-semibold transition",
                          activeRoleFilter === role
                            ? "bg-white text-[#3568da] shadow-sm"
                            : "text-slate-500",
                        ].join(" ")}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  <FilterChip label="Status: All Status" />
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRoleFilter("All Roles");
                      setActiveTab("All Users");
                    }}
                    className="text-sm font-semibold text-[#3568da]"
                  >
                    Clear Filters
                  </button>
                  <FilterChip label="Filter" />
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[28px] bg-white shadow-[0_8px_30px_rgba(73,92,142,0.08)]">
                <div className="grid grid-cols-[2.3fr_1fr_1fr_1fr_1fr] gap-4 border-b border-slate-100 bg-[#f9fbff] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <span>User Information</span>
                  <span>Role</span>
                  <span>Verification</span>
                  <span>Joined Date</span>
                  <span>Actions</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {loading ? (
                    <div className="px-5 py-10 text-sm text-slate-400">
                      Loading users...
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="px-5 py-10 text-sm text-slate-400">
                      No users found for this filter.
                    </div>
                  ) : (
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="grid grid-cols-[2.3fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-4"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-400">{user.email}</p>
                        </div>

                        <div className="flex items-center">
                          <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#3568da]">
                            {formatRole(user.role)}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span
                            className={[
                              "rounded-full px-3 py-1 text-xs font-semibold",
                              user.isProfileCompleted
                                ? "bg-[#e5f8e8] text-[#31a95e]"
                                : "bg-[#fff2df] text-[#df8a2d]",
                            ].join(" ")}
                          >
                            {user.isProfileCompleted ? "Verified" : "Pending"}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-slate-500">
                          {formatDate(user.joinedDate)}
                        </div>

                        <div className="flex items-center gap-3 text-slate-500">
                          <button type="button" className="transition hover:text-slate-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSuspendToggle(user)}
                            disabled={actionUserId === user.id}
                            className={[
                              "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition",
                              user.suspended
                                ? "bg-[#e5f8e8] text-[#31a95e]"
                                : "bg-[#ffe7e5] text-[#e56f56]",
                              actionUserId === user.id ? "opacity-60" : "",
                            ].join(" ")}
                          >
                            <Ban className="h-3.5 w-3.5" />
                            <span>{user.suspended ? "Unsuspend" : "Suspend"}</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-sm text-slate-400">
                  <span>
                    Showing {startItem} - {endItem} of {total} users
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={page <= 1}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {getPageNumbers(
                      page,
                      totalPages,
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={[
                          "inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-semibold",
                          page === (usersData?.pagination.page ?? 1)
                            ? "bg-[#3568da] text-white"
                            : "text-slate-500",
                        ].join(" ")}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1),
                        )
                      }
                      disabled={page >= totalPages}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 disabled:opacity-40"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    )
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tone: "blue" | "green" | "orange" | "red";
}) {
  const toneClass = {
    blue: "bg-[#eef3ff] text-[#3568da]",
    green: "bg-[#e5f8e8] text-[#31a95e]",
    orange: "bg-[#fff2df] text-[#df8a2d]",
    red: "bg-[#ffe7e5] text-[#e56f56]",
  }[tone];

  return (
    <div className="rounded-[24px] bg-[#f8faff] p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${toneClass}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>
          <p className="text-[2rem] font-extrabold leading-none text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl bg-[#f4f7ff] px-4 py-2 text-sm font-semibold text-slate-500"
    >
      <span>{label}</span>
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

function formatRole(role: string) {
  if (role === "STAFF") return "Staff";
  if (role === "ALUMNI") return "Alumni";
  if (role === "STUDENT") return "Student";
  return "Unknown";
}

function formatDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
}
