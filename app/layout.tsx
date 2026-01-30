import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NoiseVideo from "./components/NoiseVideo";
import { Analytics } from "@vercel/analytics/next";
import { BackgroundProvider } from "./contexts/BackgroundContext";
import PersistentBackground from "./components/PersistentBackground";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "OXY5ryntHRU5V1ak9EFWI2xtPQrUqsAlynYyv6B-f4s",
  },
  title: {
    default: "BMS DNA - Collectif Créatif pour Artistes & Designers",
    template: "%s | BMS DNA",
  },
  description: "BMS DNA est un collectif créatif regroupant designers, vidéastes, artistes 3D et développeurs web. Rejoignez notre communauté d'artistes.",
  metadataBase: new URL("https://www.dna-bms.com/"),
  keywords: ["BMS DNA", "collectif créatif", "collectif artistes", "agence créative", "designers collectif", "collectif vidéo", "collectif 3D", "collectif web"],
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    title: "BMS DNA - Collectif Créatif",
    description: "BMS DNA est un collectif créatif regroupant designers, vidéastes, artistes 3D et développeurs web. Rejoignez notre communauté d'artistes.",
    url: "/",
    siteName: "BMS DNA",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "BMS DNA" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMS DNA - Collectif Créatif",
    description: "BMS DNA est un collectif créatif regroupant designers, vidéastes, artistes 3D et développeurs web.",
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
      <head>
        <meta name="google-site-verification" content="OXY5ryntHRU5V1ak9EFWI2xtPQrUqsAlynYyv6B-f4s" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <BackgroundProvider>
          <PersistentBackground />
          <div className="fixed inset-0 z-0 bg-black/40 backdrop-blur-[2px] pointer-events-none" />
          {children}
          <NoiseVideo />
          <Analytics />
        </BackgroundProvider>
      </body>
    </html>
  );
}
