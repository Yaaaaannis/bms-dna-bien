'use client';

import { Canvas } from "@react-three/fiber";
import { Environment, Stats, Sphere } from "@react-three/drei";
import { Model } from "./Model";
import Connections3D from "./Connections3D";
import { useRef, useState, useCallback } from "react";
import { Group, Vector3 } from "three";

interface BackgroundProps {
  servicePoints: Array<{ position: [number, number, number]; name: string }>;
  isServiceVisible: boolean;
}

export default function Background({ servicePoints, isServiceVisible }: BackgroundProps) {
  const meshRef = useRef<Group>(null);
  const [connectionPoints, setConnectionPoints] = useState<Vector3[]>([]);

  const handleConnectionPointsUpdate = useCallback((points: Vector3[]) => {
    setConnectionPoints(points);
  }, []);
  
  // Position fixe du modèle avec les coordonnées optimales
  const position = [4.240, -1.055, 2.439] as [number, number, number];
  const rotation = [-56.7 * Math.PI / 180, -122.4 * Math.PI / 180, 12.0 * Math.PI / 180] as [number, number, number];
  const scale = [0.701, 0.700, 0.752] as [number, number, number];

  return (
    <div className="fixed inset-0 z-0 w-full h-full">
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
          position={position}
          scale={scale}
          rotation={rotation}
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
          isVisible={isServiceVisible}
        />
        
        
        <Environment preset="night" />
        <Stats />
      </Canvas>
      
      {/* Video de noise par-dessus le Canvas */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
      >
        <source src="/noise.mp4" type="video/mp4" />
      </video>
      
    </div>
  );
}