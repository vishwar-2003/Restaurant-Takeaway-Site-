import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ReviewForm from '../components/ReviewForm';
import { FaStar, FaThumbsUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const ReviewPage = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [name, setName] = useState(localStorage.getItem('name'));
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState('');
    const [ratingStats, setRatingStats] = useState({});
    const [authMode, setAuthMode] = useState('login');

    useEffect(() => {
        const fetchInitialReviews = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/reviews');
                setReviews(res.data);
                calculateStats(res.data);
            } catch (err) {
                toast.error('Failed to load reviews');
            }
        };
        fetchInitialReviews();
    }, []);

    const handleRefreshReviews = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/reviews');
            setReviews(res.data);
            calculateStats(res.data);
        } catch (err) {
            toast.error('Failed to reload reviews');
        }
    };

    const calculateStats = (reviews) => {
        const count = [0, 0, 0, 0, 0];
        let total = 0;

        reviews.forEach((r) => {
            const i = 5 - r.rating;
            count[i] += 1;
            total += r.rating;
        });

        const sum = count.reduce((a, b) => a + b, 0);
        const average = sum ? (total / sum).toFixed(1) : 0;
        const percent = count.map((c) => (sum ? ((c / sum) * 100).toFixed(1) : 0));

        setRatingStats({ count, percent, average, total: sum });
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setName(null);
        toast.info('Logged out');
    };

    const filtered = reviews.filter((r) =>
        r.customerName.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container p-3">

            {/* Centered Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Customer Reviews</h2>
                {token && (
                    <button
                        className="btn btn-outline-danger"
                        onClick={logout}
                        style={{ fontWeight: 500 }}
                    >
                        Logout
                    </button>
                )}
            </div>


            {/* Auth or Review Form */}
            <div className="d-flex justify-content-center">
                <div style={{ width: '100%', maxWidth: '480px' }}>
                    {!token ? (
                        authMode === 'login' ? (
                            <LoginForm
                                setToken={setToken}
                                setName={setName}
                                switchToRegister={() => setAuthMode('register')}
                            />
                        ) : (
                            <RegisterForm switchToLogin={() => setAuthMode('login')} />
                        )
                    ) : (
                        <ReviewForm token={token} name={name} fetchReviews={handleRefreshReviews} />
                    )}
                </div>
            </div>

            {/* Rating Summary */}
            {ratingStats.total > 0 && (
                <div className="my-4">
                    <h4 className="mb-3">
                        ⭐ {ratingStats.average} / 5{' '}
                        <small className="text-muted">({ratingStats.total} reviews)</small>
                    </h4>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div className="d-flex align-items-center mb-2" key={star}>
                            <div style={{ width: 40 }}>
                                {star} <FaStar className="text-warning" />
                            </div>
                            <div className="progress flex-grow-1 mx-2" style={{ height: '16px' }}>
                                <div
                                    className="progress-bar bg-warning"
                                    role="progressbar"
                                    style={{ width: `${ratingStats.percent[5 - star]}%` }}
                                ></div>
                            </div>
                            <div style={{ width: 80, fontSize: '0.85rem' }}>
                                {ratingStats.percent[5 - star]}% ({ratingStats.count[5 - star]})
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search reviews..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <hr />

            {/* Grid Layout for Reviews */}
            <div className="row">
                <AnimatePresence>
                    {filtered.map((r) => (
                        <div className="col-md-6" key={r._id}>
                            <motion.div
                                className="card shadow-sm my-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="card-body d-flex">
                                    {/* Left: Avatar & Rating */}
                                    <div className="me-3 text-center" style={{ minWidth: '80px' }}>
                                        <div
                                            className="rounded-circle bg-light text-dark d-flex align-items-center justify-content-center mx-auto"
                                            style={{ width: '50px', height: '50px', fontSize: '1rem' }}
                                        >
                                            {r.customerName.charAt(0).toUpperCase()}
                                        </div>
                                        <small className="d-block mt-1">{r.customerName}</small>
                                        <div style={{ color: '#f8c02c' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} fill={i < r.rating ? '#f8c02c' : '#e4e5e9'} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Review Content */}
                                    <div className="flex-grow-1">
                                        <p className="mb-2">{r.comment}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">{new Date(r.createdAt).toLocaleString()}</small>
                                            <button
                                                className="btn btn-sm btn-outline-success"
                                                onClick={() => toast.info('You marked this as helpful!')}
                                            >
                                                <FaThumbsUp /> Helpful
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ReviewPage;
