'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CollectifProps {
  isVisible: boolean;
}

export default function Collectif({ isVisible }: CollectifProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    // Animation d'apparition avec délai de 1 seconde
    const tl = gsap.timeline({ delay: 1 });

    // 1. Images d'abord (fade in + scale)
    imagesRef.current.forEach((image, index) => {
      if (image) {
        gsap.set(image, { opacity: 0, scale: 0.8 });
        tl.to(image, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }, index * 0.2); // Délai entre chaque image
      }
    });

    // 2. Carrés ensuite (fade in + scale)
    squaresRef.current.forEach((square, index) => {
      if (square) {
        gsap.set(square, { opacity: 0, scale: 0.5 });
        tl.to(square, {
          opacity: 0.8,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, 1.5 + index * 0.15); // Commence après les images
      }
    });

    // 3. Lignes en dernier (draw effect)
    linesRef.current.forEach((line, index) => {
      if (line) {
        gsap.set(line, { scaleX: 0, opacity: 0 });
        tl.to(line, {
          scaleX: 1,
          opacity: 0.6,
          duration: 1.2,
          ease: "power2.out",
          transformOrigin: "0 0"
        }, 2.2 + index * 0.1); // Commence après les carrés
      }
    });

  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-25 flex items-center justify-center">
      {/* Container principal */}
      <div ref={containerRef} className="relative w-full h-full max-w-7xl mx-auto px-8">
        
        {/* Images avec leurs positions asymétriques */}
        <div className="relative w-full h-full">
          
          {/* Image 1 - Position 1 */}
          <div className="absolute top-1/3 left-[-1/6] w-40 h-40">
            <div className="relative w-full h-full">
              {/* Photo */}
              <div ref={el => { imagesRef.current[0] = el; }}>
                <Image
                  src="/images/flame.jpg"
                  alt="Flame"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover "
                  style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
                />
              </div>
              {/* Carré blanc en bas à droite */}
              <div ref={el => { squaresRef.current[0] = el; }} className="absolute bottom-[-12px] right-[-12px] w-14 h-14 border-2 border-white opacity-80"></div>
              {/* Ligne pointillée vers le bas */}
              <div ref={el => { linesRef.current[0] = el; }} className="absolute w-px bg-white" 
                   style={{ 
                     borderLeft: '1px dashed white',
                     height: '258px',
                     opacity: 0.6,
                     rotate: '-22deg',
                     transformOrigin: '0 0',
                     left: '161px',
                     top: '160px'
                   }}></div>
            </div>
          </div>

          {/* Image 2 - Position 2 */}
          <div className="absolute top-[40%] left-[25%] w-40 h-40">
            <div className="relative w-full h-full">
              {/* Photo */}
              <div ref={el => { imagesRef.current[1] = el; }}>
                <Image
                  src="/images/idamah.jpg"
                  alt="Idamah"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover "
                  style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
                />
              </div>
              {/* Carré blanc en haut à gauche */}
              <div ref={el => { squaresRef.current[1] = el; }} className="absolute top-[-12px] left-[-12px] w-14 h-14 border-2 border-white opacity-80"></div>
              {/* Ligne pointillée vers le bas */}
              <div ref={el => { linesRef.current[1] = el; }} className="absolute w-px bg-white" 
                   style={{ 
                     borderLeft: '1px dashed white',
                     height: '326px',
                     opacity: 0.6,
                     rotate: '4deg',
                     transformOrigin: '0 0',
                     left: '2px',
                     top: '0px'
                   }}></div>
            </div>
          </div>

          {/* Image 3 - Position 3 */}
          <div className="absolute top-1/3 left-1/2 w-40 h-40">
            <div className="relative w-full h-full">
              {/* Photo */}
              <div ref={el => { imagesRef.current[2] = el; }}>
                <Image
                  src="/images/jojo.jpg"
                  alt="Jojo"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover "
                  style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
                />
              </div>
              {/* Carré blanc en bas à gauche */}
              <div ref={el => { squaresRef.current[2] = el; }} className="absolute bottom-[-12px] left-[-12px] w-14 h-14 border-2 border-white opacity-80"></div>
              {/* Ligne pointillée vers le bas */}
              <div ref={el => { linesRef.current[2] = el; }} className="absolute w-px bg-white" 
                   style={{ 
                     borderLeft: '1px dashed white',
                     height: '258px',
                     opacity: 0.6,
                     rotate: '-22deg',
                     transformOrigin: '0 0',
                     left: '0px',
                     top: '160px'
                   }}></div>
            </div>
          </div>

          {/* Image 4 - Position 4 */}
          <div className="absolute top-[40%] right-[15%] w-40 h-40">
            <div className="relative w-full h-full">
              {/* Photo */}
              <div ref={el => { imagesRef.current[3] = el; }}>
                <Image
                  src="/images/yannis.jpg"
                  alt="Super"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover "
                  style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
                />
              </div>
              {/* Carré blanc en bas à droite */}
              <div ref={el => { squaresRef.current[3] = el; }} className="absolute bottom-[-12px] right-[-12px] w-14 h-14 border-2 border-white opacity-80"></div>
              {/* Ligne pointillée vers le bas */}
              <div ref={el => { linesRef.current[3] = el; }} className="absolute w-px bg-white" 
                   style={{ 
                     borderLeft: '1px dashed white',
                     height: '304px',
                     opacity: 0.6,
                     rotate: '47deg',
                     transformOrigin: '0 0',
                     left: '158px',
                     top: '160px'
                   }}></div>
            </div>
          </div>

          {/* Image 5 - Position 5 */}
          <div className="absolute top-1/3 right-[-5%] w-40 h-40">
            <div className="relative w-full h-full">
              {/* Photo */}
              <div ref={el => { imagesRef.current[4] = el; }}>
                <Image
                  src="/images/yacine.jpg"
                  alt="Yacine"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover "
                  style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
                />
              </div>
              {/* Carré blanc en haut à droite */}
              <div ref={el => { squaresRef.current[4] = el; }} className="absolute bottom-[-12px] left-[-12px] w-14 h-14 border-2 border-white opacity-80"></div>
              {/* Ligne pointillée vers le bas */}
              <div ref={el => { linesRef.current[4] = el; }} className="absolute w-px bg-white" 
                   style={{ 
                     borderLeft: '1px dashed white',
                     height: '304px',
                     opacity: 0.6,
                     rotate: '19deg',
                     transformOrigin: '0 0',
                     left: '2px',
                     top: '160px'
                   }}></div>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
}
