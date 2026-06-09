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
        ? "Frédéric Armel Petnou est un ingénieur junior orienté produit et trouveur de solutions. Actuellement en cursus d'ingénieur à l'ENSPD (Niveau 4), il conçoit des architectures logicielles de bout en bout (web, mobile, desktop) tout en intégrant des systèmes de réseaux, de cybersécurité et de design."
        : "Frédéric Armel Petnou is a product-oriented Junior Engineer and Solution Finder. Currently pursuing an engineering degree at ENSPD (Level 4), he designs end-to-end software architectures (web, mobile, desktop) while integrating networking, cybersecurity, and product design.",
      items: [
        {
          title: lang === "FR" ? "Cursus Ingénieur ENSPD" : "Engineering at ENSPD",
          desc: lang === "FR" 
            ? "Bases approfondies en algorithmes, architecture système, routage réseau et conception logicielle modulaire."
            : "Deep foundations in algorithms, system architecture, network routing, and modular software design.",
        },
        {
          title: lang === "FR" ? "Collaboration Globale" : "Global Collaboration",
          desc: lang === "FR"
            ? "Livraison de solutions logicielles multiplateformes robustes et d'infrastructures pour des clients du monde entier."
            : "Shipping robust multiplatform software solutions and infrastructures for clients worldwide.",
        },
      ],
    },
    values: {
      bio: lang === "FR"
        ? "Le code n'est qu'un outil ; l'objectif est de livrer une valeur réelle et la satisfaction des utilisateurs. Frédéric opère selon le principe que la sécurité, la fiabilité et les tests font partie intégrante du cycle de vie du produit."
        : "Code is just a tool; the goal is to deliver actual business value and user satisfaction. Frédéric operates on the principle that security, reliability, and testing are integral parts of the product lifecycle.",
      items: [
        {
          title: lang === "FR" ? "Tests & Automatisation QA" : "Testing & QA Automation",
          desc: lang === "FR"
            ? "Garantir des systèmes fiables sans régression grâce au BDD, Playwright et Cucumber."
            : "Ensuring reliable, regression-free systems using BDD, Playwright, and Cucumber.",
        },
        {
          title: lang === "FR" ? "Sécurité & Maintenabilité" : "Security & Maintainability",
          desc: lang === "FR"
            ? "Application des meilleures pratiques de cybersécurité, de code propre et de réduction de la dette technique."
            : "Applying cybersecurity best practices, clean code patterns, and minimizing technical debt.",
        },
      ],
    },
    focus: {
      bio: lang === "FR"
        ? "Maîtriser l'ensemble de la chaîne de valeur technologique : du développement applicatif multiplateforme aux infrastructures réseaux Cisco et à la cybersécurité."
        : "Mastering the entire technological value chain: from multiplatform application development to Cisco network infrastructures and cybersecurity.",
      items: [
        {
          title: lang === "FR" ? "Architecture Multiplateforme" : "Multiplatform Architecture",
          desc: lang === "FR"
            ? "Conception de solutions web, mobiles (React Native/Expo), de bureau (Electron/Java EE) et backend (NestJS/FastAPI)."
            : "Designing web, mobile (React Native/Expo), desktop (Electron/Java EE), and backend (NestJS/FastAPI) solutions.",
        },
        {
          title: lang === "FR" ? "Réseaux & Cybersécurité" : "Networks & Cybersecurity",
          desc: lang === "FR"
            ? "Configuration d'architectures réseau sécurisées (Cisco CCNA), audits de vulnérabilités et intégrations IA."
            : "Configuring secure network architectures (Cisco CCNA), vulnerability auditing, and AI integrations.",
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
                src="/me1.png"
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
