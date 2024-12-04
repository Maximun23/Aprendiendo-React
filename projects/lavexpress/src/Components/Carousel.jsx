import { useState, useEffect } from "react";
import lavadora from "../assets/images/lavadora.jpg";
import lavadoragris from "../assets/images/lavadoragris.png";
import lavadorablanca from "../assets/images/lavadorablanca.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [lavadora, lavadorablanca, lavadoragris];

  const moveSlide = (direction) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + images.length) % images.length
    );
  };

  // Mover automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      moveSlide(1); // Mueve la imagen hacia adelante
    }, 3000); // 3000 ms = 3 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel-images">
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      </div>
      <button className="prev" onClick={() => moveSlide(-1)}>
        ❮
      </button>
      <button className="next" onClick={() => moveSlide(1)}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;