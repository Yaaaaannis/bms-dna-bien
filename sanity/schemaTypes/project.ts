import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Direction Artistique', value: 'DA' },
                    { title: 'Développement Web', value: 'DEV' },
                    { title: 'Motion Design / 3D', value: 'MD/3D' },
                    { title: 'Photographie', value: 'PHOTO' },
                    { title: 'Cinématographie', value: 'FILM' },
                    { title: 'VFX / Post-production', value: 'VFX/POST' },
                ],
            },
            validation: (Rule) => Rule.min(1).required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'string',
            description: 'e.g., "21D"',
        }),
        defineField({
            name: 'projectId',
            title: 'Project ID',
            type: 'string',
            description: 'e.g., "GR052025"',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'updatedAt',
            title: 'Updated At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'previewImage',
            title: 'Preview Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [
                { type: 'image' },
                defineField({
                    name: 'video',
                    title: 'Video',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'url',
                            title: 'Video URL',
                            type: 'url',
                            description: 'URL for YouTube, Vimeo, etc.',
                        }),
                        defineField({
                            name: 'file',
                            title: 'Video File',
                            type: 'file',
                            description: 'Direct video upload',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'url',
                            subtitle: 'file.asset.originalFilename',
                        },
                        prepare({ title, subtitle }) {
                            return {
                                title: title || subtitle || 'Video',
                                media: title ? undefined : undefined, // Could add an icon here
                            }
                        },
                    },
                }),
            ],
            validation: (Rule) => Rule.max(5),
        }),
        defineField({
            name: 'creators',
            title: 'Creators',
            type: 'array',
            of: [
                defineField({
                    name: 'creator',
                    title: 'Creator',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'twitter',
                            title: 'Twitter',
                            type: 'url',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'twitter',
                        },
                    },
                }),
            ],
            validation: (Rule) => Rule.min(1).required(),
        }),
        defineField({
            name: 'website',
            title: 'Website',
            type: 'url',
            description: 'Website URL for the project (unique per project)',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'previewImage',
        },
    },
})
