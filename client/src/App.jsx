import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SignInForm from "./components/SignInForm"; 
import HomePage from "./pages/Home.jsx"; 
import About from "./pages/About.jsx";
import MenuPage from "./pages/Menu";
import ReviewPage from "./pages/Review.jsx";
import Contact from "./pages/Contact.jsx";
import OrderPage from "./pages/Order";
import MyOrderPage from "./pages/MyOrders";
import Dashboard from "./pages/admin/Dashboard.tsx";
import MyOrderDetailsPage from "./pages/MyOrderDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/my-order" element={<MyOrderPage />} />
        <Route path="/order-details/:orderId" element={<MyOrderDetailsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
