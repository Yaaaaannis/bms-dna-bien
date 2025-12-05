import { createClient } from '@sanity/client';

if (!process.env.SANITY_API_TOKEN) {
  console.warn('⚠️  SANITY_API_TOKEN is not set. Write operations will fail.');
}

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function createWaitlistEntry(email: string, source: string = 'waitlist') {
  return sanityClient.create({
    _type: 'waitlistEntry',
    email,
    createdAt: new Date().toISOString(),
    source,
  });
}

export async function createContactEntry(data: {
  nom: string;
  prenom: string;
  specialite?: string;
  mail: string;
  message?: string;
}) {
  return sanityClient.create({
    _type: 'contactEntry',
    nom: data.nom,
    prenom: data.prenom,
    specialite: data.specialite || undefined,
    mail: data.mail,
    message: data.message || undefined,
    createdAt: new Date().toISOString(),
  });
}

// Catégories définies dans le schéma Sanity (project.ts)
export const SANITY_CATEGORIES = [
  { title: 'Direction Artistique', value: 'DA' },
  { title: 'Développement Web', value: 'DEV' },
  { title: 'Motion Design / 3D', value: 'MD/3D' },
  { title: 'Photographie', value: 'PHOTO' },
  { title: 'Cinématographie', value: 'FILM' },
  { title: 'VFX / Post-production', value: 'VFX/POST' },
  { title: 'Non Classé', value: 'NC' },
] as const;


