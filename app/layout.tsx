import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NoiseVideo from "./components/NoiseVideo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BMS DNA",
    template: "%s | BMS DNA",
  },
  description: "BMS DNA - Collectif créatif",
  metadataBase: new URL("http://www.dna-bms.com/"),
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    title: "BMS DNA",
    description: "Collectif créatif: direction artistique, design, web, 3D et vidéo.",
    url: "/",
    siteName: "BMS DNA",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "BMS DNA" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMS DNA",
    description: "Collectif créatif.",
    images: ["/images/logo.jpg"],
  },
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
        {children}
        <NoiseVideo />
      </body>
    </html>
  );
}
