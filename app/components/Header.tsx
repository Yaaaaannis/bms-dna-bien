'use client';

import Image from "next/image";

interface HeaderProps {
  onServicesClick: () => void;
  onCollectifClick: () => void;
  onProjetsClick: () => void;
  onContactClick: () => void;
  isServiceVisible: boolean;
}

export default function Header({ 
  onServicesClick, 
  onCollectifClick, 
  onProjetsClick, 
  onContactClick,
  isServiceVisible 
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-20 p-8">
      <div className="flex items-start space-x-60">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="BMS DNA Logo"
            width={80}
            height={500}
            priority
            className=""
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-6">
          <button 
            onClick={onCollectifClick}
            className="text-white text-lg uppercase tracking-wider hover:text-gray-300 transition-colors duration-200"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            COLLECTIF
          </button>
          <button 
            onClick={onServicesClick}
            className={`text-lg uppercase tracking-wider transition-colors duration-200 ${
              isServiceVisible 
                ? 'text-gray-300' 
                : 'text-white hover:text-gray-300'
            }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            SERVICES
          </button>
          <button 
            onClick={onProjetsClick}
            className="text-white text-lg uppercase tracking-wider hover:text-gray-300 transition-colors duration-200"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            PROJETS
          </button>
          <button 
            onClick={onContactClick}
            className="text-white text-lg uppercase tracking-wider hover:text-gray-300 transition-colors duration-200"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            CONTACT
          </button>
        </nav>
      </div>
    </header>
  );
}
