"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define standalone routes
  const isStandalone =
    pathname.startsWith("/trip") || pathname.startsWith("/admin/login");

  // Standalone → no navbar/footer
  if (isStandalone) {
    return <>{children}</>;
  }

  // Normal site pages
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
