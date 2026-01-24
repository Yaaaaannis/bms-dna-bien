"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Contact from "../components/Contact";
import { useBackground } from "../contexts/BackgroundContext";

export default function ContactPage() {
  const pathname = usePathname();
  const { setBackgroundState } = useBackground();

  // Mettre à jour l'état du background pour cette page
  useEffect(() => {
    setBackgroundState({
      isServiceVisible: false,
      isCollectifVisible: false,
      isProjetsVisible: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Header avec logo et navigation */}
      <Header
        currentPath={pathname}
      />

      {/* Contact */}
      <Contact
        isVisible={true}
        onReturn={() => {}}
      />
    </div>
  );
}
