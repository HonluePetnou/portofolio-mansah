import { BlogClientPage } from "./blog-client";
import { Metadata } from "next";
import { getBlogPosts } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Blog | Mansah - Honlue Petnou Frederic Armel",
  description:
    "Insights on Software Engineering, Networks, Cybersecurity, and Product Mindset by Mansah (Honlue Petnou Frederic Armel).",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogClientPage posts={posts} />;
}
