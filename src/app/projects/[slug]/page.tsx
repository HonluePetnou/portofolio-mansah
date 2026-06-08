import { notFound } from "next/navigation";
import { ProjectDetailsClient } from "./project-details-client";
import { Metadata } from "next";
import { getProjects } from "@/sanity/lib/fetch";
import { ProjectData } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p: ProjectData) => p.slug === slug);
  return {
    title: project ? `${project.title} Case Study | Mansah` : "Project Details",
    description: project?.description?.EN || "Technical case study details.",
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p: ProjectData) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient slug={slug} project={project} />;
}
