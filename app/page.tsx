"use client";

import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Background from "./components/Background";
import Header from "./components/Header";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen">
      {/* Scène 3D en arrière-plan */}
      <Background />
      
      {/* Header avec logo et navigation */}
      <Header />

      {/* Contenu de la page par-dessus la scène 3D */}
      <div className="relative z-5 min-h-screen flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8">
            BMS DNA
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Innovation & Création Digitale
          </p>
        </div>
      </div>
    </div>
  );
}
