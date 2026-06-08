import { notFound } from "next/navigation";
import { BlogPostClient } from "./blog-post-client";
import { Metadata } from "next";
import { getBlogPostBySlug, getBlogPosts } from "@/sanity/lib/fetch";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: "Blog Article",
      description: "Technical engineering article.",
    };
  }
  const titleText = typeof post.title === "string" ? post.title : post.title.EN;
  const excerptText = typeof post.excerpt === "string" ? post.excerpt : post.excerpt?.EN || "";
  return {
    title: `${titleText} | Mansah Blog`,
    description: excerptText || "Technical engineering article.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();

  return <BlogPostClient slug={slug} post={post} allPosts={allPosts} />;
}
