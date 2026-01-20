'use client';

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Model } from "./Model";
import Connections3D from "./Connections3D";
import { useRef, useState, useCallback, useEffect } from "react";
import { Group, Vector3 } from "three";
import { gsap } from "gsap";

interface BackgroundProps {
  servicePoints: Array<{ position: [number, number, number]; name: string }>;
  isServiceVisible: boolean;
  isCollectifVisible: boolean;
  isProjetsVisible: boolean;
}

export default function Background({ servicePoints, isServiceVisible: _isServiceVisible, isCollectifVisible, isProjetsVisible }: BackgroundProps) {
  const meshRef = useRef<Group>(null);
  const [connectionPoints, setConnectionPoints] = useState<Vector3[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Objets de données animables par GSAP
  const modelDataRef = useRef({
    position: { x: 4.240, y: -1.055, z: 2.439 },
    rotation: { x: -56.7 * Math.PI / 180, y: -122.4 * Math.PI / 180, z: 12.0 * Math.PI / 180 },
    scale: { x: 0.701, y: 0.700, z: 0.752 }
  });

  // États pour déclencher les re-renders
  const [, forceUpdate] = useState({});


  const handleConnectionPointsUpdate = useCallback((points: Vector3[]) => {
    setConnectionPoints(points);
  }, []);

  // Fonction d'animation GSAP pour les transitions fluides
  const animateModelTransition = useCallback((isCollectif: boolean, mobile: boolean) => {
    // Légers offsets sur mobile pour pousser le modèle plus à gauche
    const mobileOffsetX = mobile ? -2.0 : 0.0;
    const mobileOffsetY = mobile ? -2.0 : 0.0;
    const mobileOffsetZ = mobile ? 2.0 : 0.0;

    const basePos = { x: 4.240 + mobileOffsetX, y: -1.055 + mobileOffsetY, z: 2.439 + mobileOffsetZ };
    const collectifPos = { x: -12.134 + mobileOffsetX, y: -7.069 + mobileOffsetY, z: 9.093 + mobileOffsetZ };

    // Position/Rotation cibles
    const targetPosition = isCollectif ? collectifPos : basePos;

    const targetRotation = isCollectif
      ? { x: 2.671, y: -0.353, z: -1.861 }
      : { x: -56.7 * Math.PI / 180, y: -122.4 * Math.PI / 180, z: 12.0 * Math.PI / 180 };

    const targetScale = isCollectif
      ? { x: 0.701, y: 0.650, z: 0.752 }
      : { x: 0.701, y: 0.700, z: 0.752 };

    const tl = gsap.timeline({
      onUpdate: () => forceUpdate({})
    });

    // --- Séquence de Téléportation ---
    // 1. Fade OUT (Disparition)
    // On doit cibler le material.opacity. Comme on n'a pas accès direct au material ici facilement,
    // on peut animer une propriété générique et utiliser onUpdate pour mettre à jour les meshes trouvés.
    // OU Mieux: On anime 'meshRef.current.children...material.opacity' si on peut les trouver,
    // mais pour faire simple et robuste, on va chercher les meshes.

    // Helper pour mettre à jour l'opacité
    const setOpacity = (opacity: number) => {
      if (meshRef.current) {
        meshRef.current.traverse((child: any) => {
          if (child.isMesh && child.material) {
            child.material.opacity = opacity;
            child.material.needsUpdate = true;
          }
        });
      }
    };

    // Objet proxy pour l'animation
    const animState = { opacity: 0.2 }; // Opacité de base définie dans Model.tsx (0.2)

    // Étape 1: Disparition
    tl.to(animState, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onUpdate: () => setOpacity(animState.opacity)
    });

    // Étape 2: Téléportation (Changement instantané de position/rotation/scale quand invisible)
    tl.call(() => {
      modelDataRef.current.position = targetPosition;
      modelDataRef.current.rotation = targetRotation;
      modelDataRef.current.scale = targetScale;
      forceUpdate({});
    });

    // Étape 3: Réapparition (Fade IN)
    tl.to(animState, {
      opacity: 0.2, // Retour à l'opacité normale
      duration: 0.8,
      delay: 0.1, // Petite pause invisible
      ease: "power2.inOut",
      onUpdate: () => setOpacity(animState.opacity)
    });

  }, []);

  // Détecter le mobile et mettre à jour à la volée
  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Effet pour déclencher l'animation quand isCollectifVisible change
  useEffect(() => {
    if (isCollectifVisible) {
      // Animation vers Collectif
      animateModelTransition(true, isMobile);
    } else {
      // Animation de retour à la position par défaut
      animateModelTransition(false, isMobile);
    }
  }, [isCollectifVisible, isMobile, animateModelTransition]);


  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        camera={{ position: [1, 5, 2], fov: 75 }}
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[5, -3, 2]}
          intensity={1.2}
          target-position={[2.885, 0, 2.439]}
          castShadow
        />
        <pointLight position={[3, -2, 1]} intensity={0.5} color="#ffffff" />

        <Model
          ref={meshRef}
          position={[modelDataRef.current.position.x, modelDataRef.current.position.y, modelDataRef.current.position.z]}
          scale={[modelDataRef.current.scale.x, modelDataRef.current.scale.y, modelDataRef.current.scale.z]}
          rotation={[modelDataRef.current.rotation.x, modelDataRef.current.rotation.y, modelDataRef.current.rotation.z]}
          isAnimated={true}
          onConnectionPointsUpdate={handleConnectionPointsUpdate}
        />

        {/* Points 3D correspondant aux services - retirés */}

        {/* Système de connexions 3D */}
        <Connections3D
          connectionPoints={connectionPoints}
          servicePoints={servicePoints}
          isVisible={isProjetsVisible}
        />


        <Environment preset="night" />
      </Canvas>


    </div>
  );
}