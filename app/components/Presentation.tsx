'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PresentationProps {
  isVisible: boolean;
  onReturn?: () => void;
}

export default function Presentation({ isVisible }: PresentationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Animation du premier titre
    if (title1Ref.current) {
      gsap.set(title1Ref.current, { opacity: 0, y: -20 });
      tl.to(title1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Animation des paragraphes de la première section
    paragraphsRef.current.slice(0, 2).forEach((paragraph, index) => {
      if (paragraph) {
        gsap.set(paragraph, { opacity: 0, y: 20 });
        tl.to(paragraph, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, 0.5 + index * 0.1);
      }
    });

    // Animation du deuxième titre
    if (title2Ref.current) {
      gsap.set(title2Ref.current, { opacity: 0, y: -20 });
      tl.to(title2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 1.2);
    }

    // Animation des paragraphes de la deuxième section
    paragraphsRef.current.slice(2, 4).forEach((paragraph, index) => {
      if (paragraph) {
        gsap.set(paragraph, { opacity: 0, y: 20 });
        tl.to(paragraph, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, 1.5 + index * 0.1);
      }
    });

  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-25 flex items-start justify-start bg-transparent overflow-y-auto">
      <div ref={containerRef} className="relative w-full max-w-5xl mx-64 pt-50  pb-32">
        
        {/* Section 1: UN COLLECTIF CRÉATIF */}
        <div className="mb-20">
          <h1 
            ref={title1Ref}
            className="text-[40px] font-bold text-white uppercase mb-4"
            style={{ fontFamily: 'DrukWideBold, sans-serif' }}
          >
            UN COLLECTIF CRÉATIF
          </h1>
          
          <div className="space-y-4">
            <div 
              ref={el => { paragraphsRef.current[0] = el as HTMLDivElement; }}
              className="w-[75%]"
            >
              <p 
                className="text-white text-[16px] leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Le BMS DNA est né des cendres du regretté @HasJoelstreamed qui avait créé le Vendredi des Artistes de la communauté BMS: chaque vendredi, toutes celles et ceux ayant un talent particulier pouvaient le mettre en avant. C&apos;est ainsi que @idamah et @Jojolepaga, dont vous avez déjà pu voir les travaux, se sont révélés. Idamah a alors proposé, avec l&apos;aide de @Yannis_dev, @yacinetha et @super8_studiio, à @Imaginary_Flame cette idée de collectif.
              </p>
            </div>
            
            <div 
              ref={el => { paragraphsRef.current[1] = el as HTMLDivElement; }}
              className="w-[75%]"
            >
              <p 
                className="text-white text-[16px] leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Nous avons pour objectif de révéler et rassembler les personnes créatives issues de la communauté BMS et d&apos;internet en général. Que vous soyez artiste, créateurs, penseurs ou bâtisseurs prêts à transformers vos passions en projets concrets et à inspirer les autres à en faire autant.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: LE PROJET */}
        <div>
          <h2 
            ref={title2Ref}
            className="text-5xl font-bold text-white uppercase mb-8"
            style={{ fontFamily: 'DrukWideBold, sans-serif' }}
          >
            LE PROJET
          </h2>
          
          <div className="space-y-6">
            <div 
              ref={el => { paragraphsRef.current[2] = el as HTMLDivElement; }}
              className="w-full"
            >
              <p 
                className="text-white text-lg leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Une agence de talents, une association, un studio créatif, affiliée à BMS où tout un chacun peut offrir ses services. Que ce soit de la rédaction d&apos;articles, du montage, du graphisme, de la musique, de l&apos;événementiel... L&apos;objectif sera de vous permettre de mettre votre savoir-faire en valeur à travers divers projets en collaborations avec d&apos;autres membres du collectif.
              </p>
            </div>
            
            <div 
              ref={el => { paragraphsRef.current[3] = el as HTMLDivElement; }}
              className="w-full"
            >
              <p 
                className="text-white text-lg leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Bien évidemment, faire partie de cette communauté n&apos;oblige en rien à participer aux projets, c&apos;est pourquoi, contrairement à d&apos;autres agences/plateformes, nous vous offrons la possibilité de faire valoir vos propres projets créatifs sans contrepartie ! Votre promotion sera faites sur tous nos réseaux ainsi qu&apos;à travers ce site web et une newsteller (une sélection hebdomadaire des meilleurs projets sera faites)
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

