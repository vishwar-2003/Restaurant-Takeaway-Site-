import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ token, name, fetchReviews }) => {
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return toast.error('Please write a comment.');

        try {
            await axios.post(
                'http://localhost:5000/api/review',
                { rating, comment, customerName: name },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success('Review submitted!');
            setComment('');
            setRating(5);
            fetchReviews();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to submit review.');
        }
    };

    return (
        <div
            className="card p-4 shadow-lg mb-4"
            style={{
                borderRadius: '18px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(6px)',
            }}
        >
            <h5 className="mb-3 text-center">Leave a Review</h5>

            {token ? (
                <form onSubmit={handleSubmit}>
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
                                        style={{ display: 'none' }}
                                    />
                                    <FaStar
                                        size={28}
                                        style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                                        color={value <= (hover || rating) ? '#f8c02c' : '#e4e5e9'}
                                        onMouseEnter={() => setHover(value)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <textarea
                        className="form-control mb-3 rounded-3"
                        placeholder="Write your thoughts..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        required
                    />

                    <button className="btn btn-success w-100 rounded-3">Submit Review</button>
                </form>
            ) : (
                <div className="text-center">
                    <p className="mb-3">
                        <strong>You must be signed in to write a review.</strong>
                    </p>
                    <button
                        className="btn btn-outline-primary rounded-3"
                        onClick={() => navigate('/signin?redirect=/review')}
                    >
                        Sign In
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
