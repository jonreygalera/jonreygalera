import { cn } from "@/lib/utils";

interface SnapSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  contentClass?: string;
  id: string
}

export default function SnapSection(props: SnapSectionProps) {
  const {
    children,
    contentClass = '',
    id,
    ...others
  } = props;
  return (
    <div
      id={id}
      className={cn(
        others?.className,
        "h-screen w-screen flex flex-col items-center justify-center snap-start transition-colors duration-500 ease-in-out"
      )}
    >
        { children }
    </div>
  );
}