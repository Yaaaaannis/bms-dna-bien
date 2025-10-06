'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { CSSProperties, useMemo, useRef, useState } from 'react';

interface ShaderImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  lineFrequency?: number; // number of horizontal lines per image height
  amplitude?: number; // bend amplitude in UV space
  decay?: number; // falloff radius
  speed?: number; // optional animated wobble speed
}

function DistortedPlane({
  src,
  lineFrequency = 140,
  amplitude = 0.04,
  decay = 0.22,
  speed = 0.15,
}: {
  src: string;
  lineFrequency?: number;
  amplitude?: number;
  decay?: number;
  speed?: number;
}) {
  const texture = useTexture(src);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [isOver, setIsOver] = useState(false);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseSmoothed = useRef(new THREE.Vector2(0.5, 0.5));
  const intensityRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAmplitude: { value: amplitude },
      uDecay: { value: decay },
      uLineFrequency: { value: lineFrequency },
      uSpeed: { value: speed },
      uIntensity: { value: 0 },
    }),
    [texture, amplitude, decay, lineFrequency, speed]
  );

  const vertexShader = useMemo(
    () => `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    []
  );

  const fragmentShader = useMemo(
    () => `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uAmplitude;
      uniform float uDecay;
      uniform float uLineFrequency;
      uniform float uSpeed;
      uniform float uIntensity;

      void main() {
        // Distance-based falloff from mouse
        float d = distance(vUv, uMouse);
        float falloff = exp(-d / max(0.0001, uDecay));
        // Horizontal scanlines; optional slow wobble via time
        float wobble = uSpeed * uTime;
        float scan = sin((vUv.y + wobble) * 6.28318530718 * uLineFrequency);
        // Bend UV.x locally around cursor
        float offsetX = uAmplitude * scan * falloff * uIntensity;
        vec2 distortedUv = vec2(vUv.x + offsetX, vUv.y);
        vec4 color = texture2D(uTexture, distortedUv);
        gl_FragColor = color;
      }
    `,
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    uniforms.uTime.value += delta;
    // Smooth mouse towards target for nicer motion
    mouseSmoothed.current.lerp(mouseTarget.current, Math.min(1, delta * 8));
    uniforms.uMouse.value.copy(mouseSmoothed.current);
    // Ease intensity only when hovered
    const target = isOver ? 1 : 0;
    intensityRef.current += (target - intensityRef.current) * Math.min(1, delta * 8);
    uniforms.uIntensity.value = intensityRef.current;
  });

  const planeScale = useMemo(() => [2, 2, 1] as [number, number, number], []);

  return (
    <group
      onPointerOver={() => setIsOver(true)}
      onPointerOut={() => setIsOver(false)}
      onPointerMove={(e) => {
        // e.uv exists for mesh intersections; values in [0,1]
        if (e.uv) {
          mouseTarget.current.set(e.uv.x, e.uv.y);
        }
      }}
    >
      <mesh scale={planeScale}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

export default function ShaderImage({ src, width, height, className, style, lineFrequency, amplitude, decay, speed }: ShaderImageProps) {
  return (
    <div
      className={className}
      style={{ width, height, overflow: 'hidden', borderRadius: 0, ...style }}
    >
      <Canvas
        orthographic
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], zoom: 100 }}
        style={{ width: '100%', height: '100%' }}
      >
        <DistortedPlane src={src} lineFrequency={lineFrequency} amplitude={amplitude} decay={decay} speed={speed} />
      </Canvas>
    </div>
  );
}

 