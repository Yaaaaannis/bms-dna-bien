import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L'équipe - BMS DNA",
  description: "Découvrez les membres du collectif créatif BMS DNA : designers, vidéastes, artistes 3D et développeurs web.",
  openGraph: {
    title: "L'équipe - BMS DNA",
    description: "Découvrez les membres du collectif créatif BMS DNA.",
    url: "/equipe",
  },
};

export default function EquipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
