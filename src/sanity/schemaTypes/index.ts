import { type SchemaTypeDefinition } from 'sanity'
import { localeString } from './localeString'
import { localeText } from './localeText'
import { localeStringArray } from './localeStringArray'
import { localeBlock } from './localeBlock'
import { experience } from './experience'
import { project } from './project'
import { blogPost } from './blogPost'
import { testimonial } from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    localeStringArray,
    localeBlock,
    experience,
    project,
    blogPost,
    testimonial,
  ],
}
