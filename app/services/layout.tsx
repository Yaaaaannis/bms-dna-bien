import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - BMS DNA",
  description: "Découvrez nos services créatifs : direction artistique, développement web, motion design, 3D, photographie, cinématographie et montage vidéo.",
  openGraph: {
    title: "Services - BMS DNA",
    description: "Découvrez nos services créatifs : direction artistique, développement web, motion design, 3D, photographie, cinématographie et montage vidéo.",
    url: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
