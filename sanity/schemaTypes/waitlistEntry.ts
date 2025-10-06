import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'waitlistEntry',
  title: 'Waitlist Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
    }),
  ],
})


