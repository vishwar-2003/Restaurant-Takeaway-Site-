import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaThumbsUp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.2,
            type: 'spring',
            stiffness: 120,
        },
    }),
};

const AnimatedReviewCard = ({ review, index }) => {
    const handleHelpful = () => {
        toast.info('You marked this review as helpful!');
    };

    return (
        <motion.div
            className="card shadow p-3 mb-4 bg-white rounded"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="d-flex">
                <div className="me-3 text-center">
                    <div
                        className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                        style={{ width: 50, height: 50 }}
                    >
                        {review.customerName?.charAt(0).toUpperCase() || '?'}
                    </div>
                </div>
                <div className="flex-grow-1">
                    <h6 className="mb-1">{review.customerName || 'Anonymous'}</h6>
                    <div className="text-warning mb-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                fill={i < review.rating ? '#f8c02c' : '#e4e5e9'}
                            />
                        ))}
                    </div>
                    <p className="mb-2">{review.comment}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                            {new Date(review.createdAt).toLocaleString()}
                        </small>
                        <button
                            className="btn btn-sm btn-outline-success"
                            onClick={handleHelpful}
                        >
                            <FaThumbsUp className="me-1" /> Helpful
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AnimatedReviewCard;
