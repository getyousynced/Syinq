"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CarFront,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPinned,
  Route,
  Users,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import AdminTopBar from "@/components/admin-dashboard/AdminTopBar";
import DashboardSidebar from "@/components/admin-dashboard/DashboardSidebar";
import { useAdminSession } from "@/hooks/useAdminSession";

type RideRow = {
  id: string;
  originAddress: string;
  destinationAddress: string;
  plannedTime: string;
  status: "ACTIVE" | "CANCELLED";
  rideType: "CAB" | "BIKE" | "CAR";
  seats: number;
  VehicleNumber?: string | null;
  user: {
    id: string;
    phoneNumber: string;
    profile?: {
      name?: string | null;
    } | null;
  };
  requests: Array<{
    id: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    requesterId?: string | null;
    requester?: {
      id: string;
      phoneNumber: string;
      profile?: {
        name?: string | null;
      } | null;
    } | null;
  }>;
  _count: {
    requests: number;
  };
};

type RidesResponse = {
  rides: RideRow[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type RouteStat = {
  origin: string;
  destination: string;
  totalRides: number;
};

type PendingRequestStats = {
  expiredRequests: number;
  totalPending: number;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

const PAGE_SIZE = 12;

const formatRideTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getRideStatus = (ride: Pick<RideRow, "plannedTime" | "status">) => {
  if (ride.status === "CANCELLED") {
    return "Cancelled";
  }

  const date = new Date(ride.plannedTime);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.getTime() >= Date.now() ? "Upcoming" : "Completed";
};

const getInitials = (name?: string | null) => {
  if (!name?.trim()) {
    return "U";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

const getAcceptedRequests = (ride: RideRow) =>
  ride.requests.filter((request) => request.status === "ACCEPTED");

const getPendingRequestsForRide = (ride: RideRow) =>
  ride.requests.filter((request) => request.status === "PENDING");

export default function AdminRidesShell() {
  const { admin, loading: sessionLoading } = useAdminSession();
  const [ridesData, setRidesData] = useState<RidesResponse | null>(null);
  const [routeStats, setRouteStats] = useState<RouteStat[]>([]);
  const [pendingStats, setPendingStats] = useState<PendingRequestStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

  const fetchRides = useCallback(async (targetPage = page) => {
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [ridesResponse, statsResponse, pendingResponse] = await Promise.all([
        fetch(`${apiBaseUrl}/admin/ride?page=${targetPage}&limit=${PAGE_SIZE}`, {
          credentials: "include",
        }),
        fetch(`${apiBaseUrl}/admin/ride/stats`, {
          credentials: "include",
        }),
        fetch(`${apiBaseUrl}/admin/ride/pending-requests`, {
          credentials: "include",
        }),
      ]);

      const ridesPayload = (await ridesResponse.json()) as ApiResponse<RidesResponse>;
      const statsPayload = (await statsResponse.json()) as ApiResponse<RouteStat[]>;
      const pendingPayload = (await pendingResponse.json()) as ApiResponse<PendingRequestStats>;

      if (!ridesResponse.ok || !ridesPayload.success || !ridesPayload.data) {
        throw new Error(ridesPayload.message || "Unable to load rides.");
      }

      if (!statsResponse.ok || !statsPayload.success) {
        throw new Error(statsPayload.message || "Unable to load ride stats.");
      }

      if (!pendingResponse.ok || !pendingPayload.success || !pendingPayload.data) {
        throw new Error(
          pendingPayload.message || "Unable to load pending request stats.",
        );
      }

      setRidesData(ridesPayload.data);
      setRouteStats(statsPayload.data ?? []);
      setPendingStats(pendingPayload.data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load rides.");
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl, page]);

  useEffect(() => {
    if (!sessionLoading) {
      void fetchRides(page);
    }
  }, [fetchRides, page, sessionLoading]);

  const rides = useMemo(() => ridesData?.rides ?? [], [ridesData]);
  const pagination = ridesData?.pagination;
  const startItem =
    rides.length > 0 && pagination ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const endItem = pagination ? (pagination.page - 1) * pagination.limit + rides.length : 0;

  const upcomingRides = useMemo(
    () => rides.filter((ride) => getRideStatus(ride) === "Upcoming"),
    [rides],
  );

  const completedRides = useMemo(
    () => rides.filter((ride) => getRideStatus(ride) === "Completed"),
    [rides],
  );

  const cancelledRides = useMemo(
    () => rides.filter((ride) => getRideStatus(ride) === "Cancelled"),
    [rides],
  );

  const totalRequestedSeats = useMemo(
    () => rides.reduce((sum, ride) => sum + ride._count.requests, 0),
    [rides],
  );

  const totalAcceptedRequests = useMemo(
    () => rides.reduce((sum, ride) => sum + getAcceptedRequests(ride).length, 0),
    [rides],
  );

  const busiestRoute = routeStats[0] ?? null;
  const featuredRide = upcomingRides[0] ?? cancelledRides[0] ?? rides[0] ?? null;

  if (sessionLoading) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5f7ff] p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 text-xl font-semibold text-[#4e7ccf]">Ride Management</div>

        <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_22px_70px_rgba(72,101,167,0.16)]">
          <div className="flex flex-col lg:flex-row">
            <DashboardSidebar activeLabel="Ride Management" profileName={admin?.name} />

            <div className="flex-1 p-6 lg:p-7">
              <AdminTopBar
                profileName={admin?.name || "Admin Central"}
                profileSubtitle="Superuser"
              />

              <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h1 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-slate-900">
                    Ride Management
                  </h1>
                  <p className="mt-2 max-w-3xl text-base leading-7 text-slate-500">
                    Review rides posted by users across the network, track demand on
                    popular routes, and monitor pending ride requests from one admin
                    workspace.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void fetchRides(page)}
                  className="rounded-xl bg-[#3568da] px-4 py-2 text-sm font-semibold text-white"
                >
                  Refresh rides
                </button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  icon={<CarFront className="h-5 w-5" />}
                  label="Total Rides"
                  value={String(pagination?.total ?? 0)}
                  helper="All rides posted by users"
                />
                <MetricCard
                  icon={<Clock3 className="h-5 w-5" />}
                  label="Upcoming"
                  value={String(upcomingRides.length)}
                  helper="Rides with planned time ahead"
                />
                <MetricCard
                  icon={<Users className="h-5 w-5" />}
                  label="Cancelled"
                  value={String(cancelledRides.length)}
                  helper={`${pendingStats?.totalPending ?? 0} pending requests preserved`}
                />
                <MetricCard
                  icon={<Route className="h-5 w-5" />}
                  label="Top Route"
                  value={busiestRoute ? String(busiestRoute.totalRides) : "0"}
                  helper={
                    busiestRoute
                      ? `${busiestRoute.origin} -> ${busiestRoute.destination}`
                      : "No route stats yet"
                  }
                />
              </div>

              <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_1.25fr]">
                <div className="rounded-[30px] bg-white p-6 shadow-[0_8px_30px_rgba(73,92,142,0.08)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf3ff] text-[#3568da]">
                      <MapPinned className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Featured Ride</h2>
                      <p className="text-sm text-slate-400">
                        Latest user-posted ride in the current page
                      </p>
                    </div>
                  </div>

                  {featuredRide ? (
                    <div className="mt-6 rounded-[28px] bg-[#f7f9ff] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3568da] text-sm font-bold text-white">
                            {getInitials(featuredRide.user.profile?.name)}
                          </div>
                          <div>
                            <p className="text-base font-bold text-slate-900">
                              {featuredRide.user.profile?.name || "Unnamed user"}
                            </p>
                            <p className="text-sm text-slate-500">
                              {featuredRide.user.phoneNumber}
                            </p>
                          </div>
                        </div>

                        <span
                          className={[
                            "rounded-full px-3 py-1 text-xs font-semibold",
                            getRideStatus(featuredRide) === "Upcoming"
                              ? "bg-[#e7f8eb] text-[#2b9c5b]"
                              : getRideStatus(featuredRide) === "Cancelled"
                                ? "bg-[#ffe7e5] text-[#e56f56]"
                              : "bg-[#eef2ff] text-[#4f6fdc]",
                          ].join(" ")}
                        >
                          {getRideStatus(featuredRide)}
                        </span>
                      </div>

                      <div className="mt-6 space-y-4">
                        <RideDetail label="Origin" value={featuredRide.originAddress} />
                        <RideDetail
                          label="Destination"
                          value={featuredRide.destinationAddress}
                        />
                        <RideDetail
                          label="Planned Time"
                          value={formatRideTime(featuredRide.plannedTime)}
                        />
                        <RideDetail
                          label="Ride Type"
                          value={`${featuredRide.rideType} • ${featuredRide.seats} seat${featuredRide.seats === 1 ? "" : "s"}`}
                        />
                        <RideDetail
                          label="Requests"
                          value={`${getAcceptedRequests(featuredRide).length} accepted • ${getPendingRequestsForRide(featuredRide).length} pending`}
                        />
                        <RideDetail
                          label="Vehicle"
                          value={featuredRide.VehicleNumber || "Not provided"}
                        />
                      </div>
                    </div>
                  ) : (
                    <EmptyState
                      title="No rides available"
                      description="When users post rides, they will appear here for review."
                    />
                  )}
                </div>

                <div className="rounded-[30px] bg-white p-6 shadow-[0_8px_30px_rgba(73,92,142,0.08)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Ride Activity</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {loading
                          ? "Loading rides..."
                          : `${rides.length} rides in this page • ${completedRides.length} completed • ${cancelledRides.length} cancelled • ${totalRequestedSeats} total requests • ${totalAcceptedRequests} accepted`}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#3568da]">
                      Page {pagination?.page ?? 1}
                    </span>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-100">
                    <div className="grid grid-cols-[1.15fr_1.7fr_0.95fr_1.7fr_1.7fr_1.15fr] gap-4 bg-[#f9fbff] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      <span>Posted By</span>
                      <span>Route</span>
                      <span>Ride</span>
                      <span>Pending Users</span>
                      <span>Accepted Users</span>
                      <span>Planned</span>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {rides.length > 0 ? (
                        rides.map((ride) => {
                          const acceptedRequests = getAcceptedRequests(ride);
                          const pendingRequests = getPendingRequestsForRide(ride);

                          return (
                          <div
                            key={ride.id}
                            className="grid grid-cols-[1.15fr_1.7fr_0.95fr_1.7fr_1.7fr_1.15fr] gap-4 px-5 py-4 text-sm"
                          >
                            <div>
                              <p className="font-semibold text-slate-900">
                                {ride.user.profile?.name || "Unnamed user"}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                {ride.user.phoneNumber}
                              </p>
                              <p className="mt-1 text-xs text-slate-300">ID: {ride.id}</p>
                            </div>

                            <div>
                              <p className="font-medium text-slate-800">{ride.originAddress}</p>
                              <p className="mt-1 text-xs text-slate-400">to</p>
                              <p className="mt-1 font-medium text-slate-800">
                                {ride.destinationAddress}
                              </p>
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">{ride.rideType}</p>
                              <p className="mt-1 text-xs text-slate-400">
                                {ride.seats} seat{ride.seats === 1 ? "" : "s"}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                {ride.VehicleNumber || "No vehicle no."}
                              </p>
                            </div>

                            <div className="space-y-2">
                              {pendingRequests.length > 0 ? (
                                pendingRequests.map((request) => (
                                  <div
                                    key={request.id}
                                    className="rounded-2xl bg-[#fff8ec] px-3 py-2"
                                  >
                                    <p className="text-sm font-semibold text-slate-900">
                                      {request.requester?.profile?.name || "Unnamed user"}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                      {request.requester?.phoneNumber || "No phone"}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <span className="inline-flex rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-semibold text-slate-500">
                                  No pending users
                                </span>
                              )}
                            </div>

                            <div className="space-y-2">
                              {acceptedRequests.length > 0 ? (
                                acceptedRequests.map((request) => (
                                  <div
                                    key={request.id}
                                    className="rounded-2xl bg-[#f7f9ff] px-3 py-2"
                                  >
                                    <p className="text-sm font-semibold text-slate-900">
                                      {request.requester?.profile?.name || "Unnamed user"}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                      {request.requester?.phoneNumber || "No phone"}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <span className="inline-flex rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-semibold text-slate-500">
                                  No accepted users
                                </span>
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {formatRideTime(ride.plannedTime)}
                              </p>
                              <span
                                className={[
                                  "mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                                  getRideStatus(ride) === "Upcoming"
                                    ? "bg-[#eef3ff] text-[#3568da]"
                                    : getRideStatus(ride) === "Cancelled"
                                      ? "bg-[#ffe7e5] text-[#e56f56]"
                                    : "bg-[#f3f4f6] text-slate-500",
                                ].join(" ")}
                              >
                                {getRideStatus(ride)}
                              </span>
                            </div>
                          </div>
                        )})
                      ) : (
                        <div className="px-5 py-12">
                          <EmptyState
                            title="No rides found"
                            description="User-posted rides will show here once they are available."
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-400">
                      Showing {startItem} to {endItem} of {pagination?.total ?? 0} rides
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                        disabled={!pagination || pagination.page <= 1}
                        className="rounded-xl border border-slate-200 p-2 text-slate-500 disabled:opacity-40"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="rounded-xl bg-[#3568da] px-4 py-2 text-sm font-semibold text-white">
                        {pagination?.page ?? 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setPage((current) =>
                            Math.min(pagination?.totalPages ?? current, current + 1),
                          )
                        }
                        disabled={!pagination || pagination.page >= pagination.totalPages}
                        className="rounded-xl border border-slate-200 p-2 text-slate-500 disabled:opacity-40"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  helper,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-[26px] bg-white p-5 shadow-[0_8px_30px_rgba(73,92,142,0.08)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf3ff] text-[#3568da]">
        {icon}
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-[1.8rem] font-extrabold tracking-[-0.04em] text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </div>
  );
}

function RideDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-200 bg-white px-5 py-10 text-center">
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
