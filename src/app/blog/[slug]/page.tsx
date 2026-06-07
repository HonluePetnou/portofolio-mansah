import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import { BlogPostClient } from "./blog-post-client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title.EN} | Mansah Blog` : "Blog Article",
    description: post?.excerpt?.EN || "Technical engineering article.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient slug={slug} />;
}
