export const metadata = {
  title: "Take a Chef Home",
  description: "MVP — TakeaChefHome.com Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
