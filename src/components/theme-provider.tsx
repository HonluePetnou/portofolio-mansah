"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function FaviconUpdater() {
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const logoUrl = isDark ? "/logo-green.png" : "/logo-purple.png";

    // 1. Trouver et supprimer tous les liens d'icônes existants pour forcer le rafraîchissement
    const iconLinks = document.querySelectorAll("link[rel*='icon']");
    iconLinks.forEach((link) => {
      link.parentNode?.removeChild(link);
    });

    // 2. Créer une nouvelle balise avec un timestamp anti-cache (?v=...)
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = `${logoUrl}?v=${Date.now()}`;
    document.head.appendChild(link);
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
