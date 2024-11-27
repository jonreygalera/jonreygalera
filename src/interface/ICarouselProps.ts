import { PropsWithChildren } from "react";

export default interface ICarouselProps extends PropsWithChildren<{}>{
  CarouselContainerProps?: React.HTMLAttributes<HTMLDivElement>
}