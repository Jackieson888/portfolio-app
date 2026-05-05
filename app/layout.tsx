import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/nav";

const geistSans = Google_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Google_Sans_Code({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jackson Schacher",
  description: "Profile Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex flex-1 w-full min-h-fill max-w-3xl flex-col items-center justify-between py-4 px-4 bg-white dark:bg-black sm:items-start">
          {children}
        </main>
      </body>
    </html>
  );
}
