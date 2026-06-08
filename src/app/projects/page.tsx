import { ProjectsClientPage } from "./projects-client";
import { Metadata } from "next";
import { getProjects } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Projects | Mansah - Honlue Petnou Frederic Armel",
  description:
    "Case studies of my work in Frontend Engineering, QA, and Product Development by Mansah (Honlue Petnou Frederic Armel).",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClientPage projects={projects} />;
}
