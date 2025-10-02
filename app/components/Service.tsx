'use client';

import { useRef, useMemo, useEffect } from 'react';

interface ServiceProps {
  isVisible: boolean;
  onServicePositionsUpdate?: (positions: { x: number; y: number }[]) => void;
}

export default function Service({ isVisible, onServicePositionsUpdate }: ServiceProps) {
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = useMemo(() => [
    'DIRECTION ARTISTIQUE',
    'DÉVELOPPEMENT WEB',
    'MOTION DESIGN / 3D',
    'PHOTOGRAPHIE',
    'CINÉMATOGRAPHIE',
    'MONTAGE VIDÉO'
  ], []);

  // Calculer les positions des services pour les connexions
  useEffect(() => {
    if (!isVisible || !servicesRef.current || !onServicePositionsUpdate) return;

    const calculatePositions = () => {
      const serviceElements = servicesRef.current?.querySelectorAll('h2');
      if (!serviceElements) return;

      const positions = Array.from(serviceElements).map((element) => {
        const rect = element.getBoundingClientRect();
        // Position à la fin du texte (droite)
        return {
          x: rect.right - 20, // 20px avant la fin pour éviter les débordements
          y: rect.top + rect.height / 2, // Centre vertical du texte
        };
      });

      console.log('Service - Calculated positions:', positions.length, positions);
      onServicePositionsUpdate(positions);
    };

    // Délai pour s'assurer que le DOM est rendu
    const timeoutId = setTimeout(calculatePositions, 100);

    // Recalculer lors du redimensionnement avec debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculatePositions, 150);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, onServicePositionsUpdate]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10 flex left-90 top-30">
      <div className="w-full h-full flex">
        {/* Services en colonne à gauche */}
        <div className="flex-1 flex flex-col justify-center  ">
          <div ref={servicesRef} className="space-y-8">
            {services.map((service, index) => (
              <div key={index} className="relative group">
                <h2 
                  className="text-white text-2xl font-bold uppercase tracking-wider cursor-pointer hover:text-gray-300 transition-colors duration-300"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {service}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* Zone pour le modèle 3D à droite */}
        <div className="flex-1 relative">
          {/* Cette zone sera utilisée pour positionner les connexions */}
        </div>
      </div>
    </div>
  );
}
