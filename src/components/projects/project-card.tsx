"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  slug: string;
  stack: string[];
  highlightedStack?: string;
  links?: {
    demo?: string;
    repo?: string;
  };
}

interface ProjectCardProps {
  project: ProjectData;
  isAlt?: boolean;
}

export function ProjectCard({ project, isAlt = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group h-full">
      <div className={cn(
        "flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl",
        isAlt ? "bg-white dark:bg-card-bg-alt" : "bg-white dark:bg-card-bg"
      )}>
        
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full bg-gray-50 dark:bg-[#1C1C21] overflow-hidden border-b border-gray-100 dark:border-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.2)_0%,transparent_60%)] dark:bg-[linear-gradient(to_top,rgba(6,6,8,0.4)_0%,transparent_60%)]" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors text-left">
            {project.title}
          </h3>
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
    </Link>
  );
}
