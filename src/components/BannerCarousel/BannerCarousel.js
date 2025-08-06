import React, { useState, useEffect } from "react";
import "./BannerCarousel.css";

const BannerCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="banner-carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
        >
          <img src={image.url} alt={image.alt} className="carousel-image" />
        </div>
      ))}
      <CarouselDots
        count={images.length}
        activeIndex={currentIndex}
        onDotClick={setCurrentIndex}
      />
    </div>
  );
};

const CarouselDots = ({ count, activeIndex, onDotClick }) => (
  <div className="carousel-dots">
    {Array.from({ length: count }).map((_, index) => (
      <span
        key={index}
        className={`dot ${index === activeIndex ? "active" : ""}`}
        onClick={() => onDotClick(index)}
      />
    ))}
  </div>
);

export default BannerCarousel;
