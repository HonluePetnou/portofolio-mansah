import { ProjectsClientPage } from "./projects-client";
import { Metadata } from "next";
import { getProjects } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Projects | Mansah - Honlue Petnou Frederic Armel",
  description:
    "Case studies of my work in Software Engineering, Networks, Cybersecurity, and Product Development by Mansah (Honlue Petnou Frederic Armel).",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClientPage projects={projects} />;
}
