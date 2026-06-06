export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  slug: string;
  stack: string[];
  highlightedStack?: string;
  category: "AI & Full Stack" | "Frontend / Web" | "QA & Automation";
  demoUrl?: string;
  repoUrl?: string;
  metrics?: ProjectMetric[];
  challenge?: string;
  strategy?: string;
  impact?: string;
}

export const projectsData: ProjectData[] = [
  {
    title: "OneControl",
    description: "AI-integrated hackathon project optimizing resource management and disaster response logistics.",
    image: "/onecontrol.png",
    slug: "one-control",
    stack: ["Gemini AI", "Next.js", "Python"],
    highlightedStack: "Gemini AI",
    category: "AI & Full Stack",
    demoUrl: "https://onecontrol-demo.example.com",
    repoUrl: "https://github.com/HonluePetnou/one-control",
    metrics: [
      { label: "Resource Efficiency", value: "+30%" },
      { label: "Decision Accuracy", value: "94%" },
    ],
    challenge: "During a fast-paced crisis response hackathon, we faced the challenge of optimizing logistics and resource distribution in real-time. Traditional rigid, rule-based algorithms failed to adapt to highly dynamic emergency updates and erratic data streams.",
    strategy: "We built a hybrid real-time dashboard combining a responsive Next.js frontend with a lightweight Python microservice. The system leveraged the Gemini Pro API to ingest live text reports, categorize disaster impact severity, and dynamically output optimized asset allocation pathways.",
    impact: "The prototype was praised for its innovative use of generative AI in emergency response, achieving a simulated logistics optimization score 30% higher than baseline human allocation.",
  },
  {
    title: "Feedly",
    description: "Health analytics application for personalized nutrition tracking and biometric analysis.",
    image: "/feedly.png",
    slug: "feedly",
    stack: ["FastAPI", "Python", "React", "PostgreSQL"],
    highlightedStack: "PostgreSQL",
    category: "AI & Full Stack",
    demoUrl: "https://feedly-health.example.com",
    repoUrl: "https://github.com/HonluePetnou/feedly-nutrition",
    metrics: [
      { label: "Query Optimization", value: "+45%" },
      { label: "User Retention", value: "88%" },
    ],
    challenge: "Processing high-frequency biometric logs and dietary records in real-time while keeping graphs and analytics interactive became a database bottleneck, leading to laggy dashboard interactions and user drop-off.",
    strategy: "I re-architected the backend using Python and FastAPI's asynchronous route handling, coupling it with heavily optimized PostgreSQL queries utilizing time-based indexing. The React frontend was optimized using canvas-based charting and virtualized scroll grids.",
    impact: "Reduced query execution times for complex monthly trend reports by 45% and improved app load times, leading to a bump in user retention up to 88%.",
  },
  {
    title: "Tech Portfolio Directory",
    description: "An elegant, advanced directory aggregator for technical and creative portfolios with smart filters.",
    image: "/foliofy.png",
    slug: "tech-portfolio-directory",
    stack: ["Next.js", "Firebase", "Puppeteer", "Tailwind CSS"],
    highlightedStack: "Firebase",
    category: "Frontend / Web",
    demoUrl: "https://foliofy.example.com",
    repoUrl: "https://github.com/HonluePetnou/tech-portfolio-directory",
    metrics: [
      { label: "Indexed Portfolios", value: "1,200+" },
      { label: "Search Latency", value: "<80ms" },
    ],
    challenge: "Discovering, evaluating, and cataloging portfolios automatically is highly manual. Building a dynamic aggregator required building high-speed scrapers that could extract layout metadata without triggering server blocklists.",
    strategy: "I engineered a distributed scraping pipeline using serverless functions and Puppeteer. Scraped details are parsed into structured schemas and synchronized with Firebase Firestore, which powers the server-side filtered Next.js showcase UI.",
    impact: "Created a searchable index of over 1,200 curated portfolios, featuring instant filtering, tag search, and load speeds under 80ms for search queries.",
  },
  {
    title: "Ubuntu App / Library Manager",
    description: "Desktop-grade enterprise library inventory management system running locally.",
    image: "/foliofy.png", // fallback placeholder
    slug: "ubuntu-app-library-manager",
    stack: ["React", "Java EE", "Electron", "MySQL"],
    highlightedStack: "Electron",
    category: "Frontend / Web",
    repoUrl: "https://github.com/HonluePetnou/ubuntu-library-manager",
    metrics: [
      { label: "Active Librarians", value: "300+" },
      { label: "Checkout Queue Time", value: "-60%" },
    ],
    challenge: "Librarians require offline-first capabilities, instant bar-code scanning, and a desktop-like workflow speed that integrates smoothly with local hardware and peripheral scanner devices.",
    strategy: "I implemented a cross-platform desktop wrapper utilizing Electron and React. Configured a local Java EE backend connecting to a MySQL database store. Applied local caching and indexed search algorithms to make scans responsive.",
    impact: "Deployed in regional libraries, serving over 300 librarians daily, and slashing book check-out queue processing times by 60%.",
  },
];
