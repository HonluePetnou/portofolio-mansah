"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter, Youtube, MapPin } from "lucide-react";

/* ── Tiny inline SVGs (not in lucide) ── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.78a4.85 4.85 0 0 1-1.02-.09z"/>
  </svg>
);

/* ── Data ── */
const navCols = [
  {
    label: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/#about" },
      { name: "Services", href: "/#services" },
      { name: "Works", href: "/#projects" },
      { name: "Blog", href: "/#blog" },
    ],
  },
  {
    label: "Services",
    links: [
      { name: "Frontend Architecture", href: "/#services" },
      { name: "QA & Automation", href: "/#services" },
      { name: "Full Stack & AI", href: "/#services" },
      { name: "Tech Consulting", href: "/#contact" },
    ],
  },
  {
    label: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Use", href: "/terms" },
      { name: "Hire Me", href: "/#contact" },
    ],
  },
];

const socials = [
  { Icon: Github,       href: "https://github.com/HonluePetnou",                                          label: "GitHub" },
  { Icon: Linkedin,     href: "https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-armel-mansah-610bbb253/", label: "LinkedIn" },
  { Icon: Twitter,      href: "https://twitter.com/",                                                     label: "Twitter" },
  { Icon: InstagramIcon,href: "https://instagram.com/",                                                   label: "Instagram" },
  { Icon: TikTokIcon,   href: "https://tiktok.com/",                                                      label: "TikTok" },
  { Icon: Youtube,      href: "https://youtube.com/",                                                      label: "YouTube" },
];

const marqueeItems = [
  "React", "Next.js", "TypeScript", "Tailwind CSS",
  "Playwright", "Jest", "FastAPI", "Python",
  "Spring Boot", "Gemini AI", "CI/CD", "BDD",
];

/* ── Marquee strip ── */
function Marquee() {
  const repeated = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-white/5 py-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-white/20">
            <span className="h-1 w-1 rounded-full bg-brand-accent inline-block" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Main Footer ── */
export function Footer() {
  return (
    <footer className="w-full bg-[#060608] text-white">

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Main body ── */}
      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-[1fr_auto] gap-16 items-start">

        {/* Left — Big statement + CTA */}
        <div className="space-y-10">

          {/* Availability pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60">
            <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            Available for new projects
          </div>

          {/* Statement */}
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
              Let&apos;s build<br />
              <span className="text-brand-accent">something</span><br />
              remarkable.
            </h2>
          </div>

          {/* Email CTA */}
          <a
            href="mailto:fredericarmel.mansah@gmail.com"
            className="group inline-flex items-center gap-3 text-sm md:text-base font-medium text-white/40 hover:text-white transition-colors duration-300"
          >
            <Mail className="w-4 h-4 shrink-0 text-brand-accent" />
            fredericarmel.mansah@gmail.com
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
          </a>

          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-white/25">
            <MapPin className="w-3.5 h-3.5" />
            Douala, Cameroon · UTC+1
          </div>

          {/* Start project button */}
          <Link href="/#contact">
            <button className="group mt-2 inline-flex items-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 text-sm font-bold tracking-wide text-white hover:bg-brand-primary/90 transition-all shadow-[0_8px_30px_rgba(94,80,249,0.35)] hover:shadow-[0_8px_40px_rgba(94,80,249,0.5)] hover:scale-105">
              Start a Project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
        </div>

        {/* Right — Nav columns */}
        <div className="grid grid-cols-3 gap-x-12 gap-y-8 lg:gap-x-16 pt-2">
          {navCols.map((col) => (
            <div key={col.label}>
              <p className="mb-4 text-[10px] font-bold tracking-widest uppercase text-white/25">
                {col.label}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-white/5" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left — copyright */}
        <p className="text-xs text-white/25 order-2 sm:order-1">
          © {new Date().getFullYear()} Frédéric Armel Mansah. All rights reserved.
        </p>

        {/* Center — wordmark */}
        <Link href="/" className="flex items-center gap-1 order-1 sm:order-2">
          <span className="text-sm font-extrabold tracking-tight text-white/60 hover:text-white transition-colors">
            Mansah
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
        </Link>

        {/* Right — Social icons */}
        <div className="flex items-center gap-3 order-3">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/30 hover:text-white transition-colors duration-200"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}
