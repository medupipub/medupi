import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "medupi",
  description: "medupi is a rehearsal of freedom, a house of collective study, a taking in of breath into bodies - celestial and more.",
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

        <main className="py-20">{children}</main>
      </body>
    </html>
  );
}
