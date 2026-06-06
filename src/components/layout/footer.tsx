"use client";

import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full relative py-20 overflow-hidden border-t border-white/5 bg-[#060608] dark:bg-[#121216]">
      
      {/* Concentric Circles Background Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[260px] h-[260px] rounded-full border border-white/[0.015] absolute" />
        <div className="w-[480px] h-[480px] rounded-full border border-white/[0.015] absolute" />
        <div className="w-[700px] h-[700px] rounded-full border border-white/[0.015] absolute" />
        <div className="w-[920px] h-[920px] rounded-full border border-white/[0.015] absolute" />
      </div>

      <div className="container flex flex-col items-center justify-center text-center relative z-10 space-y-8">
        
        {/* Contact Info Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-brand-accent text-xs font-bold tracking-widest uppercase justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            GET IN TOUCH
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Get in Touch With Me
          </h2>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-accent" />
            <span>Douala, Cameroon</span>
          </div>
          <a href="mailto:contact@example.com" className="flex items-center gap-2 hover:text-brand-accent transition-colors">
            <Mail className="w-4 h-4 text-brand-accent" />
            <span>contact@example.com</span>
          </a>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-accent" />
            <span>+237 6xx xxx xxx</span>
          </div>
        </div>

        {/* Social Icons row */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:contact@example.com"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-primary hover:border-brand-primary transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 w-full max-w-md text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Honlue Petnou Frederic Armel. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
