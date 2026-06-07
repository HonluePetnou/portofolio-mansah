"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "EN" | "FR";

interface LanguageContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// All static translations of the website
export const translations: Record<string, any> = {
  nav: {
    home: { EN: "HOME", FR: "ACCUEIL" },
    about: { EN: "ABOUT", FR: "À PROPOS" },
    services: { EN: "SERVICES", FR: "SERVICES" },
    works: { EN: "WORKS", FR: "PROJETS" },
    experience: { EN: "EXPERIENCE", FR: "PARCOURS" },
    blog: { EN: "BLOG", FR: "BLOG" },
    contact: { EN: "CONTACT ME", FR: "CONTACT" },
  },
  hero: {
    badge: { EN: "HI THERE", FR: "BONJOUR" },
    intro: { EN: "Hello, my name's", FR: "Bonjour, je m'appelle" },
    tagline: { EN: "I'm Junior Engineer.", FR: "Je suis Ingénieur Junior." },
    experience: { EN: "4+ years of experience building scalable applications and robust software solutions.", FR: "Plus de 4 ans d'expérience dans la création d'applications évolutives et de solutions logicielles robustes." },
    ctaTalk: { EN: "Let's Talk", FR: "Discutons" },
    ctaCv: { EN: "DOWNLOAD CV", FR: "TÉLÉCHARGER CV" },
    stats: {
      projects: { EN: "PROJECTS COMPLETED", FR: "PROJETS TERMINÉS" },
      experience: { EN: "YEARS OF EXPERIENCE", FR: "ANNÉES D'EXPÉRIENCE" },
      satisfaction: { EN: "CLIENT SATISFACTION", FR: "SATISFACTION CLIENT" },
      companies: { EN: "COMPANIES WORKED", FR: "ENTREPRISES COLLABORÉES" },
    }
  },
  about: {
    title: { EN: "About Me", FR: "À Propos de Moi" },
    p1: { 
      EN: "I am a product-oriented software engineer specializing in frontend architectures and automated quality assurance. I bridge the gap between engineering and user experience.", 
      FR: "Je suis un ingénieur logiciel orienté produit, spécialisé dans les architectures frontend et l'assurance qualité automatisée. Je fais le pont entre l'ingénierie et l'expérience utilisateur." 
    },
  },
  services: {
    title: { EN: "My Services", FR: "Mes Services" },
    subtitle: { EN: "What I bring to your products", FR: "Ce que j'apporte à vos produits" },
  },
  works: {
    title: { EN: "Featured Case Studies", FR: "Études de Cas Phares" },
    subtitle: { EN: "Detailed reports on real-world delivery", FR: "Rapports détaillés sur des projets réels" },
    all: { EN: "All", FR: "Tous" },
    ai: { EN: "AI & Full Stack", FR: "IA & Full Stack" },
    frontend: { EN: "Frontend / Web", FR: "Frontend / Web" },
    qa: { EN: "QA & Automation", FR: "QA & Automatisation" },
    demo: { EN: "Live Demo", FR: "Démo Live" },
    repo: { EN: "Repository", FR: "Code Source" },
    metrics: { EN: "Key Metrics", FR: "Indicateurs Clés" },
    challenge: { EN: "The Challenge", FR: "Le Défi" },
    strategy: { EN: "Strategy & Execution", FR: "Stratégie & Exécution" },
    impact: { EN: "Real-world Impact", FR: "Impact Réel" },
    backToWorks: { EN: "Back to Works", FR: "Retour aux Projets" },
  },
  experience: {
    title: { EN: "Professional Journey", FR: "Parcours Professionnel" },
    subtitle: { EN: "Companies and projects", FR: "Entreprises et projets" },
    strengths: { EN: "Personal Strengths", FR: "Forces Personnelles" },
  },
  blog: {
    title: { EN: "Insights & Engineering", FR: "Insights & Ingénierie" },
    subtitle: { EN: "Thoughts on frontend structure, QA automation, and product delivery.", FR: "Réflexions sur les structures frontend, l'automatisation QA et la livraison de produits." },
    all: { EN: "All", FR: "Tous" },
    readTime: { EN: "min read", FR: "min de lecture" },
    by: { EN: "By", FR: "Par" },
    backToBlog: { EN: "Back to Insights", FR: "Retour aux Insights" },
    toc: { EN: "Table of Contents", FR: "Table des Matières" },
    related: { EN: "Related articles", FR: "Articles similaires" },
    readArticle: { EN: "Read article", FR: "Lire l'article" },
    subscribeTitle: { EN: "Enjoyed these articles?", FR: "Vous aimez ces articles ?" },
    subscribeDesc: { EN: "Get access to premium contents and stay updated with new technical insights.", FR: "Accédez à du contenu premium et restez informé des nouvelles perspectives techniques." },
    subscribeBtn: { EN: "Subscribe", FR: "S'abonner" },
    discuss: { EN: "Discuss this article", FR: "Discuter de cet article" },
    caseStudy: { EN: "Case Study", FR: "Étude de Cas" },
  },
  contact: {
    title: { EN: "Get In Touch", FR: "Contactez-moi" },
    subtitle: { EN: "Let's build something exceptional together", FR: "Construisons quelque chose d'exceptionnel ensemble" },
    name: { EN: "Your Name", FR: "Votre Nom" },
    email: { EN: "Your Email", FR: "Votre Email" },
    subject: { EN: "Subject", FR: "Sujet" },
    message: { EN: "Message", FR: "Message" },
    send: { EN: "Send Message", FR: "Envoyer le Message" },
    sending: { EN: "Sending...", FR: "Envoi en cours..." },
    success: { EN: "Message sent successfully!", FR: "Message envoyé avec succès !" },
  },
  footer: {
    desc: { EN: "Senior Frontend Engineer & QA Specialist. Building interactive, high-performance web products with clean code.", FR: "Ingénieur Frontend Senior & Spécialiste QA. Conception de produits web interactifs et performants." },
    allRights: { EN: "All rights reserved.", FR: "Tous droits réservés." }
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("FR"); // Default to FR to be safe
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Check saved language preference in localStorage
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "EN" || saved === "FR") {
      setLangState(saved);
    } else {
      // 2. No saved preference: check browser language preference list
      const languages = navigator.languages || [navigator.language || (navigator as any).userLanguage || ""];
      let preferred: Lang | null = null;
      for (const rawLang of languages) {
        if (!rawLang) continue;
        const clean = rawLang.toLowerCase();
        if (clean.startsWith("fr")) {
          preferred = "FR";
          break;
        }
        if (clean.startsWith("en")) {
          preferred = "EN";
          break;
        }
      }
      // Fallback to FR if no EN/FR found, or default to EN. Let's fallback to FR or EN based on first language
      const defaultLang = preferred || "FR";
      setLangState(defaultLang);
      localStorage.setItem("lang", defaultLang);
    }
    setMounted(true);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem("lang", next);
  };

  // Translation resolver
  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = translations;
    for (const key of keys) {
      if (current[key] !== undefined) {
        current = current[key];
      } else {
        return path; // Fallback to key path if missing
      }
    }
    return current[lang] || current.EN || path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
