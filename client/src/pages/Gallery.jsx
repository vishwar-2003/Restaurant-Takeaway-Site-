import React, { useRef, useState, useEffect } from "react";
import "./styles/Gallery.css";

const images = [
  { src: "../assets/img/images/g-img-1.jpg", alt: "Image 1" },
  { src: "../assets/img/images/g-img-2.jpg", alt: "Image 2" },
  { src: "../assets/img/images/g-img-3.jpg", alt: "Image 3" },
  { src: "../assets/img/images/g-img-4.jpg", alt: "Image 4" },
  { src: "../assets/img/images/g-img-5.jpg", alt: "Image 5" },
  { src: "../assets/img/images/g-img-6.jpg", alt: "Image 6" },
  { src: "../assets/img/images/g-img-7.jpg", alt: "Image 7" },
  { src: "../assets/img/images/g-img-8.jpg", alt: "Image 8" },
  { src: "../assets/img/images/g-img-9.jpg", alt: "Image 9" },
  { src: "../assets/img/images/g-img-10.jpg", alt: "Image 10" },
  { src: "../assets/img/images/g-img-11.jpg", alt: "Image 11" },
  { src: "../assets/img/images/g-img-12.jpg", alt: "Image 12" },
  { src: "../assets/img/images/g-img-13.jpg", alt: "Image 13" },
  { src: "../assets/img/images/g-img-14.jpg", alt: "Image 14" },
  { src: "../assets/img/images/g-img-15.jpg", alt: "Image 15" },
];

const Gallery = () => {
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const openImage = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const showPrev = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Auto-scroll main gallery every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 300,
          behavior: "smooth",
        });

        // Optional: Loop back to start when near end
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery-container">
      <button className="scroll-btn left" onClick={() => scroll("left")}>❮</button>

      <div className="gallery-scroll" ref={scrollRef}>
        {images.map((img, i) => (
          <div className="gallery-item" key={i} onClick={() => openImage(i)}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>


      <button className="scroll-btn right" onClick={() => scroll("right")}>❯</button>

      {selectedImage !== null && (
        <div className="lightbox" onClick={closeModal}>
          <span className="lightbox-close" onClick={closeModal}>
            &times;
          </span>
          <button className="lightbox-nav left" onClick={(e) => { e.stopPropagation(); showPrev(); }}>
            &#8249;
          </button>
          <img
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-nav right" onClick={(e) => { e.stopPropagation(); showNext(); }}>
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;