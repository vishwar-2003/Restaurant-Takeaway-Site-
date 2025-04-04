import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewPage from './pages/ReviewPage';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage'; // ✅ import MenuPage

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews" element={<ReviewPage />} />
                <Route path="/menu" element={<MenuPage />} /> {/* ✅ Route added */}
            </Routes>
        </Router>
    );
}

export default App;
