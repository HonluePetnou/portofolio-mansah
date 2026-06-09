import { ContactClientPage } from "./contact-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Mansah - Honlue Petnou Frederic Armel",
  description:
    "Get in touch with Mansah (Honlue Petnou Frederic Armel) for collaborations, opportunities, or technical discussions.",
};

export default function ContactPage() {
  return <ContactClientPage />;
}

