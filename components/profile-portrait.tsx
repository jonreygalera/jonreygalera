'use client';

import Image from "next/image";
import ProfileImage from '/public/Jon Rey Galera - Profile.png';
import PixelDialog from "@/components/pixel-dialog";
import ExperienceCounter from "@/components/experience-counter";
import { cn } from "@/lib/utils";

export default function ProfilePortrait({ className }: { className?: string }) {
  return (
    <div className={cn("relative group w-full", className)}>
      <div className="absolute -inset-4 bg-secondary-500/15 rounded-[3rem] blur-2xl group-hover:bg-secondary-500/25 transition-all duration-700 scale-95 group-hover:scale-105" />
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-primary-100/10 aspect-[4/5] shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-secondary-500/10">
        <Image
          src={ProfileImage}
          alt="Jon Rey Galera"
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 420px, 100vw"
          placeholder="blur"
          className="w-full h-full object-cover object-top brightness-[0.82] contrast-[1.08] saturate-[0.9] sepia-[0.08] group-hover:brightness-90 group-hover:saturate-100 transition-all duration-1000 group-hover:scale-110"
          priority
        />
        {/* Cinematic grade: brand-tinted shadows, soft vignette, warm lime glow (CSS only, image untouched) */}
        <div className="absolute inset-0 bg-primary-300/30 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,15,16,0.55)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-secondary-500/15 mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-100/85 via-primary-100/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />

        {/* Pixel-game dialog with random facts from projects & timeline */}
        <div className="absolute inset-x-5 bottom-7 sm:inset-x-6 z-10">
          <PixelDialog />
        </div>
      </div>

      {/* Live "playtime" since Aug 5, 2019 */}
      <ExperienceCounter className="relative mt-5" />
    </div>
  );
}
