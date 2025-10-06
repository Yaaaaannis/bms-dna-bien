'use client';

import { Canvas } from "@react-three/fiber";
import { Environment, Stats, Sphere } from "@react-three/drei";
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

export default function Background({ servicePoints, isServiceVisible, isCollectifVisible, isProjetsVisible }: BackgroundProps) {
  const meshRef = useRef<Group>(null);
  const [connectionPoints, setConnectionPoints] = useState<Vector3[]>([]);
  
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
  const animateModelTransition = useCallback((isCollectif: boolean) => {
    const targetPosition = isCollectif 
      ? { x: -12.134, y: -7.069, z: 9.093 }  // Position pour Collectif
      : { x: 4.240, y: -1.055, z: 2.439 };  // Position par défaut
    
    const targetRotation = isCollectif
      ? { x: 2.671, y: -0.353, z: -1.861 }  // Rotation pour Collectif
      : { x: -56.7 * Math.PI / 180, y: -122.4 * Math.PI / 180, z: 12.0 * Math.PI / 180 };  // Rotation par défaut
    
    const targetScale = isCollectif
      ? { x: 0.701, y: 0.358, z: 0.752 }  // Échelle pour Collectif
      : { x: 0.701, y: 0.700, z: 0.752 };  // Échelle par défaut

    // Animation GSAP avec timeline pour synchroniser toutes les propriétés
    const tl = gsap.timeline({
      ease: "power2.inOut",
      duration: 1.2
    });

    tl.to(modelDataRef.current.position, {
      duration: 1.2,
      ease: "power2.inOut",
      ...targetPosition,
      onUpdate: () => {
        forceUpdate({});
      }
    })
    .to(modelDataRef.current.rotation, {
      duration: 1.2,
      ease: "power2.inOut", 
      ...targetRotation,
      onUpdate: () => {
        forceUpdate({});
      }
    }, 0) // Commence en même temps que la position
    .to(modelDataRef.current.scale, {
      duration: 1.2,
      ease: "power2.inOut",
      ...targetScale,
      onUpdate: () => {
        forceUpdate({});
      }
    }, 0); // Commence en même temps que la position
  }, []);

  // Effet pour déclencher l'animation quand isCollectifVisible change
  useEffect(() => {
    if (isCollectifVisible) {
      // Animation vers Collectif
      animateModelTransition(true);
    } else {
      // Animation de retour à la position par défaut
      animateModelTransition(false);
    }
  }, [isCollectifVisible, animateModelTransition]);


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
        
        {/* Points 3D correspondant aux services - visibles seulement sur Services */}
        {isServiceVisible && servicePoints.map((point, index) => (
          <Sphere
            key={index}
            position={point.position}
            args={[0.02, 8, 8]}
          >
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        ))}
        
        {/* Système de connexions 3D */}
        <Connections3D
          connectionPoints={connectionPoints}
          servicePoints={servicePoints}
          isVisible={isServiceVisible || isProjetsVisible}
        />
        
        
        <Environment preset="night" />
        <Stats />
      </Canvas>
      
      
    </div>
  );
}