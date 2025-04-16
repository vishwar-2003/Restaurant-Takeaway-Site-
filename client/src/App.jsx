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
import OrderPage from "./pages/Order";
import MyOrderPage from "./pages/MyOrders";
import MyOrderDetailsPage from "./pages/MyOrderDetails";
import Contact from "./pages/Contact";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLogin from "./pages/admin/AdminLogin";
import { Navigate } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/my-order" element={<MyOrderPage />} />
        <Route path="/order-details/:orderId" element={<MyOrderDetailsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route
          path="/admin"
          element={localStorage.getItem('adminToken') ? <Dashboard /> : <Navigate to="/adminLogin" />}
        />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/home" element={<HomePage />} />{" "}
        {/* Add the /home route here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
