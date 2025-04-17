import React, { useState, useEffect } from "react";
import "./styles/ReviewSection.css";
import reviews from "./ReviewData";

/**
 * ReviewCarousel3D Component
 * Displays a 3D rotating carousel of static review cards
 * alongside a CTA section linking to the full review page.
 */
function ReviewCarousel3D() {
  const [current, setCurrent] = useState(0); // Index of currently active card

  // Automatically rotate carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 2000);
    return () => clearInterval(interval); // Clear on unmount
  }, [current]);

  /**
   * Returns the appropriate CSS class based on the card's position in carousel
   */
  const getCardClass = (index) => {
    if (index === current) return "carousel-card active";
    if (index === (current - 1 + reviews.length) % reviews.length)
      return "carousel-card left";
    if (index === (current + 1) % reviews.length) return "carousel-card right";
    return "carousel-card hidden";
  };

  return (
    <section className="review-3d-section">
      {/* Left Column: Review Carousel */}
      <div className="review-carousel-column">
        <div className="carousel-wrapper">
          {reviews.map((review, index) => (
            <div key={index} className={getCardClass(index)}>
              <img src={review.img} alt="review dish" />
              <div className="card-content">
                <h3>⭐ {review.rating}</h3>
                <p className="review-count">{review.totalReviews} reviews</p>
                <div className="category-ratings">
                  <div>
                    <span>🍽️ Food</span>
                    <span>{"⭐".repeat(review.food)}</span>
                  </div>
                  <div>
                    <span>🧑‍🍳 Service</span>
                    <span>{"⭐".repeat(review.service)}</span>
                  </div>
                  <div>
                    <span>💰 Value</span>
                    <span>{"⭐".repeat(review.value)}</span>
                  </div>
                  <div>
                    <span>🎉 Atmosphere</span>
                    <span>{"⭐".repeat(review.atmosphere)}</span>
                  </div>
                </div>
                <blockquote>{review.review}</blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Call to Action */}
      <div className="review-column right">
        <section className="review-entry">
          <h2>Love Our Food?</h2>
          <p>Leave your feedback or check out what others are saying!</p>
          <a href="/review" className="btn review-button">
            Go to Reviews
          </a>
        </section>
      </div>
    </section>
  );
}

export default ReviewCarousel3D;
