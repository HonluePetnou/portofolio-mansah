"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { useLanguage } from "@/context/language-context";

export function ProfileSummary() {
  const { lang } = useLanguage();

  return (
    <GlassCard className="mb-10 p-8 md:p-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {lang === "FR" ? "Profil d'Ingénieur" : "Engineering Profile"}
      </h2>
      <div className="space-y-4 text-muted-foreground dark:text-gray-300 text-sm md:text-base leading-relaxed">
        {lang === "FR" ? (
          <>
            <p>
              Frédéric Armel Petnou est un ingénieur junior orienté produit et trouveur de solutions, actuellement en cursus d'ingénieur à l'
              <strong>École Nationale Supérieure Polytechnique de Douala (2022–2027)</strong>.
            </p>
            <p>
              Son approche de l'ingénierie est profondément ancrée dans une <strong>vision produit globale</strong>. Il ne se limite pas à écrire du code : il conçoit des solutions de bout en bout en reliant le développement logiciel (web, mobile, desktop, backend), l'architecture réseau (Cisco CCNA) et la cybersécurité.
            </p>
            <p>
              Convaincu que la <strong>qualité</strong> et la <strong>sécurité</strong> sont des piliers fondamentaux et non des étapes distinctes, il intègre l'automatisation des tests (BDD, Playwright) et les contrôles de sécurité dès la conception pour assurer des livraisons robustes et sereines.
            </p>
          </>
        ) : (
          <>
            <p>
              Frédéric Armel Petnou is a product-oriented Junior Engineer and Solution Finder, currently pursuing an Engineering Degree at the{" "}
              <strong>National Advanced School of Polytechnic of Douala (2022–2027)</strong>.
            </p>
            <p>
              His approach to engineering is deeply rooted in a <strong>global product mindset</strong>. He doesn't limit himself to writing code: he designs end-to-end solutions by bridging software development (web, mobile, desktop, backend), network architecture (Cisco CCNA), and cybersecurity.
            </p>
            <p>
              Believing that <strong>quality</strong> and <strong>security</strong> are fundamental pillars rather than isolated phases, he integrates test automation (BDD, Playwright) and security controls from the design stage to ensure robust and stress-free deployments.
            </p>
          </>
        )}
      </div>
    </GlassCard>
  );
}

