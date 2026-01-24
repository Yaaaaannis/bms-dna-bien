import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url';

import { dataset, projectId } from '../env'
import { SanityVideo } from './types';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// Helper pour obtenir une URL d'image optimisée avec dimensions
export const getOptimizedImageUrl = (
  source: SanityImageSource,
  width?: number,
  height?: number
) => {
  let imageUrl = builder.image(source)

  if (width) {
    imageUrl = imageUrl.width(width)
  }

  if (height) {
    imageUrl = imageUrl.height(height)
  }

  // Utiliser le format auto et la qualité optimale
  return imageUrl.auto('format').quality(90).url()
}

// Helper pour obtenir l'URL d'une vidéo (URL externe ou fichier uploadé)
export const getVideoUrl = (video: SanityVideo): string | null => {
  if (video.url) {
    return video.url
  }

  if (video.file?.asset?.url) {
    return video.file.asset.url
  }

  return null
}

