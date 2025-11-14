import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Take a Chef Home",
  description: "MVP — TakeaChefHome.com Marketplace",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
