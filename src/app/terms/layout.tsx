import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Syinq",
  description:
    "Read the Terms & Conditions governing the use of the Syinq platform.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
