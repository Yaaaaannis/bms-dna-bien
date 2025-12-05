'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import teamData from "../data/team.json";
import TeamMemberCard from "./TeamMemberCard";

interface CollectifProps {
  isVisible: boolean;
  onReturn?: () => void;
}

export default function Collectif({ isVisible, onReturn }: CollectifProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<typeof teamData[0] | null>(null);

  // Initialize selected member with the first one on load or when component becomes visible
  // REMOVED as per request: default state should be closed

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Animation du titre
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, x: -20 });
      tl.to(titleRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Animation des images
    if (imagesRef.current.length > 0) {
      gsap.set(imagesRef.current, { opacity: 0, scale: 0.8 });
      tl.to(imagesRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");
    }

  }, [isVisible]);

  // Animation for card appearance
  useEffect(() => {
    if (selectedMember && cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [selectedMember]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-25 flex items-center bg-black/90">
      <div ref={containerRef} className="relative w-full h-full max-w-7xl mx-auto px-16 flex flex-row items-center justify-between">

        {/* Contenu gauche */}
        <div className="flex flex-col items-start justify-center w-full max-w-2xl pl-20">

          {/* Titre */}
          <div ref={titleRef} className="mb-12 flex items-center gap-4">
            <h1
              className="text-6xl font-bold text-white uppercase whitespace-nowrap ml-[-100px]"
              style={{ fontFamily: 'DrukWideBold, sans-serif' }}
            >
              L'ÉQUIPE DNA
            </h1>
          </div>

          {/* Grille des membres */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {teamData.map((member, index) => (
              <div
                key={member.name}
                ref={el => { imagesRef.current[index] = el; }}
                className={`relative w-28 h-28 bg-gray-800 overflow-hidden cursor-pointer group border-2 transition-all duration-300 ${selectedMember?.name === member.name ? 'border-white scale-105 z-10' : 'border-transparent border-gray-600'}`}
                onClick={() => setSelectedMember(selectedMember?.name === member.name ? null : member)}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={`object-cover transition-all duration-300 ease-in-out ${selectedMember?.name === member.name ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                />
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Espace droit (Carte membre) - Positionné en absolu par rapport à l'écran */}
      <div className="absolute bottom-0 right-0 h-full w-1/2 flex items-end justify-end pb-30  pr-20 z-20 pointer-events-none overflow-hidden">
        {selectedMember && (
          <div ref={cardRef} className="origin-bottom-right pointer-events-auto">
            <TeamMemberCard member={selectedMember} />
          </div>
        )}
      </div>

    </div>
  );
}
