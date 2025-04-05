import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import MenuPage from './pages/MenuPage';
import About from './pages/about';
import './App.css';
import ReviewPage from './pages/ReviewPage';
import HomePage from './pages/HomePage';
import Contact from './pages/contact';


function App() {
    return (
        
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews" element={<ReviewPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/menu" element={<MenuPage />} /> {/* ✅ Route added */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
