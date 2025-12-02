import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TakeaChefHome.com – The Culinary Exchange",
  description:
    "Marketplace for private chefs, catering, kitchen rentals, and chef jobs. Built by a working chef for real food people.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
