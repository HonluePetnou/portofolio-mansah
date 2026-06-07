"use client";

import React, { useState, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Share2,
  X,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Minimal SVG icons for platforms missing from lucide ── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.78a4.85 4.85 0 0 1-1.02-.09z" />
  </svg>
);

const socials = [
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-armel-mansah-610bbb253/",
    className: "bg-[#0077B5] text-white hover:bg-[#005f8f]",
  },
  {
    Icon: Github,
    label: "GitHub",
    href: "https://github.com/HonluePetnou",
    className: "bg-[#24292e] dark:bg-[#f0f6ff] text-white dark:text-[#24292e] hover:opacity-90",
  },
  {
    Icon: Mail,
    label: "Email",
    href: "mailto:fredericarmel.mansah@gmail.com",
    className: "bg-brand-primary text-white hover:bg-brand-primary/90",
  },
  {
    Icon: Twitter,
    label: "Twitter / X",
    href: "https://twitter.com/",
    className: "bg-black text-white hover:bg-gray-800",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/",
    className: "bg-[#25D366] text-white hover:bg-[#1ebe57]",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    href: "https://instagram.com/",
    className: "bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white",
  },
  {
    Icon: TikTokIcon,
    label: "TikTok",
    href: "https://tiktok.com/",
    className: "bg-[#010101] text-white hover:bg-[#1a1a1a]",
  },
  {
    Icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com/",
    className: "bg-[#FF0000] text-white hover:bg-[#cc0000]",
  },
];


const toRadians = (deg: number) => (Math.PI / 180) * deg;

export function SocialFloat() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Ring dimensions
  const radius = 90;           // distance from center to icon center (bigger for 8 icons)
  const iconSize = 44;         // icon button size in px
  const totalIcons = socials.length;

  return (
    <div className="fixed bottom-6 right-6 z-50" aria-label="Social media links">
      {/* Spinning ring of social icons */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute bottom-0 right-0"
            style={{
              width: radius * 2 + iconSize,
              height: radius * 2 + iconSize,
              transform: `translate(${(radius * 2 + iconSize) / 2 - iconSize / 2}px, ${(radius * 2 + iconSize) / 2 - iconSize / 2}px)`,
            }}
          >
            {/* Rotating ring */}
            <div
              className="absolute inset-0 animate-spin-slow"
              style={{ transformOrigin: "center" }}
            >
              {socials.map((social, i) => {
                // Distribute icons evenly. Offset by -90° so first icon is at top.
                const angle = (360 / totalIcons) * i - 90;
                const rad = toRadians(angle);
                const cx = radius + iconSize / 2; // center x of container
                const cy = radius + iconSize / 2; // center y of container
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    style={{
                      position: "absolute",
                      width: iconSize,
                      height: iconSize,
                      top: cy + radius * Math.sin(rad) - iconSize / 2,
                      left: cx + radius * Math.cos(rad) - iconSize / 2,
                    }}
                    className={cn(
                      "flex items-center justify-center rounded-full shadow-lg border-2 border-white dark:border-gray-900 transition-transform duration-200 animate-spin-reverse",
                      social.className
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <button
        onClick={toggle}
        aria-label={open ? "Close social links" : "Open social links"}
        className={cn(
          "relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
          open
            ? "bg-foreground text-background scale-110"
            : "bg-brand-primary text-white hover:bg-brand-primary/90 hover:scale-110 shadow-[0_4px_24px_rgba(94,80,249,0.45)]"
        )}
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {open ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
        </motion.div>
      </button>
    </div>
  );
}
