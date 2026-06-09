"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts as staticBlogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, Clock, Calendar, Quote, ChevronRight, BookOpen, Mail, ArrowRight,
  Info, AlertTriangle, Lightbulb, AlertOctagon, FileText, Download 
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

interface BlogPostClientProps {
  slug: string;
  post?: any;
  allPosts?: any[];
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

const getEmbedUrl = (url: string, platform: string) => {
  if (!url) return '';
  if (platform === 'youtube') {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
  } else if (platform === 'loom') {
    return url.replace('/share/', '/embed/');
  }
  return url;
};

const getFileUrl = (fileValue: any) => {
  if (!fileValue || !fileValue.asset || !fileValue.asset._ref) return '';
  const ref = fileValue.asset._ref;
  const parts = ref.split('-');
  if (parts.length < 3) return '';
  const assetId = parts[1];
  const extension = parts[2];
  return `https://cdn.sanity.io/files/c9d6em18/production/${assetId}.${extension}`;
};

function AccordionBlock({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-4 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-card-bg overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-foreground text-xs md:text-sm hover:bg-gray-100/50 dark:hover:bg-white/[0.01] transition-colors"
      >
        <span>{title}</span>
        <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", isOpen && "rotate-90 text-brand-primary dark:text-brand-accent")} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-muted-foreground dark:text-gray-300 leading-relaxed border-t border-gray-200/20 dark:border-white/5">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const portableTextComponents = {
  types: {
    accordion: ({ value }: any) => {
      if (!value || !value.title || !value.content) return null;
      return <AccordionBlock title={value.title} content={value.content} />;
    },
    iframeEmbed: ({ value }: any) => {
      if (!value || !value.url) return null;
      return (
        <div className="my-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-white/5 bg-black/10">
          <iframe
            src={value.url}
            title={value.title || 'Live Demo / Sandbox'}
            style={{ height: `${value.height || 500}px` }}
            className="w-full border-0"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>
      );
    },
    image: ({ value }: any) => {
      if (!value) return null;
      return (
        <figure className="my-8 space-y-2 text-center">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.01]">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || 'Blog Image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-muted-foreground italic mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }: any) => {
      if (!value || !value.code) return null;
      return (
        <div className="rounded-xl border border-gray-200/50 dark:border-white/10 overflow-hidden bg-[#0A0A0F] text-gray-200 text-left font-mono text-[11px] leading-relaxed my-6 shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200/20 dark:border-white/5 bg-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 font-sans">
              {value.language || 'code'}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-white/30 font-sans">
              Read Only
            </span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code>{value.code}</code>
          </pre>
        </div>
      );
    },
    callout: ({ value }: any) => {
      if (!value || !value.text) return null;
      let bgStyle = 'bg-brand-primary/5 dark:bg-white/[0.01] border-brand-primary/20 text-foreground';
      let icon = <Info className="w-5 h-5 text-brand-primary" />;
      
      switch (value.type) {
        case 'warning':
          bgStyle = 'bg-amber-500/5 dark:bg-amber-500/[0.02] border-amber-500/30 text-foreground';
          icon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
          break;
        case 'tip':
          bgStyle = 'bg-brand-accent/5 dark:bg-brand-accent/[0.02] border-brand-accent/30 text-foreground';
          icon = <Lightbulb className="w-5 h-5 text-brand-accent" />;
          break;
        case 'danger':
          bgStyle = 'bg-red-500/5 dark:bg-red-500/[0.02] border-red-500/30 text-foreground';
          icon = <AlertOctagon className="w-5 h-5 text-red-500" />;
          break;
      }

      return (
        <div className={cn("p-5 rounded-2xl border flex items-start gap-4 my-6 text-left backdrop-blur-md", bgStyle)}>
          <div className="shrink-0 mt-0.5">{icon}</div>
          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground dark:text-gray-300 font-medium m-0">
            {value.text}
          </p>
        </div>
      );
    },
    divider: ({ value }: any) => {
      const isStar = value?.style !== 'line';
      return (
        <div className="flex items-center justify-center gap-4 my-12 w-full">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-gray-200/50 dark:to-white/10 flex-1" />
          {isStar ? (
            <svg className="w-4 h-4 text-brand-primary dark:text-brand-accent animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9Z" />
            </svg>
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20" />
          )}
          <div className="h-[1px] bg-gradient-to-l from-transparent to-gray-200/50 dark:to-white/10 flex-1" />
        </div>
      );
    },
    simpleTable: ({ value }: any) => {
      if (!value) return null;
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-gray-200/50 dark:border-white/10 shadow-inner">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200/50 dark:border-white/10 font-bold text-foreground">
                {value.headers?.map((h: string, i: number) => (
                  <th key={i} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/30 dark:divide-white/5">
              {value.rows?.map((row: any, rIdx: number) => (
                <tr key={rIdx} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  {row.cells?.map((cell: string, cIdx: number) => (
                    <td key={cIdx} className="px-4 py-3 text-muted-foreground dark:text-gray-300 font-normal">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    videoEmbed: ({ value }: any) => {
      if (!value || !value.url) return null;
      const embedUrl = getEmbedUrl(value.url, value.platform);
      return (
        <figure className="my-8 space-y-2 text-center w-full">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-white/5 bg-black">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-muted-foreground italic mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    downloadCard: ({ value }: any) => {
      if (!value || !value.file) return null;
      const downloadUrl = getFileUrl(value.file);
      return (
        <a 
          href={downloadUrl} 
          download={value.filename || true} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block my-6 p-5 rounded-2xl border border-brand-primary/10 dark:border-white/5 bg-brand-primary/5 hover:bg-brand-primary/10 dark:bg-white/[0.01] dark:hover:bg-white/[0.02] shadow-sm hover:shadow-md transition-all duration-300 group text-left"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 text-brand-primary dark:text-brand-accent group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-foreground group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors text-sm">
                  {value.title || 'Download Resource'}
                </h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  {value.description || 'Click to download this resource file.'}
                </p>
              </div>
            </div>
            <div className="p-2.5 rounded-full bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 text-muted-foreground group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
              <Download className="w-4 h-4" />
            </div>
          </div>
        </a>
      );
    },
  },
  block: {
    normal: ({ children }: any) => <p className="text-muted-foreground dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-4 text-left">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-lg md:text-xl font-extrabold text-foreground tracking-tight mt-8 mb-4 text-left">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-base md:text-lg font-bold text-foreground tracking-tight mt-6 mb-3 text-left">{children}</h3>,
    blockquote: ({ children }: any) => (
      <div className="relative p-6 md:p-8 rounded-2xl border border-brand-primary/10 dark:border-white/5 bg-brand-primary/5 dark:bg-white/[0.01] my-8 flex items-start gap-4">
        <Quote className="w-10 h-10 text-brand-primary dark:text-brand-accent shrink-0 opacity-20 -mt-2" />
        <div className="text-xs md:text-sm italic font-medium text-foreground/85 dark:text-gray-300 leading-relaxed text-left">
          &ldquo;{children}&rdquo;
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-brand-primary dark:bg-brand-accent" />
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a href={value.href} target={target} rel={rel} className="text-brand-primary dark:text-brand-accent hover:underline font-bold">
          {children}
        </a>
      );
    },
  },
};

export function BlogPostClient({ slug, post: propPost, allPosts = [] }: BlogPostClientProps) {
  const { lang, t } = useLanguage();
  
  const rawPost = propPost || staticBlogPosts.find((p) => p.slug === slug);
  if (!rawPost) {
    notFound();
  }

  // Format active post fields
  const formattedReadTime = typeof rawPost.readTime === 'number'
    ? (lang === 'FR' ? `${rawPost.readTime} min de lecture` : `${rawPost.readTime} min read`)
    : rawPost.readTime?.[lang] || rawPost.readTime || "";

  const post = {
    ...rawPost,
    date: rawPost.publishDate || rawPost.date || "",
    category: rawPost.tags && rawPost.tags.length > 0 ? rawPost.tags[0] : rawPost.category || "General",
    readTimeText: formattedReadTime,
  };

  const activeAllPosts = allPosts.length > 0 ? allPosts : staticBlogPosts;

  // Find a related post (a different post, preferably of the same category)
  const relatedRaw = activeAllPosts.find((p) => p.slug !== slug && (p.tags && p.tags.length > 0 ? p.tags[0] : p.category) === post.category) || 
                     activeAllPosts.find((p) => p.slug !== slug);

  const relatedPost = relatedRaw ? {
    ...relatedRaw,
    date: relatedRaw.publishDate || relatedRaw.date || "",
    category: relatedRaw.tags && relatedRaw.tags.length > 0 ? relatedRaw.tags[0] : relatedRaw.category || "General",
    readTimeText: typeof relatedRaw.readTime === 'number'
      ? (lang === 'FR' ? `${relatedRaw.readTime} min de lecture` : `${relatedRaw.readTime} min read`)
      : relatedRaw.readTime?.[lang] || relatedRaw.readTime || "",
  } : null;

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
                {post.readTimeText}
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
            {post.body ? (
              <PortableText value={post.body[lang]} components={portableTextComponents} />
            ) : (
              <>
                {/* Introduction */}
                <p className="text-base md:text-lg text-foreground/90 dark:text-gray-300 leading-relaxed font-normal text-left">
                  {post.introduction?.[lang]}
                </p>

                {/* Pull Quote */}
                {post.quote && (
                  <div className="relative p-6 md:p-8 rounded-2xl border border-brand-primary/10 dark:border-white/5 bg-brand-primary/5 dark:bg-white/[0.01] my-8 flex items-start gap-4">
                    <Quote className="w-10 h-10 text-brand-primary dark:text-brand-accent shrink-0 opacity-20 -mt-2" />
                    <div className="text-xs md:text-sm italic font-medium text-foreground/85 dark:text-gray-300 leading-relaxed text-left">
                      &ldquo;{post.quote[lang]}&rdquo;
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-brand-primary dark:bg-brand-accent" />
                  </div>
                )}

                {/* Sections Loop */}
                {post.sections?.map((section: any, idx: number) => (
                  <div key={idx} id={`section-${idx}`} className="space-y-4 pt-4 scroll-mt-24">
                    <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2 text-left">
                      <ChevronRight className="w-4 h-4 text-brand-primary dark:text-brand-accent shrink-0" />
                      {section.heading[lang]}
                    </h2>
                    <p className="text-muted-foreground dark:text-gray-400 text-xs md:text-sm leading-relaxed text-left">
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
              </>
            )}
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
                    ? "Ingénieur Junior & Trouveur de Solutions, alliant développement (web, mobile, desktop), réseaux, cybersécurité et conception produit."
                    : "Junior Engineer & Solution Finder, bridging software engineering (web, mobile, desktop), networking, cybersecurity, and product design."}
                </p>
                <div className="pt-1">
                  <a
                    href="mailto:honluepetnou@gmail.com"
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
          {post.sections && post.sections.length > 0 && (
            <div className="space-y-4 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("blog.toc")}
              </h3>
              <ul className="space-y-3 text-[11px] font-medium">
                {post.sections.map((sec: any, idx: number) => (
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
          )}

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
                  <span className="text-muted-foreground dark:text-white/40">{relatedPost.readTimeText}</span>
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
