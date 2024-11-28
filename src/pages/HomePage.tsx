import React from 'react';
import Slide from '../components/slide/Slide';
import Carousel from '../components/carousel/Carousel';

interface Props {

}

const IMAGE_SETS = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
];


const HomePage: React.FC<Props> = (props) => {
  return (
    <div>
      <Carousel>
        {
          IMAGE_SETS.map(data => (
            <img src={data} className='w-44 h-36'/>
          ))
        }
      </Carousel>
    </div>
  );
}

export default HomePage;
