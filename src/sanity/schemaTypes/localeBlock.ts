import { defineType, defineField } from 'sanity'

// Reusable portable text blocks with image support
const portableTextBlock = [
  {
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'H4', value: 'h4' },
      { title: 'Quote', value: 'blockquote' },
    ],
    lists: [
      { title: 'Bullet', value: 'bullet' },
      { title: 'Numbered', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        { title: 'Code', value: 'code' },
      ],
      annotations: [
        {
          title: 'URL',
          name: 'link',
          type: 'object',
          fields: [
            {
              title: 'URL',
              name: 'href',
              type: 'url',
            },
          ],
        },
      ],
    },
  },
  {
    type: 'image',
    options: { hotspot: true },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alternative Text',
        description: 'Important for SEO and screen readers.',
      },
      {
        name: 'caption',
        type: 'string',
        title: 'Caption',
      },
    ],
  },
  {
    type: 'object',
    name: 'codeBlock',
    title: 'Code Block',
    fields: [
      {
        name: 'code',
        title: 'Code',
        type: 'text',
        rows: 10,
      },
      {
        name: 'language',
        title: 'Language',
        type: 'string',
        initialValue: 'javascript',
      },
    ],
  },
  {
    type: 'object',
    name: 'callout',
    title: 'Callout',
    fields: [
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: [
            { title: 'Info (Blue)', value: 'info' },
            { title: 'Warning (Amber)', value: 'warning' },
            { title: 'Tip (Green)', value: 'tip' },
            { title: 'Danger (Red)', value: 'danger' },
          ],
        },
        initialValue: 'info',
      },
      {
        name: 'text',
        title: 'Text Content',
        type: 'text',
        rows: 3,
      },
    ],
  },
  {
    type: 'object',
    name: 'divider',
    title: 'Divider',
    fields: [
      {
        name: 'style',
        title: 'Style',
        type: 'string',
        options: {
          list: [
            { title: 'Star (Theme)', value: 'star' },
            { title: 'Line (Subtle)', value: 'line' },
          ],
        },
        initialValue: 'star',
      },
    ],
  },
  {
    type: 'object',
    name: 'simpleTable',
    title: 'Simple Table',
    fields: [
      {
        name: 'headers',
        title: 'Headers',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'rows',
        title: 'Rows',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'tableRow',
            fields: [
              {
                name: 'cells',
                title: 'Cells',
                type: 'array',
                of: [{ type: 'string' }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'object',
    name: 'videoEmbed',
    title: 'Video Embed',
    fields: [
      {
        name: 'url',
        title: 'Video URL',
        type: 'url',
      },
      {
        name: 'platform',
        title: 'Platform',
        type: 'string',
        options: {
          list: [
            { title: 'YouTube', value: 'youtube' },
            { title: 'Loom', value: 'loom' },
            { title: 'Vimeo', value: 'vimeo' },
          ],
        },
        initialValue: 'youtube',
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
      },
    ],
  },
  {
    type: 'object',
    name: 'downloadCard',
    title: 'Download Card',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'file',
        title: 'File Upload',
        type: 'file',
      },
      {
        name: 'filename',
        title: 'Display Filename',
        type: 'string',
      },
    ],
  },
  {
    type: 'object',
    name: 'accordion',
    title: 'Accordion / Collapsible',
    fields: [
      {
        name: 'title',
        title: 'Accordion Title',
        type: 'string',
      },
      {
        name: 'content',
        title: 'Accordion Content',
        type: 'text',
        rows: 5,
      },
    ],
  },
  {
    type: 'object',
    name: 'iframeEmbed',
    title: 'Iframe Embed (Sandbox / Live Demo)',
    fields: [
      {
        name: 'url',
        title: 'Embed URL (CodePen, StackBlitz, etc.)',
        type: 'url',
      },
      {
        name: 'title',
        title: 'Iframe Title (for accessibility)',
        type: 'string',
      },
      {
        name: 'height',
        title: 'Iframe Height (pixels)',
        type: 'number',
        initialValue: 500,
      },
    ],
  },
]

export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Localized Block',
  type: 'object',
  fields: [
    defineField({
      name: 'FR',
      title: 'French',
      type: 'array',
      of: portableTextBlock,
    }),
    defineField({
      name: 'EN',
      title: 'English',
      type: 'array',
      of: portableTextBlock,
    }),
  ],
})
