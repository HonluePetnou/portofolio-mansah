"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { useLanguage } from "@/context/language-context";
import {
  Code,
  Brain,
  Users,
  Search,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";

const strengths = [
  {
    icon: Code,
    title: {
      EN: "Technical Leadership",
      FR: "Leadership Technique",
    },
    description: {
      EN: "Guiding projects and teams through complex technical challenges with clarity and confidence.",
      FR: "Guider les projets et les équipes à travers des défis techniques complexes avec clarté et confiance.",
    },
  },
  {
    icon: Brain,
    title: {
      EN: "Product Thinking",
      FR: "Esprit Produit",
    },
    description: {
      EN: "Aligning technical decisions with user needs and business value.",
      FR: "Aligner les décisions techniques avec les besoins des utilisateurs et la valeur produit.",
    },
  },
  {
    icon: ShieldCheck,
    title: {
      EN: "Security & Quality",
      FR: "Sécurité & Qualité",
    },
    description: {
      EN: "Integrating cybersecurity, network defense, and QA testing early in the cycle.",
      FR: "Intégrer la cybersécurité, la défense réseau et les tests QA très tôt dans le cycle.",
    },
  },
  {
    icon: LayoutTemplate,
    title: {
      EN: "Multiplatform Architecture",
      FR: "Architecture Multiplateforme",
    },
    description: {
      EN: "Designing systems spanning web, mobile, desktop, and robust backends.",
      FR: "Conception de systèmes couvrant le web, le mobile, le bureau et des backends robustes.",
    },
  },
  {
    icon: Search,
    title: {
      EN: "Solution Finder",
      FR: "Trouveur de Solutions",
    },
    description: {
      EN: "Breaking down complex problems into solvable components with an analytical, generalist mindset.",
      FR: "Décomposer des problèmes complexes en éléments résolubles avec un esprit analytique et généraliste.",
    },
  },
  {
    icon: Users,
    title: {
      EN: "Bilingual & Global",
      FR: "Bilingue & Global",
    },
    description: {
      EN: "Bridging the gap between engineering, clients, and partners across borders.",
      FR: "Faire le pont entre l'ingénierie, les clients et les partenaires au-delà des frontières.",
    },
  },
];

export function Strengths() {
  const { lang } = useLanguage();

  return (
    <div className="mt-20">
      <h2 className="mb-10 text-3xl font-bold text-foreground text-center">
        {lang === "FR" ? "Forces Personnelles" : "Personal Strengths"}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {strengths.map((item, index) => (
          <GlassCard
            key={index}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="mb-4 p-3 rounded-full bg-brand-primary/5 dark:bg-white/5 text-brand-primary dark:text-brand-accent">
              <item.icon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{item.title[lang]}</h3>
            <p className="text-muted-foreground dark:text-gray-400 text-sm">{item.description[lang]}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

