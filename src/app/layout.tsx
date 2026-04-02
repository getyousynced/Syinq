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
  title: "Syinq – Campus Carpooling App",
  description: "One App for every campus move. Carpool with verified students on Syinq.",
  keywords: ["carpooling", "campus app", "student app", "university rides", "student carpooling"],
  openGraph: {
    title: "Syinq – Campus Carpooling App",
    description: "One App for every campus move. Carpool with verified students on Syinq.",
    url: "https://syinq.com",
    siteName: "Syinq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syinq – Campus Carpooling App",
    description: "One App for every campus move. Carpool with verified students.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
