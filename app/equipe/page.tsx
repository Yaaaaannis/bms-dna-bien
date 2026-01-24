import { Metadata } from "next";
import EquipeClient from "../components/EquipeClient";

export const metadata: Metadata = {
  title: "L'Équipe DNA | BMS DNA",
  description: "Rencontrez les talents du collectif BMS DNA : une équipe passionnée de créatifs, développeurs et artistes prêts à relever tous les défis.",
  openGraph: {
    title: "L'Équipe DNA | BMS DNA",
    description: "Rencontrez nos talents créatifs.",
    url: "https://www.dna-bms.com/equipe",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "BMS DNA Team" },
    ],
  },
};

export default function EquipePage() {
  return <EquipeClient />;
}
