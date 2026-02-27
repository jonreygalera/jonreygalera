import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Button from "./button";
import { cn } from "@/lib/utils";
import Grid1Pattern from "./pattern/grid1-pattern";

interface CardImageProps {
  imageSrc: StaticImageData;
  imageAlt: string;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  children?: ReactNode;
  onClick?: () => void;
  containerClass?: string
}

export default function CardImage({
  imageSrc,
  imageAlt,
  title,
  description,
  linkHref,
  linkText,
  children,
  onClick,
  containerClass = ''
}: CardImageProps) {

  const handleOnClickButton = () => {
    if (onClick) {
      onClick();
    } else if (linkHref) {
      window.open(linkHref, '_blank');
    }
  };

  return (
    <div 
      className={cn(
        "group relative flex flex-col rounded-[2.5rem] overflow-hidden border border-white/10 bg-primary-200 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-secondary-500/5 xl:min-w-[400px] xl:max-w-[400px]",
        containerClass
      )}
    >
      {/* Subtle overlay to soften the pattern */}
      <div className="absolute inset-0 bg-primary-200/50 z-0" />
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <Grid1Pattern />
      </div>

      <div className="relative p-8 z-10 flex flex-col h-full">
        <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-white/5 mb-8">
          <Image 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            src={imageSrc}
            alt={imageAlt}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-100/90 via-primary-100/20 to-transparent" />
        </div>

        <div className="flex flex-col flex-1 space-y-4">
          <h3 className="text-3xl font-black text-white italic tracking-tight group-hover:text-secondary-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/70 text-base leading-relaxed font-medium">
            {description}
          </p>
          
          <div className="pt-6 mt-auto">
            <Button 
              className="w-full justify-center group/btn py-4 rounded-xl bg-secondary-500 text-primary-900 border-none hover:bg-secondary-400 hover:text-primary-100" 
              onClick={handleOnClickButton}
            >
              <span className="flex items-center gap-3 font-black uppercase tracking-widest text-xs">
                {linkText}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
