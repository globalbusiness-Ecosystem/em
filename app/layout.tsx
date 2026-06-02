import type React from "react";
import type { Metadata, Viewport } from "next";
import { Syne, Cairo } from "next/font/google";
import { AppWrapper } from "@/components/app-wrapper";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Made with App Studio",
  description:
    "Everything Market on Pi Network. Buy and sell anything worldwide using Pi cryptocurrency. Electronics, fashion, home, food, sports and more.",
    generator: 'v0.app'
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ff5c00",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
