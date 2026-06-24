import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Syinq collects, uses, and protects your personal data — campus verification, ride coordination, security, and account deletion. Email support@syinq.com.",
  path: "/privacy",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
