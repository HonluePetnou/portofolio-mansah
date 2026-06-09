import { Bilingual } from "./experience";

export interface BlogSection {
  heading: Bilingual<string>;
  body: Bilingual<string>;
  codeSnippet?: {
    code: string;
    language: string;
  };
}

export interface BlogPost {
  title: Bilingual<string>;
  excerpt: Bilingual<string>;
  category: "Systems & Security" | "Software Engineering" | "AI & Backend" | "Product & Delivery";
  date: string;
  readTime: Bilingual<string>;
  slug: string;
  image?: string;
  introduction: Bilingual<string>;
  sections: BlogSection[];
  quote?: Bilingual<string>;
}

export const blogPosts: BlogPost[] = [
  {
    title: {
      EN: "Why Quality Assurance Is a Product Feature, Not a Phase",
      FR: "Pourquoi l'Assurance Qualité est une Fonctionnalité Produit, pas une Phase",
    },
    excerpt: {
      EN: "Shifting the mindset from 'catching bugs' to 'building reliability'. How BDD and automated testing create a safety net for rapid product iteration.",
      FR: "Passer de la détection de bugs à la construction de la fiabilité. Comment le BDD et les tests automatisés sécurisent les itérations rapides de produits.",
    },
    category: "Systems & Security",
    date: "Oct 12, 2025",
    readTime: {
      EN: "5 min read",
      FR: "5 min de lecture",
    },
    slug: "quality-assurance-product-feature",
    quote: {
      EN: "Quality is never an accident. It is always the result of intelligent effort, integrated from the very first line of code into the user experience.",
      FR: "La qualité n'est jamais un accident. Elle est toujours le résultat d'un effort intelligent, intégré dès la première ligne de code dans l'expérience utilisateur.",
    },
    introduction: {
      EN: "In many software organizations, Quality Assurance (QA) is still treated as the final tollgate before release. Developers write the code, throw it over the wall, and wait for QA to find bugs. This 'phase-based' approach is slow, adversarial, and fundamentally flawed. True quality isn't checked at the end; it is designed and built from day one.",
      FR: "Dans de nombreuses entreprises de logiciels, l'assurance qualité (QA) est encore traitée comme la dernière barrière avant la livraison. Les développeurs écrivent le code et attendent que la QA trouve les bugs. Cette approche par phases est lente et imparfaite. La vraie qualité ne se vérifie pas à la fin ; elle se conçoit et se construit dès le premier jour.",
    },
    sections: [
      {
        heading: {
          EN: "The Cost of Shifting Quality to the Right",
          FR: "Le Coût de la Qualité Déplacée vers la Droite",
        },
        body: {
          EN: "When testing happens late in the lifecycle, resolving issues becomes significantly more expensive. A bug found in production can cost up to 100 times more to fix than one caught during the initial design phase. By 'shifting left'—introducing testing protocols and specifications before coding even starts—we build a faster, more reliable feedback loop.",
          FR: "Lorsque les tests ont lieu tardivement, la résolution des problèmes devient nettement plus coûteuse. Un bug trouvé en production peut coûter jusqu'à 100 fois plus cher à corriger qu'un bug détecté au début de la conception. En introduisant des protocoles de test avant d'écrire le code, nous créons une boucle de rétroaction plus rapide.",
        },
      },
      {
        heading: {
          EN: "Behavior-Driven Development (BDD) as a Bridge",
          FR: "Le BDD (Behavior-Driven Development) comme Passerelle",
        },
        body: {
          EN: "BDD is not just a testing technique; it is a collaboration framework. By writing test specifications in plain English (Gherkin syntax), product managers, designers, and developers align on the desired features. This eliminates ambiguity and ensures the test suite reflects true product behavior.",
          FR: "Le BDD n'est pas qu'une technique de test ; c'est un cadre de collaboration. En écrivant des spécifications en langage clair (syntaxe Gherkin), les chefs de produit, designers et développeurs s'alignent sur les fonctionnalités, éliminant ainsi toute ambiguïté.",
        },
        codeSnippet: {
          language: "gherkin",
          code: `Feature: User Login
  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When they enter valid credentials
    Then they should be redirected to the dashboard`,
        },
      },
      {
        heading: {
          EN: "Automated E2E Tests: The Ultimate Safety Net",
          FR: "Les Tests E2E Automatisés : le Filet de Sécurité Ultime",
        },
        body: {
          EN: "Manual testing cannot scale with rapid deployments. Implementing robust end-to-end (E2E) automation suites (using modern tools like Playwright or Cypress) guarantees that core user paths—like checkouts, sign-ups, and dashboards—remain unbroken through code updates. This automated safety net gives the engineering team the confidence to ship value daily.",
          FR: "Les tests manuels ne peuvent pas suivre le rythme des déploiements rapides. La mise en place de suites automatisées de bout en bout (E2E) (avec des outils modernes comme Playwright ou Cypress) garantit que les parcours utilisateurs clés restent fonctionnels lors des mises à jour, donnant à l'équipe la confiance nécessaire pour livrer quotidiennement.",
        },
      },
    ],
  },
  {
    title: {
      EN: "Architecting Scalable Frontends with Next.js",
      FR: "Structurer des Applications Frontend Évolutives avec Next.js",
    },
    excerpt: {
      EN: "Lessons learned from managing large-scale React applications. Component patterns, state management strategies, and performance optimization.",
      FR: "Leçons tirées de la gestion d'applications React à grande échelle. Modèles de composants, stratégies de gestion d'état et optimisation des performances.",
    },
    category: "Software Engineering",
    date: "Sep 28, 2025",
    readTime: {
      EN: "8 min read",
      FR: "8 min de lecture",
    },
    slug: "architecting-scalable-frontends",
    quote: {
      EN: "A scalable frontend is not just about handle-size bundles; it is about cognitive load. Keep component trees flat, boundaries clear, and logic isolated.",
      FR: "Un frontend évolutif n'est pas seulement une question de taille de bundle ; c'est une question de charge cognitive. Gardez les arbres de composants plats et la logique isolée.",
    },
    introduction: {
      EN: "As frontend codebases grow, they often collapse under their own weight. Uncontrolled state prop-drilling, tangled dependencies, and massive bundle sizes turn simple feature additions into architectural puzzles. Leveraging Next.js and React Server Components provides a powerful toolkit to build highly performant, scalable architectures.",
      FR: "À mesure que les bases de code frontend grandissent, elles s'effondrent sous leur propre poids. La transmission d'état non contrôlée et les bundles massifs transforment de simples ajouts de fonctionnalités en casse-têtes. Next.js et les React Server Components offrent des outils puissants pour bâtir des architectures performantes.",
    },
    sections: [
      {
        heading: {
          EN: "React Server Components (RSC) by Default",
          FR: "Les React Server Components (RSC) par Défaut",
        },
        body: {
          EN: "React Server Components represent a paradigm shift. By fetching data and rendering components on the server, we keep the client-side JavaScript bundle minimal. Interactive elements should be isolated into small, leaves-level Client Components, keeping the rest of the tree statically or dynamically server-rendered.",
          FR: "Les React Server Components représentent un changement de paradigme. En récupérant les données et en effectuant le rendu côté serveur, nous réduisons le bundle JavaScript client au strict minimum. Isolez les éléments interactifs dans des composants clients de bas niveau.",
        },
      },
      {
        heading: {
          EN: "Directory Organization: The Feature-Folder Pattern",
          FR: "Organisation des Dossiers : le Modèle par Fonctionnalité",
        },
        body: {
          EN: "Rather than dividing files by technical types (e.g., placing all buttons in /components and all hooks in /hooks), organize your project by product features. Storing components, styles, hooks, and tests together inside feature folders reduces cognitive overhead and keeps related code highly cohesive.",
          FR: "Plutôt que de diviser les fichiers par types techniques, organisez votre projet par fonctionnalités produit. Regrouper composants, styles, hooks et tests au sein de dossiers de fonctionnalités réduit la charge cognitive et maintient la cohésion du code.",
        },
        codeSnippet: {
          language: "typescript",
          code: `// Structure example
src/
  features/
    auth/
      components/
        LoginForm.tsx
      hooks/
        useAuth.ts
      types.ts
      api.ts`,
        },
      },
      {
        heading: {
          EN: "Performance Optimization Checklist",
          FR: "Checklist d'Optimisation des Performances",
        },
        body: {
          EN: "To keep Next.js apps fast, adopt key optimization patterns: use dynamic imports for heavy third-party packages, leverage Next.js dynamic image caching (`next/image`), and set appropriate cache headers on backend routes. A fast site isn't just nice to have—it directly affects SEO rankings and user conversion rates.",
          FR: "Pour maintenir la rapidité de Next.js, adoptez des schémas d'optimisation clés : importations dynamiques pour les packages lourds, mise en cache d'images et en-têtes de cache appropriés. Un site rapide améliore directement le référencement (SEO) et les taux de conversion.",
        },
      },
    ],
  },
  {
    title: {
      EN: "Integrating Gemini AI into Real-World Workflows",
      FR: "Intégrer l'IA Gemini dans des Flux de Travail Réels",
    },
    excerpt: {
      EN: "Moving beyond chatbots: How to use LLMs to solve specific business problems and enhance user decision-making.",
      FR: "Dépasser les chatbots : comment utiliser les LLM pour résoudre des problèmes métier spécifiques et améliorer la prise de décision.",
    },
    category: "AI & Backend",
    date: "Aug 15, 2025",
    readTime: {
      EN: "6 min read",
      FR: "6 min de lecture",
    },
    slug: "integrating-gemini-ai",
    quote: {
      EN: "AI is most powerful when it acts as an invisible assistant, helping users filter noise and make faster decisions without breaking their flow.",
      FR: "L'IA est plus puissante lorsqu'elle agit comme un assistant invisible, aidant à filtrer le bruit et à accélérer les décisions sans interrompre l'utilisateur.",
    },
    introduction: {
      EN: "The current wave of generative AI has focused heavily on generic chatbots. While conversational interfaces have their place, the real power of Large Language Models (LLMs) lies in embedding them directly into background workflows to parse, categorize, and enrich structured data.",
      FR: "La vague actuelle d'IA générative s'est concentrée sur les chatbots génériques. Bien que ces interfaces aient leur place, le véritable pouvoir des grands modèles de langage (LLM) réside dans leur intégration directe dans les flux de travail en arrière-plan pour structurer, catégoriser et enrichir les données.",
    },
    sections: [
      {
        heading: {
          EN: "Enforcing Structured JSON Output",
          FR: "Imposer une Sortie JSON Structurée",
        },
        body: {
          EN: "When connecting AI services to your application database, raw text output is useless. Modern LLM APIs, like Google's Gemini, support 'Structured JSON Output' schemas. By specifying a strict JSON schema, you guarantee the model returns valid data structures that your application can save and manipulate directly.",
          FR: "Lors de la connexion de services d'IA à votre base de données, les sorties en texte brut sont inexploitables. Les API modernes de LLM, comme Gemini de Google, prennent en charge des schémas de sortie JSON structurés. En spécifiant un schéma strict, vous garantissez que le modèle renvoie des structures de données valides.",
        },
        codeSnippet: {
          language: "javascript",
          code: `// Request structured output from Gemini
const response = await model.generateContent({
  contents: prompt,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: "OBJECT",
      properties: {
        sentiment: { type: "STRING" },
        tags: { type: "ARRAY", items: { type: "STRING" } }
      }
    }
  }
});`,
        },
      },
      {
        heading: {
          EN: "Mitigating Hallucinations with System Instructions",
          FR: "Atténuer les Hallucinations grâce aux Instructions Système",
        },
        body: {
          EN: "LLMs can confidently output incorrect information. To prevent this, use strict system instructions to define boundaries. Instruct the model to only use the provided context, to output empty values instead of guessing, and to follow strict deterministic rules.",
          FR: "Les LLM peuvent parfois générer des informations incorrectes avec assurance. Pour éviter cela, utilisez des instructions système strictes pour définir des limites claires et forcer le modèle à utiliser uniquement le contexte fourni.",
        },
      },
      {
        heading: {
          EN: "Optimizing API Latency",
          FR: "Optimisation de la Latence de l'API",
        },
        body: {
          EN: "LLM responses take time. To ensure a snappy user experience, process heavy AI tasks asynchronously using queues (like Celery or BullMQ) in the background. Inform the user that analysis is in progress via real-time web sockets, and update the UI once the structured results are computed.",
          FR: "Les réponses des LLM prennent du temps. Pour garantir une expérience utilisateur fluide, traitez les tâches d'IA lourdes de manière asynchrone en arrière-plan à l'aide de files d'attente. Informez l'utilisateur et mettez à jour l'interface en temps réel.",
        },
      },
    ],
  },
  {
    title: {
      EN: "Building with a Product Mindset: The Agile QA Approach",
      FR: "Bâtir avec un Product Mindset : l'Approche QA Agile",
    },
    excerpt: {
      EN: "How small, multi-disciplinary teams ship higher quality features faster by breaking down the walls between specifications, engineering, and testing.",
      FR: "Comment de petites équipes pluridisciplinaires livrent des fonctionnalités de meilleure qualité plus rapidement en brisant les murs entre spécifications, ingénierie et tests.",
    },
    category: "Product & Delivery",
    date: "Jul 10, 2025",
    readTime: {
      EN: "4 min read",
      FR: "4 min de lecture",
    },
    slug: "product-mindset-agile-qa",
    quote: {
      EN: "Agility is not about running faster; it is about building the right thing and having the automated safety net to adapt instantly to changes.",
      FR: "L'agilité ne consiste pas à courir plus vite ; elle consiste à construire la bonne chose tout en ayant le filet de sécurité automatisé pour s'adapter instantanément.",
    },
    introduction: {
      EN: "In high-growth startups and mature teams alike, the bottleneck is rarely coding speed—it is alignment. Shifting from project-based milestones to a continuous product mindset transforms how we specify, engineer, and release software.",
      FR: "Dans les startups comme dans les équipes de développement matures, le goulot d'authentification est rarement la vitesse de codage, mais l'alignement. Passer d'objectifs basés sur le projet à un état d'esprit produit continu transforme notre façon de spécifier, concevoir et livrer.",
    },
    sections: [
      {
        heading: {
          EN: "Focus on Value over Tickets",
          FR: "Se Concentrer sur la Valeur plutôt que sur les Tickets",
        },
        body: {
          EN: "Too often, development teams measure progress solely by sprint velocity or ticket completion rate. Real progress, however, is measured by customer value and code reliability. When QA analysts work side-by-side with developers from the start, they design features that are testable, accessible, and robust from the outset.",
          FR: "Trop souvent, les équipes mesurent leur progression uniquement au taux de tickets complétés. Le véritable progrès se mesure à la valeur client et à la fiabilité du code. Lorsque le QA travaille avec les développeurs dès le début, les fonctionnalités sont testables et robustes d'emblée.",
        },
      },
      {
        heading: {
          EN: "The 'Three Amigos' Spec Alignment",
          FR: "L'Alignement des Spécifications des 'Trois Amigos'",
        },
        body: {
          EN: "Before a single line of code is written, a meeting of the 'Three Amigos' (Product Manager, Developer, and QA) takes place to dissect specifications. PMs bring the business requirements, Developers bring the system constraints, and QA brings the edge cases. This collaboration eliminates logic flaws before they turn into bugs.",
          FR: "Avant d'écrire la moindre ligne de code, une réunion des 'Trois Amigos' (Chef de produit, Développeur et QA) permet de décortiquer les spécifications. Le PM apporte les exigences métier, le développeur les contraintes système et le QA les cas limites.",
        },
      },
      {
        heading: {
          EN: "Feedback Loops & Continuous Shipping",
          FR: "Boucles de Rétroaction & Livraison Continue",
        },
        body: {
          EN: "Agility requires short feedback loops. Daily deployments are only safe when protected by automated unit, integration, and E2E regression test suites. By embedding automated quality checks directly into the CI/CD pipeline, the team can ship updates with zero fear.",
          FR: "L'agilité nécessite des boucles de rétroaction courtes. Les déploiements quotidiens ne sont sûrs que s'ils sont protégés par des tests unitaires, d'intégration et E2E automatisés. Intégrer ces contrôles automatisés dans le pipeline de CI/CD permet de livrer sans crainte.",
        },
      },
    ],
  },
];
