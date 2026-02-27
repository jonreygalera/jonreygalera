'use client';

import Link from "next/link";
import LogoImage from "/public/logo.png";
import Image from "next/image";
import ButtonAnim from "./button-anim";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import TimelineSearchModal from "./timeline-search-modal";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isTechDesignPage = pathname === '/tech-design';
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleOnClickSectionItem = (section: string) => {
    setIsMenuOpen(false); // Close menu on click

    if (pathname !== '/') {
      router.push(`/#${section}`);
      return;
    }

    const sectionItem = document.getElementById(section);
    if (sectionItem) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = sectionItem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  const navLinks: { name: string; section?: string; path?: string }[] = [
    { name: "Home", section: "section-hero" },
    { name: "About", section: "section-about" },
    { name: "Ideas", section: "section-ideas" },
    { name: "Projects", path: "/projects" },
    { name: "Timeline", path: "/timeline" },
  ];

  return (
    <>
    <nav className={cn(
      "fixed w-full z-[100] top-0 start-0 transition-all duration-500",
      "bg-primary-200/95 backdrop-blur-md border-b border-white/5 text-white",
      scrolled ? "py-3 shadow-xl" : "py-5 shadow-lg"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 z-50 group">
          <Image
            src={LogoImage}
            alt="Logo"
            className="h-9 w-auto hover:rotate-6 transition-all duration-300"
            priority
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-black text-white leading-none tracking-tight">JON REY</span>
            <span className="text-[10px] text-secondary-500 font-bold tracking-[0.2em]">GALERA</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.path ? (
                  <Link
                    href={link.path}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 hover:text-secondary-400 relative group",
                      pathname === link.path ? "text-secondary-500" : "text-white/70"
                    )}
                  >
                    {link.name}
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-secondary-400 transition-all duration-300",
                      pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    )}></span>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleOnClickSectionItem(link.section!)}
                    className="text-sm font-medium text-white/70 hover:text-secondary-400 transition-all duration-200 relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 relative z-50">
          {/* Search Trigger (Mobile icon only, Desktop with kbd) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all duration-200 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono opacity-50 bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/tech-design"
            className="hidden lg:block text-sm font-medium text-white/50 hover:text-secondary-400 transition-colors"
          >
            Tech & Design
          </Link>

          <div className="hidden sm:block">
            <ButtonAnim 
              text="Contact Me"
              variant="dark"
              onClick={() => handleOnClickSectionItem('section-contact')} 
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-xl md:hidden bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <div className="w-6 h-5 flex flex-col justify-between items-end relative overflow-hidden">
               <span className={cn("block h-0.5 bg-current transition-all duration-300 origin-right", isMenuOpen ? "w-7 rotate-[-45deg] translate-y-[-1px]" : "w-full")} />
               <span className={cn("block w-2/3 h-0.5 bg-current transition-all duration-300", isMenuOpen ? "opacity-0 translate-x-4" : "opacity-100")} />
               <span className={cn("block h-0.5 bg-current transition-all duration-300 origin-right", isMenuOpen ? "w-7 rotate-[45deg] translate-y-[1px]" : "w-1/2")} />
            </div>
          </button>
        </div>
      </div>

      {/* Modern Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-primary-100 z-[40] md:hidden transition-all duration-500 ease-in-out",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none scale-95"
      )}>
        <div className="h-full flex flex-col px-6 pt-32 pb-12 overflow-y-auto relative z-10 font-sans">
          <ul className="flex flex-col space-y-4">
            <p className="text-secondary-500 font-bold text-xs tracking-[0.3em] uppercase opacity-70 mb-4 px-2">Navigation</p>
            {navLinks.map((link, idx) => (
              <li 
                key={link.name}
                style={{ transitionDelay: `${idx * 70}ms` }}
                className={cn(
                  "transition-all duration-700 ease-out", 
                  isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                )}
              >
                {link.path ? (
                  <Link
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-secondary-500/30 group transition-all"
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-mono text-secondary-500 mr-4 opacity-40">0{idx + 1}</span>
                      <span className="text-3xl font-black text-white group-hover:text-secondary-400">{link.name}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-secondary-500/10 group-hover:border-secondary-500/30 transition-all">
                       <svg className="w-5 h-5 text-white/30 group-hover:text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                       </svg>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleOnClickSectionItem(link.section!)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-secondary-500/30 group transition-all w-full text-left"
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-mono text-secondary-500 mr-4 opacity-40">0{idx + 1}</span>
                      <span className="text-3xl font-black text-white group-hover:text-secondary-400">{link.name}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-secondary-500/10 group-hover:border-secondary-500/30 transition-all">
                       <svg className="w-5 h-5 text-white/30 group-hover:text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                       </svg>
                    </div>
                  </button>
                )}
              </li>
            ))}
            
            <li 
              className={cn(
                "pt-8 mt-4 border-t border-white/10 transition-all duration-700 delay-500", 
                isMenuOpen ? "opacity-100" : "opacity-0"
              )}
            >
               <Link
                href="/tech-design"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-secondary-500/5 border border-secondary-500/10 hover:bg-secondary-500/10 text-white font-bold group"
              >
                <span>Tech & Design</span>
                <span className="text-xs uppercase tracking-widest text-secondary-500 font-black">Learn More</span>
              </Link>
              <div className="mt-8 flex justify-center">
                 <ButtonAnim onClick={() => handleOnClickSectionItem('section-contact')} />
              </div>
            </li>
          </ul>

          <div className="mt-auto pt-10 text-center">
              <p className="text-[10px] text-white/20 tracking-[0.4em] uppercase font-bold">Available for new opportunities</p>
          </div>
        </div>
        
        {/* Abstract background details for mobile menu */}
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[40%] bg-secondary-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[40%] bg-primary-600/5 blur-[120px] rounded-full" />
      </div>
    </nav>

    <TimelineSearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
