import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  icons: {icon: [{url:"/favicon.ico?v=house-1"},{url:"/favicon-32.png?v=house-1",type:"image/png",sizes:"32x32"}],apple:[{url:"/apple-touch-icon.png?v=house-1",sizes:"180x180"}]},
  title: "TakeaChefHome.com – The Culinary Exchange",
  description:
    "Marketplace for private chefs, catering, kitchen rentals, and chef jobs. Built by a working chef for real food people.",
};

export const viewport:Viewport={themeColor:'#135DFF'};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4EEDF] text-[#112443] antialiased">
        {children}
      </body>
    </html>
  );
}
