import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Button from "./button";

interface CardImageProps {
  imageSrc: StaticImageData;
  imageAlt: string;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function CardImage({
  imageSrc,
  imageAlt,
  title,
  description,
  linkHref,
  linkText,
  children,
  onClick
}: CardImageProps) {

  const handleOnClickButton = () => {
    if (onClick) {
      onClick();
    } else if (linkHref) {
      window.open(linkHref, '_blank');
    }
  };
  
  return (
    <div className="flex flex-col justify-center max-w-sm rounded-lg shadow-sm border-2 border-primary-100 bg-white">
      <Link href={linkHref} className="p-8">
        <Image 
          className="w-full h-48 object-fit border-2 border-primary-100 rounded-md"
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
          <Button onClick={handleOnClickButton}>{linkText}</Button>
      </div>
    </div>
  );
}
