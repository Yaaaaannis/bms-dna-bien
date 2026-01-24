"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Presentation from "./components/Presentation";
import { useBackground } from "./contexts/BackgroundContext";

export default function Home() {
  const pathname = usePathname();
  const { setBackgroundState } = useBackground();

  // Vérifier si le loader a déjà été affiché dans cette session
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('bms-dna-loader-shown');
  });

  // Mettre à jour l'état du background pour cette page
  useEffect(() => {
    setBackgroundState({
      isServiceVisible: false,
      isCollectifVisible: false,
      isProjetsVisible: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Marquer que le loader a été affiché dans cette session
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('bms-dna-loader-shown', 'true');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen">
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <Loader onComplete={() => setIsLoading(false)} />
        </div>
      )}

      {/* Header avec logo et navigation */}
      <Header
        currentPath={pathname}
      />

      {/* Présentation (Intro) */}
      <Presentation
        isVisible={!isLoading}
      />
    </div>
  );
}
