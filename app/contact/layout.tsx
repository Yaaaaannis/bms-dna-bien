import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - BMS DNA",
  description: "Contactez le collectif créatif BMS DNA. Rejoignez notre communauté d'artistes, designers, vidéastes et développeurs web.",
  openGraph: {
    title: "Contact - BMS DNA",
    description: "Contactez le collectif créatif BMS DNA. Rejoignez notre communauté d'artistes.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
