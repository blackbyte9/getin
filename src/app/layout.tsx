import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NavBar } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Getränke Inventur",
  description: "Getränkeinventur für die Bonanzbar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen justify-between">
          <NavBar />
          <main className="mb-auto min-h-screen p-12 flex flex-col items-center gap-16 bg-gray-400">
            {children}
            <Toaster position="top-center" richColors />
          </main>
        </div>
      </body>
    </html>
  );
}
