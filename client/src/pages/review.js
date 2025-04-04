import React, { useState, useEffect } from 'react';
import './review.css'; // optional: import your styles
import reviews from './reviewData';

function ReviewSlider3D() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getPositionClass = (index) => {
    if (index === current) return 'carousel-card active';
    if (index === (current + 1) % reviews.length) return 'carousel-card right';
    if (index === (current - 1 + reviews.length) % reviews.length) return 'carousel-card left';
    return 'carousel-card';
  };

  return (
    <section className="review-carousel-container">
      <button className="nav-btn left" onClick={prevSlide}>❮</button>

      <div className="carousel-wrapper">
        {reviews.map((review, index) => (
          <div key={index} className={getPositionClass(index)}>
            <img src={review.img} alt="review dish" />
            <div className="card-content">
                <h3>⭐ {review.rating} <span className="green-dots">●●●●◐</span></h3>
                <p className="review-count">{review.totalReviews} reviews</p>
                
                <div className="category-ratings">
                    <div><span>🍽️ Food</span><span className="green-dots">{"●".repeat(review.food)}</span></div>
                    <div><span>🧑‍🍳 Service</span><span className="green-dots">{"●".repeat(review.service)}</span></div>
                    <div><span>💰 Value</span><span className="green-dots">{"●".repeat(review.value)}</span></div>
                    <div><span>🎉 Atmosphere</span><span className="green-dots">{"●".repeat(review.atmosphere)}</span></div>
                </div>

                <blockquote>{review.review}</blockquote>
                    
                </div>

          </div>
        ))}
      </div>

      <button className="nav-btn right" onClick={nextSlide}>❯</button>
    </section>
  );
}

export default ReviewSlider3D;

