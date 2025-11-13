"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EXPECTED_SLUG = process.env.NEXT_PUBLIC_ADMIN_LOGIN_SLUG;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if slug doesn’t match the expected private route
  useEffect(() => {
    if (params?.slug !== EXPECTED_SLUG) router.replace("/");
  }, [params?.slug, router]);

  // --- Handle login ---
  // async function handleLogin() {
  //   setError("");
  //   setLoading(true);

  //   try {
  //     const res = await fetch(`${API_BASE}/api/v1/auth/authenticateUser`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Login failed");

  //     // --- Validate if user has Admin role ---
  //     const user = data?.data?.user || {};
  //     if (user.role !== "Admin") {
  //       throw new Error("Access denied: you are not authorized as admin");
  //     }

  //     // --- Store JWT securely (for demo: cookie, later use httpOnly) ---
  //     document.cookie = `admin_token=${data.data.accessToken}; path=/;`;

  //     // Redirect to dashboard
  //     router.push("/admin/dashboard");
  //   } catch (err: any) {
  //     setError(err.message ?? "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // }


  //OTP LOGIN
  async function handleLogin() {
  setError("");
  setLoading(true);

  try {
    // Step 1: Start login
    const res = await fetch(`${API_BASE}/auth/authenticateUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to start login");

    const otp = prompt("Enter the 6-digit OTP sent to your email:");
    if (!otp) throw new Error("OTP required");

    // Step 2: Verify OTP
    const verifyRes = await fetch(`${API_BASE}/auth/verifyUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activation_Token: data.data.activation_Token,
        activationCode: Number(otp),
      }),
    });

    const verifyData = await verifyRes.json();
    if (!verifyRes.ok) throw new Error(verifyData.message || "Invalid OTP");

    const user = verifyData.data.user;
    if (user.role !== "Admin") throw new Error("Access denied: not an admin");

    document.cookie = `admin_token=${verifyData.data.accessToken}; path=/;`;
    router.push("/admin/dashboard");
  } catch (err: any) {
    setError(err.message || "Login failed");
  } finally {
    setLoading(false);
  }
}


// ---FAKE LOGIN---

// async function handleLogin() {
//   setError("");
//   setLoading(true);

//   try {
//     // 1️⃣ Temporary: fake the OTP logic (until backend works)
//     const fakeAdminEmail = "admin@syinq.com"; // your allowed admin mail
//     const enteredEmail = email.trim().toLowerCase();

//     if (enteredEmail !== fakeAdminEmail) {
//       throw new Error("Access denied: only admin can log in");
//     }

//     // 2️⃣ Simulate OTP prompt (you can remove once backend works)
//     const otp = prompt("Enter 6-digit OTP (for demo, type 123456):");
//     if (otp !== "123456") {
//       throw new Error("Invalid OTP entered");
//     }

//     // 3️⃣ Pretend login success (you can store a dummy token)
//     document.cookie = `admin_token=mock-demo-token; path=/;`;

//     router.push("/admin/dashboard");
//   } catch (err: any) {
//     setError(err.message || "Login failed");
//   } finally {
//     setLoading(false);
//   }
// }




  return (
    <main className="container min-h-[calc(100vh-64px)] flex flex-wrap gap-10 items-center justify-center">
      <div className="flex flex-col flex-wrap gap-5">
        <div className="flex flex-row justify-start items-center gap-2 border-2 border-gray-300 p-1 w-56 rounded-full text-black/80 font-bold">
          <div className="bg-yellow-400 rounded-full h-3 w-3"></div>Private Admin Area
        </div>

        <div className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl text-balance">
          <span className="text-black">Review & </span>
          <span className="text-blue-500">approve </span>
          <br />
          <span className="text-green-500">university submissions.</span>
        </div>

        <div className="text-gray-500 text-lg tracking-wide">
          Manual actions. Transparent states. <br /> Fast feedback built for campus ops teams.
        </div>
      </div>

      <div className="card w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-5 text-center">SYINQ Admin Login</h1>

        <div className="space-y-3">
          <div>
            <label className="text-sm block mb-1">Email</label>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* <div>
            <label className="text-sm block mb-1">Password</label>
            <Input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div> */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            {loading ? "Authenticating…" : "Login"}
          </Button>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </div>
      </div>
    </main>
  );
}
