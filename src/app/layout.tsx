import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
