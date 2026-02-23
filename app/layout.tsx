import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "SaaSFlow - Subscription Management Platform",
  description:
    "A white-label SaaS starter kit with subscription management, user dashboards, automated billing, and admin analytics.",
  keywords: ["SaaS", "dashboard", "subscription", "billing", "analytics"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
