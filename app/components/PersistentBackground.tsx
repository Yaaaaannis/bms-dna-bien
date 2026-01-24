'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Background from './Background';
import { useBackground } from '../contexts/BackgroundContext';

// Points 3D fixes (sans contrôles) - partagés entre toutes les pages
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

export default function PersistentBackground() {
  const pathname = usePathname();
  const { backgroundState } = useBackground();

  // Mettre à jour l'état du background selon la route
  useEffect(() => {
    // Cette logique peut être étendue si nécessaire
    // Pour l'instant, on laisse les pages gérer leur propre état via le contexte
  }, [pathname]);

  return (
    <Background
      servicePoints={servicePoints}
      isServiceVisible={backgroundState.isServiceVisible}
      isCollectifVisible={backgroundState.isCollectifVisible}
      isProjetsVisible={backgroundState.isProjetsVisible}
    />
  );
}
