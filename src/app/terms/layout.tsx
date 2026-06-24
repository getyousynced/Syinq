import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms & Conditions",
  description:
    "The Terms governing your use of Syinq, eligibility, verified-member coordination, ride cost-sharing, acceptable use, and your rights.",
  path: "/terms",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
