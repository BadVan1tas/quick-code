import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Analytics from "@/components/Analytics";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Quik Code | High-Impact Software & Web Development",
  description:
    "Quik Code engineers custom software, web applications, and secure payment platforms with lightning speed. Premium design, A+ security, and 72-hour delivery.",
  keywords: ["web development", "custom software", "Next.js", "Stripe payments", "UPI payments", "Firebase", "quick delivery"],
  authors: [{ name: "Quik Code Inc." }],
  openGraph: {
    title: "Quik Code | High-Impact Software & Web Development",
    description:
      "We build sleek, scalable web applications and payment systems — delivered in 72 hours with military precision.",
    type: "website",
    locale: "en_US",
    siteName: "Quik Code",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quik Code | High-Impact Software & Web Development",
    description:
      "Custom software, web apps, and secure payment portals. Fast delivery, premium design, bulletproof security.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <CurrencyProvider>
            <Analytics />
            <SchemaOrg />
            <div className="ambient-bg" aria-hidden="true" />
            <div className="grid-overlay" aria-hidden="true" />
            {children}
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
