import React from 'react';
import './styles/Contact.css';
import { FaMapMarkerAlt, FaClock, FaEnvelope} from 'react-icons/fa';

const Contact = () => {
  return (
    

    <section className="contact-info-section">
      <div className="contact-page-container">
      <div className="contact-page-image">
        <img src="../assets/img/ho.jpg" alt="Delicious Food" />
      </div>

      <div className="contact-page-form-section">
        <h2 className="contact-page-heading">Contact us</h2>
        <form className="contact-page-form">
          <div className="contact-page-form-row">
            <input type="text" placeholder="Full name" className="contact-page-input" />
            <input type="email" placeholder="Email address" className="contact-page-input" />
          </div>
          <div className="contact-page-form-row">
            <input type="text" placeholder="Phone number" className="contact-page-input" />
            <input type="text" placeholder="Subject" className="contact-page-input" />
          </div>
          <textarea placeholder="Message" className="contact-page-textarea"></textarea>
          <button type="submit" className="contact-page-submit-btn">SUBMIT MESSAGE</button>
        </form>
        <div className="contact-info-box">
      <h3><FaMapMarkerAlt className="icon" /> Address</h3>
      <p><strong>Town:</strong> Callan Building, Maynooth University</p>
      <p><strong>City:</strong> Maynooth</p>
    </div>
    <div className="contact-info-box">
      <h3><FaClock className="icon" /> Open Hours</h3>
      <p><strong>Day:</strong> Monday - Sunday</p>
      <p><strong>Time:</strong> 11:00 AM - 11:00 PM</p>
      <p><strong>Phone:</strong> +(353)-089-7654321</p>
    </div>
    <div className="contact-info-box">
        <h3><FaEnvelope className="icon" /> Email</h3>
        <p><strong>Mail:</strong> thendralmess@gmail.com</p>
        <p><strong>Website:</strong> www.thendralmess.com</p>
      </div>
      
      </div>
    </div>
    
    <div className="map-newsletter-section">
      <div className="map-container">
        <iframe
          title="Google Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.726061296233!2d-6.603944171697023!3d53.383950767111834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48676ffd2527a759%3A0xaa8530c2f2780a0f!2sCallan%20Building!5e0!3m2!1sen!2sie!4v1743924827642!5m2!1sen!2sie"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="newsletter-box">
          <h3>Subscribe Our Newsletter</h3>
          <p>Get our newsletter delivered monthly with food deals, updates, and events.</p>
          
          <form className="newsletter-form">
              <div className="input-wrapper">
                <FaEnvelope className="email-icon" />
                    <input type="email" placeholder="Your Email Address..." required />
          </div>
        <button type="submit">Subscribe</button>
      </form>
        </div>
      </div>

      <div className="after-map">
        
      </div>
    </div>

    

    
    </section>
  );
};

export default Contact;
