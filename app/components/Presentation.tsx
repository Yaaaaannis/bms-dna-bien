'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PresentationProps {
  isVisible: boolean;
  onReturn?: () => void;
}

export default function Presentation({ isVisible }: PresentationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Refs for animated elements
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLParagraphElement>(null);
  const textLine2Ref = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.1 });

    // Initial setups for mask reveal effect
    // We start from y: 100% (below) with skew and blur
    const initialConfig = {
      y: "110%",
      opacity: 0,
      rotateX: -20,
      filter: "blur(10px)",
      transformOrigin: "left top"
    };

    if (titleLine1Ref.current) gsap.set(titleLine1Ref.current, initialConfig);
    if (titleLine2Ref.current) gsap.set(titleLine2Ref.current, initialConfig);
    if (textLine1Ref.current) gsap.set(textLine1Ref.current, { ...initialConfig, y: "150%" });
    if (textLine2Ref.current) gsap.set(textLine2Ref.current, { ...initialConfig, y: "150%" });

    // Footer is simple fade up
    if (footerRef.current) gsap.set(footerRef.current, { y: 20, opacity: 0 });

    // 1. Title Animation
    tl.to([titleLine1Ref.current, titleLine2Ref.current], {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out"
    });

    // 2. Text Animation
    tl.to([textLine1Ref.current, textLine2Ref.current], {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.8");

    // 3. Footer Animation
    if (footerRef.current) {
      tl.to(footerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8");
    }

  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-25 flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-[90vw] lg:max-w-6xl mx-auto px-4 lg:px-0 flex flex-col items-center justify-center h-full gap-8 lg:gap-16 pt-10"
      >

        {/* Main Title - Wrapped in overflow-hidden for mask effect */}
        <div className="flex flex-col items-center justify-center pointer-events-none">
          {/* Line 1 */}
          <div className="overflow-hidden py-2">
            <h1
              ref={titleLine1Ref}
              className="text-4xl md:text-6xl lg:text-[100px] leading-[0.9] font-bold text-center text-white uppercase tracking-tighter mix-blend-difference"
              style={{ fontFamily: 'DrukWideBold, sans-serif' }}
            >
              BMS DNA
            </h1>
          </div>

          {/* Line 2 - Needs slightly more height for stroke artifacts */}
          <div className="overflow-hidden py-2 px-4 -mt-2 lg:-mt-4">
            <span
              ref={titleLine2Ref}
              className="block text-4xl md:text-6xl lg:text-[100px] leading-[0.9] font-bold text-center text-transparent stroke-white uppercase tracking-tighter"
              style={{ fontFamily: 'DrukWideBold, sans-serif', WebkitTextStroke: '1px white' }}
            >
              COLLECTIF CRÉATIF
            </span>
          </div>
        </div>

        {/* Central Text Block */}
        <div className="flex flex-col gap-1 items-center text-center max-w-2xl lg:max-w-4xl">
          <div className="overflow-hidden py-1">
            <p
              ref={textLine1Ref}
              className="text-white text-sm md:text-lg lg:text-xl font-light uppercase tracking-widest"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Né de l&apos;envie de transformer nos passions en projets concrets.
            </p>
          </div>

          <div className="overflow-hidden py-1">
            <p
              ref={textLine2Ref}
              className="text-white text-sm md:text-lg lg:text-xl font-light uppercase tracking-widest"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Un espace pour les artistes, designers et musiciens<br className="hidden lg:block" /> qui veulent créer, partager et évoluer ensemble.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="absolute bottom-12 left-0 w-full flex justify-between px-6 lg:px-12 pointer-events-none"
        >
          <p className="hidden lg:block text-xs text-white/60 tracking-[0.2em] font-light uppercase border-t border-white/20 pt-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            2026 — BMS DNA
          </p>
          <p className="w-full lg:w-auto text-center lg:text-right text-xs text-white tracking-[0.2em] font-bold uppercase border-t border-white/20 pt-4" style={{ fontFamily: 'DrukWideBold, sans-serif' }}>
            STUDIO CRÉATIF & PLATEFORME DE TALENTS
          </p>
        </div>

      </div>
    </div>
  );
}
