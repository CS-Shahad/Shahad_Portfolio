import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container-width px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, "#home")}
          className="text-xl font-bold tracking-tighter text-slate-900"
        >
          S.Al-Matrafi
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button 
            className="bg-slate-900 text-white hover:bg-slate-800"
            onClick={(e) => {
              const el = document.querySelector("#contact") as HTMLDivElement;
              if (el) {
                const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
              }
            }}
          >
            Hire Me
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-base font-medium text-slate-600 hover:text-slate-900 py-2 block border-b border-slate-50 last:border-0"
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="w-full mt-2"
              onClick={(e) => {
                const el = document.querySelector("#contact") as HTMLDivElement;
                if (el) {
                   const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;
                   window.scrollTo({ top: offsetTop, behavior: "smooth" });
                   setIsOpen(false);
                }
              }}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
