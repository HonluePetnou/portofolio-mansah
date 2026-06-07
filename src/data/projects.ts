import { Bilingual } from "./experience";

export interface ProjectMetric {
  label: Bilingual<string>;
  value: string;
}

export interface ProjectData {
  title: string;
  description: Bilingual<string>;
  image: string;
  slug: string;
  stack: string[];
  highlightedStack?: string;
  category: "AI & Full Stack" | "Frontend / Web" | "QA & Automation";
  demoUrl?: string;
  repoUrl?: string;
  metrics?: ProjectMetric[];
  challenge?: Bilingual<string>;
  strategy?: Bilingual<string>;
  impact?: Bilingual<string>;
}

export const projectsData: ProjectData[] = [
  {
    title: "OneControl",
    description: {
      EN: "AI-integrated hackathon project optimizing resource management and disaster response logistics.",
      FR: "Projet de hackathon intégrant l'IA pour optimiser la gestion des ressources et la logistique de réponse aux catastrophes.",
    },
    image: "/onecontrol.png",
    slug: "one-control",
    stack: ["Gemini AI", "Next.js", "Python"],
    highlightedStack: "Gemini AI",
    category: "AI & Full Stack",
    demoUrl: "https://onecontrol-demo.example.com",
    repoUrl: "https://github.com/HonluePetnou/one-control",
    metrics: [
      {
        label: { EN: "Resource Efficiency", FR: "Efficacité des Ressources" },
        value: "+30%",
      },
      {
        label: { EN: "Decision Accuracy", FR: "Précision des Décisions" },
        value: "94%",
      },
    ],
    challenge: {
      EN: "During a fast-paced crisis response hackathon, we faced the challenge of optimizing logistics and resource distribution in real-time. Traditional rigid, rule-based algorithms failed to adapt to highly dynamic emergency updates and erratic data streams.",
      FR: "Lors d'un hackathon de réponse aux crises en temps limité, nous avons dû relever le défi de l'optimisation en temps réel de la logistique et de la distribution des ressources. Les algorithmes rigides traditionnels basés sur des règles n'ont pas réussi à s'adapter aux mises à jour d'urgence hautement dynamiques.",
    },
    strategy: {
      EN: "We built a hybrid real-time dashboard combining a responsive Next.js frontend with a lightweight Python microservice. The system leveraged the Gemini Pro API to ingest live text reports, categorize disaster impact severity, and dynamically output optimized asset allocation pathways.",
      FR: "Nous avons construit un tableau de bord hybride en temps réel combinant un frontend Next.js réactif et un microservice Python léger. Le système a exploité l'API Gemini Pro pour ingérer des rapports textuels en direct, catégoriser la gravité de l'impact des catastrophes et générer dynamiquement des trajets optimisés d'allocation d'actifs.",
    },
    impact: {
      EN: "The prototype was praised for its innovative use of generative AI in emergency response, achieving a simulated logistics optimization score 30% higher than baseline human allocation.",
      FR: "Le prototype a été salué pour son utilisation innovante de l'IA générative dans la réponse aux urgences, atteignant un score d'optimisation logistique simulée 30 % supérieur à l'allocation humaine de référence.",
    },
  },
  {
    title: "Feedly",
    description: {
      EN: "Health analytics application for personalized nutrition tracking and biometric analysis.",
      FR: "Application d'analyse de santé pour le suivi personnalisé de la nutrition et l'analyse biométrique.",
    },
    image: "/feedly.png",
    slug: "feedly",
    stack: ["FastAPI", "Python", "React", "PostgreSQL"],
    highlightedStack: "PostgreSQL",
    category: "AI & Full Stack",
    demoUrl: "https://feedly-health.example.com",
    repoUrl: "https://github.com/HonluePetnou/feedly-nutrition",
    metrics: [
      {
        label: { EN: "Query Optimization", FR: "Optimisation des Requêtes" },
        value: "+45%",
      },
      {
        label: { EN: "User Retention", FR: "Rétention des Utilisateurs" },
        value: "88%",
      },
    ],
    challenge: {
      EN: "Processing high-frequency biometric logs and dietary records in real-time while keeping graphs and analytics interactive became a database bottleneck, leading to laggy dashboard interactions and user drop-off.",
      FR: "Le traitement en temps réel des journaux biométriques et des dossiers nutritionnels à haute fréquence tout en maintenant l'interactivité des graphiques est devenu un goulot d'étranglement de la base de données, entraînant des lenteurs d'interaction et l'abandon des utilisateurs.",
    },
    strategy: {
      EN: "I re-architected the backend using Python and FastAPI's asynchronous route handling, coupling it with heavily optimized PostgreSQL queries utilizing time-based indexing. The React frontend was optimized using canvas-based charting and virtualized scroll grids.",
      FR: "J'ai restructuré le backend en utilisant Python et la gestion de routes asynchrones de FastAPI, en le couplant à des requêtes PostgreSQL optimisées utilisant un indexage temporel. Le frontend React a été optimisé à l'aide de graphiques sur canvas et de grilles de défilement virtualisées.",
    },
    impact: {
      EN: "Reduced query execution times for complex monthly trend reports by 45% and improved app load times, leading to a bump in user retention up to 88%.",
      FR: "Réduction de 45 % du temps d'exécution des requêtes pour les rapports mensuels complexes et amélioration du temps de chargement de l'application, ce qui a permis d'augmenter la rétention des utilisateurs à 88 %.",
    },
  },
  {
    title: "Tech Portfolio Directory",
    description: {
      EN: "An elegant, advanced directory aggregator for technical and creative portfolios with smart filters.",
      FR: "Un agrégateur d'annuaires élégant et avancé pour les portfolios techniques et créatifs avec des filtres intelligents.",
    },
    image: "/foliofy.png",
    slug: "tech-portfolio-directory",
    stack: ["Next.js", "Firebase", "Puppeteer", "Tailwind CSS"],
    highlightedStack: "Firebase",
    category: "Frontend / Web",
    demoUrl: "https://foliofy.example.com",
    repoUrl: "https://github.com/HonluePetnou/tech-portfolio-directory",
    metrics: [
      {
        label: { EN: "Indexed Portfolios", FR: "Portfolios Indexés" },
        value: "1,200+",
      },
      {
        label: { EN: "Search Latency", FR: "Latence de Recherche" },
        value: "<80ms",
      },
    ],
    challenge: {
      EN: "Discovering, evaluating, and cataloging portfolios automatically is highly manual. Building a dynamic aggregator required building high-speed scrapers that could extract layout metadata without triggering server blocklists.",
      FR: "Découvrir, évaluer et cataloguer automatiquement des portfolios est une tâche très manuelle. Construire un agrégateur dynamique nécessitait la création de scrapers ultra-rapides capables d'extraire les métadonnées de mise en page sans déclencher les listes de blocage des serveurs.",
    },
    strategy: {
      EN: "I engineered a distributed scraping pipeline using serverless functions and Puppeteer. Scraped details are parsed into structured schemas and synchronized with Firebase Firestore, which powers the server-side filtered Next.js showcase UI.",
      FR: "J'ai conçu un pipeline de scraping distribué utilisant des fonctions serverless et Puppeteer. Les détails récupérés sont analysés dans des schémas structurés et synchronisés avec Firebase Firestore, qui alimente l'interface utilisateur de présentation Next.js filtrée côté serveur.",
    },
    impact: {
      EN: "Created a searchable index of over 1,200 curated portfolios, featuring instant filtering, tag search, and load speeds under 80ms for search queries.",
      FR: "Création d'un index consultable de plus de 1 200 portfolios sélectionnés, comprenant un filtrage instantané, une recherche par tag et des vitesses de chargement inférieures à 80 ms pour les requêtes.",
    },
  },
  {
    title: "Ubuntu App / Library Manager",
    description: {
      EN: "Desktop-grade enterprise library inventory management system running locally.",
      FR: "Système de gestion d'inventaire de bibliothèque d'entreprise de niveau bureautique fonctionnant localement.",
    },
    image: "/foliofy.png",
    slug: "ubuntu-app-library-manager",
    stack: ["React", "Java EE", "Electron", "MySQL"],
    highlightedStack: "Electron",
    category: "Frontend / Web",
    repoUrl: "https://github.com/HonluePetnou/ubuntu-library-manager",
    metrics: [
      {
        label: { EN: "Active Librarians", FR: "Bibliothécaires Actifs" },
        value: "300+",
      },
      {
        label: { EN: "Checkout Queue Time", FR: "Temps d'Attente de Prêt" },
        value: "-60%",
      },
    ],
    challenge: {
      EN: "Librarians require offline-first capabilities, instant bar-code scanning, and a desktop-like workflow speed that integrates smoothly with local hardware and peripheral scanner devices.",
      FR: "Les bibliothécaires ont besoin de capacités hors ligne (offline-first), d'une numérisation instantanée des codes-barres et d'une vitesse de travail de type bureau qui s'intègre parfaitement avec le matériel local et les périphériques de lecture.",
    },
    strategy: {
      EN: "I implemented a cross-platform desktop wrapper utilizing Electron and React. Configured a local Java EE backend connecting to a MySQL database store. Applied local caching and indexed search algorithms to make scans responsive.",
      FR: "J'ai implémenté un wrapper de bureau multiplateforme utilisant Electron et React. Configuré un backend Java EE local connecté à une base de données MySQL. Appliqué une mise en cache locale et des algorithmes de recherche indexés pour rendre les scans réactifs.",
    },
    impact: {
      EN: "Deployed in regional libraries, serving over 300 librarians daily, and slashing book check-out queue processing times by 60%.",
      FR: "Déployé dans des bibliothèques régionales, au service de plus de 300 bibliothécaires par jour, et réduisant de 60 % le temps d'attente de traitement des files d'attente pour l'emprunt de livres.",
    },
  },
];
