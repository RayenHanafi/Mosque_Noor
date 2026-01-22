import React from "react";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "جامع النور - بومهل البساتين",
  description:
    "مسجد النور هو مركز ديني واجتماعي يخدم سكان المنطقة، ويهدف إلى إقامة الصلوات، تعليم القرآن الكريم، وتنظيم الدروس والأنشطة الدينية",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo_white.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/logo_white.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/logo_white.png",
    shortcut: "/logowhite.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
