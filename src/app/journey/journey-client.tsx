"use client";

import { useLanguage } from "@/context/language-context";
import { SectionHeader } from "@/components/shared/section-header";
import { ProfileSummary } from "@/components/journey/profile-summary";
import { Timeline } from "@/components/journey/timeline";
import { EducationAndCertifications } from "@/components/journey/education";
import { Strengths } from "@/components/journey/strengths";

export function JourneyClientPage() {
  const { lang } = useLanguage();

  return (
    <div className="container section-py">
      <SectionHeader
        title={lang === "FR" ? "Mon Parcours" : "My Journey"}
        subtitle={
          lang === "FR"
            ? "Le chemin d'un ingénieur généraliste et chercheur de solutions."
            : "The path of a generalist engineer and solution finder."
        }
      />
      <ProfileSummary />
      <Timeline />
      <EducationAndCertifications />
      <Strengths />
    </div>
  );
}
