"use client";

import React, { useState, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Plus,
  X,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
];

const toRadians = (deg: number) => (Math.PI / 180) * deg;

export function SocialFloat() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Ring dimensions
  const radius = 72;           // distance from center to icon center
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
            ? "bg-foreground text-background rotate-45 scale-110"
            : "bg-brand-primary text-white hover:bg-brand-primary/90 hover:scale-110 shadow-[0_4px_24px_rgba(94,80,249,0.45)]"
        )}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {open ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </motion.div>
      </button>
    </div>
  );
}
