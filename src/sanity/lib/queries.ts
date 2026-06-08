// GROQ Queries for fetching data from Sanity CMS

export const experiencesQuery = `*[_type == "experience"] | order(order asc) {
  role,
  company,
  period,
  description,
  achievements
}`

export const projectsQuery = `*[_type == "project"] | order(order asc) {
  title,
  "slug": slug.current,
  category,
  stack,
  image,
  description,
  challenge,
  strategy,
  impact,
  demoUrl,
  repoUrl,
  metrics[] {
    label,
    value
  }
}`

export const blogPostsQuery = `*[_type == "blogPost"] | order(publishDate desc) {
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishDate,
  readTime,
  tags,
  coverImage
}`

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishDate,
  readTime,
  tags,
  coverImage
}`

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  name,
  designation,
  quote,
  avatar
}`
