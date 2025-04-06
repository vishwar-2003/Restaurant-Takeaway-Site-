import React from 'react';
import './footer.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container"> {/* ✅ Opening wrapper */}

        <div className="footer-logo-wrapper">
          <img src="../assets/img/images/Thendral_Mess.jpg" alt="Restaurant Logo" className="footer-logo" />
          <hr className="footer-line-behind-logo" />
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h4>Address</h4>
            <p>Callan Building, Maynooth University,<br />Maynooth, Co. kildare</p>

          </div>

          <div className="footer-col">
            <h4>Book a table</h4>
            <p>Separate Hall Available For Birthday<br />Parties & Get Together</p>
            <p className="footer-phone" style={{ color: '#ff4d4d', fontWeight: 'bold' }}>+(353)-089-7654321</p>

          </div>

          <div className="footer-col">
            <h4>Opening hours</h4>
            <p>Monday – Sunday<br />11:00 AM – 11.00 PM</p>
          </div>

          <div className="footer-col">
            <h4>Our Delivery Partners</h4>
            <div className="delivery-logos">
              <img src="../assets/img/images/justeat.png" alt="Just Eat" />
              <img src="../assets/img/images/deliveroo.png" alt="Deliveroo" />
            </div>
          </div>
        </div>

        <hr className="footer-line" />

        <div className="footer-bottom">
          <div className="footer-links">
            <a href="about">About</a>
            <a href="menu">Menu</a>
            <a href="contact">Contact</a>
          </div>

          <p className="copyright">© 2025. Thendral Mess. All rights reserved</p>

          <div className="footer-social-icons">
  {/* <a href="/facebook" className="facebook"><FaFacebookF /></a>
  <a href="/instagram" className="instagram"><FaInstagram /></a>
  <a href="/youtube" className="youtube"><FaYoutube /></a>
  <a href="/twitter" className="twitter"><FaTwitter /></a> */}
  <a href="https://www.instagram.com/maynoothuni/?hl=en" target="_blank" rel="noopener noreferrer" className="instagram"><FaInstagram /></a>
<a href="https://www.facebook.com/MaynoothUniversityInternational/" target="_blank" rel="noopener noreferrer" className="facebook"><FaFacebookF /></a>
<a href="https://x.com/MaynoothUni" target="_blank" rel="noopener noreferrer" className="twitter"><FaTwitter /></a>
<a href="https://www.youtube.com/user/GoMaynooth" target="_blank" rel="noopener noreferrer" className="youtube"><FaYoutube /></a>

</div>
        </div>

      </div> {/* ✅ Proper closing of .footer-container */}
    </footer>
  );
};

export default Footer;