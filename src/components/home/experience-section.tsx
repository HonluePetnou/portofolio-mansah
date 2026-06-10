"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { experiences as staticExperiences } from "@/data/experience";

interface ExperienceSectionProps {
  experiences?: any[];
}

export function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  const { lang, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  
  const activeExperiences = experiences.length > 0 ? experiences : staticExperiences;
  
  // Show only 3 by default, unless toggled
  const visibleExperiences = showAll ? activeExperiences : activeExperiences.slice(0, 3);

  return (
    <section id="experience" className="section-py gap-y-md scroll-mt-20 overflow-hidden">
      <div className="container">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            {t("experience.title")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {lang === "FR" ? "Parcours Professionnel" : "Professional Experience"}
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            {lang === "FR"
              ? "Mon parcours dans la création de produits numériques fiables."
              : "My journey in building reliable digital products."}
          </p>
        </div>

        <motion.div layout className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleExperiences.map((exp, index) => (
              <motion.div
                key={exp._id || `${exp.company}-${exp.role.EN}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-brand-primary/10 dark:bg-brand-accent/10 text-brand-primary dark:text-brand-accent shrink-0">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-foreground">
                          {exp.role[lang]}
                        </h3>
                        <p className="text-brand-primary dark:text-brand-accent font-semibold text-sm mt-1">
                          {exp.company}
                        </p>
                        <p className="text-muted-foreground dark:text-gray-400 text-xs mt-2 leading-relaxed">
                          {exp.description[lang]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground dark:text-gray-400 bg-gray-50 dark:bg-brand-dark/50 border border-gray-200/50 dark:border-white/5 px-3.5 py-1.5 rounded-full w-fit shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period[lang]}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground dark:text-gray-300 ml-0 md:ml-16 mt-4 text-left">
                    {((exp.achievements?.[lang] || []) as string[]).map((item: string, i: number) => (
                      <li key={i} className="text-xs leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {activeExperiences.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-card-bg-alt hover:bg-gray-50 dark:hover:bg-[#222033] transition-all text-foreground font-bold text-xs tracking-wider uppercase shadow-sm"
            >
              {showAll ? (
                <>
                  {lang === "FR" ? "Voir moins" : "Show Less"}
                  <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  {lang === "FR" ? "Voir plus" : "Show More"}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

