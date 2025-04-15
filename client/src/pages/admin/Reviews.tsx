// TODO: This file needs to be converted to JSX

import React, { useState } from 'react';
import '../styles/admin/Reviews.css';

// Mock data for reviews
const mockReviews = [
  { id: 'REV-001', reviewerName: 'John Doe', rating: 5, comment: 'Amazing food and service! Will definitely come back again.', date: '2023-06-15' },
  { id: 'REV-002', reviewerName: 'Jane Smith', rating: 4, comment: 'Great experience overall. The food was delicious, but service was a bit slow.', date: '2023-06-14' },
  { id: 'REV-003', reviewerName: 'Robert Johnson', rating: 5, comment: 'Best restaurant in town! The ambiance is perfect and the food is outstanding.', date: '2023-06-13' },
  { id: 'REV-004', reviewerName: 'Emily Davis', rating: 3, comment: 'Food was good but a bit overpriced. Service was excellent though.', date: '2023-06-12' },
  { id: 'REV-005', reviewerName: 'Michael Wilson', rating: 5, comment: 'Absolutely loved everything! The chef\'s special was incredible.', date: '2023-06-11' },
  { id: 'REV-006', reviewerName: 'Sarah Brown', rating: 4, comment: 'Very good experience. The wine selection is impressive.', date: '2023-06-10' },
  { id: 'REV-007', reviewerName: 'David Miller', rating: 5, comment: 'Exceptional service and the food was cooked to perfection.', date: '2023-06-09' },
  { id: 'REV-008', reviewerName: 'Jennifer Taylor', rating: 2, comment: 'Disappointed with the quality of food. Expected better for the price.', date: '2023-06-08' },
  { id: 'REV-009', reviewerName: 'William Anderson', rating: 5, comment: 'One of the best dining experiences I\'ve had in years. Highly recommend!', date: '2023-06-07' },
  { id: 'REV-010', reviewerName: 'Elizabeth Thomas', rating: 4, comment: 'Great atmosphere and friendly staff. Food was delicious.', date: '2023-06-06' },
];

const Reviews: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<string>('desc');

  // Sort reviews based on selected criteria
  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'rating') {
      return sortOrder === 'desc' 
        ? b.rating - a.rating
        : a.rating - b.rating;
    }
    return 0;
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : 'empty'}`}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="reviews-sort">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <button 
            className="sort-order-button"
            onClick={toggleSortOrder}
            title={`Sort ${sortOrder === 'desc' ? 'Ascending' : 'Descending'}`}
          >
            {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>

      <div className="reviews-grid">
        {sortedReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3 className="reviewer-name">{review.reviewerName}</h3>
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-footer">
              <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
              <div className="review-actions">
                <button className="action-button reply">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews; 