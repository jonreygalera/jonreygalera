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
    <div className={cn(containerClass, "flex flex-col justify-center rounded-lg shadow-sm border-2 border-primary-100 bg-white relative xl:min-w-[400px] xl:max-w-[400px]")}>
      <Grid1Pattern/>
      <Link href={linkHref} className="absoulute p-8 z-10">
        <Image 
          className="w-full h-48 object-fit border-2 border-primary-100 rounded-md bg-primary-900/60"
          src={imageSrc}
          alt={imageAlt}
          priority
        />
      </Link>
      <div className="p-5">
        <Link href={linkHref}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary-200">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-prin">
          {description}
        </p>
        {children}
          <Button className="w-full" onClick={handleOnClickButton}>{linkText}</Button>
      </div>
    </div>
  );
}
