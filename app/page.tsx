import { Metadata } from "next";
import HomeClient from "./components/HomeClient";

export const metadata: Metadata = {
  title: "BMS DNA - Studio Créatif & Plateforme de Talents à Paris",
  description: "BMS DNA est un collectif créatif parisien regroupant designers, vidéastes, artistes 3D et développeurs web. Nous transformons vos projets en expériences digitales uniques.",
  openGraph: {
    title: "BMS DNA - Studio Créatif & Plateforme de Talents",
    description: "Designers, vidéastes, artistes 3D et développeurs web unis pour créer des expériences uniques.",
    url: "https://www.dna-bms.com/",
    siteName: "BMS DNA",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "BMS DNA" },
    ],
    type: "website",
  },
};

export default function Home() {
  return <HomeClient />;
}
