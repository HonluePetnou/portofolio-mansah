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
      EN: "Senior Frontend Engineer & QA",
      FR: "Ingénieur Frontend Senior & QA",
    },
    company: "MELOAUD",
    period: {
      EN: "Feb 2025 – Present",
      FR: "Fév 2025 – Présent",
    },
    description: {
      EN: "Leading frontend architecture and ensuring product reliability.",
      FR: "Direction de l'architecture frontend et garantie de la fiabilité du produit.",
    },
    achievements: {
      EN: [
        "Ownership of frontend architecture and decision making.",
        "Implemented BDD automation using Cucumber for regression prevention.",
        "Close collaboration with product and backend teams to streamline delivery.",
      ],
      FR: [
        "Responsabilité de l'architecture frontend et de la prise de décisions techniques.",
        "Mise en œuvre de l'automatisation BDD avec Cucumber pour prévenir les régressions.",
        "Collaboration étroite avec les équipes produit et backend pour fluidifier les livraisons.",
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
  {
    role: {
      EN: "Software Developer",
      FR: "Développeur Logiciel",
    },
    company: "SOLUTY",
    period: {
      EN: "Jan 2024 – Apr 2025",
      FR: "Jan 2024 – Avr 2025",
    },
    description: {
      EN: "Co-building software products with a focus on technical excellence.",
      FR: "Co-conception de produits logiciels avec un accent sur l'excellence technique.",
    },
    achievements: {
      EN: [
        "Participated in the full lifecycle of software product building.",
        "Contributed to key technical and product decisions.",
      ],
      FR: [
        "Participation au cycle de vie complet de la création de produits logiciels.",
        "Contribution aux décisions clés concernant le produit et les choix techniques.",
      ],
    },
  },
];

export const educationList: Education[] = [
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
      EN: ["Cucumber BDD", "Postman", "Manual testing", "Regression testing"],
      FR: ["Cucumber BDD", "Postman", "Tests manuels", "Régression"],
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
