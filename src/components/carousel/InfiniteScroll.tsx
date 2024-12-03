import React from 'react';
import IInfiniteScrollProps from '../../interface/IInfiniteScrollProps';
import Box from '../box/Box';
import { tailwindUtil } from '../../utils/tailwindUtil';

const InfiniteScroll: React.FC<IInfiniteScrollProps> = (props) => {
  const { children, orientation = 'vertical' } = props;

  return (
    <Box className=' bg-primary-950 overflow-hidden h-full w-[100px] wide-screen:w-[150px]'>
      <Box className={
        tailwindUtil(
          'flex flex-col gap-[180px] animate-infinite-scroll',
          orientation == 'vertical' ? 'animate-infinite-scroll-v' : 'animate-infinite-scroll-h'
        )
      }>
        { children }
      </Box>
    </Box>
  );
}

export default React.memo(InfiniteScroll);
