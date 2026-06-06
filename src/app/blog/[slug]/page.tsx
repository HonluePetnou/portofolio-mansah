import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you'd fetch blog data based on params.slug
  const postTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container section-py max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: postTitle, href: `/blog/${params.slug}` },
        ]}
      />

      <div className="mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Insights
        </Link>

        <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Oct 12, 2025
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />5 min read
          </span>
        </div>

        <SectionHeader title={postTitle} className="text-left mb-0" />
      </div>

      <article className="max-w-none">
        <div className="aspect-video w-full rounded-[40px] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-12">
          <span className="text-muted-foreground italic">Article Illustration</span>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          Detailed thoughts on {postTitle} will be presented here. This article
          explores the deep intersections of quality engineering and product
          strategy.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Setting the stage for a discussion on modern engineering practices.
          Why {postTitle} matters in today's rapid-scaling environment.
        </p>

        <div className="p-8 rounded-[32px] bg-brand-primary/5 border border-brand-primary/20 my-10 italic text-muted-foreground dark:text-gray-300">
          "Quality is not an act, it is a habit. When integrated into the
          product lifecycle, it becomes a competitive advantage."
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-4">Core Principles</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Exploring the fundamental pillars that make this approach successful.
          Emphasis on automation, collaboration, and continuous feedback loops.
        </p>
      </article>
    </div>
  );
}
