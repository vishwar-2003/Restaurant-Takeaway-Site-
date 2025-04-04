import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ token, name, fetchReviews }) => {
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return toast.error('Please write a comment.');

        try {
            await axios.post(
                'http://localhost:5000/api/reviews',
                { rating, comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
        <div className="card p-4 shadow-sm mb-4">
            <h5 className="mb-3">Leave a Review</h5>
            <form onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div className="mb-3 d-flex align-items-center">
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
                    <span className="ms-2">{rating} Star{rating > 1 ? 's' : ''}</span>
                </div>

                {/* Comment Field */}
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        required
                    />
                </div>

                <button className="btn btn-success">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewForm;
