"use client";

import { useLanguage } from "@/context/language-context";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import type { Testimonial } from "@/components/ui/circular-testimonials";

export function TestimonialsSection() {
  const { lang } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      quote: lang === "FR"
        ? "L'approche produit et le souci de la qualité de Frédéric ont fait une énorme différence dans la livraison de notre projet. Sa méthode BDD a permis de détecter les problèmes avant qu'ils n'arrivent en production — un ingénieur hors pair."
        : "Frédéric's product mindset and attention to quality made a huge difference in our project delivery. His BDD approach caught issues before they reached production — a true quality-first engineer.",
      name: "Alexandre K.",
      designation: lang === "FR" ? "Responsable de l'Ingénierie, SOLUTY" : "Engineering Manager, SOLUTY",
      src: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1370&auto=format&fit=crop",
    },
    {
      quote: lang === "FR"
        ? "Travailler avec Frédéric a été un plaisir. Son leadership technique et sa capacité à faire le pont entre les équipes produit et technique sont exceptionnels. Il livre toujours au-delà des attentes."
        : "Working with Frédéric was a pleasure. His technical leadership and ability to bridge product and engineering teams is exceptional. He always delivers beyond expectations.",
      name: "Sarah M.",
      designation: lang === "FR" ? "Chef d'Équipe, ADS LTD" : "Team Lead, ADS LTD",
      src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop",
    },
    {
      quote: lang === "FR"
        ? "Frédéric comprend que livrer des logiciels fiables va bien au-delà du simple code. Son approche axée sur la qualité et sa profonde empathie pour l'utilisateur final s'alignent parfaitement avec nos objectifs produit."
        : "Frédéric understands that shipping reliable software is about more than just code. His quality-first approach and deep empathy for the user aligns perfectly with our product goals.",
      name: "Julien B.",
      designation: lang === "FR" ? "Chef de Produit, MELOAUD" : "Product Manager, MELOAUD",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="testimonials"
      className="section-py gap-y-md scroll-mt-20 overflow-hidden bg-brand-alt border-t border-b border-gray-100/50 dark:border-white/5"
    >
      <div className="container">

        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            {lang === "FR" ? "TÉMOIGNAGES" : "TESTIMONIALS"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {lang === "FR" ? "Avis Clients & Collaborateurs" : "What Clients & Colleagues Say"}
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            {lang === "FR"
              ? "Retours d'expérience de personnes avec qui j'ai développé et livré des produits."
              : "Real words from people I've shipped products with."}
          </p>
        </div>

        {/* Light mode wrapper */}
        <div className="flex justify-center dark:hidden">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#09090b",
              designation: "#5E50F9",
              testimony: "#3f3f46",
              arrowBackground: "#09090b",
              arrowForeground: "#f8fafc",
              arrowHoverBackground: "#5E50F9",
            }}
            fontSizes={{
              name: "1.4rem",
              designation: "0.875rem",
              quote: "1rem",
            }}
          />
        </div>

        {/* Dark mode wrapper */}
        <div className="justify-center hidden dark:flex">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#f8fafc",
              designation: "#39FF14",
              testimony: "#d1d5db",
              arrowBackground: "#1B1A24",
              arrowForeground: "#f8fafc",
              arrowHoverBackground: "#5E50F9",
            }}
            fontSizes={{
              name: "1.4rem",
              designation: "0.875rem",
              quote: "1rem",
            }}
          />
        </div>

      </div>
    </section>
  );
}
