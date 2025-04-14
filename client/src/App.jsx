import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import MenuPage from "./pages/MenuPage";
import About from "./pages/about";
import "./App.css";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/HomePage"; // Make sure you have the HomePage component
import Contact from "./pages/contact";
import SignInForm from "./components/SignInForm";
import Dashboard from "./admin/Dashboard.tsx";
// ✅ Import SignIn

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />{" "}
        {/* Add the /home route here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
