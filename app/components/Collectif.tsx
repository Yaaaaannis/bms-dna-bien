'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CollectifProps {
  isVisible: boolean;
  onReturn?: () => void;
}

export default function Collectif({ isVisible, onReturn }: CollectifProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  const teamMembers = [
    { 
      name: "FLAME", 
      image: "/images/flame.jpg", 
      link: "https://x.com/Imaginary_Flame",
      skills: ["Montage", "Photo", "Illustration", "Storytelling", "Développement", "Création de contenu"]
    },
    { 
      name: "IDAMAH", 
      image: "/images/idamah.jpg", 
      link: "https://x.com/idamah_",
      skills: ["Direction Artistique", "Design", "Branding", "UI/UX"]
    },
    { 
      name: "YANNIS", 
      image: "/images/yannis.jpg", 
      link: "https://x.com/Yannis_dev",
      skills: ["Développement Web", "Frontend", "React", "Next.js"]
    },
    { 
      name: "DEMAGE", 
      image: "/images/demage.jpg", 
      link: "https://x.com/super",
      skills: ["Motion Design", "3D", "Animation", "VFX"]
    },
    { 
      name: "YACINE", 
      image: "/images/yacine.jpg", 
      link: "https://x.com/yacinetha",
      skills: ["Photographie", "Cinématographie", "Montage Vidéo"]
    },
    { 
      name: "JUNE", 
      image: "/images/yune.jpg", 
      link: "https://x.com/yune",
      skills: ["Design Graphique", "Illustration", "Branding"]
    },
    { 
      name: "JOJO", 
      image: "/images/jojo.jpg", 
      link: "https://x.com/Jojolepaga",
      skills: ["Développement", "Backend", "API", "Base de données"]
    },
    { 
      name: "ALAN", 
      image: "/images/alan.jpg", 
      link: "https://x.com/alan",
      skills: ["Marketing", "Communication", "Stratégie"]
    }
  ];

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Animation du titre
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: -20 });
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Animation des images
    imagesRef.current.forEach((image, index) => {
      if (image) {
        gsap.set(image, { opacity: 0, scale: 0.8 });
        tl.to(image, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        }, 0.3 + index * 0.1);
      }
    });

    // Animation du CTA
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 1.2);
    }

  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-25 flex items-center justify-center bg-transparent">
      {/* Bouton retour */}
      {/* {onReturn && (
        <button
          onClick={onReturn}
          className="fixed top-8 left-8 z-30 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white border-opacity-30"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          ← RETOUR
        </button>
      )} */}
      
      <div ref={containerRef} className="relative w-full h-full max-w-5xl mx-auto px-16 flex flex-col items-center justify-start pt-16">
        
        {/* Titre */}
        <div ref={titleRef} className="mb-12">
          <h1 
            className="text-6xl font-bold text-white uppercase whitespace-nowrap"
            style={{ fontFamily: 'DrukWideBold, sans-serif' }}
          >
            DNA COLLECTIVE TEAM
          </h1>
        </div>

        {/* Noms au-dessus de la div blanche */}
        <div className="flex justify-center items-center gap-6 mb-4">
          {teamMembers.map((member) => (
            <span key={member.name} className="text-white text-base font-bold uppercase tracking-wider w-28 text-left">
              {member.name}
            </span>
          ))}
        </div>

        {/* Container avec rectangle blanc derrière */}
        <div className="relative bg-white p-2 mb-20">
          {/* Grille des membres de l'équipe sur une ligne */}
          <div className="flex justify-center items-center gap-6">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="flex flex-col items-start">
                {/* Container de l'image */}
                <div 
                  ref={el => { imagesRef.current[index] = el; }}
                  className="relative w-28 h-28 bg-white border-2 border-gray-300 group cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {!selectedMember && (
          <div ref={ctaRef} className="text-center">
            <p 
              className="text-white text-2xl font-bold uppercase tracking-wider underline"
              style={{ fontFamily: 'DrukWideBold, sans-serif' }}
            >
              SELECT A MEMBER
            </p>
          </div>
        )}

        {/* Sous-menu du membre sélectionné */}
        {selectedMember && (
          <div className="w-full max-w-6xl">
            <div className="flex items-start gap-8 justify-start">
              {/* Colonne gauche : Nom et Image */}
              <div className="flex flex-col gap-4">
                {/* Nom en gros */}
                <h2 
                  className="text-6xl font-bold text-white uppercase ml-[-64]"
                  style={{ fontFamily: 'DrukWideBold, sans-serif' }}
                >
                  {selectedMember.name}
                </h2>
                
                {/* Image en rectangle */}
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={200}
                  height={300}
                  className="w-48 h-72 object-cover"
                />
              </div>
              
              {/* Compétences à droite */}
              <div className="flex flex-col gap-2 mt-16">
                {selectedMember.skills.map((skill, index) => (
                  <div key={index} className="text-white text-lg font-medium">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
