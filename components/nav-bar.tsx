'use client';

import Link from "next/link";
import LogoImage from "/public/logo.png";
import Image from "next/image";
import ButtonAnim from "./button-anim";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className={cn(
      "fixed w-full z-50 top-0 start-0 transition-all duration-300 bg-primary-200",
      scrolled
        ? "py-2"
        : "py-4"
    )}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse z-50 cursor-pointer">
          <Image
            src={LogoImage}
            alt="Jon Rey Galera"
            className="h-10 w-auto hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* Mobile Toggle & CTA */}
        {/* Mobile Toggle & CTA */}
        <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse items-center">
          <div className="hidden md:flex items-center gap-4">
             <Link
              href="/tech-design"
              className="text-sm font-medium text-secondary-100/70 hover:text-secondary-400 transition-colors duration-200"
            >
              Tech & Design
            </Link>
            <ButtonAnim onClick={() => handleOnClickSectionItem('section-contact')} />
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5 relative">
              <span className={cn("block w-full h-0.5 bg-current transition-all duration-300", isMenuOpen ? "rotate-45 translate-y-2" : "")} />
              <span className={cn("block w-full h-0.5 bg-current transition-all duration-300", isMenuOpen ? "opacity-0" : "")} />
              <span className={cn("block w-full h-0.5 bg-current transition-all duration-300", isMenuOpen ? "-rotate-45 -translate-y-2" : "")} />
            </div>
          </button>
        </div>

        {/* Desktop Menu */}
        {/* Desktop Menu */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.path ? (
                  <Link
                    href={link.path}
                    className="block py-2 px-3 text-secondary-100/70 hover:text-secondary-400 md:p-0 transition-colors duration-200 relative group text-lg cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleOnClickSectionItem(link.section!)}
                    className="block py-2 px-3 text-secondary-100/70 hover:text-secondary-400 md:p-0 transition-colors duration-200 relative group text-lg cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-primary-100/95 backdrop-blur-xl z-40 md:hidden transition-all duration-300 flex flex-col items-center justify-center space-y-8",
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        <ul className="flex flex-col items-center space-y-6 text-center">
          {navLinks.map((link) => (
            <li key={link.name}>
                {link.path ? (
                  <Link
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-secondary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleOnClickSectionItem(link.section!)}
                    className="text-2xl font-bold text-white hover:text-secondary-400 transition-colors"
                  >
                    {link.name}
                  </button>
                )}
            </li>
          ))}
           <li>
              <Link
                href="/tech-design"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-white hover:text-secondary-400 transition-colors"
              >
                Tech & Design
              </Link>
           </li>
          <li>
            <div className="mt-4" onClick={() => setIsMenuOpen(false)}>
              <ButtonAnim onClick={() => handleOnClickSectionItem('section-contact')} />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
