"use client";

import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Background from "./components/Background";
import Header from "./components/Header";
import Service from "./components/Service";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isServiceVisible, setIsServiceVisible] = useState(false);
  
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
  };


  const handleCollectifClick = () => {
    // Ici vous pouvez ajouter la logique pour afficher le contenu Collectif
    // L'animation du modèle continue de tourner
  };

  const handleProjetsClick = () => {
    // Ici vous pouvez ajouter la logique pour afficher le contenu Projets
    // L'animation du modèle continue de tourner
  };

  const handleContactClick = () => {
    // Ici vous pouvez ajouter la logique pour afficher le contenu Contact
    // L'animation du modèle continue de tourner
  };

        return (
                  <div className="relative min-h-screen">
                    {/* Scène 3D en arrière-plan */}
                    <Background 
                      servicePoints={servicePoints} 
                      isServiceVisible={isServiceVisible}
                    />
                    
                    {/* Header avec logo et navigation */}
                    <Header 
                      onServicesClick={handleServicesClick}
                      onCollectifClick={handleCollectifClick}
                      onProjetsClick={handleProjetsClick}
                      onContactClick={handleContactClick}
                      isServiceVisible={isServiceVisible}
                    />

                    {/* Service au clic */}
                    {isServiceVisible && (
                      <Service isVisible={isServiceVisible} />
                    )}

                  </div>
        );
}
