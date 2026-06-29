import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster as Sonner } from "@/components/ui/sonner";
import LayoutWrapper from "@/components/LayoutWrapper";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
    images: [
      {
        url: "/revamp/og/og-default.png",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/revamp/og/og-default.png"],
  },
  icons: {
    icon: "/revamp/brand/syinq-icon.png",
    apple: "/revamp/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#099BE4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <GoogleTagManager gtmId="GTM-PRXGSMJM" />
        {/* Flash-free reveal gate: mark JS available before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PRXGSMJM"
            height="0"
            width="0"
            style={{display:"none", visibility:"hidden"}}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript)  */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <LayoutWrapper>{children}</LayoutWrapper>
        <Sonner />
      </body>
    </html>
  );
}
