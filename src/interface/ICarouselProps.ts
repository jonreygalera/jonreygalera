import { PropsWithChildren } from "react";

export default interface ICarouselProps extends PropsWithChildren<{}>{
  CarouselContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  CarouselItemProps?: React.HTMLAttributes<HTMLDivElement>;
  onItemSelected?: (index:number, item?:any) => void
}