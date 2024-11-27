import React, { useState } from 'react';
import Box from '../box/Box';
import ICarouselProps from '../../interface/ICarouselProps';
import Button from '../button/Button';

const Carousel: React.FC<ICarouselProps> = (props) => {
  const { children, CarouselContainerProps } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  return ( 
    <Box className="flex gap-2 mr-2" {...CarouselContainerProps}>
      <Button className='flex h-full w-[100px] border items-center rounded-s-2xl'>
        {'<'}
      </Button>
      <Box className='flex h-full gap-2 items-center rounded-s-2xl overflow-hidden'>
        { children }
      </Box>
      <Button className='flex h-full w-[100px] border items-center rounded-e-2xl'>
          {'>'}
      </Button>
    </Box>

  );
}

export default Carousel;
