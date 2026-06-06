import { BlogClientPage } from "./blog-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Mansah - Honlue Petnou Frederic Armel",
  description:
    "Insights on Quality Assurance, Frontend Engineering, and Product Mindset by Mansah (Honlue Petnou Frederic Armel).",
};

export default function BlogPage() {
  return <BlogClientPage />;
}
