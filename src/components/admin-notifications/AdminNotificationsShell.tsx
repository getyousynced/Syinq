"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  BellRing,
  CalendarDays,
  Clock3,
  PencilLine,
  Plus,
  RefreshCw,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import AdminTopBar from "@/components/admin-dashboard/AdminTopBar";
import DashboardSidebar from "@/components/admin-dashboard/DashboardSidebar";
import { useAdminSession } from "@/hooks/useAdminSession";

type NotificationDraft = {
  id: string;
  draftDate: string;
  timing: string;
  title: string;
  body: string;
  data?: Record<string, unknown> | null;
  createdAt?: string;
  updatedAt?: string;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

type GroupedDrafts = {
  draftDate: string;
  drafts: NotificationDraft[];
};

const createEmptyForm = (draftDate: string) => ({
  id: null as string | null,
  originalDraftDate: null as string | null,
  originalTiming: null as string | null,
  draftDate,
  timing: "",
  title: "",
  body: "",
  dataText: "",
});

const getTodayDate = () => {
  const now = new Date();
  const timezoneOffsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - timezoneOffsetMs).toISOString().slice(0, 10);
};

const formatDraftDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const formatUpdatedAt = (value?: string) => {
  if (!value) {
    return "Recently updated";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function AdminNotificationsShell() {
  const { admin, loading: sessionLoading } = useAdminSession();
  const [drafts, setDrafts] = useState<NotificationDraft[]>([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDate);
  const [form, setForm] = useState(() => createEmptyForm(getTodayDate()));
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingNow, setIsSendingNow] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [lastSendResult, setLastSendResult] = useState<{
    title: string;
    notificationsSent: number;
    totalUsers: number;
    sentAt: string;
  } | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

  const resetForm = (draftDate = selectedDate) => {
    setForm(createEmptyForm(draftDate));
    setEditingId(null);
  };

  const fetchDrafts = useCallback(async (draftDate = selectedDate) => {
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      setIsLoadingDrafts(false);
      return;
    }

    try {
      setIsLoadingDrafts(true);

      const params = new URLSearchParams({
        draftDateFrom: draftDate,
        limit: "100",
      });

      const response = await fetch(`${apiBaseUrl}/admin/notification?${params}`, {
        credentials: "include",
      });

      const payload = (await response.json()) as ApiResponse<NotificationDraft[]>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load scheduled notifications.");
      }

      setDrafts((payload.data ?? []).sort((a, b) => {
        if (a.draftDate === b.draftDate) {
          return a.timing.localeCompare(b.timing);
        }

        return a.draftDate.localeCompare(b.draftDate);
      }));
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to load scheduled notifications.",
      );
    } finally {
      setIsLoadingDrafts(false);
    }
  }, [apiBaseUrl, selectedDate]);

  useEffect(() => {
    if (!sessionLoading) {
      void fetchDrafts(selectedDate);
    }
  }, [fetchDrafts, selectedDate, sessionLoading]);

  const groupedDrafts = useMemo<GroupedDrafts[]>(() => {
    const groups = new Map<string, NotificationDraft[]>();

    drafts.forEach((draft) => {
      const current = groups.get(draft.draftDate) ?? [];
      current.push(draft);
      groups.set(draft.draftDate, current);
    });

    return Array.from(groups.entries()).map(([draftDate, grouped]) => ({
      draftDate,
      drafts: grouped,
    }));
  }, [drafts]);

  const selectedDateDrafts = useMemo(
    () => drafts.filter((draft) => draft.draftDate === selectedDate),
    [drafts, selectedDate],
  );

  const nextScheduledDraft = drafts[0] ?? null;

  const handleFieldChange = (
    field: keyof typeof form,
    value: string | null,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreateNew = () => {
    resetForm(selectedDate);
  };

  const handleEdit = async (id: string) => {
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      return;
    }

    try {
      setEditingId(id);

      const response = await fetch(`${apiBaseUrl}/admin/notification/${id}`, {
        credentials: "include",
      });

      const payload = (await response.json()) as ApiResponse<NotificationDraft>;

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.message || "Unable to load notification draft.");
      }

      const draft = payload.data;
      setSelectedDate(draft.draftDate);
      setForm({
        id: draft.id,
        originalDraftDate: draft.draftDate,
        originalTiming: draft.timing,
        draftDate: draft.draftDate,
        timing: draft.timing,
        title: draft.title,
        body: draft.body,
        dataText: draft.data ? JSON.stringify(draft.data, null, 2) : "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to load notification draft.",
      );
    } finally {
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(`${apiBaseUrl}/admin/notification/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const payload = (await response.json()) as ApiResponse<null>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to delete notification draft.");
      }

      toast.success(payload.message || "Notification draft deleted.");
      await fetchDrafts(form.draftDate);

      if (form.id === id) {
        resetForm(form.draftDate);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete notification draft.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleSendNow = async () => {
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      return;
    }

    if (!form.title.trim() || !form.body.trim()) {
      toast.error("Please add a title and body before sending now.");
      return;
    }

    try {
      setIsSendingNow(true);

      const response = await fetch(`${apiBaseUrl}/admin/promotion/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: form.title.trim(),
          message: form.body.trim(),
        }),
      });

      const payload = (await response.json()) as ApiResponse<{
        totalUsers?: number;
        notificationsSent?: number;
      }>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to send notification now.");
      }

      const sentCount = payload.data?.notificationsSent ?? 0;
      const totalUsers = payload.data?.totalUsers ?? 0;

      toast.success(
        payload.message ||
          `Notification sent now${sentCount > 0 ? ` to ${sentCount}` : ""}${totalUsers > sentCount ? ` of ${totalUsers}` : ""} users.`,
      );
      setLastSendResult({
        title: form.title.trim(),
        notificationsSent: sentCount,
        totalUsers,
        sentAt: new Date().toISOString(),
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to send notification now.",
      );
    } finally {
      setIsSendingNow(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      return;
    }

    if (!form.draftDate || !form.timing || !form.title.trim() || !form.body.trim()) {
      toast.error("Please fill date, time, title, and body.");
      return;
    }

    let parsedData: Record<string, unknown> | undefined;

    if (form.dataText.trim()) {
      try {
        parsedData = JSON.parse(form.dataText) as Record<string, unknown>;
      } catch {
        toast.error("Additional data must be valid JSON.");
        return;
      }
    }

    try {
      setIsSaving(true);

      const saveResponse = await fetch(`${apiBaseUrl}/admin/notification`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          draftDate: form.draftDate,
          timing: form.timing,
          title: form.title.trim(),
          body: form.body.trim(),
          ...(parsedData ? { data: parsedData } : {}),
        }),
      });

      const savePayload = (await saveResponse.json()) as ApiResponse<NotificationDraft>;

      if (!saveResponse.ok || !savePayload.success) {
        throw new Error(savePayload.message || "Unable to save notification draft.");
      }

      const scheduleChanged =
        form.id &&
        (form.originalDraftDate !== form.draftDate ||
          form.originalTiming !== form.timing);

      if (scheduleChanged) {
        const deleteResponse = await fetch(
          `${apiBaseUrl}/admin/notification/${form.id}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        const deletePayload = (await deleteResponse.json()) as ApiResponse<null>;

        if (!deleteResponse.ok || !deletePayload.success) {
          throw new Error(
            deletePayload.message ||
              "Draft was saved, but the previous scheduled slot could not be removed.",
          );
        }
      }

      toast.success(
        form.id ? "Notification schedule updated." : "Notification scheduled.",
      );

      setSelectedDate(form.draftDate);
      await fetchDrafts(form.draftDate);
      resetForm(form.draftDate);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to save notification draft.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (sessionLoading) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5f7ff] p-6 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 text-xl font-semibold text-[#4e7ccf]">
          Notification Scheduler
        </div>

        <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_22px_70px_rgba(72,101,167,0.16)]">
          <div className="flex flex-col lg:flex-row">
            <DashboardSidebar activeLabel="Notifications" profileName={admin?.name} />

            <div className="flex-1 p-6 lg:p-7">
              <AdminTopBar
                profileName={admin?.name || "Admin Central"}
                profileSubtitle="System Owner"
              />

              <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h1 className="text-[2.2rem] font-extrabold tracking-[-0.04em] text-slate-900">
                    Scheduled Notifications
                  </h1>
                  <p className="mt-2 max-w-3xl text-base leading-7 text-slate-500">
                    Plan notification copies by date and time, then review each slot
                    in one queue before the app picks them up for delivery.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void fetchDrafts(selectedDate)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#eef3ff] px-4 py-2 text-sm font-semibold text-[#3568da]"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Refresh</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateNew}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#3568da] px-4 py-2 text-sm font-semibold text-white"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Slot</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <MetricCard
                  icon={<BellRing className="h-5 w-5" />}
                  label="Upcoming Slots"
                  value={drafts.length.toString()}
                  helper="Loaded from admin notification drafts"
                />
                <MetricCard
                  icon={<CalendarDays className="h-5 w-5" />}
                  label="Selected Day"
                  value={selectedDateDrafts.length.toString()}
                  helper={formatDraftDate(selectedDate)}
                />
                <MetricCard
                  icon={<Clock3 className="h-5 w-5" />}
                  label="Last Send Result"
                  value={
                    lastSendResult
                      ? `${lastSendResult.notificationsSent}/${lastSendResult.totalUsers}`
                      : "Not sent"
                  }
                  helper={
                    lastSendResult
                      ? `${lastSendResult.title} • ${new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(lastSendResult.sentAt))}`
                      : nextScheduledDraft?.title || "Create your first scheduled copy"
                  }
                />
              </div>

              <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_1.15fr]">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[30px] bg-white p-6 shadow-[0_8px_30px_rgba(73,92,142,0.08)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf3ff] text-[#3568da]">
                        <BellRing className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {form.id ? "Edit Scheduled Notification" : "Create Scheduled Notification"}
                        </h2>
                        <p className="text-sm text-slate-400">
                          One draft per exact date and time slot
                        </p>
                      </div>
                    </div>

                    {form.id ? (
                      <button
                        type="button"
                        onClick={() => resetForm(selectedDate)}
                        className="rounded-xl bg-[#f4f7ff] px-4 py-2 text-sm font-semibold text-slate-500"
                      >
                        Clear
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Draft Date
                      </label>
                      <input
                        type="date"
                        value={form.draftDate}
                        onChange={(event) => {
                          const value = event.target.value;
                          setSelectedDate(value);
                          handleFieldChange("draftDate", value);
                        }}
                        className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9ff] px-4 text-sm text-slate-700 outline-none focus:border-[#3568da]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Time
                      </label>
                      <input
                        type="time"
                        value={form.timing}
                        onChange={(event) => handleFieldChange("timing", event.target.value)}
                        className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9ff] px-4 text-sm text-slate-700 outline-none focus:border-[#3568da]"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      Title
                    </label>
                    <input
                      value={form.title}
                      onChange={(event) => handleFieldChange("title", event.target.value)}
                      placeholder="Enter notification title"
                      className="mt-3 h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9ff] px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#3568da]"
                    />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Body
                      </label>
                      <span className="text-[11px] font-semibold text-slate-300">
                        {form.body.length} chars
                      </span>
                    </div>
                    <textarea
                      value={form.body}
                      onChange={(event) => handleFieldChange("body", event.target.value)}
                      placeholder="Type the notification body for this scheduled slot"
                      className="mt-3 min-h-[180px] w-full rounded-[24px] border border-slate-200 bg-[#f7f9ff] px-4 py-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#3568da]"
                    />
                  </div>

                  <div className="mt-5 rounded-[24px] bg-[#f4f7ff] p-4 text-sm text-slate-500">
                    Use the same title and body for both flows.
                    Save Slot stores it for the selected date and time.
                    Send Now immediately pushes it through the live admin notification API.
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => void handleSendNow()}
                      disabled={isSendingNow || isSaving}
                      className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#0f172a] px-6 text-base font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.22)] transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSendingNow ? "Sending Now..." : "Send Now"}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving || isSendingNow}
                      className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#3568da] px-6 text-base font-semibold text-white shadow-[0_12px_28px_rgba(53,104,218,0.28)] transition hover:bg-[#2f5fcc] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isSaving ? "Saving..." : form.id ? "Update Slot" : "Save Slot"}</span>
                    </button>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Additional Data
                      </label>
                      <span className="text-[11px] font-semibold text-slate-300">
                        Optional JSON payload
                      </span>
                    </div>
                    <textarea
                      value={form.dataText}
                      onChange={(event) => handleFieldChange("dataText", event.target.value)}
                      placeholder='{"screen":"offers","campaign":"night-run"}'
                      className="mt-3 min-h-[120px] w-full rounded-[24px] border border-slate-200 bg-[#f7f9ff] px-4 py-4 font-mono text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#3568da]"
                    />
                  </div>
                </form>

                <div className="space-y-5">
                  <div className="rounded-[30px] bg-[#f4f7ff] p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                          Schedule Queue
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                          {formatDraftDate(selectedDate)}
                        </h2>
                      </div>

                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(event) => {
                          const value = event.target.value;
                          setSelectedDate(value);
                          if (!form.id) {
                            handleFieldChange("draftDate", value);
                          }
                        }}
                        className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#3568da]"
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      {selectedDateDrafts.length > 0 ? (
                        selectedDateDrafts.map((draft) => (
                          <DraftSlotCard
                            key={draft.id}
                            draft={draft}
                            isDeleting={deletingId === draft.id}
                            isEditing={editingId === draft.id}
                            onDelete={() => void handleDelete(draft.id)}
                            onEdit={() => void handleEdit(draft.id)}
                          />
                        ))
                      ) : (
                        <EmptyState
                          title="No slots on this day"
                          description="Create a notification for this date and it will appear here in time order."
                        />
                      )}
                    </div>
                  </div>

                  <div className="rounded-[30px] bg-[#f4f7ff] p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                          Upcoming Timeline
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                          Future Drafts
                        </h2>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                        {drafts.length} total
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      {isLoadingDrafts ? (
                        <EmptyState
                          title="Loading schedule"
                          description="Pulling admin notification drafts from the backend."
                        />
                      ) : groupedDrafts.length > 0 ? (
                        groupedDrafts.map((group) => (
                          <div
                            key={group.draftDate}
                            className="rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgba(104,123,173,0.08)]"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm font-bold text-slate-900">
                                  {formatDraftDate(group.draftDate)}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                  {group.drafts.length} scheduled notification
                                  {group.drafts.length === 1 ? "" : "s"}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setSelectedDate(group.draftDate)}
                                className="rounded-xl bg-[#eef3ff] px-3 py-2 text-xs font-semibold text-[#3568da]"
                              >
                                Open day
                              </button>
                            </div>

                            <div className="mt-4 space-y-3">
                              {group.drafts.map((draft) => (
                                <div
                                  key={draft.id}
                                  className="rounded-2xl border border-slate-100 px-4 py-3"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <p className="text-sm font-semibold text-slate-900">
                                        {draft.timing} - {draft.title}
                                      </p>
                                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                                        {draft.body}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => void handleEdit(draft.id)}
                                      className="rounded-xl bg-[#f8faff] p-2 text-slate-500 transition hover:text-[#3568da]"
                                    >
                                      <PencilLine className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <EmptyState
                          title="No scheduled notifications yet"
                          description="Once you add slots, the full upcoming timeline will appear here."
                        />
                      )}
                    </div>
                  </div>

                  {lastSendResult ? (
                    <div className="rounded-[30px] bg-[#f4f7ff] p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        Latest Send Now
                      </p>
                      <div className="mt-4 rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(104,123,173,0.08)]">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {lastSendResult.title}
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                              Sent at{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(lastSendResult.sentAt))}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-[#f7f9ff] px-4 py-3 text-right">
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                              Recipients
                            </p>
                            <p className="mt-1 text-2xl font-extrabold text-slate-900">
                              {lastSendResult.notificationsSent}/{lastSendResult.totalUsers}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
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

function DraftSlotCard({
  draft,
  isDeleting,
  isEditing,
  onEdit,
  onDelete,
}: {
  draft: NotificationDraft;
  isDeleting: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(104,123,173,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#edf3ff] px-3 py-1 text-xs font-semibold text-[#3568da]">
              {draft.timing}
            </span>
            <span className="text-xs text-slate-400">
              {formatUpdatedAt(draft.updatedAt)}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-900">{draft.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{draft.body}</p>
          {draft.data && Object.keys(draft.data).length > 0 ? (
            <pre className="mt-3 overflow-x-auto rounded-2xl bg-[#f7f9ff] p-3 text-xs text-slate-500">
              {JSON.stringify(draft.data, null, 2)}
            </pre>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            disabled={isEditing}
            className="rounded-xl bg-[#eef3ff] p-2.5 text-[#3568da] transition hover:bg-[#dfe9ff] disabled:opacity-70"
          >
            <PencilLine className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-xl bg-[#fff1f1] p-2.5 text-[#e35d5d] transition hover:bg-[#ffe4e4] disabled:opacity-70"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
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
