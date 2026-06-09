export interface Bilingual<T> {
  EN: T;
  FR: T;
}

export interface Experience {
  role: Bilingual<string>;
  company: string;
  period: Bilingual<string>;
  description: Bilingual<string>;
  achievements: Bilingual<string[]>;
}

export interface Education {
  school: string;
  degree: Bilingual<string>;
  field: Bilingual<string>;
  period: Bilingual<string>;
}

export interface Award {
  event: string;
  result: Bilingual<string>;
  date: string;
}

export interface Language {
  name: Bilingual<string>;
  level: Bilingual<string>;
}

export interface SkillGroup {
  category: Bilingual<string>;
  skills: Bilingual<string[]>;
}

export const experiences: Experience[] = [
  {
    role: {
      EN: "QA Automation Engineer & Tester",
      FR: "Ingénieur QA Automation & Testeur",
    },
    company: "MELOAUD",
    period: {
      EN: "Feb 2025 – Present",
      FR: "Fév 2025 – Présent",
    },
    description: {
      EN: "Leading QA strategy, writing test automation scripts, and executing manual testing cycles.",
      FR: "Direction de la stratégie QA, écriture des scripts de test automatisés et exécution des cycles de tests manuels.",
    },
    achievements: {
      EN: [
        "Mainly focused on testing and validation processes to ensure zero-regression releases.",
        "Implemented end-to-end BDD automation pipelines using Cucumber and Playwright.",
        "Collaborated with product and frontend engineering to establish QA standards and testing gates.",
      ],
      FR: [
        "Principalement concentré sur les processus de test et de validation pour garantir des versions sans régression.",
        "Mise en œuvre de pipelines d'automatisation BDD de bout en bout avec Cucumber et Playwright.",
        "Collaboration avec les équipes produit et frontend pour établir des standards QA et des barrières de tests.",
      ],
    },
  },
  {
    role: {
      EN: "Founder & Technical Lead",
      FR: "Fondateur & Directeur Technique",
    },
    company: "SOLUTY",
    period: {
      EN: "Jan 2024 – Present",
      FR: "Jan 2024 – Présent",
    },
    description: {
      EN: "Directing our agency Soluty, designing and developing custom software solutions for clients.",
      FR: "Direction de notre agence Soluty, conception et développement de solutions logicielles sur mesure pour nos clients.",
    },
    achievements: {
      EN: [
        "Managing client relationships, requirements gathering, and technical design.",
        "Leading the design and delivery of responsive web applications and secure backend systems.",
        "Ensuring engineering excellence and clean code practices across all client deliverables.",
      ],
      FR: [
        "Gestion des relations clients, collecte des besoins et conception technique.",
        "Direction de la conception et de la livraison d'applications web réactives et de systèmes backend sécurisés.",
        "Garantie de l'excellence technique et des pratiques de code propre sur l'ensemble des livrables clients.",
      ],
    },
  },
  {
    role: {
      EN: "Cybersecurity Instructor",
      FR: "Enseignant en Cybersécurité",
    },
    company: "COMPASS INSTITUTE",
    period: {
      EN: "Jan 2026 – Present",
      FR: "Jan 2026 – Présent",
    },
    description: {
      EN: "Instructing student groups on cybersecurity fundamentals, network defenses, and threat analysis.",
      FR: "Enseignement des fondamentaux de la cybersécurité, de la défense des réseaux et de l'analyse des menaces aux étudiants.",
    },
    achievements: {
      EN: [
        "Delivering courses covering introduction to security, risk assessment, and basic networking principles.",
        "Leading hands-on laboratory sessions focusing on system hardening and security controls.",
        "Teaching network defense configurations and preparing students for foundational certifications.",
      ],
      FR: [
        "Animation de cours couvrant l'introduction à la sécurité, l'évaluation des risques et les principes de base des réseaux.",
        "Direction de sessions de laboratoires pratiques axées sur le renforcement des systèmes et les contrôles de sécurité.",
        "Enseignement des configurations de défense réseau et préparation des étudiants aux certifications de base.",
      ],
    },
  },
  {
    role: {
      EN: "Frontend Developer & Project Coordinator",
      FR: "Développeur Frontend & Coordinateur de Projet",
    },
    company: "ADS LTD",
    period: {
      EN: "May 2025 – Nov 2025",
      FR: "Mai 2025 – Nov 2025",
    },
    description: {
      EN: "Managed frontend delivery and team coordination.",
      FR: "Gestion des livraisons frontend et coordination d'équipe.",
    },
    achievements: {
      EN: [
        "Developed complex React-based frontend interfaces.",
        "Coordinated team tasks and tracked KPIs for project success.",
        "Delivered high-quality features under strict real-world constraints.",
      ],
      FR: [
        "Développement d'interfaces frontend complexes basées sur React.",
        "Coordination des tâches de l'équipe et suivi des indicateurs clés (KPI) pour le succès du projet.",
        "Livraison de fonctionnalités de haute qualité sous des contraintes réelles strictes.",
      ],
    },
  },
];

export const educationList: Education[] = [
  {
    school: "ENSPD",
    degree: {
      EN: "Engineering Degree (Level 4)",
      FR: "Diplôme d'Ingénieur (Niveau 4)",
    },
    field: {
      EN: "Computer Science & Information Systems",
      FR: "Génie Informatique & Systèmes d'Information",
    },
    period: {
      EN: "2022 – 2027 (Expected)",
      FR: "2022 – 2027 (Prévu)",
    },
  },
  {
    school: "Université de Lomé",
    degree: {
      EN: "Bachelor of Technology",
      FR: "Licence de Technologie",
    },
    field: {
      EN: "Software Engineering & Computer Science",
      FR: "Génie Logiciel & Informatique",
    },
    period: {
      EN: "2021 – 2024",
      FR: "2021 – 2024",
    },
  },
];

export const awardsList: Award[] = [
  {
    event: "Cisco Networking Academy",
    result: {
      EN: "Introduction to Cybersecurity & Network Badges",
      FR: "Badges d'Introduction à la Cybersécurité & Réseaux",
    },
    date: "2026",
  },
  {
    event: "OneControl AI Hackathon",
    result: {
      EN: "1st Place (Logistics AI Prototype)",
      FR: "1ère Place (Prototype d'IA logistique)",
    },
    date: "2025",
  },
];

export const languagesList: Language[] = [
  {
    name: { EN: "French", FR: "Français" },
    level: { EN: "Native", FR: "Natif" },
  },
  {
    name: { EN: "English", FR: "Anglais" },
    level: { EN: "Professional", FR: "Professionnel" },
  },
];

export const skillsGrouped: SkillGroup[] = [
  {
    category: { EN: "Frontend", FR: "Frontend" },
    skills: {
      EN: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo"],
      FR: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo"],
    },
  },
  {
    category: { EN: "Backend", FR: "Backend" },
    skills: {
      EN: ["FastAPI", "Spring Boot", "Node.js", "REST APIs"],
      FR: ["FastAPI", "Spring Boot", "Node.js", "APIs REST"],
    },
  },
  {
    category: { EN: "QA & Testing", FR: "QA & Tests" },
    skills: {
      EN: ["Cucumber BDD", "Playwright", "Postman", "Manual testing", "Regression testing"],
      FR: ["Cucumber BDD", "Playwright", "Postman", "Tests manuels", "Régression"],
    },
  },
  {
    category: { EN: "Databases", FR: "Bases de données" },
    skills: {
      EN: ["PostgreSQL", "MySQL", "Firebase", "SQLite"],
      FR: ["PostgreSQL", "MySQL", "Firebase", "SQLite"],
    },
  },
  {
    category: { EN: "DevOps & Tools", FR: "DevOps & Outils" },
    skills: {
      EN: ["Git", "Docker", "CI/CD", "Jira", "Figma"],
      FR: ["Git", "Docker", "CI/CD", "Jira", "Figma"],
    },
  },
  {
    category: { EN: "Languages", FR: "Langages" },
    skills: {
      EN: ["JavaScript", "TypeScript", "Python", "Java", "C/C++"],
      FR: ["JavaScript", "TypeScript", "Python", "Java", "C/C++"],
    },
  },
];
