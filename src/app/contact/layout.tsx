import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Syinq",
  description:
    "Get in touch with the Syinq team \u2014 support for members, and campus/club/ambassador partnership enquiries. Email support@syinq.com.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
