import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';
import './styles/MenuSection.css';
import Review from './ReviewSection';
import FAQ from './Faq';
import Gallery from './Gallery';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

function Home() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    axios.get('http://localhost:5000/api/menu')
      .then(res => setMenuItems(res.data.data))
      .catch(err => console.error('Menu fetch error:', err));
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    // optional: call API here if needed
      navigate('/menu');
    };
  return (
    <div className="home-page">
      {/* Hero Video Section */}
      <section className="hero-video-section" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
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

        <div className="menu-btn-wrapper">
        <button className="menu-cta" onClick={handleClick}>
          Explore More
        </button>
    </div>
      </section>

      <Gallery />

      {/* Reviews Section */}
      <Review />

      {/* FAQ Section */}
      <FAQ />

      {/* Gallery Section */}
     
    </div>
  );
}

export default Home;
