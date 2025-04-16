import React, { useState, useEffect } from 'react';
import './styles/ReviewSection.css';
import reviews from './reviewData';

function ReviewCarousel3D() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [current]);



  const getCardClass = (index) => {
    if (index === current) return 'carousel-card active';
    if (index === (current - 1 + reviews.length) % reviews.length) return 'carousel-card left';
    if (index === (current + 1) % reviews.length) return 'carousel-card right';
    return 'carousel-card hidden';
  };

  return (
    <section className="review-3d-section">
      <div className="review-carousel-column">
        
        <div className="carousel-wrapper">
          {reviews.map((review, index) => (
            <div key={index} className={getCardClass(index)}>
              <img src={review.img} alt="review dish" />
              <div className="card-content">
                <h3>⭐ {review.rating}</h3>
                <p className="review-count">{review.totalReviews} reviews</p>
                <div className="category-ratings">
                  <div><span>🍽️ Food</span><span>{"⭐".repeat(review.food)}</span></div>
                  <div><span>🧑‍🍳 Service</span><span>{"⭐".repeat(review.service)}</span></div>
                  <div><span>💰 Value</span><span>{"⭐".repeat(review.value)}</span></div>
                  <div><span>🎉 Atmosphere</span><span>{"⭐".repeat(review.atmosphere)}</span></div>
                </div>
                <blockquote>{review.review}</blockquote>
              </div>
            </div>
          ))}
        </div>
     
      </div>
  
      <div className="review-column right">
        <section className="review-entry">
        <h2>Love Our Food?</h2>
        <p>Leave your feedback or check out what others are saying!</p>
          <a href="/review" className="btn review-button">Go to Reviews</a>
        </section>
      </div>
    </section>

    
  );
  
}

export default ReviewCarousel3D;
