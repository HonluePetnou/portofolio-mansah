"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, User } from "lucide-react";
import { FourPointStar } from "@/components/ui/four-point-star";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Mansah",
    role: "Engineering Manager, SOLUTY",
    content: "Mansah's product mindset and attention to quality made a huge difference in our project delivery. His BDD approach caught issues before they reached production.",
    rating: 5,
    avatar: "",
  },
  {
    name: "Team Lead",
    role: "Engineering Manager, ADS LTD",
    content: "Working with Mansah was a pleasure. His technical leadership and ability to bridge product and engineering teams is exceptional.",
    rating: 5,
    avatar: "",
  },
  {
    name: "Project Manager",
    role: "Product Manager, MELOAUD",
    content: "Mansah understands that shipping reliable software is about more than just code. His quality-first approach aligns perfectly with product goals.",
    rating: 5,
    avatar: "",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="section-py gap-y-md scroll-mt-20 overflow-hidden bg-brand-alt border-t border-b border-gray-100/50 dark:border-white/5">
      <div className="container">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            What Clients & Colleagues Say
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Testimonial content block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <Quote className="w-12 h-12 text-brand-primary opacity-40" />

            <div className="min-h-[160px] relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200 italic leading-relaxed">
                    "{testimonials[activeIndex].content}"
                  </p>
                  
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <span key={i} className="text-brand-primary dark:text-brand-accent text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Client Meta */}
                  <div className="flex items-center gap-3 pt-4">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center overflow-hidden">
                      <User className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Decorative Avatar collage with dotted lines */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] w-full">
            
            {/* Curved Dotted Connecting Line (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none stroke-gray-200 dark:stroke-white/10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 100 250 C 120 120, 220 80, 320 110"
                strokeDasharray="6 6"
                strokeWidth="2"
              />
              <path
                d="M 320 110 C 260 220, 180 280, 250 290"
                strokeDasharray="6 6"
                strokeWidth="2"
              />
            </svg>

            {/* Overlapping interactive testimonial cards */}
            
            {/* Card 1: Top Right */}
            <div
              onClick={() => setActiveIndex(0)}
              className={cn(
                "absolute top-4 right-12 w-32 h-32 rounded-2xl border bg-white dark:bg-card-bg-alt flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 shadow-md dark:shadow-xl",
                activeIndex === 0
                  ? "border-brand-primary dark:border-brand-accent scale-105"
                  : "border-gray-100 dark:border-white/5 opacity-70 hover:opacity-100 hover:scale-102"
              )}
            >
              <div className="h-10 w-10 rounded-full bg-brand-primary/10 dark:bg-brand-primary/25 border border-brand-primary/20 flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-brand-primary dark:text-white">M1</span>
              </div>
              <h5 className="font-bold text-[10px] text-foreground text-center truncate w-full">Frédéric Mansah</h5>
              <p className="text-[8px] text-muted-foreground dark:text-gray-400 truncate w-full text-center">SOLUTY</p>
            </div>

            {/* Card 2: Lower Left */}
            <div
              onClick={() => setActiveIndex(1)}
              className={cn(
                "absolute bottom-12 left-6 w-36 h-36 rounded-2xl border bg-white dark:bg-card-bg-alt flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 shadow-md dark:shadow-xl",
                activeIndex === 1
                  ? "border-brand-primary dark:border-brand-accent scale-105"
                  : "border-gray-100 dark:border-white/5 opacity-70 hover:opacity-100 hover:scale-102"
              )}
            >
              <div className="h-12 w-12 rounded-full bg-brand-primary/10 dark:bg-brand-accent/20 border border-brand-primary/20 dark:border-brand-accent/20 flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-brand-primary dark:text-brand-accent">TL</span>
              </div>
              <h5 className="font-bold text-xs text-foreground text-center truncate w-full">Team Lead</h5>
              <p className="text-[9px] text-muted-foreground dark:text-gray-400 truncate w-full text-center">ADS LTD</p>
            </div>

            {/* Card 3: Lower Right */}
            <div
              onClick={() => setActiveIndex(2)}
              className={cn(
                "absolute bottom-2 right-6 w-32 h-32 rounded-2xl border bg-white dark:bg-card-bg-alt flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 shadow-md dark:shadow-xl",
                activeIndex === 2
                  ? "border-brand-primary dark:border-brand-accent scale-105"
                  : "border-gray-100 dark:border-white/5 opacity-70 hover:opacity-100 hover:scale-102"
              )}
            >
              <div className="h-10 w-10 rounded-full bg-brand-primary/10 dark:bg-brand-primary/25 border border-brand-primary/20 flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-brand-primary dark:text-white">PM</span>
              </div>
              <h5 className="font-bold text-[10px] text-foreground text-center truncate w-full">Project Manager</h5>
              <p className="text-[8px] text-muted-foreground dark:text-gray-400 truncate w-full text-center">MELOAUD</p>
            </div>

            {/* Floating green/purple star decoration */}
            <div className="absolute top-[45%] left-[40%] z-20">
              <FourPointStar size={28} color="green" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
