"use client";
import { useEffect, useMemo, useState } from "react";
import { AdminAPI } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { University } from "@/lib/mock";
import { RefreshCw } from 'lucide-react';


export default function DashboardPage() {
  const [list, setList] = useState<University[]>([]);
  const [filter, setFilter] = useState<"pending" | "accepted" | "rejected" | "all">("pending");
  const [loading, setLoading] = useState(false);

  const stats = useMemo(() => ({
    pending: list.filter(x => x.status === "pending").length,
    accepted: list.filter(x => x.status === "accepted").length,
    rejected: list.filter(x => x.status === "rejected").length,
  }), [list]);

  async function load() {
    setLoading(true);
    try {
      const data = await AdminAPI.listUniversities();
      setList(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = list.filter(u => filter === "all" ? true : u.status === filter);


  function optimisticUpdate(
    id: string,
    status: "accepted" | "rejected",
    action: () => Promise<any>
  ) {
    const prev = [...list];
    setList(prev.map(u => u.id === id ? { ...u, status } : u));
    action()
      .then(updated => setList(cur => cur.map(u => u.id === id ? { ...u, ...updated } : u)))
      .catch(() => setList(prev));
  }


  return (
    <main className="container py-6 grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <Sidebar filter={filter} setFilter={(v) => setFilter(v as any)} stats={stats} />
      </div>
      <section className="col-span-12 md:col-span-8 lg:col-span-9 space-y-3">
        <Card>
          <CardContent className="py-3 flex items-center gap-3">
            <div className="flex-1">
              <input className="w-full border border-border rounded-xl px-3 py-2 outline-none focus:ring-4 focus:ring-blue-100 focus:border-primary" placeholder="Search universities, city, submitter…" />
            </div>
            <Button variant="outline" onClick={load} disabled={loading}>{loading ? <div className="hover:rotate-180 duration-300 transition-all"><RefreshCw /></div> : "Refresh"}</Button>
            <Button variant="ghost" onClick={() => { document.cookie = "admin_token=; Max-Age=0; path=/"; location.href = `/admin/${process.env.NEXT_PUBLIC_ADMIN_LOGIN_SLUG ?? "access"}/login`; }}>Logout</Button>
          </CardContent>
        </Card>

        {filtered.length === 0 ? (
          <div className="card p-6 text-center text-muted">No universities in this view.</div>
        ) : (
          <div className="flex flex-wrap gap-4 bg-slate-100 p-3 rounded-lg ">
            {filtered.map((u) => (
              <article key={u.id} className="bg-white rounded-lg border-stone-200 p-4  md:col-span-6 xl:col-span-4 flex flex-wrap items-start justify-center sm:justify-between gap-4 w-full">
                <div>
                  <div className="font-bold text-center sm:text-start">{u.name}</div>
                  <div className="mt-2 text-sm text-muted flex flex-wrap justify-center gap-2 ">
                    <span className="inline-flex items-center border border-border rounded-lg px-2 py-1 text-xs bg-white"><span className={`w-2.5 h-2.5 rounded-full mr-1 ${u.status === "pending" ? "bg-warn" : u.status === "accepted" ? "bg-success" : "bg-danger"}`} />{u.status}</span>
                    <span className="inline-flex items-center border border-border rounded-lg px-2 py-1 text-xs bg-white">By: {u.submittedBy}</span>
                    <span className="inline-flex items-center border border-border rounded-lg px-2 py-1 text-xs bg-white">Email: {u.email}</span>
                    <span className="inline-flex items-center border border-border rounded-lg px-2 py-1 text-xs bg-white">At: {u.at}</span>
                  </div>
                </div>
                {u.status === "rejected" && u.remarks && (
                  <div className="text-sm text-red-500 mt-2 italic">Remarks: {u.remarks}</div>
                )}

                {u.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button variant="success" onClick={() => optimisticUpdate(u.id, "accepted", () => AdminAPI.accept(u.id))}>Accept</Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        setList((prev) =>
                          prev.map((x) =>
                            x.id === u.id ? { ...x, showRemarkBox: true } : x
                          )
                        )
                      }
                    >
                      Reject
                    </Button>

                  </div>
                ) : null}

                {u.showRemarkBox && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-72">
                      <h4 className="font-semibold mb-2 text-gray-800">Add Remarks</h4>
                      <textarea
                        placeholder="Write reason for rejection..."
                        className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none focus:ring-2 focus:ring-blue-100 outline-none"
                        rows={3}
                        onChange={(e) =>
                          setList((prev) =>
                            prev.map((x) =>
                              x.id === u.id ? { ...x, tempRemark: e.target.value } : x
                            )
                          )
                        }
                      />
                      <div className="flex justify-end gap-2 mt-3">
                        <Button
                          variant="outline"
                          
                          onClick={() =>
                            setList((prev) =>
                              prev.map((x) =>
                                x.id === u.id ? { ...x, showRemarkBox: false } : x
                              )
                            )
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            const remark = u.remarks?.trim() || "No remark provided";
                            optimisticUpdate(u.id, "rejected", () =>
                              AdminAPI.reject(u.id, remark)
                            );
                            setList((prev) =>
                              prev.map((x) =>
                                x.id === u.id
                                  ? { ...x, showRemarkBox: false, remarks: remark }
                                  : x
                              )
                            );
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
