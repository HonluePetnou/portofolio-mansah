"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Youtube } from "lucide-react";

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

const socials = [
  { Icon: Github,       href: "https://github.com/HonluePetnou",                                          label: "GitHub" },
  { Icon: Linkedin,     href: "https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-armel-mansah-610bbb253/", label: "LinkedIn" },
  { Icon: Twitter,      href: "https://twitter.com/",                                                     label: "Twitter" },
  { Icon: InstagramIcon,href: "https://instagram.com/",                                                   label: "Instagram" },
  { Icon: TikTokIcon,   href: "https://tiktok.com/",                                                      label: "TikTok" },
  { Icon: Youtube,      href: "https://youtube.com/",                                                     label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#060608] text-black dark:text-white border-t border-black/5 dark:border-white/5 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Top section: Main Info & Links */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8">
          
          {/* Brand and Description */}
          <div className="space-y-3 max-w-sm">
            <Link href="/" className="flex items-center gap-1.5 w-fit group">
              <span className="text-lg font-bold tracking-tight text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors">
                Mansah
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
            </Link>
            <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
              Senior Frontend Engineer & QA Specialist. Building interactive, high-performance web products with clean code.
            </p>
          </div>

          {/* Quick Links & Status */}
          <div className="flex flex-col md:items-end gap-4">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/10 dark:border-emerald-500/10 rounded-full px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/80 dark:bg-emerald-400/80 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 dark:bg-emerald-400"></span>
              </span>
              <span>Available for projects</span>
            </div>

            {/* Navigation links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <Link href="/#about" className="text-gray-500 hover:text-black dark:text-white/50 dark:hover:text-white transition-colors">About</Link>
              <Link href="/#services" className="text-gray-500 hover:text-black dark:text-white/50 dark:hover:text-white transition-colors">Services</Link>
              <Link href="/#projects" className="text-gray-500 hover:text-black dark:text-white/50 dark:hover:text-white transition-colors">Works</Link>
              <Link href="/#contact" className="text-gray-500 hover:text-black dark:text-white/50 dark:hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-black/5 dark:bg-white/5 w-full" />

        {/* Bottom section: Copyright and Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-[11px] text-gray-400 dark:text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} Frédéric Armel Mansah. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-black dark:text-white/30 dark:hover:text-white hover:scale-105 dark:hover:scale-105 transition-all duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
