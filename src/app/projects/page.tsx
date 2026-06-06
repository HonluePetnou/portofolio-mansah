import { ProjectsClientPage } from "./projects-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Mansah - Honlue Petnou Frederic Armel",
  description:
    "Case studies of my work in Frontend Engineering, QA, and Product Development by Mansah (Honlue Petnou Frederic Armel).",
};

export default function ProjectsPage() {
  return <ProjectsClientPage />;
}
