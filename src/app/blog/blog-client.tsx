"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { blogPosts as staticBlogPosts } from "@/data/blog";
import { useLanguage } from "@/context/language-context";

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

interface BlogClientPageProps {
  posts?: any[];
}

export function BlogClientPage({ posts = [] }: BlogClientPageProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    { id: "All", label: t("blog.all") },
    { id: "Quality Assurance", label: lang === "FR" ? "Assurance Qualité" : "Quality Assurance" },
    { id: "Frontend Engineering", label: lang === "FR" ? "Ingénierie Frontend" : "Frontend Engineering" },
    { id: "AI & APIs", label: "AI & APIs" },
    { id: "Product & Agility", label: lang === "FR" ? "Produit & Agilité" : "Product & Agility" },
  ];

  const rawPosts = posts.length > 0 ? posts : staticBlogPosts;

  const activePosts = rawPosts.map((post) => {
    const formattedReadTime = typeof post.readTime === 'number'
      ? (lang === 'FR' ? `${post.readTime} min de lecture` : `${post.readTime} min read`)
      : post.readTime?.[lang] || post.readTime || "";

    return {
      ...post,
      date: post.publishDate || post.date || "",
      category: post.tags && post.tags.length > 0 ? post.tags[0] : post.category || "General",
      readTimeText: formattedReadTime,
    };
  });

  // Filter posts based on active tab
  const filteredPosts = activeTab === "All"
    ? activePosts
    : activePosts.filter((p) => p.category === activeTab);

  // Featured article is the first article
  const featuredPost = activePosts[0];

  return (
    <div className="container section-py space-y-16">
      
      {/* Header and Breadcrumbs */}
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: lang === "FR" ? "Blog" : "Blog", href: "/blog" }]} />
        
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            {lang === "FR" ? "ARTICLES RÉDIGÉS" : "WRITTEN ARTICLES"}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {t("blog.title")}
          </h1>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 text-sm leading-relaxed">
            {lang === "FR"
              ? "Explorations de l'architecture logicielle, de la modularité frontend, des stratégies de tests automatisés et des flux d'intégration de l'IA."
              : "Explorations into software architecture, frontend modularity, automated testing strategies, and AI integration workflows."}
          </p>
        </div>
      </div>

      {/* Featured Article Hero */}
      {featuredPost && activeTab === "All" && (
        <div className="space-y-6">
          <h3 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
            {lang === "FR" ? "Article Phare" : "Featured Article"}
          </h3>
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="p-8 md:p-12 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-card-bg backdrop-blur-sm shadow-md dark:shadow-xl hover:border-brand-primary/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-6">
                <span className={cn(
                  "text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border w-fit",
                  getCategoryStyle(featuredPost.category)
                )}>
                  {featuredPost.category}
                </span>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTimeText}
                  </span>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-extrabold text-left text-foreground mb-4 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors leading-tight max-w-4xl">
                {featuredPost.title[lang]}
              </h2>
              
              <p className="text-muted-foreground dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-6 text-left max-w-3xl">
                {featuredPost.excerpt[lang]}
              </p>
              
              <div className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-accent group-hover:translate-x-1.5 transition-transform duration-200">
                {lang === "FR" ? "Lire l'article" : "Read Article"} <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Filter Tabs & Grid Section */}
      <div className="space-y-8 pt-8 border-t border-gray-200/50 dark:border-white/5">
        
        {/* Title and Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-xl font-bold tracking-tight text-foreground text-left">
            {lang === "FR" ? "Articles Récents" : "Recent Articles"}
          </h3>

          {/* Animated Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-brand-dark/40 backdrop-blur-md w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-300",
                  activeTab === cat.id
                    ? "text-brand-primary dark:text-brand-accent bg-white dark:bg-card-bg shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid Container with Animations */}
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects().map((article) => (
              <motion.div
                key={article.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={`/blog/${article.slug}`} className="block group h-full">
                  <div className="h-full flex flex-col justify-between p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-white dark:bg-card-bg hover:border-brand-primary/30 dark:hover:border-brand-primary/30 transition-all duration-300 shadow-sm dark:shadow-lg hover:-translate-y-1.5">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className={cn(
                          "text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border",
                          getCategoryStyle(article.category)
                        )}>
                          {article.category}
                        </span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-500 font-medium">{article.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors text-left leading-snug">
                        {article.title[lang]}
                      </h3>
                      
                      <p className="text-muted-foreground dark:text-gray-400 text-xs leading-relaxed text-left line-clamp-3">
                        {article.excerpt[lang]}
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-white/5 flex items-center text-xs font-bold text-muted-foreground dark:text-gray-300 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                      {lang === "FR" ? "Lire l'article" : "Read more"} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );

  // Helper function to return projects/posts excluding the featured one if showing All, to avoid repetition.
  // Except if filtered by specific category, then we show it.
  function filteredProjects() {
    if (activeTab === "All") {
      // Exclude the featured article from the recent list
      return filteredPosts.slice(1);
    }
    return filteredPosts;
  }
}
