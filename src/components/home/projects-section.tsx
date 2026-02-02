"use client";

import { motion } from "framer-motion";
import { ProjectCard, ProjectData } from "@/components/projects/project-card";
import { FadeUp, StaggerContainer } from "@/lib/animations";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featuredProjects: ProjectData[] = [
  {
    title: "OneControl",
    description:
      "AI-integrated hackathon project optimizing resource management.",
    image: "/onecontrol.png",
    slug: "onecontrol",
    stack: ["Gemini AI", "Next.js", "Python"],
    highlightedStack: "Gemini AI",
  },
  {
    title: "Feedly",
    description:
      "Health analytics application for personalized nutrition tracking.",
    image: "/feedly.png",
    slug: "feedly",
    stack: ["FastAPI", "Python", "React", "PostgreSQL"],
    highlightedStack: "PostgreSQL",
  },
  {
    title: "Tech Portfolio Directory",
    description: "Aggregator for tech portfolios with advanced filtering.",
    image: "/foliofy.png",
    slug: "tech-portfolio-directory",
    stack: ["Next.js", "Firebase", "Puppeteer", "Tailwind CSS"],
    highlightedStack: "Firebase",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 scroll-mt-12 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Featured <span className="text-neon-blue">Projects</span>
          </h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
            Case studies in reliability and impact
          </p>

          <motion.div
            variants={StaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.title} variants={FadeUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <Link href="/projects">
              <button className="group flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-gray-900 dark:text-white font-medium backdrop-blur-sm">
                View All Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
