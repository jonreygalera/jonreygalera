import React, { useState, useEffect, useRef } from 'react';
import Box from '../box/Box';
import ICarouselProps from '../../interface/ICarouselProps';
import Button from '../button/Button';

const Carousel: React.FC<ICarouselProps> = (props) => {
  const { children, CarouselContainerProps } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3); // Default to show 3 items
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate how many items can be shown based on the container width
  const calculateVisibleItems = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = 150; // You can adjust this based on your item size
      const items = Math.floor(containerWidth / itemWidth);
      setVisibleItems(items > 1 ? items : 1); // Show at least one item
    }
  };

  useEffect(() => {
    calculateVisibleItems(); // Calculate visible items on mount
    window.addEventListener('resize', calculateVisibleItems); // Recalculate on window resize

    return () => {
      window.removeEventListener('resize', calculateVisibleItems);
    };
  }, []);

  // Calculate the previous and next indices
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? React.Children.count(children) - visibleItems : prevIndex - visibleItems));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleItems >= React.Children.count(children) ? 0 : prevIndex + visibleItems));
  };

  return (
    <Box className="flex items-center gap-2 mr-2 w-[500px]" {...CarouselContainerProps} ref={carouselRef}>
      {/* Previous Button */}
      <Button 
        className="flex h-36 w-[100px] border items-center rounded-s-2xl"
        onClick={handlePrev}
      >
        {'<'}
      </Button>

      {/* Carousel Items (Show based on container size) */}
      <Box className="flex overflow-x-auto gap-2 items-center rounded-s-2xl w-full">
        <Box className="flex transition-all duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}>
          {React.Children.map(children, (child, index) => (
            <Box
              key={index}
              className={`flex-shrink-0 w-[${100 / visibleItems}%] transition-all duration-300 ease-in-out ${
                index >= currentIndex && index < currentIndex + visibleItems ? 'scale-110' : 'scale-100 opacity-50'
              }`}
            >
              {child}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Next Button */}
      <Button 
        className="flex h-36 w-[100px] border items-center rounded-e-2xl"
        onClick={handleNext}
      >
        {'>'}
      </Button>
    </Box>
  );
};

export default Carousel;
