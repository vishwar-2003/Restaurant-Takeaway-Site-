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

// Protected Route component
const ProtectedRoute = ({children}) => {
  const customerToken = localStorage.getItem('token');
  if (!customerToken) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Layout component for non-admin pages
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        {/* Main Routes with Header and Footer */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/order"  element={
                              <ProtectedRoute>
                                <OrderPage />
                              </ProtectedRoute>
                            } />
                <Route path="/my-order" element={
                              <ProtectedRoute>  
                                <MyOrderPage />
                              </ProtectedRoute>} />
                <Route path="/order-details/:orderId" element={
                              <ProtectedRoute>
                                <MyOrderDetailsPage />
                              </ProtectedRoute>} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/review" element={<ReviewPage />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
