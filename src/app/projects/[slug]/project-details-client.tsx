"use client";

import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Server, Layout, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { PlayStoreLayout } from "@/components/projects/playstore-layout";

interface ProjectDetailsClientProps {
  slug: string;
  project?: any;
}

export function ProjectDetailsClient({ slug, project: propProject }: ProjectDetailsClientProps) {
  const { lang, t } = useLanguage();
  const project = propProject || projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container section-py space-y-12">
      
      {/* Back button & Breadcrumbs */}
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { label: lang === "FR" ? "Projets" : "Projects", href: "/projects" },
            { label: project.title, href: `/projects/${project.slug}` },
          ]}
        />

        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          {lang === "FR" ? "Retour aux Projets" : "Back to Projects"}
        </Link>
      </div>

      {project.displayStyle === "playstore" ? (
        <PlayStoreLayout project={project} />
      ) : (
        <>
          {/* Main Header Title */}
          <div className="text-left max-w-3xl space-y-3">
            <div className="text-xs font-bold tracking-wider uppercase text-brand-primary dark:text-brand-accent">
              {project.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {project.title}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400 text-sm md:text-base leading-relaxed">
              {project.description[lang]}
            </p>
          </div>

          {/* Hero Image Block */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-gray-200/50 dark:border-white/5 bg-gray-100 dark:bg-white/5 shadow-md">
            {project.image ? (
              <Image
                src={typeof project.image === 'object' ? urlFor(project.image).url() : project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-current" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Core Case Study Content */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
            
            {/* Left main: Case Study Write-Up */}
            <div className="space-y-10 text-left">
              
              {/* Challenge Section */}
              {project.challenge && (
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
                    {lang === "FR" ? "Le Défi" : "The Challenge"}
                  </h2>
                  <p className="text-muted-foreground dark:text-gray-400 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                    {project.challenge[lang]}
                  </p>
                </section>
              )}

              {/* Strategy Section */}
              {project.strategy && (
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
                    <Server className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
                    {lang === "FR" ? "Stratégie & Architecture" : "Strategy & Architecture"}
                  </h2>
                  <p className="text-muted-foreground dark:text-gray-400 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                    {project.strategy[lang]}
                  </p>
                </section>
              )}

              {/* Impact Section */}
              {project.impact && (
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary dark:text-brand-accent" />
                    {lang === "FR" ? "Impact Réel" : "Real-world Impact"}
                  </h2>
                  <p className="text-muted-foreground dark:text-gray-400 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                    {project.impact[lang]}
                  </p>
                </section>
              )}

            </div>

            {/* Right sidebar: Tech specs & action links */}
            <aside className="space-y-6">
              
              {/* Info Card Container */}
              <div className="p-6 md:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-card-bg backdrop-blur-sm shadow-md space-y-8">
                
                {/* Tech Stack List */}
                <div className="space-y-4">
                  <h3 className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground text-left">
                    {lang === "FR" ? "Stack Technique" : "Tech Stack"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {((project.stack || []) as string[]).map((tech: string) => (
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

                {/* Key Metrics Section */}
                {project.metrics && (
                  <div className="space-y-4 pt-6 border-t border-gray-200/50 dark:border-white/5">
                    <h3 className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground text-left">
                      {lang === "FR" ? "Indicateurs Clés" : "Key Metrics"}
                    </h3>
                    <div className="space-y-3.5">
                      {((project.metrics || []) as any[]).map((metric: any) => (
                        <div key={metric.label?.EN || metric.label} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200/40 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
                          <span className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wide">
                            {metric.label[lang]}
                          </span>
                          <span className="text-base font-extrabold text-brand-primary dark:text-brand-accent">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA action buttons */}
                <div className="space-y-3 pt-6 border-t border-gray-200/50 dark:border-white/5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(94,80,249,0.3)] hover:bg-brand-primary/95 hover:shadow-[0_4px_30px_rgba(94,80,249,0.45)] hover:scale-102"
                    >
                      {lang === "FR" ? "Démo Live" : "Live Demo"} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-foreground font-bold text-xs uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                    >
                      {lang === "FR" ? "Code Source" : "View Repository"} <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
              
            </aside>

          </div>
        </>
      )}

    </div>
  );
}
