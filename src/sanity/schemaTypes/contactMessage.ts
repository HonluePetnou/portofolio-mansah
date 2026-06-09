import { defineType, defineField } from 'sanity'

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Contact Message',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Sender Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Message Content',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'aiCategory',
      title: 'AI Category',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'aiSentiment',
      title: 'AI Sentiment / Urgency',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Summary',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'replied',
      title: 'Replied via Telegram',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'autoReplied',
      title: 'Auto-Replied (Backup)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'timestamp',
      title: 'Received At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})
