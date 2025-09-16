import { cn } from "@/lib/utils";

interface MarqueeSectionProps {
  className?: string;
  data?: string[];
}

export default function MarqueeSection(props: MarqueeSectionProps) {
  const { data = [], className = ''} = props;

  return (
    <div className={cn(className, "z-10 bg-primary-200 p-4 flex w-full overflow-hidden")}>
      <div className="flex whitespace-nowrap animate-marquee text-white">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="px-8 text-lg font-medium">
            {data[i % data.length].toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}