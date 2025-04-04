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
        <Route path="/menu/items" element={<MenuPage />} />
      </Routes>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu/items" element={<MenuPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
