'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { getAllProjects } from '@/sanity/lib/queries';
import { sanityProjectToProject, SanityProject } from '@/sanity/lib/types';
import { urlFor } from '@/sanity/lib/image';
import { SANITY_CATEGORIES } from '@/lib/sanity';

console.log('SANITY_CATEGORIES imported:', SANITY_CATEGORIES);

interface ServiceProps {
  isVisible: boolean;
  onProjectClick?: (project: Project) => void;
  onProjectsLoaded?: (projects: Project[]) => void;
}

export interface Project {
  id: number;
  image: string;
  category: string;
  categories?: string[];
  date?: string;
  name?: string;
  subtitle?: string;
  tags?: string[];
  projectId?: string;
  duration?: string;
  website?: string;
  videoSrc?: string;
  galleryImages?: string[];
  sanityData?: SanityProject;
}

export default function Service({ isVisible, onProjectClick, onProjectsLoaded }: ServiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [imageDimensions, setImageDimensions] = useState<Record<string, { width: number; height: number }>>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const services = useMemo(() => [
    'DIRECTION ARTISTIQUE',
    'DÉVELOPPEMENT WEB',
    'MOTION DESIGN / 3D',
    'PHOTOGRAPHIE',
    'CINÉMATOGRAPHIE',
    'MONTAGE VIDÉO'
  ], []);

  // Utiliser les catégories définies dans le schéma Sanity
  const filters = useMemo(() => {
    // Commencer par "ALL"
    const filterList = ['ALL'];

    // Ajouter toutes les catégories définies dans Sanity (par valeur pour l'affichage)
    const categoryValues = SANITY_CATEGORIES.map(cat => cat.value);
    filterList.push(...categoryValues);

    console.log('Filters generated:', filterList);
    console.log('SANITY_CATEGORIES:', SANITY_CATEGORIES);

    return filterList;
  }, []);

  // Fonction pour mélanger aléatoirement un tableau (Fisher-Yates shuffle)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Fetch projects from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const sanityProjects = await getAllProjects();

        // Convert Sanity projects to component format
        const convertedProjects = sanityProjects.map((sanityProject: SanityProject, index: number) =>
          sanityProjectToProject(sanityProject, index + 1, urlFor)
        );

        // Mélanger aléatoirement les projets
        const shuffledProjects: Project[] = shuffleArray(convertedProjects);

        setProjects(shuffledProjects);

        // Notify parent component of loaded projects
        if (onProjectsLoaded) {
          onProjectsLoaded(shuffledProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    if (isVisible) {
      fetchProjects();
    }
  }, [isVisible, onProjectsLoaded]);

  // Filtrer les projets selon le filtre sélectionné
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'ALL') return projects;

    // Vérifier si le projet a la catégorie sélectionnée dans son array de catégories
    return projects.filter(project =>
      project.categories?.includes(selectedFilter) || project.category === selectedFilter
    );
  }, [projects, selectedFilter]);



  // Charger les dimensions réelles des images
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions: Record<string, { width: number; height: number }> = {};

      await Promise.all(
        projects.map(async (project) => {
          return new Promise<void>((resolve) => {
            if (typeof window === 'undefined') {
              dimensions[project.image] = { width: 300, height: 300 };
              resolve();
              return;
            }
            const img = document.createElement('img');
            img.onload = () => {
              dimensions[project.image] = {
                width: img.naturalWidth,
                height: img.naturalHeight
              };
              resolve();
            };
            img.onerror = () => {
              // Fallback si l'image ne charge pas
              dimensions[project.image] = { width: 300, height: 300 };
              resolve();
            };
            img.src = project.image;
          });
        })
      );

      setImageDimensions(dimensions);
    };

    if (isVisible && projects.length > 0) {
      loadImageDimensions();
    }
  }, [isVisible, projects]);



  // Gestion du scroll - utiliser le scroll du container interne
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const handleScroll = () => {
      const scrollTop = containerRef.current?.scrollTop || 0;
      console.log('Scroll event:', scrollTop);
      setScrollY(scrollTop);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Déclencher une fois au chargement pour initialiser
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isVisible]);

  // Animation lors de l'affichage
  useEffect(() => {
    if (!isVisible || !servicesRef.current || !galleryRef.current || !filtersRef.current || !containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Animation des services
    gsap.set(servicesRef.current.children, { opacity: 0, y: 20 });
    tl.to(servicesRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Initialiser les éléments (galerie cachée au départ, apparaît au scroll)
    setTimeout(() => {
      if (filtersRef.current && galleryRef.current) {
        console.log('Initializing filters with GSAP, filtersRef.current:', filtersRef.current);
        gsap.set(filtersRef.current, { opacity: 0, y: -20 });
        // Les images commencent invisibles et apparaîtront au scroll
        const galleryItems = galleryRef.current.querySelectorAll('.group');
        if (galleryItems.length > 0) {
          gsap.set(galleryItems, { opacity: 0, scale: 0.8 });
        }
      }
    }, 100);

  }, [isVisible]);

  // Animation basée sur le scroll - transition entre services et galerie
  useEffect(() => {
    if (!isVisible || !servicesRef.current || !filtersRef.current || !galleryRef.current) return;

    const viewportHeight = window.innerHeight;
    const scrollThreshold = viewportHeight * 0.5; // Commence la transition à 50% de la hauteur (avant que la galerie devienne sticky à 40vh)

    console.log('Scroll animation check:', { scrollY, scrollThreshold, shouldShow: scrollY > scrollThreshold });

    if (scrollY > scrollThreshold) {
      // Faire disparaître les services
      gsap.to(servicesRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.in"
      });

      // Faire apparaître les filtres et la galerie
      console.log('Making filters visible, filtersRef.current:', filtersRef.current);
      gsap.to(filtersRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          console.log('Filters animation complete, opacity should be 1');
        }
      });

      const galleryItems = galleryRef.current.querySelectorAll('.group');
      if (galleryItems.length > 0) {
        gsap.to(galleryItems, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out"
        });
      }
    } else {
      // Revenir à l'état initial
      gsap.to(servicesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(filtersRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.in"
      });

      const galleryItems = galleryRef.current.querySelectorAll('.group');
      if (galleryItems.length > 0) {
        gsap.to(galleryItems, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "power2.in"
        });
      }
    }
  }, [scrollY, isVisible]);

  if (!isVisible) return null;

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-white text-2xl pointer-events-auto" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Loading projects...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-red-500 text-2xl pointer-events-auto" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {error}
        </div>
      </div>
    );
  }


  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 overflow-y-auto pointer-events-none"
    >
      {/* Section Services - disparaît lors du scroll */}
      <div className="h-screen flex items-center justify-start px-6 lg:px-64 pt-24 lg:pt-32 pointer-events-auto">
        <div ref={servicesRef} className="space-y-6 lg:space-y-8">
          {services.map((service, index) => (
            <div key={index} className="relative group">
              <h2
                className="text-white text-2xl lg:text-[36px] font-bold uppercase tracking-wider cursor-pointer hover:text-gray-300 transition-colors duration-300"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {service}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Section Galerie - apparaît après le scroll, devient sticky à 40vh et prend 60% de hauteur */}
      <div className="h-[150vh] px-4 lg:px-16 flex justify-start pointer-events-auto">
        {/* Container galerie */}
        <div
          className="sticky w-full lg:w-fit lg:min-w-[60%] max-w-full"
          style={{
            top: '30vh',
            height: '60vh',
            zIndex: 20
          }}
        >
          <div className="h-full flex flex-col relative">
            {/* Barre de filtres - toujours visible et fixe au-dessus de la galerie */}
            <div
              ref={filtersRef}
              className="flex items-center gap-6 lg:gap-20 mb-4 bg-black/80 backdrop-blur-sm py-2 flex-shrink-0 w-full lg:w-fit sticky top-0 overflow-x-auto no-scrollbar pr-4"
              style={{ zIndex: 30 }}
            >
              {filters.length === 0 && (
                <div className="text-white text-xs">No filters available</div>
              )}
              {filters.map((filter) => {
                console.log('Rendering filter button:', filter);
                return (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`text-white text-sm uppercase tracking-wider transition-all duration-200 relative whitespace-nowrap flex-shrink-0 ${selectedFilter === filter
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                      }`}
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {filter}
                    {selectedFilter === filter && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white mt-1"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Galerie simple - grille ordonnée sans espaces */}
            <div
              ref={galleryRef}
              className="overflow-y-auto overflow-x-hidden flex-1 w-full lg:w-[95%]"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              <div
                className="grid grid-cols-4 auto-rows-[100px] lg:auto-rows-[200px]"
                style={{
                  gridAutoFlow: 'dense',
                  gap: '10px',
                  margin: 0,
                  padding: 0,
                  width: '100%'
                }}
              >
                {filteredProjects.map((project, index) => {
                  const imageDim = imageDimensions[project.image];

                  // Calculer le ratio d'aspect de l'image
                  const aspectRatio = imageDim && imageDim.height > 0
                    ? imageDim.width / imageDim.height
                    : 1;

                  // Déterminer le span de la grille basé sur le ratio
                  // Les images larges (landscape) prennent plus de colonnes
                  // Les images hautes (portrait) prennent plus de lignes
                  let colSpan = 1;
                  let rowSpan = 1;

                  // Forcer certaines images à être carrées pour rendre la grille plus compacte
                  // 1. Forcer les images proches du carré (ratio entre 0.85 et 1.15) à rester carrées
                  // 2. Forcer une image sur 4 à être carrée même si elle pourrait être plus grande
                  const forceSquare =
                    (aspectRatio >= 0.85 && aspectRatio <= 1.15) || // Proche du carré
                    (index % 4 === 0 && aspectRatio >= 0.75 && aspectRatio <= 1.4); // Une sur 4 dans une plage raisonnable

                  if (forceSquare) {
                    // Forcer en carré (1x1)
                    colSpan = 1;
                    rowSpan = 1;
                  } else if (aspectRatio > 1.3) {
                    // Image très large - 2 colonnes
                    colSpan = 2;
                    rowSpan = 1;
                  } else if (aspectRatio < 0.7) {
                    // Image très haute - 2 lignes
                    colSpan = 1;
                    rowSpan = 2;
                  } else if (aspectRatio > 1.1) {
                    // Image légèrement large - 2 colonnes
                    colSpan = 2;
                    rowSpan = 1;
                  } else if (aspectRatio < 0.9) {
                    // Image légèrement haute - 2 lignes
                    colSpan = 1;
                    rowSpan = 2;
                  }

                  return (
                    <div
                      key={project.id}
                      className="group cursor-pointer overflow-hidden bg-gray-900 relative"
                      style={{
                        gridColumn: `span ${colSpan}`,
                        gridRow: `span ${rowSpan}`,
                        margin: 0,
                        padding: 0
                      }}
                      onClick={() => onProjectClick?.(project)}
                    >
                      <Image
                        src={project.image}
                        alt={`Project ${project.id}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
