import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

import "./styles/Home.css"; // Main Home styles
import "./styles/MenuSection.css"; // Styles specific to Menu section
import "aos/dist/aos.css"; // Animation on Scroll library styles

import Review from "./ReviewSection"; // Review component
import FAQ from "./Faq"; // FAQ component
import Gallery from "./Gallery"; // Gallery component

/**
 * Home Component
 * Displays the landing video, menu preview, gallery, reviews, and FAQ
 */
function Home() {
  const [menuItems, setMenuItems] = useState([]); // Menu data fetched from backend
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Run on component mount
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS animations

    // Fetch menu items from backend
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => setMenuItems(res.data.data))
      .catch((err) => console.error("Menu fetch error:", err));
  }, []);

  /**
   * Navigate to the full menu page
   */
  const handleClick = () => {
    navigate("/menu");
  };

  return (
    <div className="home-page">
      {/* Hero Section with Background Video */}
      <section className="hero-video-section">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="../assets/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-content">
          <h1 data-aos="zoom-in">Welcome to Thendral Mess!</h1>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-page">
        <div className="menu-header">
          <h1 className="menu-tag">Our Menu</h1>
        </div>

        <div className="menu-list">
          {menuItems.slice(0, 7).map((item, index) => (
            <div key={index} className="menu-row">
              <div className="dish-name">{item.name}</div>
              <div className="dish-price">€ {item.price}</div>
            </div>
          ))}
        </div>

        {/* Call-to-action button to see full menu */}
        <div className="menu-btn-wrapper">
          <button className="menu-cta" onClick={handleClick}>
            Explore More
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Reviews Section */}
      <Review />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}

export default Home;
