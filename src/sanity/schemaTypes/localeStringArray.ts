import { defineType, defineField } from 'sanity'

export const localeStringArray = defineType({
  name: 'localeStringArray',
  title: 'Localized String Array',
  type: 'object',
  fields: [
    defineField({
      name: 'FR',
      title: 'French',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'EN',
      title: 'English',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
