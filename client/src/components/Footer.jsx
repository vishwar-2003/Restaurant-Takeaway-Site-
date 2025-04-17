import React from "react";
import "./styles/Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

/**
 * Footer Component
 * Displays the footer with contact info, delivery partners, links, and social icons.
 */
const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Logo with background line */}
        <div className="footer-logo-wrapper">
          <img
            src="../assets/img/images/Thendral_Mess.jpg"
            alt="Restaurant Logo"
            className="footer-logo"
          />
          <hr className="footer-line-behind-logo" />
        </div>

        {/* Footer Content Columns */}
        <div className="footer-columns">
          {/* Address Section */}
          <div className="footer-col">
            <h4>Address</h4>
            <p>
              Callan Building, Maynooth University,
              <br />
              Maynooth, Co. Kildare
            </p>
          </div>

          {/* Booking Info */}
          <div className="footer-col">
            <h4>Book a table</h4>
            <p>
              Separate Hall Available For Birthday
              <br />
              Parties & Get Together
            </p>
            <p
              className="footer-phone"
              style={{ color: "#e2ce19", fontWeight: "bold" }}
            >
              +(353)-089-7654321
            </p>
          </div>

          {/* Opening Hours */}
          <div className="footer-col">
            <h4>Opening hours</h4>
            <p>
              Monday – Sunday
              <br />
              11:00 AM – 11.00 PM
            </p>
          </div>

          {/* Delivery Partners */}
          <div className="footer-col">
            <h4>Our Delivery Partners</h4>
            <div className="delivery-logos">
              <img src="../assets/img/images/justeat.png" alt="Just Eat" />
              <img src="../assets/img/images/deliveroo.png" alt="Deliveroo" />
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="footer-line" />

        {/* Bottom Footer: links, copyright, socials */}
        <div className="footer-bottom">
          {/* Footer Navigation Links */}
          <div className="footer-links">
            <a href="about">About</a>
            <a href="menu">Menu</a>
            <a href="contact">Contact</a>
          </div>

          {/* Copyright */}
          <p className="copyright">
            © 2025. Thendral Mess. All rights reserved
          </p>

          {/* Social Media Icons */}
          <div className="footer-social-icons">
            <a
              href="https://www.instagram.com/maynoothuni/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/MaynoothUniversityInternational/"
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/MaynoothUni"
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/user/GoMaynooth"
              target="_blank"
              rel="noopener noreferrer"
              className="youtube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>{" "}
      {/* ✅ End of footer-container */}
    </footer>
  );
};

export default Footer;
