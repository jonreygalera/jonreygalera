import Image, { StaticImageData } from "next/image";

interface HeroProps {
  src: StaticImageData;
  alt?: string;
}


export default function Hero(props: HeroProps) {
  const { src, alt = 'Image' } = props;
  return (
    <div className="absolute -z-10 inset-0">
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