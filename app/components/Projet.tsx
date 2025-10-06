'use client';

interface ProjetProps {
  isVisible: boolean;
  src?: string;
}

export default function Projet({ isVisible, src = "/images/video.mp4" }: ProjetProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-30">
      {/* Bandeau vidéo collé à gauche, positionné par rapport au viewport */}
      <div className="absolute top-[30%] left-0 w-[60%] h-[400px]">
        <div className="relative w-full h-full overflow-hidden">
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
          />
          {/* Overlay textes à gauche */}
          <div className="absolute inset-0 text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {/* Bloc haut collé */}
            <div className="absolute top-0 left-[5%]">
              <p className="text-m leading-6 tracking-wide uppercase">DATE / 05.2025</p>
              <p className="text-m leading-6 tracking-wide uppercase">PROJECT / GOLYO</p>
              <p className="text-m leading-6 tracking-wide uppercase">HUB FOOTBALL</p>
              <p className="text-m leading-6 tracking-wide uppercase">GRAPHIC DESIGN</p>
              <p className="text-m leading-6 tracking-wide uppercase">BRANDING</p>
              <p className="text-m leading-6 tracking-wide uppercase">UI / UX</p>
            </div>
            {/* Bloc bas collé */}
            <div className="absolute bottom-0 left-[5%]">
              <p className="text-m leading-6 tracking-wide uppercase">ID / GR052025</p>
              <p className="text-m leading-6 tracking-wide uppercase">TMP / 21D</p>
              <p className="text-m leading-6 tracking-wide uppercase">WEB / website</p>
              <p className="text-lg leading-6 tracking-wide uppercase underline underline-offset-4">SEE MORE</p>
            </div>
          </div>
        </div>
        {/* Bande blanche type "boussole" pour futur carousel */}
        <div className="absolute bottom-[-28px] left-0 w-full flex justify-center">
          <div className="w-64 h-4 border-b border-white/80 opacity-80">
            <div className="relative w-full h-full">
              {Array.from({ length: 13 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 w-px bg-white"
                  style={{
                    left: `${(i / 12) * 100}%`,
                    height: i % 3 === 0 ? '14px' : '10px',
                    opacity: 0.95
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calque UI centré pour éléments annexes */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-8">
        {/* Marqueur carré à droite du bandeau (optionnel, design) */}
        <div className="absolute top-[28%] left-[60%] w-12 h-12 border-2 border-white opacity-80"></div>
      </div>
    </div>
  );
}


