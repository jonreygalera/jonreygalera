import React, { Children, PropsWithChildren, useState } from 'react';

interface Props extends PropsWithChildren {
  
}

const HighlightCarousel: React.FC<Props> = ({ children }) => {
  const items = Children.toArray(children);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      {/* Slides */}
      <div className="relative h-56 overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((child) => (
            <div
              className="min-w-full flex-shrink-0 bg-gray-200 rounded-lg p-5 shadow-lg"
            >
              { child }
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow hover:bg-gray-800"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow hover:bg-gray-800"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 ${
              currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HighlightCarousel;
