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
      
    </div>
  );
}
