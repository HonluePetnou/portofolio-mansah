import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SocialFloat } from "@/components/shared/social-float";

export const metadata: Metadata = {
  title: "Mansah | Honlue Petnou Frederic Armel - Junior Engineer & Solution Finder",
  description:
    "Mansah (Honlue Petnou Frederic Armel) - Junior Engineer & Solution Finder — Product-Oriented. Designing, testing, and shipping robust web, mobile, desktop, network, and security solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen antialiased selection:bg-brand-primary/30 selection:text-white"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <LanguageProvider>
            {/* Background Glows */}
            <div className="fixed top-[-10%] left-[-10%] h-[40%] w-[50%] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-[-10%] right-[10%] h-[40%] w-[50%] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <Navbar />
            <main className="w-full pt-12 min-h-[calc(100vh-100px)]">
              {children}
            </main>
            <Footer />
            <SocialFloat />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
