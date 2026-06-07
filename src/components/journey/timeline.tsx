"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { experiences } from "@/data/experience";

export function Timeline() {
  return (
    <div className="mt-20">
      <h2 className="mb-10 text-3xl font-bold text-foreground text-center">
        Professional Journey
      </h2>
      <div className="relative border-l border-gray-200 dark:border-white/10 ml-4 md:ml-10 pl-8 md:pl-12 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-[45px] md:-left-[61px] top-6 h-6 w-6 rounded-full border-4 border-white dark:border-brand-dark bg-brand-primary dark:bg-brand-accent shadow-[0_0_10px_rgba(94,80,249,0.3)] dark:shadow-[0_0_10px_rgba(57,255,20,0.5)]" />

            <GlassCard className="p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-brand-primary font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-full w-fit">
                  {exp.period}
                </span>
              </div>
              <p className="text-muted-foreground dark:text-gray-300 mb-4">{exp.description}</p>
              <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground dark:text-gray-400">
                {exp.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
