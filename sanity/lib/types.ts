import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Type pour les assets d'image Sanity
export interface SanityImageAsset {
    _id: string;
    url: string;
    metadata?: {
        dimensions?: {
            width: number;
            height: number;
        };
    };
}

// Type pour les images Sanity
export interface SanityImage {
    _type: 'image';
    asset: SanityImageAsset;
}

// Type pour les vidéos dans la galerie
export interface SanityVideo {
    _type: 'video';
    url?: string;
    file?: {
        asset: {
            _id: string;
            url: string;
        };
    };
}

// Type union pour les éléments de galerie
export type GalleryItem = SanityImage | SanityVideo;

// Type pour un créateur
export interface SanityCreator {
    name: string;
    twitter?: string;
}

// Type pour un projet Sanity
export interface SanityProject {
    _id: string;
    _createdAt: string;
    name: string;
    categories: string[];
    subtitle?: string;
    tags?: string[];
    duration?: string;
    projectId?: string;
    slug: {
        current: string;
    };
    createdAt?: string;
    updatedAt?: string;
    previewImage: SanityImage;
    gallery?: GalleryItem[];
    creators: SanityCreator[];
    website?: string;
}

// Type pour le projet utilisé dans les composants (compatible avec l'existant)
export interface Project {
    id: number;
    image: string;
    category: string; // Gardé pour compatibilité, sera la première catégorie
    categories: string[]; // Toutes les catégories
    date?: string;
    name?: string;
    subtitle?: string;
    tags?: string[];
    projectId?: string;
    duration?: string;
    website?: string;
    videoSrc?: string;
    // Nouveaux champs pour la galerie
    galleryImages?: string[];
    sanityData?: SanityProject;
}

// Helper pour convertir un SanityProject vers un Project
export function sanityProjectToProject(
    sanityProject: SanityProject,
    index: number,
    urlFor: (source: SanityImageSource) => any
): Project {
    // Générer l'URL de l'image de prévisualisation
    const previewImageUrl = sanityProject.previewImage?.asset?.url || '';

    // Extraire les URLs de la galerie
    const galleryImages: string[] = [];
    if (sanityProject.gallery) {
        sanityProject.gallery.forEach((item) => {
            if (item._type === 'image' && item.asset?.url) {
                galleryImages.push(item.asset.url);
            } else if (item._type === 'video') {
                if (item.url) {
                    galleryImages.push(item.url);
                } else if (item.file?.asset?.url) {
                    galleryImages.push(item.file.asset.url);
                }
            }
        });
    }

    // Formater la date
    const date = sanityProject.createdAt
        ? new Date(sanityProject.createdAt).toLocaleDateString('fr-FR', {
            month: '2-digit',
            year: 'numeric'
        }).replace('/', '.')
        : undefined;

    return {
        id: index,
        image: previewImageUrl,
        category: sanityProject.categories?.[0] || '', // Première catégorie pour compatibilité
        categories: sanityProject.categories || [],
        date,
        name: sanityProject.name,
        subtitle: sanityProject.subtitle,
        tags: sanityProject.tags,
        projectId: sanityProject.projectId,
        duration: sanityProject.duration,
        website: sanityProject.website,
        galleryImages,
        sanityData: sanityProject,
    };
}
