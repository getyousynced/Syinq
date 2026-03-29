"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define standalone routes
  const isStandalone =
    pathname.startsWith("/trip") ||
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin-portal") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/admin-notifications") ||
    pathname.startsWith("/admin-users");

  // Standalone → no navbar/footer
  if (isStandalone) {
    return <>{children}</>;
  }

  // Normal site pages
  return (
    <>
      <Navbar />
      <div
        aria-hidden="true"
        className="h-[144px] bg-white md:h-[98px]"
      />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}
