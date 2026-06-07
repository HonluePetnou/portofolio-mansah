"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/data/blog";

import { useLanguage } from "@/context/language-context";

// Category tag color mappings
const getCategoryStyle = (category: string) => {
  switch (category) {
    case "AI & APIs":
      return "bg-brand-accent/10 dark:bg-brand-accent/15 border-brand-accent/20 dark:border-brand-accent/30 text-brand-primary dark:text-brand-accent";
    case "Quality Assurance":
      return "bg-brand-primary/10 border-brand-primary/20 text-brand-primary";
    case "Frontend Engineering":
      return "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400";
    case "Product & Agility":
      return "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400";
    default:
      return "bg-brand-primary/10 border-brand-primary/20 text-brand-primary";
  }
};

export function BlogSection() {
  const { lang, t } = useLanguage();
  // Show first 3 blog posts on the home page
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="section-py gap-y-md scroll-mt-20 overflow-hidden bg-transparent">
      <div className="container">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            {lang === "FR" ? "INSIGHTS" : "INSIGHTS"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {lang === "FR" ? "Blog d'Ingénierie" : "Engineering Blog"}
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            {lang === "FR"
              ? "Mes dernières réflexions sur le génie logiciel, l'architecture produit et l'assurance qualité."
              : "Latest thoughts on software engineering, product architecture, and quality assurance."}
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
                      <span className={cn(
                        "text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border",
                        getCategoryStyle(post.category)
                      )}>
                        {post.category}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-500 font-medium">{post.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors text-left leading-snug">
                      {post.title[lang]}
                    </h3>
                    
                    <p className="text-muted-foreground dark:text-gray-400 text-xs leading-relaxed text-left line-clamp-4">
                      {post.excerpt[lang]}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center text-xs font-bold text-muted-foreground dark:text-gray-300 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                    {lang === "FR" ? "Lire l'article" : "Read more"} <ArrowRight className="ml-2 h-3.5 w-3.5" />
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
              {lang === "FR" ? "Voir tous les articles" : "View All Posts"}
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
