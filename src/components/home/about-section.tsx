"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, User, Heart, Cpu, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TabId = "story" | "values" | "focus";

import { useLanguage } from "@/context/language-context";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<TabId>("story");
  const { lang, t } = useLanguage();

  const tabs = [
    { id: "story" as TabId, label: lang === "FR" ? "Mon Histoire" : "My Story", icon: User },
    { id: "focus" as TabId, label: lang === "FR" ? "Focus Technique" : "Tech Focus", icon: Cpu },
    { id: "values" as TabId, label: lang === "FR" ? "Mes Valeurs" : "Core Values", icon: Heart },
  ];

  const tabContent = {
    story: {
      bio: lang === "FR"
        ? "Frédéric Armel Petnou est un ingénieur logiciel orienté produit, alliant expertise technique et culture de la qualité. Actuellement en cursus d'ingénieur à l'ENSPD (2022–2027), il fait le lien entre les fondements de l'informatique et les architectures web modernes."
        : "Frédéric Armel Petnou is a product-oriented software engineer combining technical expertise with a quality-first mindset. Currently pursuing an engineering degree at ENSPD (2022–2027), he bridges core computer science principles with state-of-the-art web architectures.",
      items: [
        {
          title: lang === "FR" ? "Études d'ingénieur à l'ENSPD" : "Engineering at ENSPD",
          desc: lang === "FR" 
            ? "Bases approfondies en informatique, conception de systèmes, algorithmes et architecture modulaire."
            : "Deep computer science foundations in system design, algorithms, and modular architecture.",
        },
        {
          title: lang === "FR" ? "Collaboration Globale" : "Global Collaboration",
          desc: lang === "FR"
            ? "Livraison d'applications React/Next.js réactives et de produits numériques fiables pour des startups du monde entier."
            : "Shipping responsive React/Next.js applications and reliable digital products for startups worldwide.",
        },
      ],
    },
    values: {
      bio: lang === "FR"
        ? "Le code n'est qu'un outil ; l'objectif est de livrer une valeur réelle et la satisfaction des utilisateurs. Frédéric opère selon le principe que la fiabilité et les tests sont des fonctionnalités produit clés, et non des phases post-développement."
        : "Code is just a tool; the goal is to deliver actual business value and user satisfaction. Frédéric operates on the principle that reliability and testing are core product features, not post-development phases.",
      items: [
        {
          title: lang === "FR" ? "Champion du QA & BDD" : "QA & BDD Champion",
          desc: lang === "FR"
            ? "Garantir des bases de code sans régression grâce aux frameworks BDD, Playwright, Jest et Cucumber."
            : "Ensuring zero-regression codebases using BDD frameworks, Playwright, Jest, and Cucumber.",
        },
        {
          title: lang === "FR" ? "Maintenabilité & Code Propre" : "Maintainability & Clean Code",
          desc: lang === "FR"
            ? "Adepte du code auto-documenté, des design patterns solides et de la réduction de la dette technique."
            : "Believer in self-documenting code, solid design patterns, and minimizing technical debt.",
        },
      ],
    },
    focus: {
      bio: lang === "FR"
        ? "Maîtriser la couche d'interface utilisateur tout en conservant de solides compétences full-stack, des API backend aux services cloud et intégrations IA."
        : "Mastering the user interface layer while holding robust full-stack capabilities, from backend APIs and cloud services to advanced machine learning integrations.",
      items: [
        {
          title: lang === "FR" ? "Architecture Frontend" : "Frontend Architecture",
          desc: lang === "FR"
            ? "Conception de composants avancés, mise à l'échelle des layouts et gestion d'état en TypeScript."
            : "Advanced component design, layout scaling, and state management in TypeScript.",
        },
        {
          title: lang === "FR" ? "Intégrations & IA Gemini" : "Integrations & Gemini AI",
          desc: lang === "FR"
            ? "Conception de backends REST/GraphQL sécurisés et automatisation de flux complexes avec les LLM Gemini."
            : "Designing secure REST/GraphQL backends and automating complex workflows using Gemini LLMs.",
        },
      ],
    },
  };

  return (
    <section id="about" className="section-py gap-y-md scroll-mt-20 overflow-hidden bg-brand-alt border-t border-b border-gray-100/50 dark:border-white/5">
      <div className="container">
        <div className="max-w-5xl mx-auto overflow-hidden">
          
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Full-bleed rectangular Image */}
            <div className="lg:col-span-5 relative min-h-[420px] lg:min-h-full overflow-hidden rounded-2xl group">
              {/* Profile Image */}
              <Image
                src="/me-pro.png"
                alt="Frédéric Armel"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
                priority
              />
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start space-y-8 text-left">
              
              {/* Subtitle */}
              <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
                {t("about.title")}
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                {lang === "FR" ? "Qui est Frédéric Armel ?" : "Who is Frédéric Armel?"}
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
                    {lang === "FR" ? "Parlons Ensemble" : "Let's Connect"}
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
