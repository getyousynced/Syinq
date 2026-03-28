"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AdminSession = {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
};

export function useAdminSession() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

      if (!apiBaseUrl) {
        setLoading(false);
        router.replace("/admin-portal");
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/admin/auth/me`, {
          credentials: "include",
        });

        const payload = await response.json();

        if (!response.ok || !payload.success || !payload.data?.admin) {
          throw new Error(payload.message || "Unauthorized");
        }

        const currentAdmin = payload.data.admin as AdminSession;
        setAdmin(currentAdmin);
        window.localStorage.setItem("syinqAdmin", JSON.stringify(currentAdmin));
      } catch {
        window.localStorage.removeItem("syinqAdmin");
        router.replace("/admin-portal");
      } finally {
        setLoading(false);
      }
    };

    void verifySession();
  }, [router]);

  return { admin, loading };
}
