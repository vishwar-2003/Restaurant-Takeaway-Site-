import React, { useState, useEffect } from 'react';
import '../styles/admin/Reviews.css';
import axios from 'axios';

const AdminReviews = () => {
  // State to store reviews and sorting preferences
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // Default sorting by date
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order is descending

  // Effect hook to fetch reviews data from the backend
  useEffect(() => {
    // Fetch reviews from the API
    axios
      .get('http://localhost:5000/api/admin/reviews')  // Admin route for reviews
      .then((res) => {
        setReviews(res.data); // Update state with fetched reviews
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err); // Log error if fetch fails
      });
  }, []);

  // Function to sort reviews based on selected criteria and order
  const sortedReviews = [...reviews].sort((a, b) => {
    // Sorting by date
    if (sortBy === 'date') {
      return sortOrder === 'desc'
        ? new Date(b.date).getTime() - new Date(a.date).getTime() // Sort descending
        : new Date(a.date).getTime() - new Date(b.date).getTime(); // Sort ascending
    }
    // Sorting by rating
    else if (sortBy === 'rating') {
      return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating; // Sort by rating
    }
    return 0; // Default return (no sorting)
  });

  return (
    <div className="reviews-container">
      {/* Header section with title and sorting options */}
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="reviews-sort">
          {/* Dropdown for sorting by date or rating */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </select>
          {/* Button to toggle the sort order (ascending/descending) */}
          <button className="sort-order-button" onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
            {sortOrder === 'desc' ? '↓' : '↑'} {/* Downward or upward arrow indicating sort order */}
          </button>
        </div>
      </div>

      {/* Display reviews in a grid layout */}
      <div className="reviews-grid">
        {sortedReviews.map((review) => (
          <div key={review._id} className="review-card">
            {/* Review header showing the reviewer name and rating */}
            <div className="review-header">
              <h3 className="reviewer-name">{review.customerName}</h3>
              <div className="review-rating">
                {/* Render stars based on the review rating */}
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`star ${index < review.rating ? 'filled' : 'empty'}`}>
                    {index < review.rating ? '★' : '☆'} {/* Filled or empty star based on rating */}
                  </span>
                ))}
              </div>
            </div>
            {/* Review comment */}
            <p className="review-comment">{review.comment}</p>
            <div className="review-footer">
              {/* Display the date the review was created */}
              <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
              <div className="review-actions">
                {/* Additional actions (if any) can be added here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
