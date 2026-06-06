import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Quote, CheckCircle2, User, ChevronRight, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | Mansah Blog` : "Blog Article",
    description: post?.excerpt || "Technical engineering article.",
  };
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container section-py max-w-3xl space-y-10">
      
      {/* Top Navigation */}
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Insights
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-6 text-left">
        <span className={cn(
          "text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border w-fit inline-block",
          getCategoryStyle(post.category)
        )}>
          {post.category}
        </span>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-primary dark:text-brand-accent" />
            {post.date}
          </span>
          <span className="text-gray-300 dark:text-white/10">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-primary dark:text-brand-accent" />
            {post.readTime}
          </span>
          <span className="text-gray-300 dark:text-white/10">•</span>
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <User className="w-3.5 h-3.5 text-brand-primary dark:text-brand-accent" />
            By Frédéric Mansah
          </span>
        </div>
      </div>

      {/* Decorative Banner Illustration */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-brand-dark/50 flex flex-col items-center justify-center p-6 md:p-12 shadow-sm text-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/5 via-transparent to-brand-accent/5 pointer-events-none" />
        
        {/* Dynamic icon indicator */}
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/10 flex items-center justify-center mb-6 shadow-md shadow-brand-primary/5">
          <BookOpen className="w-8 h-8 text-brand-primary dark:text-brand-accent" />
        </div>
        
        <h3 className="text-lg md:text-xl font-bold text-foreground max-w-md line-clamp-2">
          {post.title}
        </h3>
        <span className="text-xs text-muted-foreground mt-2 font-mono">{post.category} · Case Study</span>
      </div>

      {/* Article Body */}
      <article className="text-left space-y-8 prose dark:prose-invert max-w-none">
        
        {/* Introduction */}
        <p className="text-base md:text-lg text-muted-foreground dark:text-gray-300 leading-relaxed font-normal">
          {post.introduction}
        </p>

        {/* Pull Quote */}
        {post.quote && (
          <div className="relative p-6 md:p-8 rounded-2xl border border-brand-primary/10 dark:border-white/5 bg-brand-primary/5 dark:bg-white/[0.01] my-8 flex items-start gap-4">
            <Quote className="w-10 h-10 text-brand-primary dark:text-brand-accent shrink-0 opacity-20 -mt-2" />
            <div className="text-xs md:text-sm italic font-medium text-foreground dark:text-gray-300 leading-relaxed">
              &ldquo;{post.quote}&rdquo;
            </div>
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-brand-primary dark:bg-brand-accent" />
          </div>
        )}

        {/* Sections Loop */}
        {post.sections.map((section, idx) => (
          <div key={idx} className="space-y-4 pt-4">
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-brand-primary dark:text-brand-accent shrink-0" />
              {section.heading}
            </h2>
            <p className="text-muted-foreground dark:text-gray-400 text-xs md:text-sm leading-relaxed">
              {section.body}
            </p>

            {/* Code Snippet */}
            {section.codeSnippet && (
              <div className="rounded-xl border border-gray-200/60 dark:border-white/10 overflow-hidden bg-[#0A0A0F] text-gray-200 text-left font-mono text-[11px] leading-relaxed my-6 shadow-lg">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200/20 dark:border-white/5 bg-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-sans">
                    {section.codeSnippet.language}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-sans">
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
      <div className="pt-8 border-t border-gray-200/50 dark:border-white/5">
        <div className="p-6 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-card-bg flex flex-col sm:flex-row items-center gap-6 text-left">
          
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-brand-primary/10 border border-brand-primary/20 shrink-0 flex items-center justify-center">
            {/* Simple fallback letter icon */}
            <span className="text-2xl font-extrabold text-brand-primary dark:text-brand-accent">
              F
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-foreground text-sm">
              Frédéric Armel Mansah
            </h4>
            <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">
              Senior Frontend Engineer & QA specialist, focus on modular React structures, quality automation pipelines, and API integrations.
            </p>
            <div className="pt-1">
              <a
                href="mailto:fredericarmel.mansah@gmail.com"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-primary dark:text-brand-accent hover:underline"
              >
                Discuss this article <ArrowLeft className="w-3 h-3 rotate-180" />
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
