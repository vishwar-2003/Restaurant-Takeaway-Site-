import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container mt-5 text-center">
            <h1>Welcome to Our Restaurant!</h1>
            <p>Click below to view or leave customer reviews.</p>
            <Link to="/reviews" className="btn btn-primary mt-3">
                Go to Reviews
            </Link>
        </div>
    );
};

export default HomePage;
