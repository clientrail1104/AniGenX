import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redline AI — Extreme Auto Video Editing",
  description:
    "AI-assisted automotive video editing, beat sync, color grading and multi-format export."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
