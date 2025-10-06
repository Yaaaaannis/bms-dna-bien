'use client';

import { usePathname } from 'next/navigation';

export default function NoiseVideo() {
  const pathname = usePathname();
  if (pathname?.startsWith('/studio')) return null;
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover opacity-15 pointer-events-none z-50"
    >
      <source src="/noise.mp4" type="video/mp4" />
    </video>
  );
}


