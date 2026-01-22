"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="جامع النور"
              width="50"
              height="50"
              className="object-contain sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors"
            >
              من نحن
            </a>
            <a
              href="#announcements"
              className="text-foreground hover:text-primary transition-colors"
            >
              الاعلانات
            </a>
            <a
              href="#prayer-times"
              className="text-foreground hover:text-primary transition-colors"
            >
              مواقيت الصلاة
            </a>
          </nav>

          {/* Contact Button */}
          <Button
            variant="outline"
            className="hidden md:flex border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
            asChild
          >
            <a href="#contact">تواصل معنا</a>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 rounded-md hover:bg-foreground/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors py-2 text-center border-b border-border/50"
              onClick={() => setIsMenuOpen(false)}
            >
              من نحن
            </a>
            <a
              href="#announcements"
              className="text-foreground hover:text-primary transition-colors py-2 text-center border-b border-border/50"
              onClick={() => setIsMenuOpen(false)}
            >
              الاعلانات
            </a>
            <a
              href="#prayer-times"
              className="text-foreground hover:text-primary transition-colors py-2 text-center border-b border-border/50"
              onClick={() => setIsMenuOpen(false)}
            >
              مواقيت الصلاة
            </a>
            <Button
              variant="outline"
              size="sm"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background w-full bg-transparent mt-2"
              asChild
            >
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                تواصل معنا
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
