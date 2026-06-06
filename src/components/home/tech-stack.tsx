"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, ShieldCheck, Cpu } from "lucide-react";

const services = [
  {
    title: "Frontend Architecture",
    description: "Designing and building interactive, responsive, and high-performance user interfaces with modular components and clean code structure.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: Code2,
    highlight: false,
  },
  {
    title: "QA & Automation",
    description: "Ensuring flawless product quality and reliability through behavior-driven development (BDD), automated end-to-end flows, and robust testing suites.",
    techs: ["Cucumber", "Playwright", "Jest", "CI/CD Pipeline"],
    icon: ShieldCheck,
    highlight: true, // Highlighted card
  },
  {
    title: "Full Stack & AI Integrations",
    description: "Developing robust backend APIs, server-side code, and integrating advanced AI features like Gemini LLMs to solve complex business cases.",
    techs: ["FastAPI", "Python", "Spring Boot", "Gemini AI"],
    icon: Cpu,
    highlight: false,
  },
];

export function TechStack() {
  return (
    <section id="services" className="section-py gap-y-lg scroll-mt-20 overflow-hidden bg-transparent">
      <div className="container">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            SERVICES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Making Magic Happen for Your Product
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Combining engineering best practices with a product-first mindset to deliver high-impact results.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid gap-8 md:grid-cols-3 mx-auto max-w-6xl items-stretch">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div
                  className={cn(
                    "relative h-full rounded-2xl p-8 transition-all duration-300 bg-white dark:bg-card-bg border flex flex-col justify-between",
                    service.highlight
                      ? "border-brand-primary dark:border-brand-accent shadow-[0_10px_30px_rgba(94,80,249,0.08)] dark:shadow-[0_4px_30px_rgba(57,255,20,0.1)] scale-105 md:scale-105 z-10"
                      : "border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 shadow-sm dark:shadow-md"
                  )}
                >
                  <div>
                    {/* Icon */}
                    <div
                      className={cn(
                        "p-3 rounded-lg w-fit mb-6",
                        service.highlight
                          ? "bg-brand-primary/10 dark:bg-brand-accent/10 text-brand-primary dark:text-brand-accent"
                          : "bg-brand-primary/10 text-brand-primary"
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-4 text-left">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground dark:text-gray-400 text-xs leading-relaxed text-left mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                    {service.techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full bg-gray-50 dark:bg-brand-dark/60 border border-gray-200/50 dark:border-white/5 text-gray-600 dark:text-gray-300 text-[10px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
