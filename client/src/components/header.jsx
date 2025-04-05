import React, { useEffect, useState } from 'react';
import './header.css';
import './navbar.css';
import AOS from 'aos';
// import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';


function Header() {
  // const navigate = useNavigate();

    // const handleRegisterClick = () => {
    //   handleNavClick(); // your custom toggle or UI close function
    //   navigate('/RegisterForm'); // or '/RegisterForm' if that's your route path
    // };

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleNavClick = () => {
    if (window.innerWidth <= 768) setIsMobileOpen(false);
  };
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  

  return (
    


    <header className="site-header">
      <div className="header-container">
          <div className="logo" data-aos="zoom-in">
            <img src="/assets/img/logo.jpg" alt="Thendral_Mess" className="logo" />

          </div>
          <div className="title-text" data-aos="fade-left">
            <h1 className="animated-title">
              {"THENDRAL MESS".split("").map((char, index) => (
                <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            {/* <div className="hamburger" onClick={toggleMenu}>
            <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </div> */}
          </div>
          <div className="hamburger" onClick={toggleMobileMenu}>
  <span></span>
  <span></span>
  <span></span>
</div>

          

          
         

          <nav className={`main-navbar ${isMobileOpen ? 'mobile-open' : ''}`}>

          
            <ul>
              <li className="nav-item"><a href="/" className="nav-link" onClick={handleNavClick}>Home</a></li>
              <li className="nav-item"><a href="/about" className="nav-link" onClick={handleNavClick}>About</a></li>
              <li className="nav-item"><a href="/menu" className="nav-link" onClick={handleNavClick}>Menu</a></li>
              <li className="nav-item"><Link to="/contact" className="nav-link" onClick={handleNavClick}>Contact</Link>
              </li>
              
<li className="nav-item">
  <button className="nav-buttonl" onClick={() => { handleNavClick(); window.location.href = "/LoginForm"; }}>
    Log-In
  </button>
</li>
</ul>
          </nav>


  
 

  



      </div>

    </header>
  );
}

export default Header;


