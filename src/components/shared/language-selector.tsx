"use client";

import { useState, useEffect } from "react";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "EN" | "FR";

export function LanguageSelector() {
  const [lang, setLang] = useState<Lang>("EN");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "EN" || saved === "FR") setLang(saved);
  }, []);

  const toggle = () => {
    const next: Lang = lang === "EN" ? "FR" : "EN";
    setLang(next);
    localStorage.setItem("lang", next);
    // Dispatch event so other components can react if needed
    window.dispatchEvent(new CustomEvent("langchange", { detail: next }));
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 text-xs font-bold tracking-wider",
        "border-gray-200 dark:border-white/10",
        "text-gray-600 dark:text-gray-300",
        "hover:border-brand-primary dark:hover:border-brand-accent",
        "hover:text-brand-primary dark:hover:text-brand-accent",
        "bg-transparent"
      )}
    >
      <Languages className="w-3.5 h-3.5" />
      {lang}
    </button>
  );
}
