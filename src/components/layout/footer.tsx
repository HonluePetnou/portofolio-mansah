"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Mail,
  Linkedin,
  Github,
  Youtube,
  Twitter,
  MessageCircle,
  Facebook,
  Heart,
  Sun,
  Moon,
  ArrowUp,
} from "lucide-react";

/* ── Inline SVG icons not available in lucide ── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.78a4.85 4.85 0 0 1-1.02-.09z" />
  </svg>
);

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const iconLink = "hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-all duration-200 hover:border-brand-primary dark:hover:border-brand-accent text-foreground/60 hover:text-brand-primary dark:hover:text-brand-accent";

const navigation = [
  {
    title: "Navigate",
    items: [
      { name: "Home", href: "/" },
      { name: "About", href: "/#about" },
      { name: "Services", href: "/#services" },
      { name: "Works", href: "/#projects" },
    ],
  },
  {
    title: "More",
    items: [
      { name: "Experience", href: "/#experience" },
      { name: "Blog", href: "/#blog" },
      { name: "Contact", href: "/#contact" },
      { name: "Testimonials", href: "/#testimonials" },
    ],
  },
  {
    title: "Services",
    items: [
      { name: "Frontend Architecture", href: "/#services" },
      { name: "QA & Automation", href: "/#services" },
      { name: "Full Stack & AI", href: "/#services" },
      { name: "Tech Consulting", href: "/#services" },
    ],
  },
  {
    title: "Stack",
    items: [
      { name: "React / Next.js", href: "/#services" },
      { name: "TypeScript", href: "/#services" },
      { name: "Python / FastAPI", href: "/#services" },
      { name: "Playwright / Jest", href: "/#services" },
    ],
  },
  {
    title: "Connect",
    items: [
      { name: "LinkedIn", href: "https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-armel-mansah-610bbb253/" },
      { name: "GitHub", href: "https://github.com/HonluePetnou" },
      { name: "Email", href: "mailto:fredericarmel.mansah@gmail.com" },
      { name: "WhatsApp", href: "https://wa.me/" },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Use", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
      { name: "Hire Me", href: "/#contact" },
    ],
  },
];

function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-full border border-dotted border-foreground/20 px-1 py-1 gap-1">
        <button
          onClick={() => setTheme("light")}
          className="rounded-full p-2 bg-foreground text-background transition-colors hover:bg-brand-primary hover:text-white"
          aria-label="Light mode"
        >
          <Sun className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={scrollTop}
          className="px-3 py-2 text-foreground/50 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-3 w-3" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="rounded-full p-2 bg-foreground text-background transition-colors hover:bg-brand-primary hover:text-white"
          aria-label="Dark mode"
        >
          <Moon className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-b border-foreground/10 bg-[#060608] dark:bg-[#060608]">

      {/* ── Top: Logo + Bio ── */}
      <div className="mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex">
        <Link href="/" className="flex items-center justify-center shrink-0">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Mansah
            <span className="inline-block ml-1 h-2 w-2 rounded-full bg-brand-accent align-middle" />
          </span>
        </Link>
        <p className="max-w-xl text-center text-xs leading-5 text-white/40 md:text-left">
          Frédéric Armel Mansah — Senior Frontend Engineer &amp; QA Specialist.
          Product-oriented engineer combining technical expertise with a quality-first mindset.
          Currently pursuing an engineering degree at ENSPD (2022–2027), bridging computer science
          principles with state-of-the-art web architectures. Available for freelance &amp; collaborations.
        </p>
      </div>

      {/* ── Nav grid ── */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-dotted border-white/10 mb-10" />
        <div className="grid grid-cols-3 gap-6 leading-6 md:flex md:justify-between">
          {navigation.map((section) => (
            <div key={section.title}>
              <p className="mb-3 text-[10px] font-bold tracking-widest uppercase text-white/30">
                {section.title}
              </p>
              <ul className="flex flex-col space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-white/50 hover:text-white transition-colors"
                      {...(item.href.startsWith("http") || item.href.startsWith("mailto")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-b border-dotted border-white/10 mt-10" />
      </div>

      {/* ── Social icons + Theme toggle ── */}
      <div className="flex flex-col items-center gap-6 pb-6">
        <div className="flex flex-wrap items-center justify-center gap-4 px-6">
          <Link href="mailto:fredericarmel.mansah@gmail.com" aria-label="Email" className={iconLink}>
            <Mail className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link href="https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-armel-mansah-610bbb253/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
            <Linkedin className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link href="https://github.com/HonluePetnou" target="_blank" rel="noreferrer" aria-label="GitHub" className={iconLink}>
            <Github className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter / X" className={iconLink}>
            <Twitter className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className={iconLink}>
            <InstagramIcon />
          </Link>
          <Link href="https://tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok" className={iconLink}>
            <TikTokIcon />
          </Link>
          <Link href="https://youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className={iconLink}>
            <Youtube className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp" className={iconLink}>
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link href="https://facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className={iconLink}>
            <Facebook className="h-5 w-5" strokeWidth={1.5} />
          </Link>
        </div>
        <ThemeToggle />
      </div>

      {/* ── Copyright ── */}
      <div className="mx-auto mb-10 mt-4 flex flex-col items-center justify-center text-center text-xs text-white/30 max-w-7xl gap-1">
        <div className="flex flex-row items-center justify-center gap-1">
          <span>©</span>
          <span>{new Date().getFullYear()}</span>
          <span>Made with</span>
          <Heart className="mx-1 h-3.5 w-3.5 text-brand-accent animate-pulse" fill="currentColor" />
          <span>by</span>
          <Link
            href="https://github.com/HonluePetnou"
            target="_blank"
            className="font-bold text-white/60 hover:text-white transition-colors"
          >
            Frédéric Armel Mansah
          </Link>
        </div>
        <p className="text-white/20">All rights reserved.</p>
      </div>

    </footer>
  );
}
