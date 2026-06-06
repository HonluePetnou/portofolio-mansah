import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Mansah - Honlue Petnou Frederic Armel",
  description:
    "Insights on Quality Assurance, Frontend Engineering, and Product Mindset by Mansah (Honlue Petnou Frederic Armel).",
};

const categories = [
  "Quality Assurance",
  "Frontend Engineering",
  "AI & APIs",
  "Product & Agility",
];

const articles = [
  {
    title: "Why Quality Assurance Is a Product Feature, Not a Phase",
    excerpt:
      "Shifting the mindset from 'catching bugs' to 'building reliability'. How BDD and automated testing create a safety net for rapid product iteration.",
    category: "Quality Assurance",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    slug: "quality-assurance-product-feature",
  },
  {
    title: "Architecting Scalable Frontends with Next.js",
    excerpt:
      "Lessons learned from managing large-scale React applications. Component patterns, state management strategies, and performance optimization.",
    category: "Frontend Engineering",
    date: "Sep 28, 2025",
    readTime: "8 min read",
    slug: "architecting-scalable-frontends",
  },
  {
    title: "Integrating Gemini AI into Real-World Workflows",
    excerpt:
      "Moving beyond chatbots: How to use LLMs to solve specific business problems and enhance user decision-making.",
    category: "AI & APIs",
    date: "Aug 15, 2025",
    readTime: "6 min read",
    slug: "integrating-gemini-ai",
  },
];

export default function BlogPage() {
  return (
    <div className="container section-py">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

      <SectionHeader
        title="Engineering Insights"
        subtitle="Thoughts on technology, product, and quality."
      />

      {/* Featured Article */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-brand-primary" />
          Featured
        </h2>
        <Link href={`/blog/${articles[0].slug}`} className="block group">
          <GlassCard className="group-hover:bg-glass-highlight transition-colors p-8 md:p-12 border-brand-primary/20">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-4">
              <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 w-fit">
                {articles[0].category}
              </Badge>
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                {articles[0].date} • {articles[0].readTime}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-brand-primary transition-colors text-left">
              {articles[0].title}
            </h3>
            <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6 max-w-3xl text-left">
              {articles[0].excerpt}
            </p>
            <div className="flex items-center text-brand-primary font-semibold group-hover:translate-x-2 transition-transform">
              Read Article <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </GlassCard>
        </Link>
      </div>

      {/* Categories Filter (Visual only for now) */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-brand-dark/50 text-sm text-muted-foreground dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recent Articles Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {articles.slice(1).map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block group h-full"
          >
            <GlassCard className="h-full flex flex-col p-8 hover:border-brand-primary/30">
              <div className="flex justify-between items-start mb-4">
                <Badge
                  variant="outline"
                  className="text-xs text-brand-primary dark:text-brand-accent border-brand-primary/20 dark:border-brand-accent/20 bg-brand-primary/5 dark:bg-brand-accent/5"
                >
                  {article.category}
                </Badge>
                <span className="text-xs text-muted-foreground dark:text-gray-400">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-primary transition-colors text-left">
                {article.title}
              </h3>
              <p className="text-muted-foreground dark:text-gray-400 text-sm grow text-left">{article.excerpt}</p>
              <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-white/5 flex items-center text-sm text-muted-foreground group-hover:text-brand-primary transition-colors">
                Read more <ArrowRight className="ml-2 h-3 w-3" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
