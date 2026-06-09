"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { useLanguage } from "@/context/language-context";
import { educationList, awardsList } from "@/data/experience";
import { GraduationCap, Award, ShieldCheck } from "lucide-react";

export function EducationAndCertifications() {
  const { lang } = useLanguage();

  return (
    <div className="mt-20">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Education */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-brand-primary dark:text-brand-accent" />
            {lang === "FR" ? "Éducation & Cursus" : "Education & Cursus"}
          </h2>
          <div className="space-y-4">
            {educationList.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-left">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-bold text-lg text-foreground">{edu.school}</h3>
                    <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {edu.period[lang]}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-brand-primary dark:text-brand-accent">
                    {edu.degree[lang]}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400 mt-2">
                    {edu.field[lang]}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications & Badges */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Award className="h-6 w-6 text-brand-primary dark:text-brand-accent" />
            {lang === "FR" ? "Certifications & Badges" : "Certifications & Badges"}
          </h2>
          <div className="space-y-4">
            {awardsList.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-left flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-brand-primary/10 dark:bg-brand-accent/10 text-brand-primary dark:text-brand-accent shrink-0 mt-0.5">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <h3 className="font-bold text-sm text-foreground">{award.result[lang]}</h3>
                      <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {award.date}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">
                      {award.event}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
