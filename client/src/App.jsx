import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import MenuPage from './pages/MenuPage';
import About from './pages/about';
import Contact from './pages/contact';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews" element={<ReviewPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/menu" element={<MenuPage />} /> {/* ✅ Route added */}
            </Routes>
        </Router>
    );
}

export default App;
