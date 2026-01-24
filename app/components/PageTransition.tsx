'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const previousPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    // Ne pas animer au premier chargement
    if (previousPathnameRef.current === pathname) return;

    const container = containerRef.current;
    if (!container) return;

    // Animation de sortie
    const exitAnimation = gsap.to(container, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    exitAnimation.then(() => {
      // Animation d'entrée
      gsap.fromTo(container,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        }
      );
    });

    previousPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ opacity: 1 }}>
      {children}
    </div>
  );
}
