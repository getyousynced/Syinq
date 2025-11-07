import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syinq Admin",
  description: "Admin dashboard for reviewing university submissions.",
   icons: {
    icon: "/favicon-new.ico", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
