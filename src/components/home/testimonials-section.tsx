"use client";

import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import type { Testimonial } from "@/components/ui/circular-testimonials";

const testimonials: Testimonial[] = [
  {
    quote:
      "Mansah's product mindset and attention to quality made a huge difference in our project delivery. His BDD approach caught issues before they reached production — a true quality-first engineer.",
    name: "Frédéric Mansah",
    designation: "Engineering Manager, SOLUTY",
    src: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1370&auto=format&fit=crop",
  },
  {
    quote:
      "Working with Mansah was a pleasure. His technical leadership and ability to bridge product and engineering teams is exceptional. He always delivers beyond expectations.",
    name: "Team Lead",
    designation: "Engineering Manager, ADS LTD",
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop",
  },
  {
    quote:
      "Mansah understands that shipping reliable software is about more than just code. His quality-first approach and deep empathy for the user aligns perfectly with our product goals.",
    name: "Project Manager",
    designation: "Product Manager, MELOAUD",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
  },
];

export function TestimonialsSection() {
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
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            What Clients &amp; Colleagues Say
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Real words from people I&apos;ve shipped products with.
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
