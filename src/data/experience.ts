export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  period: string;
}

export interface Award {
  event: string;
  result: string;
  date: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    role: "Senior Frontend Engineer & QA",
    company: "MELOAUD",
    period: "Feb 2025 – Present",
    description: "Leading frontend architecture and ensuring product reliability.",
    achievements: [
      "Ownership of frontend architecture and decision making.",
      "Implemented BDD automation using Cucumber for regression prevention.",
      "Close collaboration with product and backend teams to streamline delivery.",
    ],
  },
  {
    role: "Frontend Developer & Project Coordinator",
    company: "ADS LTD",
    period: "May 2025 – Nov 2025",
    description: "Managed frontend delivery and team coordination.",
    achievements: [
      "Developed complex React-based frontend interfaces.",
      "Coordinated team tasks and tracked KPIs for project success.",
      "Delivered high-quality features under strict real-world constraints.",
    ],
  },
  {
    role: "Software Developer",
    company: "SOLUTY",
    period: "Jan 2024 – Apr 2025",
    description: "Co-building software products with a focus on technical excellence.",
    achievements: [
      "Participated in the full lifecycle of software product building.",
      "Contributed to key technical and product decisions.",
    ],
  },
];

export const educationList: Education[] = [
  {
    school: "Université de Lomé",
    degree: "Licence de Technologie",
    field: "Génie Logiciel & Informatique",
    period: "2021 – 2024",
  },
];

export const awardsList: Award[] = [
  {
    event: "OneControl AI Hackathon",
    result: "1ère Place (Logistics AI Prototype)",
    date: "2025",
  },
];

export const languagesList: Language[] = [
  { name: "Français", level: "Natif" },
  { name: "Anglais", level: "Professionnel" },
];

export const skillsGrouped: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Spring Boot", "Node.js", "REST APIs"],
  },
  {
    category: "QA & Tests",
    skills: ["Cucumber BDD", "Postman", "Tests manuels", "Régression"],
  },
  {
    category: "Bases de données",
    skills: ["PostgreSQL", "MySQL", "Firebase", "SQLite"],
  },
  {
    category: "DevOps & Outils",
    skills: ["Git", "Docker", "CI/CD", "Jira", "Figma"],
  },
  {
    category: "Langages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C/C++"],
  },
];
