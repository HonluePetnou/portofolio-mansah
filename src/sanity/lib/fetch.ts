import { client } from './client'
import {
  experiencesQuery,
  projectsQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  testimonialsQuery,
} from './queries'
import { experiences as staticExperiences } from '@/data/experience'
import { projectsData as staticProjects } from '@/data/projects'
import { blogPosts as staticBlogPosts } from '@/data/blog'
import { testimonialsData as staticTestimonials } from '@/data/testimonials'

// Fetch experiences with static fallback
export async function getExperiences() {
  try {
    const data = await client.fetch(experiencesQuery)
    if (data && data.length > 0) {
      return data
    }
  } catch (error) {
    console.error('Failed to fetch experiences from Sanity, falling back to static data:', error)
  }
  return staticExperiences
}

// Fetch projects with static fallback
export async function getProjects() {
  try {
    const data = await client.fetch(projectsQuery)
    if (data && data.length > 0) {
      return data
    }
  } catch (error) {
    console.error('Failed to fetch projects from Sanity, falling back to static data:', error)
  }
  return staticProjects
}

// Fetch blog posts with static fallback
export async function getBlogPosts() {
  try {
    const data = await client.fetch(blogPostsQuery)
    if (data && data.length > 0) {
      return data
    }
  } catch (error) {
    console.error('Failed to fetch blog posts from Sanity, falling back to static data:', error)
  }
  return staticBlogPosts
}

// Fetch a single blog post by slug with static fallback
export async function getBlogPostBySlug(slug: string) {
  try {
    const data = await client.fetch(blogPostBySlugQuery, { slug })
    if (data) {
      return data
    }
  } catch (error) {
    console.error(`Failed to fetch blog post with slug "${slug}" from Sanity, falling back to static data:`, error)
  }
  return staticBlogPosts.find((post) => post.slug === slug) || null
}

// Fetch testimonials with static fallback
export async function getTestimonials() {
  try {
    const data = await client.fetch(testimonialsQuery)
    if (data && data.length > 0) {
      return data
    }
  } catch (error) {
    console.error('Failed to fetch testimonials from Sanity, falling back to static data:', error)
  }
  return staticTestimonials
}
