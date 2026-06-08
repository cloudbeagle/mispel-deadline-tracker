import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MiSpeL Deadline Tracker",
  description:
    "Track BNetzA MiSpeL (BK6-25-038) deadline and decision aid for BESS operators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
