import { useState, useEffect } from "react";
import lavadora from "../assets/images/lavadora.jpg";
import lavadorablanca from "../assets/images/lavadorablanca.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [lavadora, lavadorablanca];

  const moveSlide = (direction) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + images.length) % images.length
    );
  };

  // Mover automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      moveSlide(1); // Mueve la imagen hacia adelante
    }, 1000); // 1000 ms = 1 segundo

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel-images">
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      </div>
      <button className="prev" onClick={() => moveSlide(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645"
          />
        </svg>
      </button>

      <button className="next" onClick={() => moveSlide(1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5.536 21.886a1 1 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
