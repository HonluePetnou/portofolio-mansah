import { JourneyClientPage } from "./journey-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journey | Mansah - Honlue Petnou Frederic Armel",
  description:
    "My professional journey from engineering student to Junior Engineer & Solution Finder.",
};

export default function JourneyPage() {
  return <JourneyClientPage />;
}

