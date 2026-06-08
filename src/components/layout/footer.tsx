"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="w-full bg-brand-dark dark:bg-[#121216] text-white border-t border-white/5 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Top section: Main Info & Links */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8">
          
          {/* Brand and Description */}
          <div className="space-y-3 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <img
                src={mounted && !isDark ? "/logo-purple.png" : "/logo-green.png"}
                alt="Mansah Logo"
                className="w-6 h-6 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-white hover:text-white/80 transition-colors">
                Mansah
              </span>
            </Link>
            <p className="text-xs text-white/40 leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          {/* Quick Links & Status */}
          <div className="flex flex-col md:items-end gap-4">
            {/* Navigation links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <Link href="/#about" className="text-white/50 hover:text-white transition-colors">{t("nav.about")}</Link>
              <Link href="/#services" className="text-white/50 hover:text-white transition-colors">{t("nav.services")}</Link>
              <Link href="/#projects" className="text-white/50 hover:text-white transition-colors">{t("nav.works")}</Link>
              <Link href="/#contact" className="text-white/50 hover:text-white transition-colors">{t("nav.contact")}</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 w-full" />

        {/* Bottom section: Copyright and Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-[11px] text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} Frédéric Armel Petnou. {t("footer.allRights")}
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
                className="text-white/30 hover:text-white hover:scale-105 transition-all duration-200"
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
