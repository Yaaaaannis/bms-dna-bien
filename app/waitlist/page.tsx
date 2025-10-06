'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Background from "../components/Background";
import Loader from "../components/Loader";

export default function WaitlistPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Merci d’entrer un email valide.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setMessage('Merci ! Tu es sur la liste.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Une erreur est survenue. Réessayez plus tard.');
    }
  };

  // Afficher le loader en surcouche mais laisser le background se charger dessous

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      {/* Background 3D sans points */}
      <Background 
        servicePoints={[]} 
        isServiceVisible={false} 
        isCollectifVisible={false} 
        isProjetsVisible={false} 
      />
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <Loader onComplete={() => setIsLoading(false)} />
        </div>
      )}

      {/* Logo à la manière du Header */}
      <header className="fixed top-0 left-0 z-40 p-4 sm:p-6 md:p-8">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="BMS DNA Logo"
            width={80}
            height={500}
            priority
          />
        </div>
      </header>

      {/* Contenu aligné à gauche */}
      <div className="relative z-10 max-w-xl ml-4 sm:ml-16 lg:ml-40 mt-56 sm:mt-72 lg:mt-40 px-4 sm:px-6">
        {/* Titre de marque fort */}
        <h1 className="text-5xl md:text-7xl leading-[0.95] mb-6 uppercase" style={{ fontFamily: 'DrukWideBold, sans-serif' }}>
          BMS DNA
        </h1>
        <h2 className="text-3xl tracking-wider mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Nous rejoindre
        </h2>
        <p className="text-gray-300 mb-8" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Inscris-toi pour faire partie du collectif dès l’ouverture.
        </p>
       
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 bg-transparent border border-white/40 text-white px-4 py-3 outline-none focus:border-white"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
            aria-label="Email"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-6 py-3 bg-white text-black font-medium tracking-wide hover:opacity-90 transition disabled:opacity-60"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {status === 'loading' ? 'Envoi…' : 'Nous rejoindre'}
          </button>
        </form>
        <p className="mt-3 text-xs text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Nous respectons votre confidentialité. Désinscription en un clic.
        </p>
        <p className="mt-2 text-sm text-white/70" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Suivez-nous sur X : <a href="https://x.com/bmsdna" target="_blank" rel="noopener noreferrer" className="underline">@bmsdna</a>
        </p>
        {message && (
          <p className={`mt-4 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}


