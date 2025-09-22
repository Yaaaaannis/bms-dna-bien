'use client';

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, TransformControls, Stats, AsciiRenderer } from "@react-three/drei";
import { DnaModel } from "./Dna";
import { useRef, useState } from "react";

export default function Background() {
  const [position, setPosition] = useState([2.885, 0.000, 2.439]);
  const [rotation, setRotation] = useState([-73.5 * Math.PI / 180, 84.7 * Math.PI / 180, 18.5 * Math.PI / 180]);
  const [scale, setScale] = useState([1.000, 0.746, 1.000]);
  const [mode, setMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  const meshRef = useRef();

  const handleObjectChange = () => {
    if (meshRef.current) {
      const pos = meshRef.current.position;
      const rot = meshRef.current.rotation;
      const scl = meshRef.current.scale;
      
      setPosition([pos.x, pos.y, pos.z]);
      setRotation([rot.x, rot.y, rot.z]);
      setScale([scl.x, scl.y, scl.z]);
    }
  };

  return (
    <div className="fixed inset-0 z-0 w-full h-full">
      <Canvas
        camera={{ position: [3, 5, 2], fov: 75 }}
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
        
        <DnaModel 
          ref={meshRef}
          position={position}
          scale={scale}
          rotation={rotation}
        />
        
        <TransformControls
          object={meshRef}
          mode={mode}
          onObjectChange={handleObjectChange}
        />
        
        
        
        <Environment preset="night" />
        <Stats />
        <AsciiRenderer
          fgColor="white"
          bgColor="transparent"
          characters=" .:-=+*#%@"
          invert={false}
          color={false}
          resolution={0.25}
          renderIndex={1}
        />
      </Canvas>
      
      {/* Contrôles et affichage des coordonnées */}
      <div className="absolute top-4 right-4 z-20 bg-black/80 text-white p-4 rounded-lg font-mono text-sm pointer-events-auto">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Contrôles</h3>
          <div className="space-x-2">
            <button 
              onClick={() => setMode('translate')}
              className={`px-3 py-1 rounded ${mode === 'translate' ? 'bg-white text-black' : 'bg-gray-600'}`}
            >
              Move
            </button>
            <button 
              onClick={() => setMode('rotate')}
              className={`px-3 py-1 rounded ${mode === 'rotate' ? 'bg-white text-black' : 'bg-gray-600'}`}
            >
              Rotate
            </button>
            <button 
              onClick={() => setMode('scale')}
              className={`px-3 py-1 rounded ${mode === 'scale' ? 'bg-white text-black' : 'bg-gray-600'}`}
            >
              Scale
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div>
            <strong>Position:</strong>
            <div>X: {position[0].toFixed(3)}</div>
            <div>Y: {position[1].toFixed(3)}</div>
            <div>Z: {position[2].toFixed(3)}</div>
          </div>
          
          <div>
            <strong>Rotation:</strong>
            <div>X: {(rotation[0] * 180 / Math.PI).toFixed(1)}°</div>
            <div>Y: {(rotation[1] * 180 / Math.PI).toFixed(1)}°</div>
            <div>Z: {(rotation[2] * 180 / Math.PI).toFixed(1)}°</div>
          </div>
          
          <div>
            <strong>Scale:</strong>
            <div>X: {scale[0].toFixed(3)}</div>
            <div>Y: {scale[1].toFixed(3)}</div>
            <div>Z: {scale[2].toFixed(3)}</div>
          </div>
        </div>
      </div>
      
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