'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface ContactProps {
  isVisible: boolean;
  onReturn?: () => void;
}

export default function Contact({ isVisible }: ContactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    specialite: '',
    mail: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Supprimer l'avertissement de variable non utilisée en l'utilisant dans l'affichage

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Animation du titre
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: -20 });
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Animation du formulaire - labels et champs ensemble
    if (formRef.current) {
      // Sélectionner tous les conteneurs de champs (div qui contient label + input/textarea)
      const fieldContainers = formRef.current.querySelectorAll('.field-container');
      gsap.set(fieldContainers, { opacity: 0, y: 20 });
      tl.to(fieldContainers, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, 0.5);
    }

    // Animation de l'email
    if (emailRef.current) {
      gsap.set(emailRef.current, { opacity: 0, y: 20 });
      tl.to(emailRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 1.2);
    }

  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validation côté client basique
    if (!formData.nom.trim() || !formData.prenom.trim() || !formData.mail.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Veuillez remplir tous les champs requis (Nom, Prénom, Email)');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setErrorMessage('');
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          specialite: '',
          mail: '',
          message: ''
        });
        // Réinitialiser le statut après 3 secondes
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
        console.error('[contact] API error:', errorData);
        setSubmitStatus('error');
        setErrorMessage(errorData.error || 'Erreur lors de l\'envoi. Veuillez réessayer.');
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-25 overflow-hidden ">
      <div ref={containerRef} className="relative min-h-screen">
        {/* Contenu principal - 2/3 gauche */}
        <div className="w-full lg:w-[75%] min-h-screen flex flex-col pt-44 lg:pt-64 pb-20 lg:pb-32 px-6 md:px-20 lg:px-64">
          {/* Titre */}
          <div ref={titleRef} className="mb-8 lg:mb-12">
            <h1
              className="text-2xl md:text-[40px] font-bold text-white uppercase"
              style={{ fontFamily: 'DrukWideBold, sans-serif' }}
            >
              CONTACTEZ-NOUS
            </h1>
          </div>

          {/* Formulaire */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 lg:space-y-8 max-w-3xl ml-0 lg:ml-32">
            {/* Première ligne : NOM et PRÉNOM côte à côte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col field-container">
                <label
                  htmlFor="nom"
                  className="text-white text-xs lg:text-sm uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  NOM
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="bg-transparent border-0 border-b border-white text-white focus:outline-none focus:border-white pb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>
              <div className="flex flex-col field-container">
                <label
                  htmlFor="prenom"
                  className="text-white text-xs lg:text-sm uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  PRÉNOM
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="bg-transparent border-0 border-b border-white text-white focus:outline-none focus:border-white pb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>
            </div>

            {/* Champs en colonne */}
            <div className="flex flex-col space-y-6 lg:space-y-8">
              <div className="flex flex-col field-container">
                <label
                  htmlFor="specialite"
                  className="text-white text-xs lg:text-sm uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  SPÉCIALITÉ / TALENT (OPTIONNEL)
                </label>
                <input
                  type="text"
                  id="specialite"
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleChange}
                  className="bg-transparent border-0 border-b border-white text-white focus:outline-none focus:border-white pb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>
              <div className="flex flex-col field-container">
                <label
                  htmlFor="mail"
                  className="text-white text-xs lg:text-sm uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  MAIL
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  className="bg-transparent border-0 border-b border-white text-white focus:outline-none focus:border-white pb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>
              <div className="flex flex-col field-container">
                <label
                  htmlFor="message"
                  className="text-white text-xs lg:text-sm uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  MESSAGE (OPTIONNEL)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={1}
                  className="bg-transparent border-0 border-b border-white text-white focus:outline-none focus:border-white pb-2 resize-none overflow-hidden"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>
            </div>

            {/* Bouton Envoyer */}
            <div className="flex flex-col field-container mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-transparent border border-white text-white uppercase tracking-wider py-3 px-8 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                style={{ fontFamily: 'DrukWideBold, sans-serif' }}
              >
                {isSubmitting ? 'ENVOI...' : submitStatus === 'success' ? 'ENVOYÉ ✓' : submitStatus === 'error' ? 'ERREUR' : 'ENVOYER'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm mt-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Message envoyé avec succès !
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm mt-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {errorMessage || 'Erreur lors de l&apos;envoi. Veuillez réessayer.'}
                </p>
              )}
            </div>
          </form>

          {/* Email de contact */}

        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 z-30 px-6 lg:px-16 pb-6 lg:pb-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-end gap-4 md:gap-0">
            {/* Footer gauche - Copyright */}
            <div className="text-white text-[10px] lg:text-xs opacity-80 text-center md:text-left" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <p>
                © 2025 | Dev by{' '}
                <a
                  href="https://x.com/Yannis_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors underline"
                >
                  @yannis_dev
                </a>
                {' '}| Design by{' '}
                <a
                  href="https://x.com/super8_studiio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors underline"
                >
                  @super8_studiio
                </a>
                {' '}| Photos by us
              </p>
            </div>

            {/* Footer droite - Réseaux sociaux et liens légaux */}
            <div className="flex flex-col items-center md:items-end gap-4">
              {/* Icônes réseaux sociaux */}
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/BMSDNA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/bmsdna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@bmsdna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>

              </div>

              {/* Liens légaux */}
              <div className="flex items-center gap-2 text-white text-[10px] lg:text-xs opacity-80" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <a href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialités</a>
                <span>-</span>
                <a href="#" className="hover:text-gray-300 transition-colors">Mention légales</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

