"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, ShieldCheck } from "lucide-react";
import PortalFeatureItem from "@/components/admin-portal/PortalFeatureItem";
import PortalField from "@/components/admin-portal/PortalField";
import type { PortalFeature, PortalField as PortalFieldType } from "@/components/admin-portal/types";
import { toast } from "@/components/ui/sonner";

const features: PortalFeature[] = [
  {
    title: "Secure Governance",
    description: "Role-based access control and audit trails for full transparency.",
    icon: ShieldCheck,
  },
  {
    title: "Real-time Operations",
    description: "Monitor system health and transaction flows in real-time.",
    icon: BarChart3,
  },
];

const fields: PortalFieldType[] = [
  {
    id: "admin-email",
    name: "email",
    label: "Admin Email",
    type: "email",
    placeholder: "admin@syinq.com",
    autoComplete: "email",
  },
  {
    id: "admin-password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "current-password",
    allowToggle: true,
  },
];

export default function AdminPortalShell() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: "email" | "password", value: string) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    if (!apiBaseUrl) {
      toast.error("Backend API URL is missing.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${apiBaseUrl}/admin/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        data?: {
          admin?: {
            id: string;
            email: string;
            name?: string;
          };
        };
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Admin login failed");
      }

      if (typeof window !== "undefined" && result.data?.admin) {
        window.localStorage.setItem(
          "syinqAdmin",
          JSON.stringify(result.data.admin),
        );
      }

      toast.success(result.message || "Admin logged in successfully.");
      setFormData((current) => ({
        ...current,
        password: "",
      }));
      router.push("/admin-dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to sign in right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8ff]">
      <div className="absolute left-[-7rem] top-[-7rem] h-72 w-72 rounded-full bg-[#5a8cff]/20 blur-3xl" />
      <div className="absolute bottom-[-7rem] right-[-5rem] h-80 w-80 rounded-full bg-[#bcefe9]/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8 lg:px-10">
        <section className="grid w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_90px_rgba(69,97,157,0.18)] lg:grid-cols-[1.02fr_1fr]">
          <div className="flex min-h-[320px] flex-col justify-between bg-[#3568da] px-8 py-10 sm:px-10 lg:min-h-[620px] lg:px-9 lg:py-11">
            <div>
              <div className="space-y-1">
                <h1 className="text-[2rem] font-extrabold tracking-[-0.04em] text-white">Syinq</h1>
                <p className="text-xs font-bold tracking-[0.35em] text-white/45">ADMIN PORTAL</p>
              </div>

              <div className="mt-20 space-y-8">
                {features.map((feature) => (
                  <PortalFeatureItem key={feature.title} feature={feature} />
                ))}
              </div>
            </div>

            <div className="space-y-5 pt-10">
              <div className="h-px bg-white/10" />
              <p className="text-xs text-white/40">
                © 2026 Rasync global solutions private limited. All rights reserved.
              </p>
            </div>
          </div>

          <div className="flex min-h-[520px] flex-col justify-center px-8 py-10 sm:px-12 lg:px-14">
            <form
              className="max-w-[25rem]"
              onSubmit={handleSubmit}
            >
              <div className="space-y-3">
                <h2 className="text-4xl font-extrabold tracking-[-0.05em] text-slate-900 sm:text-[2.65rem]">
                  Welcome back
                </h2>
                <p className="text-base leading-7 text-slate-500">
                  Enter your credentials to access the Syinq Admin Portal.
                </p>
              </div>

              <div className="mt-10 space-y-6">
                {fields.map((field) => (
                  <PortalField
                    key={field.id}
                    field={field}
                    value={formData[field.name as "email" | "password"]}
                    showPassword={field.type === "password" ? showPassword : undefined}
                    onTogglePassword={
                      field.type === "password"
                        ? () => setShowPassword((current) => !current)
                        : undefined
                    }
                    onChange={(event) =>
                      handleFieldChange(
                        field.name as "email" | "password",
                        event.target.value,
                      )
                    }
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#3568da] px-6 text-base font-semibold text-white shadow-[0_12px_28px_rgba(53,104,218,0.28)] transition hover:bg-[#2f5fcc] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span>{isSubmitting ? "Signing in..." : "Sign in to Portal"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-12 h-px bg-slate-200" />

              <div className="mt-7 flex justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Website</span>
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 px-5 pb-6 text-center text-xs text-slate-400">
        <span>Confidential System. Unauthorized access is strictly prohibited.</span>
        <span className="font-semibold text-[#6d98f3]">Contact Support</span>
      </div>
    </main>
  );
}
