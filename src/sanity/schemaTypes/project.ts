import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI & Full Stack', value: 'ai' },
          { title: 'Frontend / Web', value: 'frontend' },
          { title: 'QA & Automation', value: 'qa' },
        ],
      },
    }),
    defineField({
      name: 'stack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Showcase Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'localeText',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'localeText',
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy & Execution',
      type: 'localeText',
    }),
    defineField({
      name: 'impact',
      title: 'Real-world Impact',
      type: 'localeText',
    }),
    defineField({
      name: 'demoUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url',
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics / Impact indicators',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            { name: 'label', type: 'localeString', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value (e.g. +45%, 88ms)' },
          ],
          preview: {
            select: {
              title: 'label.FR',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
    },
  },
})
