import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Analytics from "@/components/Analytics";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Quick Code | High-Impact Software & Web Development",
  description:
    "Quick Code engineers custom software, web applications, and secure payment platforms with lightning speed. Premium design, A+ security, and 72-hour delivery.",
  keywords: ["web development", "custom software", "Next.js", "Stripe payments", "Cashfree PG", "Firebase", "quick delivery"],
  authors: [{ name: "Quick Code Inc." }],
  openGraph: {
    title: "Quick Code | High-Impact Software & Web Development",
    description:
      "We build sleek, scalable web applications and payment systems — delivered in 72 hours with military precision.",
    type: "website",
    locale: "en_US",
    siteName: "Quick Code",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Code | High-Impact Software & Web Development",
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
          <Analytics />
          <SchemaOrg />
          <div className="ambient-bg" aria-hidden="true" />
          <div className="grid-overlay" aria-hidden="true" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
