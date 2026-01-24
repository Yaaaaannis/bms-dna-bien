import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos - BMS DNA",
  description: "BMS DNA est un collectif créatif regroupant designers, vidéastes, artistes 3D et développeurs web. Découvrez notre mission et notre projet.",
  openGraph: {
    title: "À propos - BMS DNA",
    description: "BMS DNA est un collectif créatif regroupant designers, vidéastes, artistes 3D et développeurs web.",
    url: "/a-propos",
  },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
