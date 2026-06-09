"use client";

import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { urlFor } from "@/sanity/lib/image";
import { ProjectData } from "@/data/projects";
import { Star, Download, Shield, ExternalLink, Github, ThumbsUp, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlayStoreLayoutProps {
  project: any;
}

export function PlayStoreLayout({ project }: PlayStoreLayoutProps) {
  const { lang } = useLanguage();

  // Extract URLs
  const mainImageUrl = project.image && typeof project.image === 'object'
    ? urlFor(project.image).url()
    : project.image || null;

  const appIconUrl = project.playstoreIcon && typeof project.playstoreIcon === 'object'
    ? urlFor(project.playstoreIcon).url()
    : mainImageUrl; // Fallback to main project image

  // Ratings calculation & fallback reviews
  const rating = project.ratingValue || 4.8;
  const ratingText = project.ratingCount || (lang === "FR" ? "1,200 avis" : "1,200 reviews");
  
  const reviewsList = (project.playStoreReviews && project.playStoreReviews.length > 0)
    ? project.playStoreReviews
    : [
        {
          name: "Alexandre Dupont",
          rating: 5,
          date: "2026-05-15",
          comment: {
            FR: "Une réalisation technique impeccable. La fluidité de l'interface et l'optimisation des requêtes sont impressionnantes !",
            EN: "An impeccable technical realization. The interface fluidity and query optimization are impressive!"
          }
        },
        {
          name: "Sarah Jenkins",
          rating: 5,
          date: "2026-04-20",
          comment: {
            FR: "Superbe outil d'intégration. Très robuste en production et facile à prendre en main.",
            EN: "Superb integration tool. Very robust in production and easy to get started with."
          }
        },
        {
          name: "Marc-André Moreau",
          rating: 4,
          date: "2026-03-08",
          comment: {
            FR: "Très bon travail sur l'architecture générale. J'ai hâte de voir les futures mises à jour !",
            EN: "Very good work on the general architecture. Looking forward to future updates!"
          }
        }
      ];

  // Helper to render stars
  const renderStars = (num: number, size = 12, colorClass = "text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400") => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "inline-block",
          i < Math.round(num) ? colorClass : "text-gray-300 dark:text-gray-700 fill-transparent"
        )}
        style={{ width: size, height: size }}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 py-8 text-left text-foreground">
      
      {/* App Header Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pb-8 border-b border-gray-100 dark:border-white/5">
        <div className="flex gap-5 items-center">
          
          {/* App Icon */}
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-white/5 bg-white dark:bg-brand-dark flex-shrink-0">
            {appIconUrl ? (
              <Image
                src={appIconUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-primary/10 text-brand-primary">
                <span className="text-2xl font-bold">{project.title.substring(0, 2).toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Title and Dev info */}
          <div className="space-y-1 sm:space-y-1.5 text-left">
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
              {project.title}
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm hover:underline cursor-pointer">
              {project.developerName || "Mansah"}
            </p>
            <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
              <span>{project.category}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{lang === "FR" ? "Contient des démos" : "Contains demos"}</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-sm"
            >
              {lang === "FR" ? "Installer" : "Install"}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-foreground hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Play Store Info Bar */}
      <div className="flex items-center justify-between py-6 overflow-x-auto gap-4 border-b border-gray-100 dark:border-white/5 no-scrollbar scroll-smooth">
        
        {/* Rating Column */}
        <div className="flex flex-col items-center flex-1 min-w-[70px] text-center border-r border-gray-100 dark:border-white/5 last:border-0">
          <div className="flex items-center gap-0.5 text-sm sm:text-base font-bold text-foreground">
            <span>{rating}</span>
            <Star className="w-3.5 h-3.5 fill-current text-foreground" />
          </div>
          <span className="text-[10px] text-muted-foreground mt-1 whitespace-nowrap">{ratingText}</span>
        </div>

        {/* Download Size Column */}
        <div className="flex flex-col items-center flex-1 min-w-[70px] text-center border-r border-gray-100 dark:border-white/5 last:border-0">
          <Download className="w-4 h-4 text-foreground" />
          <span className="text-xs sm:text-sm font-bold text-foreground mt-1">{project.downloadSize || "15 MB"}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">
            {lang === "FR" ? "Taille" : "Size"}
          </span>
        </div>

        {/* PEGI Content Rating Column */}
        <div className="flex flex-col items-center flex-1 min-w-[70px] text-center border-r border-gray-100 dark:border-white/5 last:border-0">
          <Shield className="w-4 h-4 text-foreground" />
          <span className="text-xs sm:text-sm font-bold text-foreground mt-1">{project.contentRating || "PEGI 3"}</span>
          <span className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">
            {lang === "FR" ? "Tout public" : "Rated for 3+"}
          </span>
        </div>

        {/* Total Downloads Column */}
        <div className="flex flex-col items-center flex-1 min-w-[70px] text-center last:border-0">
          <span className="text-xs sm:text-sm font-bold text-foreground">{project.downloads || "10K+"}</span>
          <span className="text-[10px] text-muted-foreground mt-1.5 whitespace-nowrap">
            {lang === "FR" ? "Téléchargements" : "Downloads"}
          </span>
        </div>

      </div>

      {/* Screenshot Gallery Slider */}
      <div className="py-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          {lang === "FR" ? "Captures d'écran" : "Screenshots"}
        </h3>
        
        {project.screenshots && project.screenshots.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/5 scrollbar-track-transparent snap-x">
            {project.screenshots.map((screen: any, idx: number) => {
              const url = typeof screen === 'object' ? urlFor(screen).url() : screen;
              return (
                <div 
                  key={idx} 
                  className="relative flex-shrink-0 aspect-[16/10] w-[280px] sm:w-[420px] rounded-xl overflow-hidden border border-gray-200/40 dark:border-white/5 bg-gray-100 dark:bg-white/5 snap-start shadow-sm hover:shadow-md transition-shadow"
                >
                  <Image
                    src={url}
                    alt={`Screenshot ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        ) : mainImageUrl ? (
          // Fallback to one main image styled inside a laptop/mobile frame
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 bg-gray-100 dark:bg-white/5 shadow-md">
            <Image
              src={mainImageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-48 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center text-muted-foreground">
            {lang === "FR" ? "Aucune capture disponible" : "No screenshots available"}
          </div>
        )}
      </div>

      {/* About this app */}
      <div className="py-8 border-t border-gray-100 dark:border-white/5 text-left">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            {lang === "FR" ? "À propos de cette application" : "About this app"}
          </h2>
        </div>
        
        <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed whitespace-pre-line mb-6">
          {project.description[lang]}
        </p>

        {/* Case Study Details Embedded inside About section */}
        <div className="space-y-6 bg-gray-50/50 dark:bg-[#1C1C21] p-6 rounded-2xl border border-gray-200/30 dark:border-white/[0.02] mb-8">
          {project.challenge && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {lang === "FR" ? "Le Défi" : "The Challenge"}
              </h4>
              <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">
                {project.challenge[lang]}
              </p>
            </div>
          )}
          {project.strategy && (
            <div className="space-y-2 pt-4 border-t border-gray-200/40 dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {lang === "FR" ? "Stratégie & Architecture" : "Strategy & Architecture"}
              </h4>
              <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">
                {project.strategy[lang]}
              </p>
            </div>
          )}
          {project.impact && (
            <div className="space-y-2 pt-4 border-t border-gray-200/40 dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {lang === "FR" ? "Impact Réel" : "Real-world Impact"}
              </h4>
              <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">
                {project.impact[lang]}
              </p>
            </div>
          )}
        </div>

        {/* Tech Stack represented as play store category badges */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {lang === "FR" ? "Technologies & Compétences" : "Skills & Technologies"}
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className={cn(
                  "text-[10px] font-bold px-3 py-1 rounded-full border bg-gray-50 dark:bg-white/5 border-gray-200/60 dark:border-white/5 text-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-500/30 transition-all cursor-pointer"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* What's new changelog */}
      {project.whatsNew && (
        <div className="py-8 border-t border-gray-100 dark:border-white/5 text-left">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
            {lang === "FR" ? "Nouveautés" : "What's new"}
          </h2>
          <span className="text-[10px] text-muted-foreground">
            {lang === "FR" ? `Version ${project.version || "1.0.0"}` : `Version ${project.version || "1.0.0"}`}
          </span>
          <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed mt-3 whitespace-pre-line">
            {project.whatsNew[lang]}
          </p>
        </div>
      )}

      {/* Ratings & reviews section */}
      <div className="py-8 border-t border-gray-100 dark:border-white/5 text-left">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
          {lang === "FR" ? "Notes et avis" : "Ratings and reviews"}
        </h2>
        
        {/* Rating Breakdown card */}
        <div className="flex flex-col sm:flex-row gap-6 items-center bg-gray-50/50 dark:bg-[#1C1C21] p-6 rounded-2xl border border-gray-200/30 dark:border-white/[0.02] mb-8">
          <div className="text-center sm:text-left sm:pr-8 sm:border-r border-gray-200/40 dark:border-white/5">
            <span className="text-4xl sm:text-5xl font-extrabold text-foreground">{rating}</span>
            <div className="flex gap-0.5 mt-2 justify-center sm:justify-start">
              {renderStars(rating, 14)}
            </div>
            <p className="text-xs text-muted-foreground mt-2 whitespace-nowrap">{ratingText}</p>
          </div>

          {/* Progress Bars (5 to 1 Stars) */}
          <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              // Simulated weight percentage
              const percent = stars === 5 ? "75%" : stars === 4 ? "15%" : stars === 3 ? "7%" : "2%";
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-2 text-right">{stars}</span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full" style={{ width: percent }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Individual Comments List */}
        <div className="space-y-6">
          {reviewsList.map((review: any, idx: number) => {
            const avatarUrl = review.avatar && typeof review.avatar === 'object'
              ? urlFor(review.avatar).url()
              : null;
            const initial = review.name.charAt(0).toUpperCase();

            return (
              <div key={idx} className="space-y-2 border-b border-gray-100 dark:border-white/5 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-emerald-600/10 dark:bg-emerald-400/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                      {avatarUrl ? (
                        <Image src={avatarUrl} alt={review.name} fill className="object-cover" />
                      ) : (
                        <span>{initial}</span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {renderStars(review.rating, 10)}
                  </div>
                </div>

                <div className="pl-11 text-left">
                  <span className="text-[10px] text-muted-foreground">{review.date || "2026-06-08"}</span>
                  <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 leading-relaxed mt-1">
                    {review.comment[lang] || review.comment}
                  </p>
                  
                  {/* Helpful trigger */}
                  <div className="flex items-center gap-4 mt-3 text-muted-foreground text-[10px]">
                    <span>{lang === "FR" ? "Cet avis vous a-t-il été utile ?" : "Was this review helpful?"}</span>
                    <button className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{Math.floor(Math.random() * 20) + 1}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
