import React, { useState, useEffect } from "react";
import "./BannerCarousel.css";

const BannerCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

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
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
