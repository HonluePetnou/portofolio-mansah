"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink, Mail, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/projects/project-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useLanguage } from "@/context/language-context";
import { projectsData, ProjectData } from "@/data/projects";
import { urlFor } from "@/sanity/lib/image";

interface ProjectsClientPageProps {
  projects?: any[];
}

export function ProjectsClientPage({ projects = [] }: ProjectsClientPageProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    { id: "All", label: t("works.all") },
    { id: "AI & Full Stack", label: t("works.ai") },
    { id: "Frontend / Web", label: t("works.frontend") },
  ];

  const activeProjects = projects.length > 0 ? projects : projectsData;

  // Find the featured project (OneControl)
  const featuredProject = activeProjects.find((p) => p.slug === "one-control") || activeProjects[0];

  // Filter projects based on active tab
  const filteredProjects = activeTab === "All"
    ? activeProjects
    : activeProjects.filter((p) => p.category === activeTab);

  return (
    <div className="container section-py space-y-16">
      
      {/* Header and Breadcrumbs */}
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: lang === "FR" ? "Projets" : "Projects", href: "/projects" }]} />
        
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            {lang === "FR" ? "ÉTUDES DE CAS" : "CASE STUDIES"}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {lang === "FR" ? "Projets Sélectionnés" : "Selected Work"}
          </h1>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 text-sm leading-relaxed">
            {lang === "FR"
              ? "Une plongée dans les design systems, les architectures full-stack, les pipelines d'automatisation QA et les intégrations d'IA générative."
              : "A deep dive into design systems, full-stack architectures, QA automation pipelines, and generative AI integrations."}
          </p>
        </div>
      </div>

      {/* Flagship Featured Project Card */}
      {featuredProject && (
        <div className="space-y-6">
          <h3 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
            {lang === "FR" ? "Étude de Cas Phare" : "Featured Case Study"}
          </h3>
          <div className="grid lg:grid-cols-[1.2fr_1fr] rounded-3xl overflow-hidden border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-card-bg backdrop-blur-sm shadow-md dark:shadow-xl group">
            
            {/* Image Section */}
            <div className="relative aspect-[16/10] lg:aspect-auto min-h-[260px] lg:min-h-[380px] w-full bg-gray-100 dark:bg-brand-dark/50 overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-200/50 dark:border-white/5">
              {featuredProject.image ? (
                <Image
                  src={typeof featuredProject.image === 'object' ? urlFor(featuredProject.image).url() : featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                  <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-current" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Floating tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-brand-primary text-white border border-brand-primary/20 shadow-md">
                  {lang === "FR" ? "Projet Phare" : "Flagship Project"}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4 text-left">
                <div className="text-xs font-bold tracking-wider uppercase text-brand-primary dark:text-brand-accent">
                  {featuredProject.category}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {featuredProject.title}
                </h2>
                <p className="text-muted-foreground dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                  {featuredProject.description[lang]}
                </p>

                {/* Key Metrics Grid */}
                {featuredProject.metrics && (
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {((featuredProject.metrics || []) as any[]).map((metric: any) => (
                      <div key={metric.label?.EN || metric.label} className="p-3.5 rounded-xl border border-gray-200/40 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md">
                        <div className="text-2xl font-extrabold text-brand-primary dark:text-brand-accent">
                          {metric.value}
                        </div>
                        <div className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground mt-0.5">
                          {metric.label[lang]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer row of Featured Card */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200/40 dark:border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {((featuredProject.stack || []) as string[]).map((tech: string) => (
                    <span
                      key={tech}
                      className={cn(
                        "text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border",
                        tech === featuredProject.highlightedStack
                          ? "bg-brand-accent/10 dark:bg-brand-accent/15 border-brand-accent/20 dark:border-brand-accent/30 text-brand-primary dark:text-brand-accent"
                          : "bg-brand-primary/10 dark:bg-brand-primary/15 border-brand-primary/20 dark:border-brand-primary/30 text-brand-primary"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {featuredProject.repoUrl && (
                    <a
                      href={featuredProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-gray-200 dark:border-white/10 text-foreground hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      title="View Source Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {featuredProject.demoUrl && (
                    <a
                      href={featuredProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-gray-200 dark:border-white/10 text-foreground hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      title="Launch Project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <Link href={`/projects/${featuredProject.slug}`}>
                    <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-primary text-white font-bold text-xs tracking-wider uppercase hover:bg-brand-primary/90 transition-all shadow-[0_4px_14px_rgba(94,80,249,0.25)]">
                      {lang === "FR" ? "Étude de Cas" : "Case Study"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs & Grid Section */}
      <div className="space-y-8 pt-8 border-t border-gray-200/50 dark:border-white/5">
        
        {/* Title and Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-xl font-bold tracking-tight text-foreground text-left">
            {lang === "FR" ? "Tous les Projets" : "All Projects"}
          </h3>

          {/* Animated Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-brand-dark/40 backdrop-blur-md w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-300",
                  activeTab === cat.id
                    ? "text-brand-primary dark:text-brand-accent bg-white dark:bg-card-bg shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid Container with Fade Animations */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} isAlt={false} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
