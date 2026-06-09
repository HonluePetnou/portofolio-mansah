import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Mail, Linkedin, Github } from "lucide-react";
import { Metadata } from "next";
import { ContactFormClient } from "./contact-form-client";

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
                href="mailto:honluepetnou@gmail.com"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors"
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <Mail className="h-5 w-5" />
                </div>
                <span>honluepetnou@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/honlue-petnou-1299a1287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground dark:text-gray-300 hover:text-brand-primary transition-colors"
              >
                <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://github.com/HonluePetnou"
                target="_blank"
                rel="noopener noreferrer"
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

        {/* Contact Form Client */}
        <ContactFormClient />
      </div>
    </div>
  );
}
