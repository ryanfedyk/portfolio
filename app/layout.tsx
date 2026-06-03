import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Fedyk — Design Lead & Manager",
  description:
    "Portfolio of Ryan Fedyk, Design Lead & Manager at Google. 22 patents, 1.5B+ DAU, AI-forward products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts before JS runs — eliminates FOUT */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=block"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Page veil — dark cover that lifts after fonts load */}
        <div className="page-veil" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
