'use client';

import { useMemo, useRef, useState } from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

interface Connections3DProps {
  connectionPoints: Vector3[];
  servicePoints: Array<{ position: [number, number, number]; name: string }>;
  isVisible: boolean;
}

// Composant pour une ligne animée
function AnimatedLine({ startPoint, endPoint, delay = 0 }: { 
  startPoint: Vector3; 
  endPoint: Vector3; 
  delay?: number;
}) {
  const progressRef = useRef(0);
  const [animatedPoints, setAnimatedPoints] = useState<Vector3[]>([]);
  const startTimeRef = useRef<number | null>(null);
  
  useFrame((state) => {
    const currentTime = state.clock.elapsedTime;
    
    // Initialiser le temps de début au premier frame après le délai
    if (startTimeRef.current === null && currentTime >= delay) {
      startTimeRef.current = currentTime;
    }
    
    if (startTimeRef.current !== null) {
      const elapsed = currentTime - startTimeRef.current;
      const duration = 1.5; // Durée de l'animation en secondes
      
      if (elapsed <= duration) {
        // Animation avec easing (ease-out cubic)
        const t = Math.min(elapsed / duration, 1);
        const easedT = 1 - Math.pow(1 - t, 3); // Cubic ease-out
        
        progressRef.current = easedT;
        
        // Calculer le point actuel de la ligne
        const currentPoint = startPoint.clone().lerp(endPoint, easedT);
        
        // Créer les points pour la ligne jusqu'au point actuel
        const points = [startPoint, currentPoint];
        setAnimatedPoints(points);
      } else {
        // Animation terminée, ligne complète
        progressRef.current = 1;
        setAnimatedPoints([startPoint, endPoint]);
      }
    }
  });
  
  if (animatedPoints.length === 0) return null;
  
  return (
    <Line
      points={animatedPoints}
      color="#ffffff"
      lineWidth={1}
      transparent={true}
      opacity={0.8}
      depthTest={true}
    />
  );
}

export default function Connections3D({ 
  connectionPoints, 
  servicePoints, 
  isVisible 
}: Connections3DProps) {
  
  
  // Utiliser directement les positions 3D des services
  const servicePoints3D = useMemo(() => {
    if (!isVisible || servicePoints.length === 0) return [];
    
    return servicePoints.map((servicePoint) => {
      return new Vector3(...servicePoint.position);
    });
  }, [servicePoints, isVisible]);

  // Calculer les connexions optimales
  const connections = useMemo(() => {
    if (!isVisible || servicePoints3D.length === 0) {
      return [];
    }

    // Si pas de connectionPoints du modèle, utiliser des points fixes pour tester
    if (connectionPoints.length === 0) {
      const fallbackPoints = [
        new Vector3(2, 1, 0),   // Point 1
        new Vector3(3, -1, 1),   // Point 2  
        new Vector3(1, 2, -1),   // Point 3
        new Vector3(4, 0, 0),    // Point 4
        new Vector3(2, -2, 1),   // Point 5
      ];
      
      return servicePoints3D.map((servicePoint, serviceIndex) => {
        const fallbackPoint = fallbackPoints[serviceIndex % fallbackPoints.length];
        return {
          serviceIndex,
          pointIndex: serviceIndex % fallbackPoints.length,
          startPoint: servicePoint,
          endPoint: fallbackPoint,
        };
      });
    }

    return servicePoints3D.map((servicePoint, serviceIndex) => {
      // Distribuer les services de manière cyclique entre tous les points de connexion
      const pointIndex = serviceIndex % connectionPoints.length;
      
      return {
        serviceIndex,
        pointIndex,
        startPoint: servicePoint,
        endPoint: connectionPoints[pointIndex],
      };
    });
  }, [connectionPoints, servicePoints3D, isVisible]);

  if (!isVisible || connections.length === 0) {
    return null;
  }

  return (
    <group>
      {connections.map((connection, index) => {
        // Délai progressif pour chaque ligne (0.15s entre chaque)
        const delay = index * 0.15;
        
        return (
          <group key={index}>
            {/* Ligne animée */}
            <AnimatedLine 
              startPoint={connection.startPoint}
              endPoint={connection.endPoint}
              delay={delay}
            />
            
            {/* Point de connexion sur le modèle - très petit et blanc - visible seulement sur Services */}
            {isVisible && (
              <mesh position={connection.endPoint}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.2}
                  transparent={true}
                  opacity={0.9}
                />
              </mesh>
            )}
            
            {/* Point de départ sur le service - très petit et blanc - visible seulement sur Services */}
            {isVisible && (
              <mesh position={connection.startPoint}>
                <sphereGeometry args={[0.012, 8, 8]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.2}
                  transparent={true}
                  opacity={0.9}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
