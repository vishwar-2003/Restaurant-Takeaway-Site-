import React, { useEffect, useState } from "react";
import "./styles/Header.css";
import "./styles/Navbar.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Header Component
 * Displays site logo, animated brand title, navigation bar (with mobile toggle),
 * and login/logout logic based on localStorage token.
 */
function Header() {
  const navigate = useNavigate();

  // State for toggling mobile navbar
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // State for user auth
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");

  // Run on component mount
  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Load token & name from localStorage (if logged in)
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    if (storedToken) setToken(storedToken);
    if (storedName) setName(storedName);
  }, []);

  // Close mobile menu after clicking nav links
  const handleNavClick = () => {
    if (window.innerWidth <= 768) setIsMobileOpen(false);
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Clear auth data and redirect on logout
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setName("");
    toast.info("Logged out");
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo" data-aos="zoom-in">
          <img
            src="/assets/img/logo.jpg"
            alt="Thendral_Mess"
            className="logo"
          />
        </div>

        {/* Animated Brand Name */}
        <div className="title-text" data-aos="fade-left">
          <h1 className="animated-title">
            {"Thendral Mess".split("").map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <nav className={`main-navbar ${isMobileOpen ? "mobile-open" : ""}`}>
          <ul>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={handleNavClick}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link" onClick={handleNavClick}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="/menu" className="nav-link" onClick={handleNavClick}>
                Menu
              </a>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button">
                Order
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/order"
                    className="dropdown-item"
                    onClick={handleNavClick}
                  >
                    Make an Order
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-order"
                    className="dropdown-item"
                    onClick={handleNavClick}
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/review" className="nav-link" onClick={handleNavClick}>
                Review
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={handleNavClick}>
                Contact
              </Link>
            </li>

            {/* Auth Section */}
            {!token ? (
              <li className="nav-item">
                <button
                  className="nav-buttonl"
                  onClick={() => {
                    handleNavClick();
                    navigate("/signin");
                  }}
                >
                  Log In
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-buttonl logout-button"
                  onClick={() => {
                    handleNavClick();
                    logout();
                  }}
                >
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
