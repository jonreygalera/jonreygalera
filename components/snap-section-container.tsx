import { cn } from "@/lib/utils";

interface SnapSectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  contentClass?: string
}

export default function SnapSectionContainer(props: SnapSectionContainerProps) {
  const {
    children,
    contentClass = '',
    ...others
  } = props;
  
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div {...others} className={
      cn(others.className, 
      "h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth")}
      style={{ scrollBehavior: 'smooth' }}
    >
      { children }
    </div>
  );
}