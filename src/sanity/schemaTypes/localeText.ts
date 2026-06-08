import { defineType, defineField } from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'FR',
      title: 'French',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'EN',
      title: 'English',
      type: 'text',
      rows: 4,
    }),
  ],
})
