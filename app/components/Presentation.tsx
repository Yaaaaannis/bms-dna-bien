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
      <div ref={containerRef} className="relative w-full max-w-full lg:max-w-5xl mx-6 lg:mx-64 pt-48 lg:pt-50 pb-32">

        {/* Section 1: UN COLLECTIF CRÉATIF */}
        <div className="mb-12 lg:mb-20 ml-0 lg:-ml-32">
          <h1
            ref={title1Ref}
            className="text-3xl lg:text-[40px] font-bold text-white uppercase mb-4"
            style={{ fontFamily: 'DrukWideBold, sans-serif' }}
          >
            UN COLLECTIF CRÉATIF
          </h1>

          <div className="space-y-4">
            <div
              ref={el => { paragraphsRef.current[0] = el as HTMLDivElement; }}
              className="w-full lg:w-[75%]"
            >
              <p
                className="text-white text-sm lg:text-[16px] leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                BMS DNA est né de l’envie de mettre en lumière les talents de la communauté BMS. Chaque vendredi, des artistes, monteurs, graphistes, musiciens et créateurs partageaient leurs projets.
              </p>
            </div>

            <div
              ref={el => { paragraphsRef.current[1] = el as HTMLDivElement; }}
              className="w-full lg:w-[75%]"
            >
              <p
                className="text-white text-sm lg:text-[16px] leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                De là est né l’idée d’un collectif : rassembler ceux qui veulent transformer leurs passions en projets concrets.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: LE PROJET */}
        <div className="max-w-full lg:max-w-2xl">
          <h2
            ref={title2Ref}
            className="text-3xl lg:text-5xl font-bold text-white uppercase mb-8"
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
                className="text-white text-base lg:text-lg leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                BMS DNA fonctionne comme un studio créatif et une plateforme de talents. Chacun peut proposer ses compétences, collaborer sur des projets, ou simplement faire connaître son travail via nos réseaux.
              </p>
            </div>

            <div
              ref={el => { paragraphsRef.current[3] = el as HTMLDivElement; }}
              className="w-full"
            >
              <p
                className="text-white text-base lg:text-lg leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Rejoindre le collectif n’oblige à rien — nous offrons un espace pour créer, partager et évoluer ensemble.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

