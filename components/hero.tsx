import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface HeroProps {
  src: StaticImageData;
  alt?: string;
  className?: string
}


export default function Hero(props: HeroProps) {
  const { src, alt = 'Image', className = '' } = props;
  return (
    <div className={cn("-z-10 inset-0", className, "absolute")}>
      <Image
        src={src}
        alt={alt}
        style={{
          objectFit: 'cover'
        }}
        fill
      />
    </div>
  );
}