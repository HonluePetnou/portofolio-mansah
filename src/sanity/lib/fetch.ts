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

const categoryMap: Record<string, string> = {
  ai: "AI & Product Solutions",
  frontend: "Software Engineering",
  qa: "QA & Automation",
};

function hasBilingual(obj: any): obj is { EN: string; FR: string } {
  return obj && typeof obj === 'object' && ('EN' in obj || 'FR' in obj);
}

function safeBilingual<T = string>(obj: any, fallback?: T): { EN: T; FR: T } {
  if (hasBilingual(obj)) {
    return { EN: obj.EN ?? fallback, FR: obj.FR ?? fallback } as any;
  }
  return { EN: fallback, FR: fallback } as any;
}

function safeString(val: any, fallback = ""): string {
  return val ?? fallback;
}

function sanitizeProject(p: any): any {
  if (!p) return null;
  if (!hasBilingual(p.description) && !hasBilingual(p.challenge)) return null;
  return {
    ...p,
    slug: safeString(p.slug),
    category: categoryMap[p.category] || p.category || "Software Engineering",
    highlightedStack: p.highlightedStack || (p.stack?.[0]) || "",
    image: p.image || null,
    description: safeBilingual(p.description, ""),
    challenge: p.challenge || null,
    strategy: p.strategy || null,
    impact: p.impact || null,
    stack: p.stack || [],
    metrics: Array.isArray(p.metrics)
      ? p.metrics.filter((m: any) => m).map((m: any) => ({
          label: safeBilingual(m.label, ""),
          value: safeString(m.value),
        }))
      : [],
    displayStyle: p.displayStyle || "standard",
    playstoreIcon: p.playstoreIcon || null,
    developerName: p.developerName || "Mansah",
    downloads: p.downloads || "10K+",
    downloadSize: p.downloadSize || "15 MB",
    contentRating: p.contentRating || "PEGI 3",
    ratingValue: p.ratingValue || 4.8,
    ratingCount: p.ratingCount || "1,200 reviews",
    screenshots: Array.isArray(p.screenshots) ? p.screenshots : [],
    whatsNew: p.whatsNew ? safeBilingual(p.whatsNew, "") : null,
    version: p.version || "1.0.0",
    playStoreReviews: Array.isArray(p.playStoreReviews)
      ? p.playStoreReviews.map((r: any) => ({
          name: r.name || "Anonymous",
          avatar: r.avatar || null,
          rating: r.rating || 5,
          date: r.date || "",
          comment: safeBilingual(r.comment, ""),
        }))
      : [],
  };
}

function sanitizeExperience(p: any): any {
  if (!p) return null;
  if (!hasBilingual(p.role) && !hasBilingual(p.description)) return null;
  return {
    ...p,
    role: safeBilingual(p.role, ""),
    company: safeString(p.company),
    period: safeBilingual(p.period, ""),
    description: safeBilingual(p.description, ""),
    achievements: hasBilingual(p.achievements)
      ? { EN: p.achievements.EN || [], FR: p.achievements.FR || [] }
      : null,
  };
}

function sanitizeBlogPost(p: any): any {
  if (!p) return null;
  if (!hasBilingual(p.title)) return null;
  return {
    ...p,
    slug: safeString(p.slug),
    title: safeBilingual(p.title, ""),
    excerpt: safeBilingual(p.excerpt, ""),
    body: p.body || null,
    tags: p.tags || [],
    readTime: p.readTime || 5,
    publishDate: p.publishDate || "",
    coverImage: p.coverImage || null,
  };
}

function sanitizeTestimonial(p: any): any {
  if (!p) return null;
  if (!hasBilingual(p.quote)) return null;
  return {
    ...p,
    name: safeString(p.name),
    designation: safeBilingual(p.designation, ""),
    quote: safeBilingual(p.quote, ""),
    avatar: p.avatar || null,
  };
}

export async function getExperiences() {
  try {
    const data = await client.fetch(experiencesQuery)
    if (data && data.length > 0) {
      const sanitized = data.map(sanitizeExperience).filter(Boolean)
      if (sanitized.length > 0) return sanitized
    }
  } catch (error) {
    console.error('Failed to fetch experiences from Sanity, falling back to static data:', error)
  }
  return staticExperiences
}

export async function getProjects() {
  try {
    const data = await client.fetch(projectsQuery)
    if (data && data.length > 0) {
      const sanitized = data.map(sanitizeProject).filter(Boolean)
      if (sanitized.length > 0) return sanitized
    }
  } catch (error) {
    console.error('Failed to fetch projects from Sanity, falling back to static data:', error)
  }
  return staticProjects
}

export async function getBlogPosts() {
  try {
    const data = await client.fetch(blogPostsQuery)
    if (data && data.length > 0) {
      const sanitized = data.map(sanitizeBlogPost).filter(Boolean)
      if (sanitized.length > 0) return sanitized
    }
  } catch (error) {
    console.error('Failed to fetch blog posts from Sanity, falling back to static data:', error)
  }
  return staticBlogPosts
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const data = await client.fetch(blogPostBySlugQuery, { slug })
    if (data) {
      const sanitized = sanitizeBlogPost(data)
      if (sanitized) return sanitized
    }
  } catch (error) {
    console.error(`Failed to fetch blog post with slug "${slug}" from Sanity, falling back to static data:`, error)
  }
  return staticBlogPosts.find((post) => post.slug === slug) || null
}

export async function getTestimonials() {
  try {
    const data = await client.fetch(testimonialsQuery)
    if (data && data.length > 0) {
      const sanitized = data.map(sanitizeTestimonial).filter(Boolean)
      if (sanitized.length > 0) return sanitized
    }
  } catch (error) {
    console.error('Failed to fetch testimonials from Sanity, falling back to static data:', error)
  }
  return staticTestimonials
}
