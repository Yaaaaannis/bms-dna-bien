'use client';

import { useState } from 'react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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
      setMessage('Merci ! Vous êtes sur la liste.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Une erreur est survenue. Réessayez plus tard.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="mb-10">
          <img src="/logo.svg" alt="BMS DNA" className="h-10 w-auto" />
        </div>
        <h1 className="text-3xl tracking-wider mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Rejoindre la waiting list
        </h1>
        <p className="text-gray-300 mb-8" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Soyez les premiers informés du lancement.
        </p>
        <form onSubmit={onSubmit} className="flex gap-3">
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent border border-white/40 text-white px-4 py-3 outline-none focus:border-white"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
            aria-label="Email"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-3 border border-white/80 hover:border-white transition disabled:opacity-60"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {status === 'loading' ? 'Envoi…' : 'Notifier moi'}
          </button>
        </form>
        {message && (
          <p className={`mt-4 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}


