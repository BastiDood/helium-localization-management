import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helium Localization Management",
  description: "A take-home assignment for localization management.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
        {children}
        <Toaster richColors theme="system" />
      </body>
    </html>
  );
}
