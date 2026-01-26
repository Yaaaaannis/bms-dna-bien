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
    <div className="fixed inset-0 z-25 overflow-y-auto ">
      <div ref={containerRef} className="relative min-h-screen">
        {/* Contenu principal - 2/3 gauche */}
        <div className="w-full lg:w-[75%] min-h-screen flex flex-col pt-40 lg:pt-52 pb-48 lg:pb-32 px-6 md:px-16 lg:px-64">
          {/* Titre */}
          <div ref={titleRef} className="mb-8 lg:mb-12">
            <h1
              className="text-xl md:text-[40px] font-bold text-white uppercase"
              style={{ fontFamily: 'DrukWideBold, sans-serif' }}
            >
              CONTACTEZ-NOUS
            </h1>
          </div>

          {/* Formulaire */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 lg:space-y-8 max-w-3xl ml-0 lg:ml-32">
            {/* Première ligne : NOM et PRÉNOM côte à côte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="flex flex-col field-container">
                <label
                  htmlFor="nom"
                  className="text-white text-[10px] md:text-sm uppercase tracking-wider mb-2"
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
                  className="text-white text-[10px] md:text-sm uppercase tracking-wider mb-2"
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
            <div className="flex flex-col space-y-4 lg:space-y-8">
              <div className="flex flex-col field-container">
                <label
                  htmlFor="specialite"
                  className="text-white text-[10px] md:text-sm uppercase tracking-wider mb-2"
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
                  className="text-white text-[10px] md:text-sm uppercase tracking-wider mb-2"
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
                  className="text-white text-[10px] md:text-sm uppercase tracking-wider mb-2"
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
                className="bg-transparent border border-white text-white uppercase tracking-wider py-3 px-8 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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


        {/* Liens légaux */}
        <div className="flex items-center gap-2 text-white text-xs opacity-80" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          <a href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialités</a>
          <span>-</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Mention légales</a>
        </div>
      </div>
    </div>
  );
}

