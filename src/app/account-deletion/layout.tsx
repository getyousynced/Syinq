import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Account Deletion",
  description:
    "How to permanently delete your Syinq account, what data is removed, and the limited data retained for compliance. Email support@syinq.com.",
  path: "/account-deletion",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
