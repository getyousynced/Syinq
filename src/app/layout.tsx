"use client";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import LayoutWrapper from "@/components/LayoutWrapper";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  weight: "400",
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayoutWrapper = pathname.startsWith("/admin") || pathname === "/login";

  return (
    <html lang="en">
      <body className={`${roboto.className} select-none`}>
        {hideLayoutWrapper ? children : <LayoutWrapper>{children}</LayoutWrapper>}
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
