'use client';

import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-20 p-8">
      <div className="flex items-start space-x-50">
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
          <a 
            href="#collectif" 
            className="text-white text-lg  uppercase tracking-wider hover:text-gray-300 transition-colors duration-200"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            COLLECTIF
          </a>
          <a 
            href="#services" 
            className="text-white text-lg  uppercase tracking-wider hover:text-gray-300 transition-colors duration-200"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            SERVICES
          </a>
          <a 
            href="#projets" 
            className="text-white text-lg  uppercase tracking-wider hover:text-gray-300 transition-colors duration-200"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            PROJETS
          </a>
          <a 
            href="#contact" 
            className="text-white text-lg  uppercase tracking-wider hover:text-gray-300 transition-colors duration-200"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
}
