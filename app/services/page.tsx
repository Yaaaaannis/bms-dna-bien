import { Metadata } from "next";
import ServicesClient from "../components/ServicesClient";

export const metadata: Metadata = {
  title: "Nos Services Créatifs | BMS DNA",
  description: "Découvrez nos expertises : Direction Artistique, Développement Web, Motion Design, 3D, Photographie, Cinématographie et Montage Vidéo.",
  openGraph: {
    title: "Nos Services Créatifs | BMS DNA",
    description: "Expertises en Design, Web, 3D, et Vidéo.",
    url: "https://www.dna-bms.com/services",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "BMS DNA Services" },
    ],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
