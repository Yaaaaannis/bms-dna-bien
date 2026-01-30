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

export default function Background({ servicePoints, isCollectifVisible, isProjetsVisible }: BackgroundProps) {
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

    const targetPosition = isCollectif
      ? { x: -12.134 + mobileOffsetX, y: -7.069 + mobileOffsetY, z: 9.093 + mobileOffsetZ }
      : { x: 4.240 + mobileOffsetX, y: -1.055 + mobileOffsetY, z: 2.439 + mobileOffsetZ };

    const targetRotation = isCollectif
      ? { x: 2.671, y: -0.353, z: -1.861 }  // Rotation pour Collectif
      : { x: -56.7 * Math.PI / 180, y: -122.4 * Math.PI / 180, z: 12.0 * Math.PI / 180 };  // Rotation par défaut

    const targetScale = isCollectif
      ? { x: 0.701, y: 0.358, z: 0.752 }  // Échelle pour Collectif
      : { x: 0.701, y: 0.700, z: 0.752 };  // Échelle par défaut

    // Animation GSAP avec timeline séquentielle
    const tl = gsap.timeline();

    // 1. Disparition (Scale down to 0)
    tl.to(modelDataRef.current.scale, {
      duration: 0.5,
      ease: "power2.in",
      x: 0,
      y: 0,
      z: 0,
      onUpdate: () => forceUpdate({})
    });

    // 2. Téléportation (Changement instantané de position/rotation pendant que invisible)
    tl.add(() => {
      // Mise à jour directe des refs sans animation
      modelDataRef.current.position.x = targetPosition.x;
      modelDataRef.current.position.y = targetPosition.y;
      modelDataRef.current.position.z = targetPosition.z;

      modelDataRef.current.rotation.x = targetRotation.x;
      modelDataRef.current.rotation.y = targetRotation.y;
      modelDataRef.current.rotation.z = targetRotation.z;

      forceUpdate({});
    });

    // 3. Réapparition (Scale up to target)
    tl.to(modelDataRef.current.scale, {
      duration: 0.6,
      ease: "back.out(1.2)", // Léger rebond pour un effet "pop"
      ...targetScale,
      onUpdate: () => forceUpdate({})
    }, "+=0.1"); // Petite pause avant de réapparaître
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
        dpr={isMobile ? 1 : [1, 2]} // Optimisation DPR pour mobile
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
          castShadow={!isMobile} // Pas d'ombres sur mobile
        />
        <pointLight position={[3, -2, 1]} intensity={0.5} color="#ffffff" />

        <Model
          ref={meshRef}
          position={[modelDataRef.current.position.x, modelDataRef.current.position.y, modelDataRef.current.position.z]}
          scale={[modelDataRef.current.scale.x, modelDataRef.current.scale.y, modelDataRef.current.scale.z]}
          rotation={[modelDataRef.current.rotation.x, modelDataRef.current.rotation.y, modelDataRef.current.rotation.z]}
          isAnimated={true}
          onConnectionPointsUpdate={handleConnectionPointsUpdate}
          isMobile={isMobile}
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