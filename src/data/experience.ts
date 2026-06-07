export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
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
