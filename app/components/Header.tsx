'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  currentPath?: string;
}

export default function Header({
  currentPath
}: HeaderProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname;

  const isActive = (path: string) => activePath === path;

  return (
    <header className="fixed top-0 left-0 z-40 p-8 transition-opacity duration-300 opacity-100">
      <div className="flex items-start space-x-40">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="BMS DNA Logo"
            width={60}
            height={300}
            priority
            className=""
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-2 items-start">
          <Link
            href="/a-propos"
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative text-left ${isActive('/a-propos')
                ? 'text-gray-300'
                : 'text-white hover:text-gray-300'
              }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            COLLECTIF
            {isActive('/a-propos') && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </Link>
          <Link
            href="/services"
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative text-left ${isActive('/services')
                ? 'text-gray-300'
                : 'text-white hover:text-gray-300'
              }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            SERVICES
            {isActive('/services') && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </Link>
          <Link
            href="/equipe"
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative text-left ${isActive('/equipe')
                ? 'text-gray-300'
                : 'text-white hover:text-gray-300'
              }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            TEAM
            {isActive('/equipe') && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </Link>
          <Link
            href="/contact"
            className={`text-lg uppercase tracking-wider transition-all duration-200 relative text-left ${isActive('/contact')
                ? 'text-gray-300'
                : 'text-white hover:text-gray-300'
              }`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            CONTACT
            {isActive('/contact') && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
