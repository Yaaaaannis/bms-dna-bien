"use client";

import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Background from "./components/Background";
import Header from "./components/Header";
import Service from "./components/Service";
import Collectif from "./components/Collectif";
import Projet from "./components/Projet";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isServiceVisible, setIsServiceVisible] = useState(false);
  const [isCollectifVisible, setIsCollectifVisible] = useState(false);
  const [isProjetsVisible, setIsProjetsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  
  // Points 3D fixes (sans contrôles)
  const servicePoints = [
    { position: [-0.2, 1.7, 0] as [number, number, number], name: 'DIRECTION ARTISTIQUE' },
    { position: [-0.2, 1.7, 0] as [number, number, number], name: 'DIRECTION ARTISTIQUE' },

    { position: [-0.2, 0.6, 0] as [number, number, number], name: 'DÉVELOPPEMENT WEB' },
    { position: [-0.2, 0.6, 0] as [number, number, number], name: 'DÉVELOPPEMENT WEB' },

    { position: [-0.7, -1.5, 0] as [number, number, number], name: 'MOTION DESIGN / 3D' },
    { position: [-0.7, -1.5, 0] as [number, number, number], name: 'MOTION DESIGN / 3D' },

    { position: [-0.345, -0.560, 1.056] as [number, number, number], name: 'PHOTOGRAPHIE' },
    { position: [-0.345, -0.560, 1.056] as [number, number, number], name: 'PHOTOGRAPHIE' },

    { position: [0.118, -1.546, 1.420] as [number, number, number], name: 'CINÉMATOGRAPHIE' },
    { position: [0.118, -1.546, 1.420] as [number, number, number], name: 'CINÉMATOGRAPHIE' },

    { position: [0, -2.0, 2.224] as [number, number, number], name: 'MONTAGE VIDÉO' },
    { position: [0, -2.0, 2.224] as [number, number, number], name: 'MONTAGE VIDÉO' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  const handleServicesClick = () => {
    setIsServiceVisible(!isServiceVisible);
    // Désactiver les autres sections quand on clique sur Services
    setIsCollectifVisible(false);
    setIsProjetsVisible(false);
    setIsContactVisible(false);
  };


  const handleCollectifClick = () => {
    setIsCollectifVisible(!isCollectifVisible);
    // Désactiver les autres sections quand on clique sur Collectif
    setIsServiceVisible(false);
    setIsProjetsVisible(false);
    setIsContactVisible(false);
  };

  const handleProjetsClick = () => {
    setIsProjetsVisible(!isProjetsVisible);
    // Désactiver les autres sections quand on clique sur Projets
    setIsServiceVisible(false);
    setIsCollectifVisible(false);
    setIsContactVisible(false);
    // Ici vous pouvez ajouter la logique pour afficher le contenu Projets
  };

  const handleContactClick = () => {
    setIsContactVisible(!isContactVisible);
    // Désactiver les autres sections quand on clique sur Contact
    setIsServiceVisible(false);
    setIsCollectifVisible(false);
    setIsProjetsVisible(false);
    // Ici vous pouvez ajouter la logique pour afficher le contenu Contact
  };

        return (
                  <div className="relative min-h-screen">
                    {/* Scène 3D en arrière-plan */}
                    <Background 
                      servicePoints={servicePoints} 
                      isServiceVisible={isServiceVisible}
                      isCollectifVisible={isCollectifVisible}
                      isProjetsVisible={isProjetsVisible}
                    />
                    
                    {/* Header avec logo et navigation */}
                    <Header 
                      onServicesClick={handleServicesClick}
                      onCollectifClick={handleCollectifClick}
                      onProjetsClick={handleProjetsClick}
                      onContactClick={handleContactClick}
                      isServiceVisible={isServiceVisible}
                      isCollectifVisible={isCollectifVisible}
                      isProjetsVisible={isProjetsVisible}
                      isContactVisible={isContactVisible}
                    />

                    {/* Service au clic */}
                    {isServiceVisible && (
                      <Service isVisible={isServiceVisible} />
                    )}

                    {/* Collectif au clic */}
                    {isCollectifVisible && (
                      <Collectif isVisible={isCollectifVisible} />
                    )}

                    {/* Projets au clic */}
                    {isProjetsVisible && (
                      <Projet isVisible={isProjetsVisible} />
                    )}


                  </div>
        );
}
