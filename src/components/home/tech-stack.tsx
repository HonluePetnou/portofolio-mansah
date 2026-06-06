"use client";

import { motion } from "framer-motion";
import { Code2, ShieldCheck, Cpu, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const services = [
  {
    title: "Frontend Architecture",
    description:
      "Interactive, responsive UIs built with modular components and clean code structure — from design system to production.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: Code2,
    highlight: true,
    href: "/projects",
  },
  {
    title: "QA & Automation",
    description:
      "Flawless product quality through BDD, Playwright end-to-end flows, and robust testing suites. Zero regressions.",
    techs: ["Cucumber", "Playwright", "Jest", "CI/CD"],
    icon: ShieldCheck,
    highlight: false,
    href: "/projects",
  },
  {
    title: "Full Stack & AI",
    description:
      "Robust backend APIs and advanced AI integrations using Gemini LLMs to solve real business problems at scale.",
    techs: ["FastAPI", "Python", "Spring Boot", "Gemini AI"],
    icon: Cpu,
    highlight: false,
    href: "/projects",
  },
  {
    title: "Tech Consulting",
    description:
      "Code reviews, architecture audits, and technical strategy sessions to align your engineering with business goals.",
    techs: ["Architecture", "Code Review", "Strategy", "Mentoring"],
    icon: Lightbulb,
    highlight: false,
    href: "/#contact",
  },
];

export function TechStack() {
  return (
    <section id="services" className="section-py scroll-mt-20 overflow-hidden bg-transparent">
      <div className="container">

        {/* ── Bento grid container ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-white/8 bg-white dark:bg-card-bg shadow-sm dark:shadow-2xl"
        >
          {/* Inner grid: [header] [2×2 cards] */}
          <div className="grid lg:grid-cols-[1fr_1fr_1fr]">

            {/* ── Left: Header cell (spans 2 rows on desktop) ── */}
            <div className="lg:row-span-2 flex flex-col justify-center p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/8">
              <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
                SERVICES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-5">
                What I Do.{" "}
                <span className="text-brand-primary dark:text-brand-accent">
                  How I Deliver.
                </span>
              </h2>
              <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
                Engineering best practices fused with a product-first mindset — every line of code ships value.
              </p>
              <Link href="/#contact">
                <button className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-primary text-white font-bold text-xs tracking-wider uppercase hover:bg-brand-primary/90 transition-all shadow-[0_4px_14px_rgba(94,80,249,0.3)] w-fit">
                  Work with me
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

            {/* ── 4 service cards in a 2×2 grid (right side) ── */}
            {services.map((service, index) => {
              const Icon = service.icon;
              // border positions for the 2×2 sub-grid
              const isTopRow = index < 2;
              const isLeftCol = index % 2 === 0;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "group relative flex flex-col justify-between p-8 transition-all duration-300 cursor-pointer",
                    // Borders between cells
                    isTopRow && "border-b border-gray-200 dark:border-white/8",
                    isLeftCol && "border-r border-gray-200 dark:border-white/8",
                    // Highlighted card style
                    service.highlight
                      ? "bg-[#09090b] dark:bg-brand-primary/20"
                      : "hover:bg-gray-50/70 dark:hover:bg-white/[0.02]"
                  )}
                >
                  {/* Icon */}
                  <div>
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center mb-5",
                        service.highlight
                          ? "bg-white/10 text-white"
                          : "bg-brand-primary/8 dark:bg-brand-primary/15 text-brand-primary dark:text-brand-accent"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "text-base font-bold mb-2 leading-snug",
                        service.highlight
                          ? "text-white"
                          : "text-foreground"
                      )}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-xs leading-relaxed mb-5",
                        service.highlight
                          ? "text-gray-400"
                          : "text-muted-foreground dark:text-gray-400"
                      )}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Learn more link */}
                  <Link
                    href={service.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase transition-all",
                      service.highlight
                        ? "text-brand-accent hover:text-white"
                        : "text-brand-primary dark:text-brand-accent hover:gap-2.5"
                    )}
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}

          </div>
        </motion.div>

      </div>
    </section>
  );
}
