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
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Case Study', value: 'standard' },
          { title: 'Google Play Store', value: 'playstore' },
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'playstoreIcon',
      title: 'Play Store App Icon',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'developerName',
      title: 'Developer Name',
      type: 'string',
      initialValue: 'Mansah',
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads Count',
      type: 'string',
      initialValue: '10K+',
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'downloadSize',
      title: 'App Download Size (e.g. 12 MB)',
      type: 'string',
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'contentRating',
      title: 'Content Rating (e.g. PEGI 3, Rated for 3+)',
      type: 'string',
      initialValue: 'PEGI 3',
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'ratingValue',
      title: 'Rating Value (e.g. 4.8)',
      type: 'number',
      initialValue: 4.8,
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'ratingCount',
      title: 'Rating Count text (e.g. 1.2K reviews)',
      type: 'string',
      initialValue: '1.2K reviews',
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'screenshots',
      title: 'Play Store Screenshots Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'whatsNew',
      title: "What's New (Changelog)",
      type: 'localeText',
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'version',
      title: 'App Version',
      type: 'string',
      initialValue: '1.0.0',
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
    }),
    defineField({
      name: 'playStoreReviews',
      title: 'Play Store User Reviews / Comments',
      type: 'array',
      hidden: ({ document }) => document?.displayStyle !== 'playstore',
      of: [
        {
          type: 'object',
          name: 'playStoreReview',
          title: 'User Review',
          fields: [
            { name: 'name', type: 'string', title: 'User Name' },
            { name: 'avatar', type: 'image', title: 'User Avatar' },
            { name: 'rating', type: 'number', title: 'Rating (1-5)', validation: Rule => Rule.min(1).max(5) },
            { name: 'date', type: 'string', title: 'Review Date (e.g. 2026-06-08)' },
            { name: 'comment', type: 'localeText', title: 'Review Comment' },
          ],
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
