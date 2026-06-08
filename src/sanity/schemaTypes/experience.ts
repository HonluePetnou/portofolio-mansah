import { defineType, defineField } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Job Title',
      type: 'localeString',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'period',
      title: 'Employment Period',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'localeString',
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'localeStringArray',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Used to sort experiences (e.g. 1 for MELOAUD, 2 for ADS LTD, etc.).',
    }),
  ],
  preview: {
    select: {
      roleFr: 'role.FR',
      roleEn: 'role.EN',
      company: 'company',
    },
    prepare({ roleFr, roleEn, company }) {
      return {
        title: roleFr || roleEn || 'Untitled Role',
        subtitle: company || 'No company specified',
      }
    },
  },
})
