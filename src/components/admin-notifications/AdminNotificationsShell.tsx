"use client";

import { useMemo, useState } from "react";
import {
  AtSign,
  BellRing,
  MonitorSmartphone,
  Play,
  Smartphone,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import AdminTopBar from "@/components/admin-dashboard/AdminTopBar";
import DashboardSidebar from "@/components/admin-dashboard/DashboardSidebar";

type Audience = "All Users" | "Students Only" | "Alumni" | "Faculty/Staff";
type Channel = "Push" | "Email" | "SMS";

const audiences: Audience[] = [
  "All Users",
  "Students Only",
  "Alumni",
  "Faculty/Staff",
];

const channels: { label: Channel; icon: typeof BellRing }[] = [
  { label: "Push", icon: BellRing },
  { label: "Email", icon: AtSign },
  { label: "SMS", icon: Smartphone },
];

const initialBroadcasts = [
  {
    timestamp: "Oct 24, 14:30",
    title: "Campus Security Update: Phase 2",
    audience: "Students",
    channel: "Push",
    delivery: "98.2%",
    status: "Completed",
  },
  {
    timestamp: "Oct 23, 09:15",
    title: "Annual Gala Invitation",
    audience: "Alumni",
    channel: "Email",
    delivery: "100%",
    status: "Completed",
  },
  {
    timestamp: "Oct 22, 18:00",
    title: "Emergency Weather Warning",
    audience: "All Users",
    channel: "Push",
    delivery: "84.5%",
    status: "Failed (8)",
  },
];

export default function AdminNotificationsShell() {
  const [selectedAudience, setSelectedAudience] = useState<Audience>("All Users");
  const [selectedChannel, setSelectedChannel] = useState<Channel>("Push");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentBroadcasts, setRecentBroadcasts] = useState(initialBroadcasts);
  const [latestDeliveryStats, setLatestDeliveryStats] = useState({
    totalRecipients: 0,
    notificationsSent: 0,
  });

  const previewText = useMemo(
    () => message || "Your broadcast preview will appear here as you type.",
    [message],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !message.trim()) {
      toast.error("Please enter both a message title and body.");
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${apiBaseUrl}/api/v1/admin/promotion/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          message,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        data?: {
          totalUsers?: number;
          notificationsSent?: number;
        };
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send broadcast.");
      }

      const totalRecipients = result.data?.totalUsers ?? 0;
      const notificationsSent = result.data?.notificationsSent ?? 0;

      setLatestDeliveryStats({
        totalRecipients,
        notificationsSent,
      });

      toast.success(result.message || "Broadcast sent successfully.");

      setRecentBroadcasts((current) => [
        {
          timestamp: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          title,
          audience: selectedAudience,
          channel: selectedChannel,
          delivery: `${notificationsSent}/${totalRecipients || notificationsSent}`,
          status: "Completed",
        },
        ...current,
      ]);

      setTitle("");
      setMessage("");
      setSelectedChannel("Push");
      setSelectedAudience("All Users");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to send broadcast.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7ff] p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 text-xl font-semibold text-[#4e7ccf]">Broadcast Center</div>

        <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_22px_70px_rgba(72,101,167,0.16)]">
          <div className="flex flex-col lg:flex-row">
            <DashboardSidebar activeLabel="Notifications" />

            <div className="flex-1 p-6 lg:p-7">
              <AdminTopBar profileName="Admin Central" profileSubtitle="System Owner" />

              <div className="mt-7">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h1 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-slate-900">
                      Broadcast Center
                    </h1>
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span className="text-[#28a55f]">●</span>
                      <span>System Operational</span>
                      <span>•</span>
                      <span>Live Delivery Active</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-xl bg-[#eff3ff] px-4 py-2 text-sm font-semibold text-slate-400"
                    >
                      Drafts (4)
                    </button>
                    <button
                      type="button"
                      className="rounded-xl bg-[#3568da] px-4 py-2 text-sm font-semibold text-white"
                    >
                      New Template
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 xl:grid-cols-[1.55fr_0.9fr]">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[30px] bg-white p-6 shadow-[0_8px_30px_rgba(73,92,142,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf3ff] text-[#3568da]">
                      <BellRing className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">New Broadcast Message</h2>
                      <p className="text-sm text-slate-400">Select target audience</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Select Target Audience
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {audiences.map((audience) => (
                        <button
                          key={audience}
                          type="button"
                          onClick={() => setSelectedAudience(audience)}
                          className={[
                            "rounded-xl border px-4 py-2 text-sm font-semibold transition",
                            selectedAudience === audience
                              ? "border-[#3568da] bg-[#eef3ff] text-[#3568da]"
                              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300",
                          ].join(" ")}
                        >
                          {audience}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Delivery Channels
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {channels.map((channel) => {
                        const Icon = channel.icon;

                        return (
                          <button
                            key={channel.label}
                            type="button"
                            onClick={() => setSelectedChannel(channel.label)}
                            className={[
                              "flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-semibold transition",
                              selectedChannel === channel.label
                                ? "border-[#3568da] bg-[#f4f8ff] text-[#3568da] shadow-[inset_0_0_0_1px_#3568da]"
                                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300",
                            ].join(" ")}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{channel.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Message Title
                      </label>
                      <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter broadcast subject..."
                        className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9ff] px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#3568da]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                          Message Body
                        </label>
                        <span className="text-[11px] font-semibold text-slate-300">
                          SMS COUNT: {message.length}/160
                        </span>
                      </div>
                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Type your message here. Use {name} for dynamic variables..."
                        className="mt-3 min-h-[180px] w-full rounded-[24px] border border-slate-200 bg-[#f7f9ff] px-4 py-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#3568da]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#3568da] px-6 text-base font-semibold text-white shadow-[0_12px_28px_rgba(53,104,218,0.28)] transition hover:bg-[#2f5fcc] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Play className="h-4 w-4" />
                    <span>{isSubmitting ? "Sending Broadcast..." : "Send Broadcast"}</span>
                  </button>
                </form>

                <div className="space-y-5">
                  <div className="rounded-[30px] bg-[#f4f7ff] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Live Preview
                    </p>
                    <div className="mt-4 rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(104,123,173,0.08)]">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3568da] text-white">
                          <MonitorSmartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">SYINQ GLOBAL</p>
                          <p className="text-xs text-slate-400">just now</p>
                        </div>
                      </div>
                      <div className="mt-5 rounded-2xl bg-[#f5f7ff] p-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {title || "Broadcast title preview"}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{previewText}</p>
                      </div>
                      <p className="mt-4 text-xs text-slate-400">
                        Device preview adapts based on channel selection.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[30px] bg-[#f4f7ff] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Target Statistics
                    </p>
                    <p className="mt-4 text-sm text-slate-400">Total Participants</p>
                    <div className="mt-2 flex items-center gap-3">
                      <p className="text-[2.2rem] font-extrabold text-slate-900">
                        {latestDeliveryStats.totalRecipients.toLocaleString()}
                      </p>
                      {latestDeliveryStats.totalRecipients > 0 ? (
                        <span className="rounded-full bg-[#dff8df] px-3 py-1 text-xs font-semibold text-[#28a55f]">
                          Live
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white">
                      <div
                        className="h-2 rounded-full bg-[#3568da] transition-all"
                        style={{
                          width:
                            latestDeliveryStats.totalRecipients > 0
                              ? `${Math.max(
                                  8,
                                  (latestDeliveryStats.notificationsSent /
                                    latestDeliveryStats.totalRecipients) *
                                    100,
                                )}%`
                              : "0%",
                        }}
                      />
                    </div>
                    <div className="mt-3 flex gap-4 text-xs text-slate-500">
                      <span>
                        Sent: {latestDeliveryStats.notificationsSent.toLocaleString()}
                      </span>
                      <span>
                        Remaining:{" "}
                        {Math.max(
                          0,
                          latestDeliveryStats.totalRecipients -
                            latestDeliveryStats.notificationsSent,
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Recent Broadcasts</h2>
                  <button type="button" className="text-sm font-semibold text-[#3568da]">
                    View Full Audit Log
                  </button>
                </div>

                <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_8px_30px_rgba(73,92,142,0.08)]">
                  <div className="grid grid-cols-[1.1fr_2.2fr_1fr_1fr_1fr_1fr] gap-4 border-b border-slate-100 bg-[#f9fbff] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    <span>Timestamp</span>
                    <span>Message Title</span>
                    <span>Audience</span>
                    <span>Channels</span>
                    <span>Delivery</span>
                    <span>Status</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {recentBroadcasts.map((broadcast) => (
                      <div
                        key={`${broadcast.timestamp}-${broadcast.title}`}
                        className="grid grid-cols-[1.1fr_2.2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-4 text-sm"
                      >
                        <span className="text-slate-400">{broadcast.timestamp}</span>
                        <span className="font-semibold text-slate-800">{broadcast.title}</span>
                        <span className="text-slate-500">{broadcast.audience}</span>
                        <span className="text-slate-500">{broadcast.channel}</span>
                        <span className="text-slate-500">{broadcast.delivery}</span>
                        <span
                          className={[
                            "inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold",
                            broadcast.status.startsWith("Failed")
                              ? "bg-[#ffe7e5] text-[#e56f56]"
                              : "bg-[#e5f8e8] text-[#31a95e]",
                          ].join(" ")}
                        >
                          {broadcast.status}
                        </span>
                      </div>
                    ))}
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
