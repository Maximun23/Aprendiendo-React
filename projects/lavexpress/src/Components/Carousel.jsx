import React, { useState } from 'react';
import lavadora from '../assets/images/lavadora.jpg'
import lavadoragris from '../assets/images/lavadoragris.png'
import lavadorablanca from '../assets/images/lavadorablanca.jpg'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    lavadora,
    lavadorablanca,
    lavadoragris
  ];

  const moveSlide = (direction) => {
    setCurrentIndex((prevIndex) => (prevIndex + direction + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      </div>
      <button className="prev" onClick={() => moveSlide(-1)}>❮</button>
      <button className="next" onClick={() => moveSlide(1)}>❯</button>
    </div>
  );
};

export default Carousel;
