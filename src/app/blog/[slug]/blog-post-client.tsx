"use client";

import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Quote, ChevronRight, BookOpen, Mail, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

interface BlogPostClientProps {
  slug: string;
}

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

export function BlogPostClient({ slug }: BlogPostClientProps) {
  const { lang, t } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find a related post (a different post, preferably of the same category)
  const relatedPost = blogPosts.find((p) => p.slug !== slug && p.category === post.category) || 
                      blogPosts.find((p) => p.slug !== slug);

  return (
    <div className="container section-py max-w-6xl space-y-10">
      
      {/* Top Navigation & Breadcrumbs */}
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { label: lang === "FR" ? "Blog" : "Blog", href: "/blog" },
            { label: post.title[lang], href: `/blog/${post.slug}` },
          ]}
        />

        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          {t("blog.backToBlog")}
        </Link>
      </div>

      {/* Main 2-Column Layout (Sidebar on the right) */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start pt-4">
        
        {/* Left Column (Main Article Body) */}
        <div className="space-y-10 max-w-3xl order-1">
          
          {/* Article Header info */}
          <div className="space-y-4 text-left">
            <span className={cn(
              "text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border w-fit inline-block",
              getCategoryStyle(post.category)
            )}>
              {post.category}
            </span>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {post.title[lang]}
            </h1>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-primary dark:text-brand-accent" />
                {post.date}
              </span>
              <span className="text-gray-300 dark:text-white/10">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-primary dark:text-brand-accent" />
                {post.readTime[lang]}
              </span>
              <span className="text-gray-300 dark:text-white/10">•</span>
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                {lang === "FR" ? "Par Frédéric Armel Petnou" : "By Frédéric Armel Petnou"}
              </span>
            </div>
          </div>

          {/* Decorative Header Banner */}
          <div className="relative h-48 md:h-64 w-full rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.01] flex flex-col items-center justify-center p-6 md:p-12 shadow-sm text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/5 via-transparent to-brand-accent/5 pointer-events-none" />
            
            <div className="w-14 h-14 rounded-2xl bg-white/50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-md shadow-brand-primary/5">
              <BookOpen className="w-7 h-7 text-brand-primary dark:text-brand-accent" />
            </div>
            
            <h3 className="text-md md:text-lg font-bold text-foreground max-w-md line-clamp-2">
              {post.title[lang]}
            </h3>
            <span className="text-[10px] text-muted-foreground mt-1 font-mono">{post.category} · {lang === "FR" ? "Étude de Cas" : "Case Study"}</span>
          </div>

          {/* Article Content */}
          <article className="text-left space-y-8 prose dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <p className="text-base md:text-lg text-foreground/90 dark:text-gray-300 leading-relaxed font-normal">
              {post.introduction[lang]}
            </p>

            {/* Pull Quote */}
            {post.quote && (
              <div className="relative p-6 md:p-8 rounded-2xl border border-brand-primary/10 dark:border-white/5 bg-brand-primary/5 dark:bg-white/[0.01] my-8 flex items-start gap-4">
                <Quote className="w-10 h-10 text-brand-primary dark:text-brand-accent shrink-0 opacity-20 -mt-2" />
                <div className="text-xs md:text-sm italic font-medium text-foreground/85 dark:text-gray-300 leading-relaxed">
                  &ldquo;{post.quote[lang]}&rdquo;
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-brand-primary dark:bg-brand-accent" />
              </div>
            )}

            {/* Sections Loop */}
            {post.sections.map((section, idx) => (
              <div key={idx} id={`section-${idx}`} className="space-y-4 pt-4 scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-brand-primary dark:text-brand-accent shrink-0" />
                  {section.heading[lang]}
                </h2>
                <p className="text-muted-foreground dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                  {section.body[lang]}
                </p>

                {/* Code Snippet */}
                {section.codeSnippet && (
                  <div className="rounded-xl border border-gray-200/50 dark:border-white/10 overflow-hidden bg-[#0A0A0F] text-gray-200 text-left font-mono text-[11px] leading-relaxed my-6 shadow-lg">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200/20 dark:border-white/5 bg-white/5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 font-sans">
                        {section.codeSnippet.language}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-white/30 font-sans">
                        Read Only
                      </span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </article>

          {/* Footer Profile Box */}
          <div className="pt-8 border-t border-gray-200 dark:border-white/5">
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0A0F] flex flex-col sm:flex-row items-center gap-6 text-left">
              
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-brand-primary/10 border border-brand-primary/20 shrink-0 flex items-center justify-center">
                <span className="text-xl font-extrabold text-brand-primary dark:text-brand-accent">
                  F
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-foreground">
                  Frédéric Armel Petnou
                </h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">
                  {lang === "FR"
                    ? "Ingénieur Frontend Senior & spécialiste QA, concentré sur les structures React modulaires, les pipelines d'automatisation de la qualité et les intégrations d'API."
                    : "Senior Frontend Engineer & QA specialist, focus on modular React structures, quality automation pipelines, and API integrations."}
                </p>
                <div className="pt-1">
                  <a
                    href="mailto:fredericarmel.mansah@gmail.com"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-primary dark:text-brand-accent hover:underline"
                  >
                    {t("blog.discuss")} <ArrowLeft className="w-3 h-3 rotate-180" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (Sticky Sidebar on Desktop) */}
        <aside className="hidden lg:block sticky top-24 self-start space-y-8 pl-2 order-2">
          
          {/* Table of Contents */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("blog.toc")}
            </h3>
            <ul className="space-y-3 text-[11px] font-medium">
              {post.sections.map((sec, idx) => (
                <li key={idx}>
                  <a
                    href={`#section-${idx}`}
                    className="block text-muted-foreground hover:text-brand-primary dark:text-white/50 dark:hover:text-brand-accent transition-colors leading-relaxed"
                  >
                    {sec.heading[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Articles */}
          {relatedPost && (
            <div className="space-y-4 text-left pt-6 border-t border-gray-200 dark:border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("blog.related")}
              </h3>
              
              <div className="p-5 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-card-bg shadow-sm dark:shadow-md space-y-3.5">
                <div className="flex items-center gap-2 text-[9px]">
                  <span className={cn(
                    "font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
                    getCategoryStyle(relatedPost.category)
                  )}>
                    {relatedPost.category}
                  </span>
                  <span className="text-muted-foreground dark:text-white/40">{relatedPost.readTime[lang]}</span>
                </div>
                <h4 className="text-xs font-bold text-foreground hover:text-brand-primary dark:hover:text-brand-accent transition-colors leading-snug">
                  <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title[lang]}</Link>
                </h4>
                <p className="text-[10px] text-muted-foreground dark:text-white/40 line-clamp-3 leading-relaxed">
                  {relatedPost.excerpt[lang]}
                </p>
                <Link
                  href={`/blog/${relatedPost.slug}`}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-primary dark:text-brand-accent hover:underline pt-1"
                >
                  {t("blog.readArticle")} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* Newsletter Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-primary/5 to-transparent dark:from-brand-primary/15 dark:via-brand-primary/5 dark:to-transparent border border-brand-primary/10 shadow-sm dark:shadow-lg text-left space-y-4">
            <h4 className="font-extrabold text-foreground dark:text-white text-xs">
              {t("blog.subscribeTitle")}
            </h4>
            <p className="text-[10px] text-muted-foreground dark:text-white/50 leading-relaxed">
              {t("blog.subscribeDesc")}
            </p>
            <button className="w-full py-2 rounded-full bg-brand-primary hover:bg-brand-primary/95 text-white dark:bg-brand-accent dark:hover:bg-brand-accent/90 dark:text-black font-bold text-[10px] uppercase tracking-wider transition-all duration-300 dark:shadow-[0_0_12px_rgba(57,255,20,0.3)] shadow-[0_4px_12px_rgba(94,80,249,0.15)]">
              {t("blog.subscribeBtn")}
            </button>
          </div>

        </aside>

      </div>

    </div>
  );
}
