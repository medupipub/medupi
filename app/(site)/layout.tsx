import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "medupi",
  description: "medupi is a rehearsal of freedom, a house of collective study, a taking in of breath into bodies - celestial and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = await getPages();

  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts stylesheet link */}
        <link rel="stylesheet" href="https://use.typekit.net/pmr0alv.css" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* Header */}
        <Header pages={pages} />

        <main className="flex-1">
          {children}
        </main>



      </body>
    </html >
  );
}
