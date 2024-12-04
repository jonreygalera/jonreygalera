import React, { Children, memo } from 'react';
import IInfiniteScrollProps from '../../interface/IInfiniteScrollProps';
import Box from '../box/Box';
import { tailwindUtil } from '../../utils/tailwindUtil';

const InfiniteScroll: React.FC<IInfiniteScrollProps> = ({ children, orientation = 'vertical' }) => {
  const scrollAnimationClass = orientation === 'vertical' 
    ? 'animate-infinite-scroll-v' 
    : 'animate-infinite-scroll-h';

  const items = Children.toArray(children)

  return (
    <Box className="bg-primary-950 overflow-hidden w-[100px] wide-screen:w-[150px]">
      <Box className={tailwindUtil('flex flex-col gap-[180px]', scrollAnimationClass)}>
        { children }
      </Box>
    </Box>
  );
};

export default memo(InfiniteScroll);
