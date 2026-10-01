import type { Metadata } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Providers from "./providers";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "300 900",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Riddim Africa",
  description:
    "Discover the latest African music, artists, entertainment, and culture with Riddim Africa.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="min-h-full flex flex-col font-satoshi antialiased">
        <Providers>
          {children}

          <Toaster />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
