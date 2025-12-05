'use client';

import Image from "next/image";

interface HeaderProps {
  onServicesClick: () => void;
  onCollectifClick: () => void;
  onProjetsClick: () => void;
  onContactClick: () => void;
  isServiceVisible: boolean;
  isCollectifVisible: boolean;
  isPresentationVisible?: boolean;
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
  isPresentationVisible = false,
  isProjetsVisible: _isProjetsVisible,
  isContactVisible
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-40 p-8 transition-opacity duration-300 opacity-100">
      <div className="flex items-start space-x-40">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="BMS DNA Logo"
            width={60}
            height={300}
            priority
            className=""
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-2 items-start">
          <button
            onClick={onCollectifClick}
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative text-left ${isPresentationVisible
                ? 'text-gray-300'
                : 'text-white hover:text-gray-300'
              }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            COLLECTIF
            {isPresentationVisible && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </button>
          <button
            onClick={onServicesClick}
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative text-left ${isServiceVisible
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
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative text-left ${isCollectifVisible
                ? 'text-gray-300'
                : 'text-white hover:text-gray-300'
              }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            TEAM
            {isCollectifVisible && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </button>
          <button
            onClick={onContactClick}
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative text-left ${isContactVisible
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
