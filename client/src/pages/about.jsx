import React, { useEffect, useState } from "react";
import "./about.css"; // Import the corresponding CSS file for styling

function About() {
  // State for animated counters
  const [counters, setCounters] = useState({
    customers: 0,
    dishes: 0,
    awards: 0,
  });

  // Add scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");

            // If it's the fun facts section, start the counters
            if (entry.target.classList.contains("fun-facts-container")) {
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections with animation classes
    document
      .querySelectorAll(".fade-in, .slide-in, .fun-facts-container")
      .forEach((section) => {
        observer.observe(section);
      });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Function to animate counters
  const animateCounters = () => {
    const targetValues = {
      customers: 5000,
      dishes: 120,
      awards: 15,
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(targetValues);
        return;
      }

      const progress = currentStep / steps;

      setCounters({
        customers: Math.floor(progress * targetValues.customers),
        dishes: Math.floor(progress * targetValues.dishes),
        awards: Math.floor(progress * targetValues.awards),
      });
    }, stepDuration);
  };
  const scrollToSection = () => {
    window.scrollBy({
      top: 800, // Change this value to control how much you want to scroll
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="about-page">
      {/* Food Section */}
      <section className="food-section">
        <div className="food-content slide-in">
          <h2>
            All Delicious <span className="food-category">Indian </span>
          </h2>
          <p>Fresh, authentic, and full of flavor.</p>
          <button className="find-more-btn" onClick={scrollToSection}>
            Find for more
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-container fade-in">
        <div className="about-content" id="target-section">
          <div className="about-text">
            <p className="about-subtitle">Our Story</p>
            <h3 className="about-title">Who we are</h3>
            <p className="about-description">
              Welcome to our Thendral Mess! We are a passionate team dedicated
              to serving you the best traditional and modern Indian dishes,
              prepared with love and the finest ingredients. Our chefs blend
              authentic spices with fresh produce to create a mouthwatering
              experience.
            </p>
            <div className="about-cards">
              <div className="about-card">
                <h4>Our Passion</h4>
                <p>
                  Our passion lies in bringing the rich flavors of India to your
                  table. From the streets of Delhi to the kitchens of Kerala, we
                  showcase the diverse culinary traditions of India, all while
                  maintaining the authenticity and soul of each dish
                </p>
              </div>
              <div className="about-card">
                <h4>Our Journey</h4>
                <p>
                  Our journey began with a dream to share the authentic tastes
                  of India. Over the years, we’ve expanded our menu, refined our
                  techniques, and built relationships with local farmers and
                  spice merchants, ensuring that every bite is as fresh and
                  vibrant as the Indian culture itself.
                </p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="../assets/img/chef-animation.gif"
              alt="Chef preparing food"
            />
          </div>
        </div>
      </section>

      <section className="mission-container fade-in">
        <div className="mission-content">
          <div className="mission-text">
            <p className="mission-subtitle">Our Purpose</p>
            <h3 className="mission-title">Mission & Vision</h3>
            <div className="mission-cards">
              <div className="mission-card">
                <h4>Our Mission</h4>
                <p>
                  To deliver exceptional culinary experiences that bring people
                  together, creating memorable moments through our passion for
                  food and hospitality.
                </p>
              </div>
              <div className="mission-card">
                <h4>Our Vision</h4>
                <p>
                  To be the most beloved restaurant brand, known for our
                  innovative cuisine, sustainable practices, and commitment to
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}

      {/* Team Section */}
      <section className="team-container fade-in">
        <div className="team-content">
          <p className="team-subtitle">Meet Our Team</p>
          <h3 className="team-title">The People Behind Our Success</h3>
          <div className="team-members">
            <div
              className="team-member fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="member-image">
                <img src="../assets/img/bg-img-3.png" alt="Team Member 1" />
              </div>
              <h4>Aswin Kumar Viswanathan</h4>
              <p>Executive Chef</p>
            </div>

            <div
              className="team-member fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="member-image">
                <img src="../assets/img/bg-img-1.png" alt="Team Member 2" />
              </div>
              <h4>Viswa Ravikumar</h4>
              <p>Sous Chef</p>
            </div>

            <div
              className="team-member fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="member-image">
                <img src="../assets/img/bg-img-2.jpg" alt="Team Member 3" />
              </div>
              <h4>Santhosh Prabhakaran</h4>
              <p>Pastry Chef</p>
            </div>

            <div
              className="team-member fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="member-image">
                <img src="../assets/img/team-4.jpg" alt="Team Member 4" />
              </div>
              <h4>Abenesh Ramesh</h4>
              <p>Restaurant Manager</p>
            </div>

            <div
              className="team-member fade-in"
              style={{ animationDelay: "1s" }}
            >
              <div className="member-image">
                <img src="../assets/img/Team-5.jpeg" alt="Team Member 5" />
              </div>
              <h4>Deepa sri Thamarai Selvam</h4>
              <p>Sommelier</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="fun-facts-container fade-in">
        <div className="fun-facts-content">
          <p className="fun-facts-subtitle">Our Achievements</p>
          <h3 className="fun-facts-title">Fun Facts</h3>
          <div className="fun-facts-cards">
            <div className="fun-fact-card">
              <div className="fun-fact-icon">
                <img src="../assets/img/svg/lotus.svg" alt="Customers Icon" />
              </div>
              <div className="fun-fact-counter">{counters.customers}+</div>
              <p className="fun-fact-label">Happy Customers</p>
            </div>
            <div className="fun-fact-card">
              <div className="fun-fact-icon">
                <img src="../assets/img/svg/kolam.svg" alt="Dishes Icon" />
              </div>
              <div className="fun-fact-counter">{counters.dishes}+</div>
              <p className="fun-fact-label">Signature Dishes</p>
            </div>
            <div className="fun-fact-card">
              <div className="fun-fact-icon">
                <img src="../assets/img/svg/border-img.svg" alt="Awards Icon" />
              </div>
              <div className="fun-fact-counter">{counters.awards}</div>
              <p className="fun-fact-label">Awards & Recognition</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
