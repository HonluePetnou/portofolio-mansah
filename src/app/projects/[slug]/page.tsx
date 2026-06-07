import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { ProjectDetailsClient } from "./project-details-client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} Case Study | Mansah` : "Project Details",
    description: project?.description?.EN || "Technical case study details.",
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient slug={slug} />;
}
