import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BIS Hanoi - IGCSE Trial Exam Timetable Downloader",
  description:
    "Download your IGCSE trial exam timetable in iCal format. Made with ❤️ by Minsu Kim.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`antialiased ${plusJakartaSans.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
