import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'; // <-- Add this import
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Fedyk – Design Lead & Manager",
  description:
    "Portfolio of Ryan Fedyk, Design Lead & Manager at Google. 22 patents, 1.5B users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts before JS runs – eliminates FOUT */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Page veil – dark cover that lifts after fonts load */}
        <div className="page-veil" aria-hidden="true" />
        {children}
      </body>
      {/* Google Analytics - Drops the script safely without blocking page load */}
      <GoogleAnalytics gaId="G-GE6Q3R84HJ" /> 
    </html>
  );
}