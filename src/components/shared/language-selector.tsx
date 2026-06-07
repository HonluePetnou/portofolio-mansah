"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/context/language-context";

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  const toggle = () => {
    setLang(lang === "EN" ? "FR" : "EN");
  };

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
