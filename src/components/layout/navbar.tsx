"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/#about" },
  { name: "SERVICES", href: "/#services" },
  { name: "WORKS", href: "/#projects" },
  { name: "EXPERIENCE", href: "/#experience" },
  { name: "BLOG", href: "/#blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark" || resolvedTheme === undefined;

  useEffect(() => {
    setMounted(true);

    const handleScrollState = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScrollState);
    return () => window.removeEventListener("scroll", handleScrollState);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "services",
        "projects",
        "experience",
        "blog",
        "contact",
      ];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);
    if (pathname === "/") {
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
      } else if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent flex items-center",
        scrolled
          ? "h-16 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-xl border-gray-100 dark:border-white/5 shadow-md dark:shadow-lg"
          : "h-20 bg-transparent"
      )}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Mansah
          </span>
          <span className="h-2 w-2 rounded-full bg-brand-primary dark:bg-brand-accent animate-pulse" />
        </Link>

        {/* Center - Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const sectionId =
              item.href === "/"
                ? "home"
                : item.href === "/#projects"
                ? "projects"
                : item.href.substring(2);
            const isActive = pathname === "/" && activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "text-xs font-semibold tracking-wider transition-colors hover:text-brand-primary dark:hover:text-brand-accent cursor-pointer",
                  isActive ? "text-brand-primary dark:text-brand-accent" : "text-gray-600 dark:text-gray-400"
                )}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Link href="/#contact">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-primary text-white font-semibold text-xs tracking-wider uppercase hover:bg-brand-primary/95 transition-all shadow-[0_4px_14px_rgba(94,80,249,0.3)]">
              CONTACT ME
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* Mobile Actions & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className={cn(
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden",
                scrolled ? "top-16" : "top-20"
              )}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white/95 dark:bg-brand-dark/95 border-b border-gray-100 dark:border-white/10 p-6 z-50 lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const sectionId =
                    item.href === "/"
                      ? "home"
                      : item.href === "/#projects"
                      ? "projects"
                      : item.href.substring(2);
                  const isActive =
                    pathname === "/" && activeSection === sectionId;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={cn(
                        "text-sm font-semibold tracking-wider py-2 transition-colors",
                        isActive
                          ? "text-brand-primary dark:text-brand-accent"
                          : "text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-white"
                      )}
                    >
                      {item.name}
                    </a>
                  );
                })}
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand-primary text-white font-semibold text-xs tracking-wider uppercase"
                >
                  CONTACT ME
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
