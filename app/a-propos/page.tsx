import { Metadata } from "next";
import AboutClient from "../components/AboutClient";

export const metadata: Metadata = {
  title: "À Propos du Collectif | BMS DNA",
  description: "BMS DNA : Né de l'envie de transformer nos passions en projets concrets. Un espace pour les artistes, designers et musiciens.",
  openGraph: {
    title: "À Propos du Collectif | BMS DNA",
    description: "Notre histoire et notre vision.",
    url: "https://www.dna-bms.com/a-propos",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "BMS DNA About" },
    ],
  },
};

export default function AProposPage() {
  return <AboutClient />;
}
