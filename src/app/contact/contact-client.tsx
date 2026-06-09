"use client";

import { useLanguage } from "@/context/language-context";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Mail, Linkedin, Github, Phone, MapPin } from "lucide-react";
import { ContactFormClient } from "./contact-form-client";

export function ContactClientPage() {
  const { lang } = useLanguage();

  return (
    <div className="container section-py max-w-4xl">
      <SectionHeader
        title={lang === "FR" ? "Collaborons Ensemble" : "Let's Collaborate"}
        subtitle={
          lang === "FR"
            ? "Ouvert aux nouvelles opportunités et aux défis techniques."
            : "Open to new opportunities and technical challenges."
        }
      />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <GlassCard className="p-8 text-left">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {lang === "FR" ? "Me Contacter" : "Get in Touch"}
            </h3>
            <p className="text-muted-foreground dark:text-gray-400 mb-6 text-sm leading-relaxed">
              {lang === "FR"
                ? "Je suis toujours intéressé à discuter de développement de solutions, d'architectures logicielles, de cybersécurité, de réseaux ou de nouveaux projets."
                : "I'm always interested in discussing software solutions, system architecture, cybersecurity, networking, or new projects."}
            </p>
            <div className="space-y-4">
              <a
                href="mailto:honluepetnou@gmail.com"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors text-sm"
              >
                <div className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground dark:text-white">
                  <Mail className="h-4 w-4" />
                </div>
                <span>honluepetnou@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/honlue-petnou-1299a1287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors text-sm"
              >
                <div className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground dark:text-white">
                  <Linkedin className="h-4 w-4" />
                </div>
                <span>{lang === "FR" ? "Profil LinkedIn" : "LinkedIn Profile"}</span>
              </a>
              <a
                href="https://github.com/HonluePetnou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors text-sm"
              >
                <div className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground dark:text-white">
                  <Github className="h-4 w-4" />
                </div>
                <span>{lang === "FR" ? "Profil GitHub" : "GitHub Profile"}</span>
              </a>
              <a
                href="tel:+237675712103"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors text-sm"
              >
                <div className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground dark:text-white">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+237 675 71 21 03 / +237 655 51 84 88</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 text-sm">
                <div className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground dark:text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>{lang === "FR" ? "Douala, Cameroun (GMT+1)" : "Douala, Cameroon (GMT+1)"}</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <p className="text-xs md:text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
              <strong className="text-foreground">
                {lang === "FR" ? "Disponible pour le télétravail dans le monde entier." : "Available for remote work worldwide."}
              </strong>
              <br />
              {lang === "FR"
                ? "Ouvert aux opportunités à temps plein, aux contrats et aux audits de conseil technique."
                : "Open to full-time roles, contracts, and software architecture consultancies."}
            </p>
          </GlassCard>
        </div>

        {/* Contact Form Client */}
        <ContactFormClient />
      </div>
    </div>
  );
}
