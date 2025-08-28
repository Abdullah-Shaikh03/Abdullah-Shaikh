"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export const Navigation = () => {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const navigationLinks = useMemo(
    () => [
      { name: "Experience", path: "/experience" },
      { name: "Projects", path: "/projects" },
      { name: "Education", path: "/education" },
      // { name: "Blog", path: "https://blogs.abdullah-shaikh.me" },
      { name: "Contact Me", path: "/contact" },
    ],
    []
  );

  // Exact match or deeper sub-paths (e.g., /projects/x)
  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("http")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "glass bg-primary/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* Full-bleed header; inner content centered with gutters */}
      <div className="mx-auto w-full max-w-screen-xl px-4">
        {/* Flex on mobile for proper L/R alignment; grid from md+ */}
        <div className="h-16 flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto]">
          {/* Left: Brand */}
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center" aria-label="Home">
              <span className="text-3xl font-bold text-primary tracking-wide">SA</span>
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <nav className="relative hidden md:flex justify-center space-x-6">
            {navigationLinks.map((link) => {
              const active = isLinkActive(link.path);
              const isExternal = link.path.startsWith("http");
              return (
                <div key={link.name} className="relative flex flex-col items-center">
                  <Link
                    href={link.path}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "px-3 py-1 rounded-md transition-colors whitespace-nowrap",
                      active
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary",
                    ].join(" ")}
                  >
                    <span className="font-medium">{link.name}</span>
                  </Link>

                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 h-0.5 w-[60%] rounded-md bg-primary mt-2"
                      transition={{ type: "spring", stiffness: 600, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Theme + Mobile menu */}
          <div className="flex items-center justify-end space-x-1">
            {/* Theme switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Toggle theme">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu (controlled) */}
            <Sheet open={isOpen} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] px-2">
                <nav className="flex flex-col space-y-3 mt-6 mb-2">
                  {navigationLinks.map((link) => {
                    const active = isLinkActive(link.path);
                    const isExternal = link.path.startsWith("http");
                    return (
                      <Link
                        key={link.name}
                        href={link.path}
                        target={isExternal ? "_blank" : "_self"}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "px-3 py-2 rounded-md transition-colors whitespace-nowrap",
                          active
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary",
                        ].join(" ")}
                        onClick={() => setOpen(false)} // close sheet on navigation
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
