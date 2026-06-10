"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SocialFloat } from "@/components/shared/social-float";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <main className="w-full min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="w-full pt-12 min-h-[calc(100vh-100px)]">
        {children}
      </main>
      <Footer />
      <SocialFloat />
    </>
  );
}
