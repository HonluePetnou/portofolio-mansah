import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Mansah - Honlue Petnou Frederic Armel",
  description:
    "Get in touch with Mansah (Honlue Petnou Frederic Armel) for collaborations, opportunities, or technical discussions.",
};

export default function ContactPage() {
  return (
    <div className="container section-py max-w-4xl">
      <SectionHeader
        title="Let's Collaborate"
        subtitle="Open to new opportunities and technical challenges."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Get in Touch</h3>
            <p className="text-muted-foreground dark:text-gray-400 mb-6">
              I'm always interested in discussing product engineering, QA
              strategies, or new projects.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:contact@example.com"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors"
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <Mail className="h-5 w-5" />
                </div>
                <span>contact@example.com</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors"
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors"
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <Github className="h-5 w-5" />
                </div>
                <span>GitHub Profile</span>
              </a>
            </div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Currently based in <strong className="text-foreground">Douala, Cameroon</strong> (GMT+1).{" "}
              <br />
              Available for remote work worldwide.
            </p>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <GlassCard className="p-8">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground dark:text-gray-400 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground dark:text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted-foreground dark:text-gray-400 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none"
                placeholder="Project details..."
              />
            </div>
            <button
              type="button"
              className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-primary/95 transition-colors flex items-center justify-center gap-2 mt-2"
            >
              Send Message <Send className="h-4 w-4" />
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
