import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.dna-bms.com';
    const currentDate = new Date();

    // Liste des routes statiques principales
    const routes = [
        '',
        '/a-propos',
        '/services',
        '/equipe',
        '/contact',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
