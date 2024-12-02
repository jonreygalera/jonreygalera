import React from 'react';
import Slide from '../components/slide/Slide';
import Carousel from '../components/carousel/Carousel';
import HighlightCarousel from '../components/carousel/HighlightCarousel';

interface Props {

}

const IMAGE_SETS = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
];


const HomePage: React.FC<Props> = (props) => {
  return (
    <div className='flex border-green-500 border-8 h-screen items-center'>
      <HighlightCarousel/>
    </div>
  );
}

export default HomePage;
