"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useLanguage } from "@/context/language-context";

export function ContactFormClient() {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, lang }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMsg(data.error || (lang === "FR" ? "Une erreur est survenue." : "An error occurred."));
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(lang === "FR" ? "Impossible de se connecter au serveur." : "Failed to connect to the server.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <GlassCard className="p-8 text-center flex flex-col items-center justify-center min-h-[350px]">
        <div className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 mb-4">
          <CheckCircle2 className="h-8 w-8 animate-bounce" />
        </div>
        <h4 className="text-xl font-bold text-foreground">
          {lang === "FR" ? "Message Envoyé !" : "Message Sent!"}
        </h4>
        <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2 max-w-xs leading-relaxed">
          {lang === "FR"
            ? "Merci pour votre message ! Je vous répondrai par e-mail dans les plus brefs délais."
            : "Thank you for your interest! I will get back to you via email as soon as possible."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-bold text-brand-primary dark:text-brand-accent hover:underline uppercase tracking-wider"
        >
          {lang === "FR" ? "Envoyer un autre message" : "Send another message"}
        </button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-muted-foreground dark:text-gray-400 mb-1 text-left"
          >
            {lang === "FR" ? "Nom" : "Name"}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "sending"}
            required
            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 disabled:opacity-50"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-muted-foreground dark:text-gray-400 mb-1 text-left"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sending"}
            required
            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 disabled:opacity-50"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted-foreground dark:text-gray-400 mb-1 text-left"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === "sending"}
            required
            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-foreground dark:text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none disabled:opacity-50"
            placeholder={lang === "FR" ? "Détails du projet..." : "Project details..."}
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending" || !name.trim() || !email.trim() || !message.trim()}
          className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-primary/95 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <>
              <span>{lang === "FR" ? "Envoi..." : "Sending..."}</span>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              <span>{lang === "FR" ? "Envoyer" : "Send Message"}</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </GlassCard>
  );
}
