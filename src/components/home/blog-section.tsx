"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";


const recentPosts = [
  {
    title: "Why Quality Assurance Is a Product Feature, Not a Phase",
    excerpt:
      "Shifting the mindset from 'catching bugs' to 'building reliability'. How BDD and automated testing create a safety net for rapid product iteration.",
    category: "Quality Assurance",
    date: "Oct 12, 2025",
    slug: "quality-assurance-product-feature",
  },
  {
    title: "Architecting Scalable Frontends with Next.js",
    excerpt:
      "Lessons learned from managing large-scale React applications. Component patterns, state management strategies, and performance optimization.",
    category: "Frontend Engineering",
    date: "Sep 28, 2025",
    slug: "architecting-scalable-frontends",
  },
  {
    title: "Integrating Gemini AI into Real-World Workflows",
    excerpt:
      "Moving beyond chatbots: How to use LLMs to solve specific business problems and enhance user decision-making.",
    category: "AI & APIs",
    date: "Aug 15, 2025",
    slug: "integrating-gemini-ai",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="section-py gap-y-md scroll-mt-20 overflow-hidden bg-transparent">
      <div className="container">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            INSIGHTS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Engineering Blog
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Latest thoughts on software engineering, product architecture, and quality assurance.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-12 max-w-6xl mx-auto">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <div className="h-full flex flex-col justify-between p-8 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-card-bg hover:border-brand-primary/30 dark:hover:border-brand-primary/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:-translate-y-1.5">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-500 font-medium">{post.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-brand-primary transition-colors text-left leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground dark:text-gray-400 text-xs leading-relaxed text-left line-clamp-4">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center text-xs font-bold text-muted-foreground dark:text-gray-300 group-hover:text-brand-primary transition-colors">
                    Read more <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link href="/blog">
            <button className="group flex items-center gap-2 px-6 py-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-card-bg hover:bg-gray-50 dark:hover:bg-[#1A1A1F] transition-all text-foreground font-bold text-xs tracking-wider uppercase">
              View All Posts
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
