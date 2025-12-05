import { client } from './client'

// GROQ query pour récupérer tous les projets avec leurs métadonnées
const projectFields = `
  _id,
  _createdAt,
  name,
  categories,
  subtitle,
  tags,
  duration,
  projectId,
  slug,
  createdAt,
  updatedAt,
  previewImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  },
  gallery[] {
    _type == 'image' => {
      _type,
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    _type == 'video' => {
      _type,
      url,
      file {
        asset-> {
          _id,
          url
        }
      }
    }
  },
  creators[] {
    name,
    twitter
  },
  website
`

// Récupérer tous les projets
export async function getAllProjects() {
    return client.fetch(
        `*[_type == "project"] | order(createdAt desc) {
      ${projectFields}
    }`
    )
}

// Récupérer un projet par son slug
export async function getProjectBySlug(slug: string) {
    return client.fetch(
        `*[_type == "project" && slug.current == $slug][0] {
      ${projectFields}
    }`,
        { slug }
    )
}

// Récupérer les projets par catégorie
export async function getProjectsByCategory(category: string) {
    return client.fetch(
        `*[_type == "project" && category == $category] | order(createdAt desc) {
      ${projectFields}
    }`,
        { category }
    )
}
