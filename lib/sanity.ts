import { createClient } from '@sanity/client';

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


