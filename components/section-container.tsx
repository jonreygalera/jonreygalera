import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  contentClass?: string;
  id: string
}

export default function SectionContainer(props: SectionContainerProps) {
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
        "h-screen w-screen flex flex-col"
      )}
    >
      { children }
    </div>
  );
}