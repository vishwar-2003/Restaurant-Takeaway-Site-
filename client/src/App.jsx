import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import SignInForm from "./components/SignInForm"; 
import HomePage from "./pages/home.jsx"; 
import About from "./pages/about.jsx";
import MenuPage from "./pages/Menu";
import ReviewPage from "./pages/review.jsx";
import OrderPage from "./pages/Order";
import MyOrderPage from "./pages/MyOrders";
import MyOrderDetailsPage from "./pages/MyOrderDetails";
// import HomePage from "./pages/HomePage"; // Make sure you have the HomePage component
import Contact from "./pages/contact";
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
