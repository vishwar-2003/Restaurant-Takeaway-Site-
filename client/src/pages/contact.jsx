import React from "react";
import "./contact.css";

// ✅ Import the image from src
import contactImage from "../assets/img/contact/bgs_1.png";
import mapIcon from "../assets/img/contact/map.svg";
import phoneIcon from "../assets/img/contact/tel.svg";
import mailIcon from "../assets/img/contact/mail.svg";

const ContactPage = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-row">
          {/* Left Arch Image */}
          <div className="contact-image-col motion-left">
            <div className="arch-wrapper">
              <img src={contactImage} alt="Contact" className="arch-image" />
            </div>
          </div>

          {/* Right Content */}
          <div className="contact-content-col">
            <h1 className="contact-heading motion-text">WE ARE AT</h1>
            <p className="contact-location motion-text">
              Maynooth, Co. Kildare, Ireland. Eircode: W23 F2H6
            </p>

            <div className="map-link-group motion-text">
              <a
                href="https://www.google.com/maps/place/Maynooth+University"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={mapIcon} alt="Map" className="map-icon" />
              </a>
              <a
                href="https://www.google.com/maps/place/Maynooth+University"
                target="_blank"
                rel="noopener noreferrer"
                className="view-map-button"
              >
                View on Google Map
              </a>
            </div>

            <div className="reservation-text motion-text">
              <h5>For Reservations & Enquiry</h5>
            </div>

            <div className="contact-details motion-text">
              <div className="contact-block">
                <img src={phoneIcon} alt="Phone" />
                <p>
                  <a href="tel:1234567890">+1234567890</a>
                </p>
                <p>
                  <a href="tel:0123456789">+0123456789</a>
                </p>
              </div>
              <div className="contact-block">
                <img src={mailIcon} alt="Mail" />
                <p>
                  <a href="mailto:thendral@gmail.com">thendral@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="opening-hours motion-text">
              <h2 className="section-title">OPENING HOURS</h2>

              <div className="time-block">
                <h3 className="subheading">Lunch</h3>
                <div className="time-details">
                  <div>
                    <h6>Mon - Thu</h6>
                    <p>12:00PM - 3:30PM</p>
                  </div>
                  <div>
                    <h6>Fri - Sun</h6>
                    <p>11:30AM - 3:30PM</p>
                  </div>
                </div>
              </div>

              <div className="time-block">
                <h3 className="subheading">Dinner</h3>
                <div className="time-details single">
                  <div>
                    <h6>Mon - Sun</h6>
                    <p>7:00PM - 10:00PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
