import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";

const Slider = ({ items, renderItem }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const sliderRef = useRef(null);

  const handleScroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 400; // Kaydırma miktarı
    if (direction === "left") {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      const slider = sliderRef.current;
      if (slider.scrollWidth > slider.clientWidth) {
        setIsOverflowing(true); // Kartlar sığmıyor
      } else {
        setIsOverflowing(false); // Kartlar sığıyor
      }
    };

    checkOverflow(); // İlk yüklemede kontrol et
    window.addEventListener("resize", checkOverflow); // Pencere boyutu değiştiğinde kontrol et
    return () => window.removeEventListener("resize", checkOverflow); // Event listener'ı temizle
  }, [items]);

  return (
    <div className="slider-container-wrapper">
      {isOverflowing && (
        <button
          className="slider-button left"
          onClick={() => handleScroll("left")}
        >
          {"<"}
        </button>
      )}
      <div className="slider-container" ref={sliderRef}>
        {items.map((item, index) => renderItem(item, index))}
      </div>
      {isOverflowing && (
        <button
          className="slider-button right"
          onClick={() => handleScroll("right")}
        >
          {">"}
        </button>
      )}
    </div>
  );
};

export default Slider;
