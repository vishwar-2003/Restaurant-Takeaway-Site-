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
            <p>18/1, Arya Samaj Rd, Block 18,<br />WEA, Karol Bagh, Delhi-05</p>
          </div>

          <div className="footer-col">
            <h4>Book a table</h4>
            <p>Separate Hall Available For Birthday<br />Parties & Get Together</p>
            <p className="footer-phone" style={{ color: '#ff4d4d', fontWeight: 'bold' }}>+91 8006698006</p>

          </div>

          <div className="footer-col">
            <h4>Opening hours</h4>
            <p>Monday – Sunday<br />06.30 AM – 11.00 PM</p>
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
            <a href="#">About</a>
            <a href="#">Menu</a>
            <a href="#">Contact</a>
          </div>

          <p className="copyright">© 2025. Thendral Mess. All rights reserved</p>

          <div className="footer-social-icons">
  <a href="#" className="facebook"><FaFacebookF /></a>
  <a href="#" className="instagram"><FaInstagram /></a>
  <a href="#" className="youtube"><FaYoutube /></a>
  <a href="#" className="twitter"><FaTwitter /></a>
</div>
        </div>

      </div> {/* ✅ Proper closing of .footer-container */}
    </footer>
  );
};

export default Footer;