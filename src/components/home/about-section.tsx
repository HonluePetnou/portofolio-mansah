"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, User, Heart, Cpu, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TabId = "story" | "values" | "focus";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<TabId>("story");

  const tabs = [
    { id: "story" as TabId, label: "My Story", icon: User },
    { id: "values" as TabId, label: "Core Values", icon: Heart },
    { id: "focus" as TabId, label: "Tech Focus", icon: Cpu },
  ];

  const tabContent = {
    story: {
      bio: "Frédéric Armel (Mansah) is a product-oriented software engineer combining technical expertise with a quality-first mindset. Currently pursuing an engineering degree at ENSPD (2022–2027), he bridges core computer science principles with state-of-the-art web architectures.",
      items: [
        {
          title: "Engineering at ENSPD",
          desc: "Deep computer science foundations in system design, algorithms, and modular architecture.",
        },
        {
          title: "Global Collaboration",
          desc: "Shipping responsive React/Next.js applications and reliable digital products for startups worldwide.",
        },
      ],
    },
    values: {
      bio: "Code is just a tool; the goal is to deliver actual business value and user satisfaction. Frédéric operates on the principle that reliability and testing are core product features, not post-development phases.",
      items: [
        {
          title: "QA & BDD Champion",
          desc: "Ensuring zero-regression codebases using BDD frameworks, Playwright, Jest, and Cucumber.",
        },
        {
          title: "Maintainability & Clean Code",
          desc: "Believer in self-documenting code, solid design patterns, and minimizing technical debt.",
        },
      ],
    },
    focus: {
      bio: "Mastering the user interface layer while holding robust full-stack capabilities, from backend APIs and cloud services to advanced machine learning integrations.",
      items: [
        {
          title: "Frontend Architecture",
          desc: "Advanced component design, layout scaling, and state management in TypeScript.",
        },
        {
          title: "Integrations & Gemini AI",
          desc: "Designing secure REST/GraphQL backends and automating complex workflows using Gemini LLMs.",
        },
      ],
    },
  };

  return (
    <section id="about" className="section-py gap-y-md scroll-mt-20 overflow-hidden bg-brand-alt border-t border-b border-gray-100/50 dark:border-white/5">
      <div className="container">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-card-bg-alt shadow-2xl">
          
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Full-bleed rectangular Image */}
            <div className="lg:col-span-5 relative min-h-[420px] lg:min-h-full overflow-hidden bg-gray-50 dark:bg-brand-dark/40 group">
              {/* Profile Image */}
              <Image
                src="/me.png"
                alt="Frédéric Armel"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
                priority
              />
              
              {/* Subtle Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent lg:from-transparent lg:to-black/30 z-10 pointer-events-none" />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start space-y-8 text-left bg-white dark:bg-card-bg-alt">
              
              {/* Subtitle */}
              <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
                ABOUT ME
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Who is Frédéric Armel?
              </h2>

              {/* Glassmorphic Tab Headers */}
              <div className="flex p-1 gap-1 rounded-xl bg-gray-100/80 dark:bg-brand-dark/40 border border-gray-200/50 dark:border-white/5 backdrop-blur-sm w-full sm:w-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors shrink-0 flex-1 sm:flex-initial",
                        isActive
                          ? "text-brand-primary dark:text-brand-accent bg-white dark:bg-[#1A1A1F] border border-gray-200/50 dark:border-white/10 shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-foreground hover:bg-gray-50/50 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Tab Content with spring transitions */}
              <div className="min-h-[220px] w-full relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Active Tab Biography */}
                    <p className="text-muted-foreground dark:text-gray-400 leading-relaxed text-sm">
                      {tabContent[activeTab].bio}
                    </p>

                    {/* Active Tab List Items */}
                    <div className="grid sm:grid-cols-2 gap-6 pt-2 w-full">
                      {tabContent[activeTab].items.map((item, index) => (
                        <div key={index} className="flex gap-4 items-start text-left">
                          <div className="p-1 rounded bg-brand-primary/5 dark:bg-brand-accent/5 border border-brand-primary/15 dark:border-brand-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-brand-primary dark:text-brand-accent" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                            <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link href="/#contact">
                  <button className="group flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-brand-primary text-white font-bold text-xs tracking-wider uppercase hover:bg-brand-primary/95 transition-all shadow-[0_4px_14px_rgba(94,80,249,0.3)]">
                    Let's Connect
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
