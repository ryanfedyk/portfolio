import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Fedyk — Design Lead & Manager",
  description:
    "Portfolio of Ryan Fedyk, Design Lead & Manager at Google. 7 patents, 242M+ users, AI-forward products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
