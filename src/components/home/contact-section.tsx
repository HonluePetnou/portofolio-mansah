"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send, ArrowRight } from "lucide-react";
import { ScaleIn } from "@/lib/animations";
import { FourPointStar } from "@/components/ui/four-point-star";
import Link from "next/link";

import { useLanguage } from "@/context/language-context";

export function ContactSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="contact" className="section-py scroll-mt-20 overflow-hidden bg-brand-alt border-t border-b border-gray-100/50 dark:border-white/5">
      <div className="container">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-widest uppercase mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary dark:bg-brand-accent" />
            {t("contact.title")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {lang === "FR" ? "Collaborons Ensemble" : "Let's Collaborate"}
          </h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            {lang === "FR"
              ? "Vous avez un projet en tête ? Vous voulez discuter de la façon dont nous pouvons améliorer la qualité et la vitesse de livraison de votre produit ? Contactez-moi."
              : "Have a project in mind? Want to discuss how we can improve your product quality and velocity? Get in touch."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch mb-20">
          
          {/* Contact Info Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-card-bg-alt p-8 shadow-sm dark:shadow-xl">
            <div className="space-y-6 text-left">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {lang === "FR" ? "Coordonnées de Contact" : "Contact Information"}
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:fredericarmel.mansah@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-white/5 group-hover:border-brand-primary/30 dark:group-hover:border-brand-accent/30 transition-colors text-foreground dark:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-sm">fredericarmel.mansah@gmail.com</span>
                </a>
                
                <a
                  href="https://linkedin.com/in/frederic-armel-mansah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-white/5 group-hover:border-brand-primary/30 dark:group-hover:border-brand-accent/30 transition-colors text-foreground dark:text-white">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{lang === "FR" ? "Profil LinkedIn" : "LinkedIn Profile"}</span>
                </a>
                
                <a
                  href="https://github.com/HonluePetnou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-white/5 group-hover:border-brand-primary/30 dark:group-hover:border-brand-accent/30 transition-colors text-foreground dark:text-white">
                    <Github className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{lang === "FR" ? "Profil GitHub" : "GitHub Profile"}</span>
                </a>
                
                <div className="flex items-center gap-4 text-muted-foreground dark:text-gray-400">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-brand-dark border border-gray-200 dark:border-white/5 text-foreground dark:text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{lang === "FR" ? "Douala, Cameroun (GMT+1)" : "Douala, Cameroon (GMT+1)"}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-left">
              <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">
                <strong className="text-foreground">
                  {lang === "FR" ? "Disponible pour le télétravail dans le monde entier." : "Available for remote work worldwide."}
                </strong>
                <br />
                {lang === "FR" 
                  ? "Ouvert aux opportunités à temps plein, aux contrats et aux audits de conseil technique."
                  : "Open to full-time roles, contracts, and software architecture consultancies."}
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-card-bg-alt p-8 shadow-sm dark:shadow-xl">
            <h3 className="text-xl font-bold text-foreground mb-6 text-left">
              {lang === "FR" ? "Envoyer un Message" : "Send a Message"}
            </h3>
            <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-3 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-inner"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-3 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-inner"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-3 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none shadow-inner"
                  placeholder={lang === "FR" ? "Parlez-moi de votre projet..." : "Tell me about your project..."}
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-brand-primary text-white font-bold text-xs tracking-wider uppercase hover:bg-brand-primary/95 transition-all shadow-[0_4px_14px_rgba(94,80,249,0.3)]"
              >
                {t("contact.send")} <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Purple Call-To-Action Banner */}
        <motion.div
          variants={ScaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto rounded-3xl bg-brand-primary relative py-16 px-8 overflow-hidden border border-white/10 shadow-2xl mt-12 flex flex-col items-center justify-center text-center space-y-6"
        >
          {/* Wave Background Overlay */}
          <div className="absolute inset-0 wavy-bg opacity-20 pointer-events-none" />
          
          {/* Floating Stars */}
          <div className="absolute top-6 left-10">
            <FourPointStar size={28} color="white" />
          </div>
          <div className="absolute bottom-6 right-12">
            <FourPointStar size={36} color="green" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-tight relative z-10">
            {lang === "FR" 
              ? "Découvrez comment la qualité et le code propulsent votre entreprise" 
              : "Discover How Quality & Code Can Drive Your Business"}
          </h2>

          {/* Button */}
          <div className="relative z-10 pt-4">
            <Link href="/#contact">
              <button className="flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-brand-primary hover:bg-white/95 font-extrabold text-xs tracking-wider uppercase shadow-xl transition-all">
                {lang === "FR" ? "ME RECRUTER" : "HIRE ME"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
