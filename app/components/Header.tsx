'use client';

import Image from "next/image";

interface HeaderProps {
  onServicesClick: () => void;
  onCollectifClick: () => void;
  onProjetsClick: () => void;
  onContactClick: () => void;
  isServiceVisible: boolean;
  isCollectifVisible: boolean;
  isProjetsVisible: boolean;
  isContactVisible: boolean;
}

export default function Header({ 
  onServicesClick, 
  onCollectifClick, 
  onProjetsClick, 
  onContactClick,
  isServiceVisible,
  isCollectifVisible,
  isProjetsVisible,
  isContactVisible
}: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 z-40 p-8 transition-opacity duration-300 ${isCollectifVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative ${
              isCollectifVisible 
                ? 'text-gray-300' 
                : 'text-white hover:text-gray-300'
            }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            COLLECTIF
            {isCollectifVisible && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </button>
          <button 
            onClick={onServicesClick}
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative ${
              isServiceVisible 
                ? 'text-gray-300' 
                : 'text-white hover:text-gray-300'
            }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            SERVICES
            {isServiceVisible && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </button>
          <button 
            onClick={onProjetsClick}
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative ${
              isProjetsVisible 
                ? 'text-gray-300' 
                : 'text-white hover:text-gray-300'
            }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            PROJETS
            {isProjetsVisible && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </button>
          <button 
            onClick={onContactClick}
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative ${
              isContactVisible 
                ? 'text-gray-300' 
                : 'text-white hover:text-gray-300'
            }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            CONTACT
            {isContactVisible && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
