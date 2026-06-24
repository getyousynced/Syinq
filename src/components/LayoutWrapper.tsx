"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/site/ScrollProgress";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Standalone routes render without the marketing chrome.
  const isStandalone =
    pathname.startsWith("/trip") ||
    pathname.startsWith("/admin-portal") ||
    pathname.startsWith("/admin-rides") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/admin-notifications") ||
    pathname.startsWith("/admin-users");

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-[68px]">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
