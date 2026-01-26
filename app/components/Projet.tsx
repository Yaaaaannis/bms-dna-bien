'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Project } from './Service';
import { SANITY_CATEGORIES } from '@/lib/sanity';

interface ProjetProps {
  isVisible: boolean;
  project?: Project;
  onClose?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalProjects?: number;
}

export default function Projet({ isVisible, project, onClose, onPrevious, onNext, currentIndex, totalProjects }: ProjetProps) {
  const boussoleRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedImage, setDisplayedImage] = useState<string>('');

  // Utiliser uniquement les images de la galerie (pas la preview)
  const allImages: string[] = project?.galleryImages || [];

  // Si pas d'images de galerie, utiliser la preview comme fallback
  const hasGalleryImages = allImages.length > 0;
  const displayImages = hasGalleryImages ? allImages : [project?.image || ''];

  // Image à afficher actuellement
  const currentImage = displayImages[currentGalleryIndex] || project?.image || '';
  const totalImages = displayImages.length;

  // Utiliser displayedImage s'il existe, sinon currentImage comme fallback
  const imageToDisplay = displayedImage || currentImage || '';

  // Initialiser displayedImage au premier rendu
  useEffect(() => {
    if (!displayedImage && currentImage) {
      setDisplayedImage(currentImage);
    }
  }, [currentImage, displayedImage]);

  // Détecter si c'est une vidéo (par extension ou URL)
  const isVideo = (url: string) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    const isVideoExtension = videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
    const isSanityVideoFile = url.includes('/files/') && !url.includes('/images/');
    return isVideoExtension || isSanityVideoFile;
  };

  const currentIsVideo = isVideo(imageToDisplay);

  // Utiliser les données réelles du projet (avec valeurs par défaut)
  const date = project?.date || '05.2025';
  const name = project?.name || 'GOLYO';
  const categories = project?.categories || project?.sanityData?.categories || [];
  const projectId = project?.projectId || 'GR052025';
  // Récupérer les créateurs et le website du projet
  const creators = project?.sanityData?.creators || [];
  const website = project?.sanityData?.website || project?.website;

  // Fonctions de navigation du carousel avec animation
  const handlePreviousImage = () => {
    if (isTransitioning || currentGalleryIndex === 0) return;
    setIsTransitioning(true);

    // Animation de sortie
    if (imageContainerRef.current && linksContainerRef.current) {
      gsap.to([imageContainerRef.current, linksContainerRef.current], {
        opacity: 0,
        x: 50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          const newIndex = currentGalleryIndex - 1;
          setCurrentGalleryIndex(newIndex);
          setDisplayedImage(displayImages[newIndex] || project?.image || '');
          // L'animation d'entrée sera déclenchée par onLoadingComplete sur l'image
        }
      });
    }
  };

  const handleNextImage = () => {
    if (isTransitioning || currentGalleryIndex === totalImages - 1) return;
    setIsTransitioning(true);

    // Animation de sortie
    if (imageContainerRef.current && linksContainerRef.current) {
      gsap.to([imageContainerRef.current, linksContainerRef.current], {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          const newIndex = currentGalleryIndex + 1;
          setCurrentGalleryIndex(newIndex);
          setDisplayedImage(displayImages[newIndex] || project?.image || '');
          // L'animation d'entrée sera déclenchée par onLoadingComplete sur l'image
        }
      });
    }
  };

  // Fonction pour animer l'entrée de la nouvelle image
  const animateImageIn = () => {
    if (imageContainerRef.current && linksContainerRef.current) {
      // On s'assure d'abord que les éléments sont bien cachés et positionnés pour l'entrée
      // Note: La position x de départ dépend de la direction (prev/next), 
      // mais pour simplifier ici on peut réinitialiser ou garder la logique actuelle si on stockait la direction.
      // Pour l'instant, faisons un simple fade-in propre, ou alors on garde le mouvement si possible.
      // Comme on a découplé, on perd l'info de direction facilement accessible ici sans state supplémentaire.
      // On va faire une entrée neutre ou basée sur une ref qui stockerait la direction si besoin, 
      // mais un fade-in simple + reset x est souvent plus safe pour éviter les sauts.

      // Pour garder la cohérence du mouvement (ex: vient de droite), on peut tenter de reset x à l'opposé de la sortie 
      // MAIS c'est complexe sans state direction. Simplifions : on remet x à 0 avec un fromTo léger ou juste opacity.

      // Cependant, l'utilisateur aimait le mouvement. Essayons de déduire ou simplifier.
      // Si on veut juste régler le "loading", on peut laisser le x là où il a été mis par le `onComplete` du `to` ?
      // Non, `to` a mis x à 50 ou -50.

      // Approche : On va faire un fromTo générique qui fait un petit scale up ou un fade in propre.
      // OU, on stocke la "nextAnimation" dans une ref ?

      // Restons simple : Fade In + Scale léger pour donner vie.
      gsap.fromTo([imageContainerRef.current, linksContainerRef.current],
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => setIsTransitioning(false)
        }
      );
    } else {
      setIsTransitioning(false);
    }
  };

  const handleMediaLoaded = () => {
    // Cette fonction est appelée quand l'image/vidéo est chargée
    // On lance l'animation d'entrée
    animateImageIn();
  };

  // Reset l'index de la galerie quand on change de projet avec animation smooth
  useEffect(() => {
    if (!project) return;

    // Calculer la première image du nouveau projet
    const newProjectImages = project.galleryImages || [];
    const hasNewGalleryImages = newProjectImages.length > 0;
    const newDisplayImages = hasNewGalleryImages ? newProjectImages : [project.image || ''];
    const firstImage = newDisplayImages[0] || project.image || '';

    if (imageContainerRef.current && firstImage) {
      setIsTransitioning(true);

      // Animation de sortie pour changement de projet
      gsap.to([imageContainerRef.current, linksContainerRef.current], {
        opacity: 0,
        y: -20,
        scale: 0.98,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          // Changer l'image seulement après la sortie complète
          setCurrentGalleryIndex(0);
          setDisplayedImage(firstImage);
          // L'animation d'entrée se fera via handleMediaLoaded
        }
      });
    } else {
      setCurrentGalleryIndex(0);
      if (firstImage) {
        setDisplayedImage(firstImage);
      }
    }
  }, [project]);

  // Animation des crans de la boussole qui bougent horizontalement
  const animateBoussole = (direction: 'left' | 'right') => {
    if (!boussoleRef.current) return;

    const cransContainer = boussoleRef.current.querySelector('.crans-container');
    if (!cransContainer) return;

    // Déplacement horizontal des crans : gauche = vers la droite, droite = vers la gauche
    const translationAmount = direction === 'left' ? 20 : -20;
    const boussoleWidth = 256; // w-64 = 256px

    // Récupérer la position actuelle
    const currentX = gsap.getProperty(cransContainer, "x") as number || 0;
    let newX = currentX + translationAmount;

    // Système de boucle infinie : quand on dépasse une largeur, on revient au début de manière invisible
    if (newX >= boussoleWidth) {
      newX = newX - boussoleWidth;
    } else if (newX <= -boussoleWidth) {
      newX = newX + boussoleWidth;
    }

    gsap.to(cransContainer, {
      x: newX,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  if (!isVisible || !project) return null;

  return (
    <div className="fixed inset-0 z-30">


      {/* Bandeau image/vidéo collé à gauche, positionné par rapport au viewport */}
      <div className="absolute top-[30%] md:top-[30%] left-0 w-full md:w-[80%] lg:w-[60%] h-[300px] md:h-[400px] relative">
        <div ref={imageContainerRef} className="relative w-full h-full overflow-hidden">
          {imageToDisplay && (currentIsVideo ? (
            <video
              key={imageToDisplay} // Force remount on change
              ref={videoRef}
              src={imageToDisplay}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
              onLoadedData={handleMediaLoaded}
            />
          ) : (
            <Image
              key={imageToDisplay} // Force remount on change
              src={imageToDisplay}
              alt={name}
              fill
              priority // High priority for loading
              className="object-cover"
              style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
              onLoad={handleMediaLoaded}
            />
          ))}
          {/* Overlay sombre semi-transparent pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>

          {/* Overlay textes à gauche */}
          <div className="absolute inset-0 text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {/* Bloc haut collé */}
            <div className="absolute top-0 left-4 md:left-[10%]">
              <p className="text-sm md:text-m leading-6 tracking-wide uppercase" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)' }}>POSTÉ / {date}</p>
              <p className="text-sm md:text-m leading-6 tracking-wide uppercase" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)' }}  >PROJET / {name}</p>

              {categories.length > 0 && (
                <p className="text-sm md:text-m leading-6 tracking-wide uppercase" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)' }}>
                  {categories.length === 1 ? 'CATEGORY' : 'CATEGORIES'} / {categories.map((category: string, index: number) => {
                    const categoryInfo = SANITY_CATEGORIES.find(cat => cat.value === category);
                    const categoryTitle = categoryInfo?.title || category;
                    return (
                      <span key={index}>
                        {categoryTitle}
                        {index < categories.length - 1 && <span className="mx-2">/</span>}
                      </span>
                    );
                  })}
                </p>
              )}

            </div>

            {/* Index du projet dans le coin bas droit */}
            {currentIndex !== undefined && totalProjects !== undefined && (
              <div className="absolute bottom-[0%] right-4 md:right-[20px] text-white opacity-80" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <span className="text-sm tracking-wider uppercase" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)' }}>
                  {String(currentIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Liens cliquables - en dehors de tous les conteneurs overlay */}
        <div ref={linksContainerRef} className="absolute bottom-0 left-4 md:left-[10%] z-[200]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          <p className="text-sm md:text-m leading-6 tracking-wide uppercase text-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)' }}>ID / {projectId}</p>
          {website && (
            <p className="text-sm md:text-m leading-6 tracking-wide uppercase text-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)' }}>
              WEB / <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300 transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                SITE
              </a>
            </p>
          )}
          {creators.length > 0 && (
            <p className=" lg:text-m leading-relaxed lg:leading-6 tracking-wide uppercase text-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)' }}>
              BY / {creators.map((creator, index) => (
                <span key={index}>
                  {creator.twitter ? (
                    <a
                      href={creator.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-300 transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {creator.name}
                    </a>
                  ) : (
                    <span>{creator.name}</span>
                  )}
                  {index < creators.length - 1 && <span className="mx-2">/</span>}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      {/* Carousel de navigation de la galerie - situé sous l'image */}
      {totalImages > 1 && (
        <div className="absolute top-[calc(30%+300px+20px)] md:top-[calc(30%+400px-40px)] left-0 w-full md:w-[80%] lg:w-[60%] flex justify-center items-center gap-3 z-50">
          {/* Flèche gauche carousel */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePreviousImage();
            }}
            disabled={currentGalleryIndex === 0}
            className={`text-white transition-colors duration-200 opacity-60 z-50 relative ${currentGalleryIndex > 0
              ? 'hover:text-gray-300 hover:opacity-100 cursor-pointer'
              : 'opacity-20 cursor-not-allowed'
              }`}
            aria-label="Image précédente"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Indicateurs de position */}
          <div className="flex items-center gap-1.5">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isTransitioning || index === currentGalleryIndex) return;
                  setIsTransitioning(true);

                  const direction = index > currentGalleryIndex ? 'next' : 'prev';

                  if (imageContainerRef.current) {
                    gsap.to(imageContainerRef.current, {
                      opacity: 0,
                      x: direction === 'next' ? -50 : 50,
                      duration: 0.3,
                      ease: "power2.in",
                      onComplete: () => {
                        setCurrentGalleryIndex(index);
                        setDisplayedImage(displayImages[index] || project.image);
                        // Animation d'entrée triggered by onLoad
                      }
                    });
                  }
                }}
                className={`transition-all duration-200 ${index === currentGalleryIndex
                  ? 'w-8 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>

          {/* Text indicator */}
          <span className="text-white/60 text-xs tracking-wider uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {String(currentGalleryIndex + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')}
          </span>

          {/* Flèche droite carousel */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNextImage();
            }}
            disabled={currentGalleryIndex === totalImages - 1}
            className={`text-white transition-colors duration-200 opacity-60 z-50 relative ${currentGalleryIndex < totalImages - 1
              ? 'hover:text-gray-300 hover:opacity-100 cursor-pointer'
              : 'opacity-20 cursor-not-allowed'
              }`}
            aria-label="Image suivante"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}


      {/* Bande blanche type "boussole" pour futur carousel - sortie du conteneur image */}
      <div className="absolute top-[calc(30%+300px+60px)] md:top-[calc(30%+400px+20px)] left-0 w-full md:w-[80%] lg:w-[60%] flex justify-center items-center gap-4 z-50" style={{ perspective: '1000px' }}>
        {/* Flèche gauche */}
        <button
          onClick={(e) => {
            console.log('Previous button clicked', { onPrevious, project });
            e.preventDefault();
            e.stopPropagation();
            if (onPrevious) {
              animateBoussole('left');
              onPrevious();
            } else {
              console.log('onPrevious is not defined');
            }
          }}
          disabled={!onPrevious}
          className={`text-white transition-colors duration-200 opacity-80 z-50 relative ${onPrevious
            ? 'hover:text-gray-300 hover:opacity-100 cursor-pointer'
            : 'opacity-40 cursor-not-allowed'
            }`}
          aria-label="Projet précédent"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div ref={boussoleRef} className="w-64 h-4 border-b border-white/80 opacity-80 overflow-hidden">
          <div className="relative w-full h-full">
            <div className="crans-container relative" style={{ width: '300%', height: '100%' }}>
              {/* Répéter les crans 3 fois pour qu'ils soient toujours visibles */}
              {Array.from({ length: 3 }).map((_, repeatIndex) => (
                <div key={repeatIndex} className="absolute top-0 h-full" style={{ left: `${repeatIndex * 100}%`, width: '256px' }}>
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={`${repeatIndex}-${i}`}
                      className="absolute bottom-0 w-px bg-white"
                      style={{
                        left: `${(i / 24) * 100}%`,
                        height: i % 3 === 0 ? '14px' : '10px',
                        opacity: 0.95
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flèche droite */}
        <button
          onClick={(e) => {
            console.log('Next button clicked', { onNext, project });
            e.preventDefault();
            e.stopPropagation();
            if (onNext) {
              animateBoussole('right');
              onNext();
            } else {
              console.log('onNext is not defined');
            }
          }}
          disabled={!onNext}
          className={`text-white transition-colors duration-200 opacity-80 z-50 relative ${onNext
            ? 'hover:text-gray-300 hover:opacity-100 cursor-pointer'
            : 'opacity-40 cursor-not-allowed'
            }`}
          aria-label="Projet suivant"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Calque UI centré pour éléments annexes */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-8">
        {/* Marqueur carré à droite du bandeau (optionnel, design) */}
        <div className="absolute top-[18%] md:top-[28%] right-4 md:left-[60%] w-8 h-8 md:w-12 md:h-12 border-2 border-white opacity-80"></div>
      </div>

      {/* Preload container: Render all other images in the gallery hidden to force browser cache */}
      <div className="invisible fixed top-0 left-0 w-px h-px overflow-hidden -z-50" aria-hidden="true">
        {displayImages.map((imgUrl, index) => {
          // Skip current image as it is already rendered visibly
          if (imgUrl === imageToDisplay) return null;

          if (isVideo(imgUrl)) {
            // For videos, we can try to preload metadata but full preload might be heavy
            // Removing full preload for videos to save bandwidth unless explicitly requested
            return null;
          }

          return (
            <Image
              key={`preload-${index}`}
              src={imgUrl}
              alt=""
              width={100} // Values don't matter as it is hidden
              height={100}
              priority={true} // Forces immediate loading
            />
          );
        })}
      </div>
    </div>
  );
}


