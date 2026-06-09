import { ProfileSummary } from "@/components/journey/profile-summary";
import { Timeline } from "@/components/journey/timeline";
import { EducationAndCertifications } from "@/components/journey/education";
import { Strengths } from "@/components/journey/strengths";
import { SectionHeader } from "@/components/shared/section-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journey | Mansah - Honlue Petnou Frederic Armel",
  description:
    "My professional journey from engineering student to Junior Engineer & Solution Finder.",
};

export default function JourneyPage() {
  return (
    <div className="container section-py">
      <SectionHeader
        title="My Journey"
        subtitle="The path of a generalist engineer and solution finder."
      />
      <ProfileSummary />
      <Timeline />
      <EducationAndCertifications />
      <Strengths />
    </div>
  );
}
