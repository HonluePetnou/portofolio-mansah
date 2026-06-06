"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { ProjectData } from "@/data/projects";

export type { ProjectData };

interface ProjectCardProps {
  project: ProjectData;
  isAlt?: boolean;
}

export function ProjectCard({ project, isAlt = false }: ProjectCardProps) {
  return (
    <div className={cn(
      "flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl group",
      isAlt ? "bg-white dark:bg-card-bg-alt" : "bg-white dark:bg-card-bg"
    )}>
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full bg-gray-50 dark:bg-[#1C1C21] overflow-hidden border-b border-gray-100 dark:border-white/5">
        <Link href={`/projects/${project.slug}`} className="block w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.2)_0%,transparent_60%)] dark:bg-[linear-gradient(to_top,rgba(6,6,8,0.4)_0%,transparent_60%)]" />
        </Link>

        {/* Floating Action Links (Github & Live Demo) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/10 hover:border-white/20 transition-all hover:scale-110"
              title="View Source Code"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-brand-primary hover:bg-brand-primary/90 backdrop-blur-md text-white border border-brand-primary/20 transition-all hover:scale-110"
              title="Live Demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-3">
        <Link href={`/projects/${project.slug}`} className="group/title inline-block w-fit">
          <h3 className="text-xl font-bold text-foreground group-hover/title:text-brand-primary dark:group-hover/title:text-brand-accent transition-colors text-left flex items-center gap-1">
            {project.title}
            <ArrowUpRight className="w-4 h-4 opacity-40 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
          </h3>
        </Link>
        <p className="text-muted-foreground dark:text-gray-400 text-xs leading-relaxed text-left line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={cn(
                "text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border",
                tech === project.highlightedStack
                  ? "bg-brand-accent/10 dark:bg-brand-accent/15 border-brand-accent/20 dark:border-brand-accent/30 text-brand-primary dark:text-brand-accent"
                  : "bg-brand-primary/10 dark:bg-brand-primary/15 border-brand-primary/20 dark:border-brand-primary/30 text-brand-primary"
              )}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
}
