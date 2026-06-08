"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import { FadeUp, StaggerContainer } from "@/lib/animations";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projects";

import { useLanguage } from "@/context/language-context";

interface ProjectsSectionProps {
  projects?: any[];
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const { lang, t } = useLanguage();
  
  const activeProjects = projects.length > 0 ? projects : projectsData;
  const featuredProjects = activeProjects.slice(0, 3);

  return (
    <section id="projects" className="section-py gap-y-md scroll-mt-20 overflow-hidden bg-brand-alt border-t border-b border-gray-100/50 dark:border-white/5">
      <div className="container">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            {lang === "FR" ? "PORTFOLIO" : "PORTFOLIO"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {lang === "FR" ? "Projets Sélectionnés" : "Selected Works"}
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            {lang === "FR"
              ? "Études de cas sur la fiabilité et l'impact de l'ingénierie logicielle."
              : "Case studies in software engineering reliability and impact."}
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={StaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.title} variants={FadeUp}>
              <ProjectCard project={project} isAlt={true} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link href="/projects">
            <button className="group flex items-center gap-2 px-6 py-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-card-bg-alt hover:bg-gray-50 dark:hover:bg-[#222033] transition-all text-foreground font-bold text-xs tracking-wider uppercase">
              {lang === "FR" ? "Voir tous les projets" : "View All Projects"}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
