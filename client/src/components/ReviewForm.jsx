import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * ReviewForm Component
 * Allows authenticated users to submit a review with a star rating and comment.
 *
 * Props:
 * - token: authentication token (string)
 * - name: customer name (string)
 * - fetchReviews: function to reload the list of reviews after submission
 */
const ReviewForm = ({ token, name, fetchReviews }) => {
  const [rating, setRating] = useState(5); // Star rating (default 5)
  const [hover, setHover] = useState(null); // Star hover state for visual feedback
  const [comment, setComment] = useState(""); // Text comment input
  const navigate = useNavigate();

  /**
   * Handles review submission.
   * Posts the review to the backend and resets the form if successful.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Please write a comment.");

    try {
      await axios.post(
        "http://localhost:5000/api/review",
        { rating, comment, customerName: name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review submitted!");
      setComment("");
      setRating(5);
      fetchReviews(); // Refresh parent list
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit review.");
    }
  };

  return (
    <div
      className="card p-4 shadow-lg mb-4"
      style={{
        borderRadius: "18px",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(6px)",
      }}
    >
      <h5 className="mb-3 text-center">Leave a Review</h5>

      {/* Show form only if user is logged in */}
      {token ? (
        <form onSubmit={handleSubmit}>
          {/* Star Rating Component */}
          <div className="mb-3 d-flex align-items-center justify-content-center">
            {[...Array(5)].map((_, i) => {
              const value = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    onClick={() => setRating(value)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={28}
                    style={{ cursor: "pointer", transition: "color 0.2s" }}
                    color={value <= (hover || rating) ? "#f8c02c" : "#e4e5e9"}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>

          {/* Comment Input */}
          <textarea
            className="form-control mb-3 rounded-3"
            placeholder="Write your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            required
          />

          {/* Submit Button */}
          <button className="btn btn-success w-100 rounded-3">
            Submit Review
          </button>
        </form>
      ) : (
        // Guest view – show sign-in prompt
        <div className="text-center">
          <p className="mb-3">
            <strong>You must be signed in to write a review.</strong>
          </p>
          <button
            className="btn btn-outline-primary rounded-3"
            style={{
              backgroundColor: "white",
              color: "#000",
              border: "2px solid #f0c040",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f0c040";
              e.target.style.color = "#000";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.color = "#000";
            }}
            onClick={() => navigate("/signin?redirect=/review")}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
