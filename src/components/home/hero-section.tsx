"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FourPointStar } from "@/components/ui/four-point-star";
import { useLanguage } from "@/context/language-context";

export function HeroSection() {
  const { t, lang } = useLanguage();

  const stats = [
    { value: "10+", label: t("hero.stats.projects") },
    { value: "4+", label: t("hero.stats.experience") },
    { value: "100%", label: t("hero.stats.satisfaction") },
    { value: "3+", label: t("hero.stats.companies") },
  ];

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-[75vh] -mt-12 pt-20 pb-12 gap-y-6 scroll-mt-20 overflow-hidden"
    >
      {/* Background Dots Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none z-0" />
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="container relative z-10 w-full grow flex items-center">
        <div className="grid lg:grid-cols-12 gap-16 items-center w-full py-2 lg:py-4">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
              {t("hero.badge")}
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              {t("hero.intro")}{" "}
              <span className="text-brand-primary dark:text-brand-accent relative inline-block">
                Frédéric
              </span>
              . {t("hero.tagline")}
            </h1>

            {/* Paragraph Description */}
            <p className="text-lg text-muted-foreground dark:text-gray-400 leading-relaxed max-w-xl">
              {t("hero.experience")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-4 w-full">
              <Link href="/#contact">
                <button className="group flex items-center gap-3 px-8 py-4 rounded-lg bg-brand-primary text-white font-bold text-sm tracking-wider uppercase hover:bg-brand-primary/95 transition-all shadow-[0_4px_20px_rgba(94,80,249,0.3)]">
                  {t("hero.ctaTalk")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <a
                href={lang === "FR" ? "/resume-fr.pdf" : "/resume-en.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                download={lang === "FR" ? "CV_PETNOU_HONLUE_FREDERIC_ARMEL_FR.pdf" : "CV_PETNOU_HONLUE_FREDERIC_ARMEL_EN.pdf"}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand-primary dark:hover:text-brand-accent transition-colors group"
              >
                <Download className="w-4 h-4 text-brand-primary group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors" />
                {t("hero.ctaCv")}
              </a>
            </div>
          </motion.div>

          {/* Right Side: Circular Graphic inspired by light theme design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full max-w-[380px] md:max-w-[460px] aspect-square mx-auto lg:ml-auto flex items-center justify-center"
          >
            {/* Background Circle Glow */}
            <div className="absolute w-[110%] h-[110%] rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 blur-[80px] -z-10" />

            {/* Main Outer Dotted/Line Circle */}
            <div className="absolute inset-0 rounded-full border border-brand-primary/15 dark:border-white/10 bg-brand-primary/2 dark:bg-brand-primary/4" />

            {/* Outline nodes/dots on the outer circle */}
            <div className="absolute top-[15%] left-[2%] w-3.5 h-3.5 rounded-full bg-brand-primary animate-pulse" />
            <div className="absolute top-[38%] -right-1.5 w-3.5 h-3.5 rounded-full bg-brand-primary" />
            <div className="absolute bottom-[18%] right-[2%] w-3.5 h-3.5 rounded-full bg-brand-primary" />

            {/* Outline 4-point star on the outer circle */}
            <div className="absolute top-[4%] right-[15%] z-20">
              <FourPointStar size={24} color="purple" glow={false} />
            </div>

            {/* Floating violet triangle at the bottom left */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="absolute bottom-[-12px] left-[15%] text-brand-primary fill-brand-primary animate-float z-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 22H22L12 2Z" />
            </svg>

            {/* Inner profile image circle */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-[86%] aspect-square rounded-full overflow-hidden border border-brand-primary/10 bg-gray-100 dark:bg-[#1A1A1F] shadow-2xl flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,8,0.3)_0%,transparent_50%)] z-10" />
              <Image
                src="/me-selfie.png"
                alt="Frédéric Armel (Mansah)"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
                priority
              />
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Stats banner (Bottom) - theme responsive */}
      <div className="w-full bg-[#F5F3FF] dark:bg-brand-primary relative py-12 overflow-hidden border-t border-b border-gray-100 dark:border-white/10">
        {/* Wavy Background Overlay */}
        <div className="absolute inset-0 wavy-bg opacity-10 dark:opacity-20 pointer-events-none" />
        
        {/* Decorative Wave SVG Path */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 opacity-15 dark:opacity-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white dark:fill-brand-dark"></path>
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-1">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-primary dark:text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 dark:text-white/70 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
