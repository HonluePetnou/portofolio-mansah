import { defineType, defineField } from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'FR',
      title: 'French',
      type: 'string',
    }),
    defineField({
      name: 'EN',
      title: 'English',
      type: 'string',
    }),
  ],
})
