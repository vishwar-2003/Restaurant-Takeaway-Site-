import React, { useState, useEffect } from 'react';
import '../styles/admin/Reviews.css';
import axios from 'axios';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/reviews')  // Admin route for reviews
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
      });
  }, []);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'rating') {
      return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="reviews-sort">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <button className="sort-order-button" onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
            {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>

      <div className="reviews-grid">
        {sortedReviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <h3 className="reviewer-name">{review.customerName}</h3>
              <div className="review-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`star ${index < review.rating ? 'filled' : 'empty'}`}>
                    {index < review.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-footer">
              <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
              <div className="review-actions">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
