import { Metadata } from "next";
import ContactClient from "../components/ContactClient";

export const metadata: Metadata = {
  title: "Contactez-nous | BMS DNA",
  description: "Vous avez un projet ? Contactez le collectif BMS DNA pour discuter de vos besoins créatifs et techniques.",
  openGraph: {
    title: "Contactez-nous | BMS DNA",
    description: "Parlons de votre prochain projet.",
    url: "https://www.dna-bms.com/contact",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "BMS DNA Contact" },
    ],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
