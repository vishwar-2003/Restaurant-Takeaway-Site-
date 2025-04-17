import React, { useRef, useState, useEffect } from "react";
import "./styles/Gallery.css"; // CSS for styling the image gallery

/**
 * Array of gallery images with paths and alt text
 */
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

/**
 * Gallery Component
 * Displays a horizontally scrollable gallery with image modal (lightbox)
 */
const Gallery = () => {
  const scrollRef = useRef(null); // Reference to the scrollable gallery container
  const [selectedImage, setSelectedImage] = useState(null); // Index of currently viewed image in modal

  /**
   * Manually scrolls the gallery left or right
   */
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  /**
   * Opens the image modal with the selected image index
   */
  const openImage = (index) => {
    setSelectedImage(index);
  };

  /**
   * Closes the image modal
   */
  const closeModal = () => {
    setSelectedImage(null);
  };

  /**
   * Navigates to the previous image in the modal
   */
  const showPrev = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  /**
   * Navigates to the next image in the modal
   */
  const showNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  /**
   * Automatically scrolls the gallery every 2 seconds
   * Loops back to start when reaching the end
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 300,
          behavior: "smooth",
        });

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // If gallery is at or near the end, scroll back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="gallery-container">
      {/* Scroll Left Button */}
      <button className="scroll-btn left" onClick={() => scroll("left")}>
        ❮
      </button>

      {/* Scrollable Image Row */}
      <div className="gallery-scroll" ref={scrollRef}>
        {images.map((img, i) => (
          <div className="gallery-item" key={i} onClick={() => openImage(i)}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button className="scroll-btn right" onClick={() => scroll("right")}>
        ❯
      </button>

      {/* Lightbox Modal for Viewing Selected Image */}
      {selectedImage !== null && (
        <div className="lightbox" onClick={closeModal}>
          {/* Close Button */}
          <span className="lightbox-close" onClick={closeModal}>
            &times;
          </span>

          {/* Previous Image Button */}
          <button
            className="lightbox-nav left"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            &#8249;
          </button>

          {/* Display Selected Image */}
          <img
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Image Button */}
          <button
            className="lightbox-nav right"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
