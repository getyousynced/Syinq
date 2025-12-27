import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Syinq",
  description:
    "Understand how Syinq collects, uses, and protects your personal information.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
