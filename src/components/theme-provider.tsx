"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function FaviconUpdater() {
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const logoUrl = isDark ? "/logo-green.png" : "/logo-purple.png";
    const timestamp = Date.now();

    // 1. Trouver tous les liens d'icônes existants et mettre à jour uniquement leur attribut href
    const iconLinks = document.querySelectorAll("link[rel*='icon']");
    if (iconLinks.length > 0) {
      iconLinks.forEach((link) => {
        (link as HTMLLinkElement).href = `${logoUrl}?v=${timestamp}`;
      });
    } else {
      // 2. Créer l'élément de secours uniquement s'il n'en existait aucun
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.href = `${logoUrl}?v=${timestamp}`;
      document.head.appendChild(link);
    }
  }, [resolvedTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <FaviconUpdater />
      {children}
    </NextThemesProvider>
  );
}
