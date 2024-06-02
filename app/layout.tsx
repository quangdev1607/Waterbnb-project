import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LayoutProvider } from "./_components/LayoutProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
<link rel="icon" href="/public/mobilewaterbnblogo.png" sizes="any" />;
export const metadata: Metadata = {
  title: "waterbnb",
  description: "The simple airbnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutProvider>
          <main>{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
        </LayoutProvider>
      </body>
    </html>
  );
}
