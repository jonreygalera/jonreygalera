import React from 'react';
import Slide from '../components/slide/Slide';
import Carousel from '../components/carousel/Carousel';
import HighlightCarousel from '../components/carousel/HighlightCarousel';
import Box from '../components/box/Box';

interface Props {

}


const HomePage: React.FC<Props> = (props) => {
  return (
    <Box className='flex h-screen items-center justify-center'>
      Jon Rey Galera | Ongoing
    </Box>
  );
}

export default HomePage;
