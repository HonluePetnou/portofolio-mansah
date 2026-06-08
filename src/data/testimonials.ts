import { Bilingual } from "./experience";

export interface TestimonialData {
  quote: Bilingual<string>;
  name: string;
  designation: Bilingual<string>;
  src: string;
}

export const testimonialsData: TestimonialData[] = [
  {
    quote: {
      FR: "L'approche produit et le souci de la qualité de Frédéric ont fait une énorme différence dans la livraison de notre projet. Sa méthode BDD a permis de détecter les problèmes avant qu'ils n'arrivent en production — un ingénieur hors pair.",
      EN: "Frédéric's product mindset and attention to quality made a huge difference in our project delivery. His BDD approach caught issues before they reached production — a true quality-first engineer."
    },
    name: "Alexandre K.",
    designation: {
      FR: "Responsable de l'Ingénierie, SOLUTY",
      EN: "Engineering Manager, SOLUTY"
    },
    src: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1370&auto=format&fit=crop",
  },
  {
    quote: {
      FR: "Travailler avec Frédéric a été un plaisir. Son leadership technique et sa capacité à faire le pont entre les équipes produit et technique sont exceptionnels. Il livre toujours au-delà des attentes.",
      EN: "Working with Frédéric was a pleasure. His technical leadership and ability to bridge product and engineering teams is exceptional. He always delivers beyond expectations."
    },
    name: "Sarah M.",
    designation: {
      FR: "Chef d'Équipe, ADS LTD",
      EN: "Team Lead, ADS LTD"
    },
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop",
  },
  {
    quote: {
      FR: "Frédéric comprend que livrer des logiciels fiables va bien au-delà du simple code. Son approche axée sur la qualité et sa profonde empathie pour l'utilisateur final s'alignent parfaitement avec nos objectifs produit.",
      EN: "Frédéric understands that shipping reliable software is about more than just code. His quality-first approach and deep empathy for the user aligns perfectly with our product goals."
    },
    name: "Julien B.",
    designation: {
      FR: "Chef de Produit, MELOAUD",
      EN: "Product Manager, MELOAUD"
    },
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
  },
];
