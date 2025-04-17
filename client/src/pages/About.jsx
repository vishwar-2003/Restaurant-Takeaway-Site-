import React, { useEffect, useState } from "react";
import "./styles/About.css"; // CSS for styling the About page

/**
 * About Component
 * Renders the About page with various sections including:
 * - Food introduction
 * - Restaurant story
 * - Mission & Vision
 * - Team
 * - Fun facts with animated counters
 */
function About() {
  // State to store counter values for animated fun facts
  const [counters, setCounters] = useState({
    customers: 0,
    dishes: 0,
    awards: 0,
  });

  /**
   * Scroll-based animation using Intersection Observer
   * Adds 'animate' class to sections when they enter the viewport
   * Triggers counter animation specifically when 'fun-facts-container' is visible
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");

            // Trigger counter animation when fun-facts section is in view
            if (entry.target.classList.contains("fun-facts-container")) {
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    // Observe elements with animation classes
    document
      .querySelectorAll(".fade-in, .slide-in, .fun-facts-container")
      .forEach((section) => {
        observer.observe(section);
      });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Animate the counters for Fun Facts section
   * Increments values gradually over 2 seconds
   */
  const animateCounters = () => {
    const targetValues = {
      customers: 5000,
      dishes: 120,
      awards: 15,
    };

    const duration = 2000; // Total duration: 2 seconds
    const steps = 60; // Total animation steps
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      // Stop animation after reaching target steps
      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(targetValues);
        return;
      }

      // Calculate progress and update counter values
      const progress = currentStep / steps;
      setCounters({
        customers: Math.floor(progress * targetValues.customers),
        dishes: Math.floor(progress * targetValues.dishes),
        awards: Math.floor(progress * targetValues.awards),
      });
    }, stepDuration);
  };

  /**
   * Scrolls the page smoothly down by 800px when "Look Our Story" is clicked
   */
  const scrollToSection = () => {
    window.scrollBy({
      top: 800,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="about-page">
      {/* Food Intro Section */}
      <section className="food-section">
        <div className="food-content slide-in">
          <h2>
            All Delicious <span className="food-category">Indian </span>
          </h2>
          <p>Fresh, authentic, and full of flavor.</p>
          <button className="find-more-btn" onClick={scrollToSection}>
            Look Our Story
          </button>
        </div>
      </section>

      {/* About Section - Our Story */}
      <section className="about-container fade-in">
        <div className="about-content" id="target-section">
          <div className="about-text">
            <p className="about-subtitle">Our Story</p>
            <h3 className="about-title">Who we are</h3>
            <p className="about-description">
              Welcome to our Thendral Mess! We are a passionate team dedicated
              to serving you the best traditional and modern Indian dishes...
            </p>

            {/* Passion and Journey Cards */}
            <div className="about-cards">
              <div className="about-card">
                <h4>Our Passion</h4>
                <p>
                  Our passion lies in bringing the rich flavors of India to your
                  table...
                </p>
              </div>
              <div className="about-card">
                <h4>Our Journey</h4>
                <p>
                  Our journey began with a dream to share the authentic tastes
                  of India...
                </p>
              </div>
            </div>
          </div>

          {/* Chef Image */}
          <div className="about-image">
            <img
              src="../assets/img/chef-animation.gif"
              alt="Chef preparing food"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
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
                  together...
                </p>
              </div>
              <div className="mission-card">
                <h4>Our Vision</h4>
                <p>
                  To be the most beloved restaurant brand, known for our
                  innovative cuisine...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-container fade-in">
        <div className="team-content">
          <p className="team-subtitle">Meet Our Team</p>
          <h3 className="team-title">The People Behind Our Success</h3>
          <div className="team-members">
            {/* Team Member 1 */}
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

            {/* Team Member 2 */}
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

            {/* Team Member 3 */}
            <div
              className="team-member fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="member-image">
                <img src="../assets/img/bg-img-2.jpg" alt="Team Member 3" />
              </div>
              <h4>Santhosh Prabhakaran</h4>
              <p>Dessert Chef</p>
            </div>

            {/* Team Member 4 */}
            <div
              className="team-member fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="member-image">
                <img src="../assets/img/team-4.png" alt="Team Member 4" />
              </div>
              <h4>Abenesh Ramesh</h4>
              <p>Restaurant Manager</p>
            </div>

            {/* Team Member 5 */}
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

      {/* Fun Facts Section - Animated Counters */}
      <section className="fun-facts-container fade-in">
        <div className="fun-facts-content">
          <p className="fun-facts-subtitle">Our Achievements</p>
          <h3 className="fun-facts-title">Fun Facts</h3>
          <div className="fun-facts-cards">
            {/* Fun Fact: Customers */}
            <div className="fun-fact-card">
              <div className="fun-fact-icon">
                <img src="../assets/img/svg/lotus.svg" alt="Customers Icon" />
              </div>
              <div className="fun-fact-counter">{counters.customers}+</div>
              <p className="fun-fact-label">Happy Customers</p>
            </div>

            {/* Fun Fact: Dishes */}
            <div className="fun-fact-card">
              <div className="fun-fact-icon">
                <img src="../assets/img/svg/kolam.svg" alt="Dishes Icon" />
              </div>
              <div className="fun-fact-counter">{counters.dishes}+</div>
              <p className="fun-fact-label">Signature Dishes</p>
            </div>

            {/* Fun Fact: Awards */}
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
