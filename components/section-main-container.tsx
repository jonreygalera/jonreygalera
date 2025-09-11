import { cn } from "@/lib/utils";

interface SectionMainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  contentClass?: string
}

export default function SectionMainContainer(props: SectionMainContainerProps) {
  const {
    children,
    contentClass = '',
    ...others
  } = props;
  
  return (
    <div {...others} className={
      cn(others.className, 
      "h-screen w-screen")}
    >
      { children }
    </div>
  );
}