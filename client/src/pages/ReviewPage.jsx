import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ReviewForm from '../components/ReviewForm';
import { FaStar} from 'react-icons/fa';
import {AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import bgImage from '../assets/img/review-bg.jpg';
import AnimatedReviewCard from '../components/AnimatedReviewCard';

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
            } catch {
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
        } catch {
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
        (r.customerName?.toLowerCase().includes(search.toLowerCase()) || false) ||
        (r.comment?.toLowerCase().includes(search.toLowerCase()) || false)
    );

    return (
        <div
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '50px 0',
                position: 'relative'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    zIndex: 1
                }}
            ></div>

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: '1200px',
                    margin: '0 auto',
                    backgroundColor: '#F5F5F5',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                }}
            >

                {token && (
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-outline-danger" onClick={logout}>
                            Logout
                        </button>
                    </div>
                )}

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

                {ratingStats.total > 0 && (
                    <div className="my-4 text-center">
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

                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search reviews..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {
                    <div className="row">
                        <AnimatePresence>
                            {filtered.map((r, index) => (
                                <div className="col-md-6" key={r._id}>
                                    <AnimatedReviewCard review={r} index={index} />
                                </div>
                            ))}
                        </AnimatePresence>
                    </div>

}
            </div>
        </div>
    );
};

export default ReviewPage;
