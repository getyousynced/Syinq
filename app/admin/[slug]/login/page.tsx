"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminAPI } from "@/lib/api";


const EXPECTED_SLUG = process.env.NEXT_PUBLIC_ADMIN_LOGIN_SLUG ?? "access";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If slug doesn't match the configured one, bounce to home
    if (params?.slug !== EXPECTED_SLUG) {
      router.replace("/");
    }
  }, [params?.slug, router]);

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      const data = await AdminAPI.login(email, password);
      // Store token in cookie (for demo), switch to httpOnly cookie via API in prod
      document.cookie = `admin_token=${data.token}; path=/`;
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (

    <main className="container min-h-[calc(100vh-64px)] flex flex-wrap gap-10 items-center justify-center">
      <div className="flex flex-col flex-wrap gap-5 ">
        <div className="flex flex-row justify-start items-center gap-2 border-2 border-gray-300 p-1 w-56 rounded-full text-black/80 font-bold"><div className="bg-yellow-400 rounded-full h-3 w-3"></div>Private Admin Area</div>
        <div className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl text-balance">
          <span className="text-black">Review & </span>
          <span className="text-blue-500">approve </span>
          <br />
          <span className="text-green-500">university submissions.</span>
        </div>


        <div className="text-gray-500 text-lg tracking-wide">Manual actions. Transparent states. <br /> Fast feedback built for campus ops teams.</div>
      </div>

      <div className="card w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-1">SYINQ Admin Login</h1>
        <p className="text-sm text-muted mb-5">Manual trigger • 30s timeout • Error states</p>
        <div className="space-y-3">
          <div>
            <label className="text-sm block mb-1">Email</label>
            <Input type="email" placeholder="admin@syinq.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm block mb-1">Password</label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button onClick={handleLogin} disabled={loading} className="w-full flex items-center justify-center">
            {loading ? "Authenticating…" : "Login"}
          </Button>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </div>
      </div>
    </main>

  );
}
