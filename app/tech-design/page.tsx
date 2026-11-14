import SectionMainContainer from "@/components/section-main-container";
import Footer from "@/ui/footer";
import ColorSwatch from "@/components/color-swatch";
import { Code2, Palette, Box, Type, Layers, Cpu, Globe, Zap, ExternalLink, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getPackageVersion, getThemeColors, majorOf } from "@/lib/tech-info";

// --- Data (versions & colors are read from the project at build time) ---

interface TechItem {
  name: string;
  version: string | null;
  description: string;
  icon: LucideIcon;
  badge: string;
}

function getTechStack(): TechItem[] {
  const next = getPackageVersion("next");
  const react = getPackageVersion("react");
  const tailwind = getPackageVersion("tailwindcss");

  return [
    {
      name: `Next.js ${majorOf(next) ?? ""}`.trim(),
      version: next,
      description: "The React Framework for modern web applications, utilizing the App Router and Server Components for optimal performance.",
      icon: Globe,
      badge: "Framework"
    },
    {
      name: `React ${majorOf(react) ?? ""}`.trim(),
      version: react,
      description: "The core UI library, enabling concurrent rendering and advanced state management capabilities.",
      icon: Code2,
      badge: "Library"
    },
    {
      name: `Tailwind CSS ${majorOf(tailwind) ?? ""}`.trim(),
      version: tailwind,
      description: "A utility-first CSS framework for rapid UI development, with a CSS-first theme powering this design system.",
      icon: Palette,
      badge: "Styling"
    },
    {
      name: "TypeScript",
      version: getPackageVersion("typescript"),
      description: "Statically typed JavaScript that improves developer experience and code maintainability at scale.",
      icon: Box,
      badge: "Language"
    },
    {
      name: "Lucide React",
      version: getPackageVersion("lucide-react"),
      description: "A clean, consistent, and lightweight icon set that perfectly adapts to the design system.",
      icon: Layers,
      badge: "Assets"
    },
    {
      name: "Resend",
      version: null,
      description: "Transactional email API that delivers contact-form messages straight to my inbox from a server route.",
      icon: Mail,
      badge: "Email"
    },
    {
      name: "Lexend Font",
      version: null,
      description: "A geometric sans-serif typeface designed to reduce visual stress and improve readability.",
      icon: Type,
      badge: "Typography"
    }
  ];
}

// --- Components ---

function TechCard({ item }: { item: TechItem }) {
  const Icon = item.icon;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-primary-200 bg-white/50 p-6 transition-all duration-300 hover:border-secondary-500/50 hover:shadow-lg hover:shadow-secondary-200/20">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-secondary-200/20 blur-3xl transition-all duration-500 group-hover:bg-secondary-300/30" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 rounded-lg bg-secondary-100 p-2 text-secondary-700 ring-1 ring-secondary-200 group-hover:bg-secondary-200 group-hover:text-secondary-800 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-primary-100 leading-tight">{item.name}</h3>
              {item.version && (
                <span className="font-mono text-[11px] text-primary-500">v{item.version}</span>
              )}
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-primary-100/5 px-2.5 py-0.5 text-xs font-medium text-primary-500">
            {item.badge}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-primary-500 flex-grow">
          {item.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-secondary-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Zap className="h-3 w-3" />
          <span>Core Technology</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---

export default function TechDesignPage() {
  const techStack = getTechStack();
  const colors = getThemeColors();

  return (
    <SectionMainContainer className="pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-100 sm:text-5xl lg:text-6xl">
            Tech & <span className="text-secondary-700">Design</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-500">
            A deep dive into the engineering choices and design philosophy that power this digital experience.
            Crafted with precision, performance, and aesthetics in mind.
          </p>

          {/* Design Inspiration Credit */}
          <div className="mt-8 inline-flex flex-wrap justify-center items-center gap-2 rounded-2xl bg-secondary-100/50 px-4 py-2 border border-secondary-200/50 group hover:bg-secondary-100 transition-all duration-300">
            <Palette className="h-4 w-4 text-secondary-700" />
            <span className="text-sm font-medium text-primary-400">Design inspired by</span>
            <a
              href="https://www.behance.net/gallery/230873273/Programmer-Portfolio-Design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-secondary-700 hover:text-secondary-800 underline flex items-center gap-1 transition-colors"
            >
              Addy.chan
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <section className="mb-24">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-100">Technology Stack</h2>
              <p className="text-sm text-primary-400">Versions are read from the project on every build</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((item) => (
              <TechCard key={item.name} item={item} />
            ))}
          </div>
        </section>

        {/* Separator */}
        <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

        {/* Design System - Typography */}
        <section className="mb-24">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-500 text-primary-100">
              <Type className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-100">Typography</h2>
              <p className="text-sm text-primary-400">Clean, geometric, and accessible</p>
            </div>
          </div>

          <div className="rounded-3xl bg-secondary-100/50 p-6 sm:p-8 border border-secondary-200 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="space-y-8">
                <div>
                  <span className="text-8xl sm:text-9xl font-bold text-primary-100 opacity-10 block mb-4">Aa</span>
                  <h3 className="text-3xl font-bold text-primary-100">Lexend</h3>
                  <p className="mt-2 text-primary-500">
                    A variable font designed to improve reading proficiency. Its geometric nature offers a clean
                    and modern look while maintaining high legibility at all sizes.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary-100">Heading 1</p>
                  <p className="text-sm text-primary-400 font-mono">text-4xl font-bold</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary-200">Heading 2</p>
                  <p className="text-sm text-primary-400 font-mono">text-2xl font-bold</p>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-primary-300">Body Large</p>
                  <p className="text-sm text-primary-400 font-mono">text-lg font-medium</p>
                </div>
                <div className="space-y-2">
                  <p className="text-base text-primary-400">
                    Normal body text. The quick brown fox jumps over the lazy dog.
                    Structure and rhythm are key to a good reading experience.
                  </p>
                  <p className="text-sm text-primary-400 font-mono">text-base</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design System - Colors */}
        <section>
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-200 text-secondary-500">
              <Palette className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-100">Color Palette</h2>
              <p className="text-sm text-primary-400">Synced from the theme tokens in globals.css</p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="mb-6 text-lg font-semibold text-primary-200 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
                Primary Scale (Neutrals)
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
                {colors.primary.map((color) => (
                  <ColorSwatch key={color.variable} color={color} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold text-secondary-700 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary-500"></span>
                Secondary Scale (Brand)
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
                {colors.secondary.map((color) => (
                  <ColorSwatch key={color.variable} color={color} />
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
      <div className="mt-20">
         <Footer />
      </div>
    </SectionMainContainer>
  );
}
