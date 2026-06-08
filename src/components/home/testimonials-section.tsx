"use client";

import { useLanguage } from "@/context/language-context";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import type { Testimonial } from "@/components/ui/circular-testimonials";
import { testimonialsData as staticTestimonials } from "@/data/testimonials";
import { urlFor } from "@/sanity/lib/image";

interface TestimonialsSectionProps {
  testimonials?: any[];
}

export function TestimonialsSection({ testimonials: propTestimonials = [] }: TestimonialsSectionProps) {
  const { lang } = useLanguage();

  const rawTestimonials = propTestimonials.length > 0 ? propTestimonials : staticTestimonials;

  const testimonials: Testimonial[] = rawTestimonials.map((t) => ({
    name: t.name,
    designation: typeof t.designation === "string" ? t.designation : t.designation[lang],
    quote: typeof t.quote === "string" ? t.quote : t.quote[lang],
    src: t.avatar ? urlFor(t.avatar).url() : t.src || "",
  }));

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
