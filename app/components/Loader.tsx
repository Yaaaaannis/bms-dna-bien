'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation GSAP de révélation circulaire du centre vers l'extérieur
    if (maskRef.current) {
      // Initial state: clip-path cercle de 0% au centre
      gsap.set(maskRef.current, {
        clipPath: 'circle(0% at 50% 50%)'
      });

      // Animation: révélation progressive du centre vers l'extérieur
      gsap.to(maskRef.current, {
        clipPath: 'circle(100% at 50% 50%)',
        duration: 2,
        ease: "power2.out",
        delay: 0.5
      });
    }

    // Timer pour masquer le loader après 3 secondes
    const timer = setTimeout(() => {
      if (maskRef.current) {
        gsap.to(maskRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setIsVisible(false);
            if (onComplete) {
              onComplete();
            }
          }
        });
      } else {
        setIsVisible(false);
        if (onComplete) {
          onComplete();
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative">
        {/* Logo fixe */}
        <Image
          src="/logo-loader.svg"
          alt="Loading..."
          width={400}
          height={200}
          priority
          className="opacity-0"
        />
        
        {/* Masque qui révèle le logo du centre vers l'extérieur */}
        <div 
          ref={maskRef}
          className="absolute inset-0"
        >
          <Image
            src="/logo-loader.svg"
            alt="Loading..."
            width={400}
            height={200}
            priority
          />
        </div>
      </div>
    </div>
  );
}
