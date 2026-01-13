import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import LayoutWrapper from "@/components/LayoutWrapper";

const roboto = Roboto({
  weight: "400",
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syinq",
  description: "One App for every campus move",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} select-none`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
