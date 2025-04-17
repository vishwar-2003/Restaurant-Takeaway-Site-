import React, { useState } from "react";
import "./styles/Faq.css"; // Import styles specific to the FAQ section

/**
 * Array of FAQs for the accordion section
 */
const faqs = [
  {
    question: "What are your opening hours?",
    answer:
      "We’re open daily from 11:00 AM to 11:00 PM, including weekends and holidays.",
  },
  {
    question: "Do you offer home delivery?",
    answer:
      "Yes! We offer delivery within 8km radius. You can order via our website or call us directly.",
  },
  {
    question: "Are there vegan options on your menu?",
    answer:
      "Absolutely! We have a wide variety of vegan and vegetarian South Indian dishes.",
  },
  {
    question: "Can I host a private event at your restaurant?",
    answer:
      "Yes! We host birthdays, family gatherings, and small events. Contact us for availability.",
  },
];

/**
 * Array of article cards for the flip effect section
 */
const articles = [
  {
    title: "How to book a table",
    image: "/assets/img/book.jpg",
    back: "To book a table, please call us directly at least one hour before your visit. This helps us prepare and ensure a comfortable dining experience for you.",
  },
  {
    title: "Can I modify my Order",
    image: "/assets/img/sign.png",
    back: "Yes, you can modify your order as long as the food hasn’t been prepared yet. If you’ve just placed it, please call us immediately so we can make the changes in time.",
  },
  {
    title: "Allergen Information",
    image: "/assets/img/fo.jpg",
    back: "We use dairy (cream, butter, cheese), gluten (in breads and pastries), and meats like beef, lamb, and pork. If you have any allergies, please call us directly for clarification — we’re happy to assist you.",
  },
];

/**
 * FAQSection Component
 * Displays an accordion-style FAQ and a set of flip cards with more information.
 */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null); // Tracks open FAQ item
  const [flipped, setFlipped] = useState(Array(articles.length).fill(false)); // Tracks flipped state for each article card

  /**
   * Toggles the visibility of an FAQ answer
   */
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /**
   * Toggles the flip state of an article card
   */
  const handleFlip = (index) => {
    const updated = [...flipped];
    updated[index] = !updated[index];
    setFlipped(updated);
  };

  return (
    <div className="faq-container">
      {/* Main Heading */}
      <h2>How can we help?</h2>

      {/* FAQ Accordion Section */}
      <h3 className="subheading">FAQ</h3>
      <div className="faq-section">
        {faqs.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(i)}>
              {item.question}
              <span>{openIndex === i ? "−" : "+"}</span>
            </div>
            {openIndex === i && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>

      {/* Info Corner Flip Cards */}
      <h3 className="subheading">Info Corner</h3>
      <div className="article-row">
        {articles.map((article, i) => (
          <div
            key={i}
            className={`article-card ${flipped[i] ? "flipped" : ""}`}
            onClick={() => handleFlip(i)}
          >
            <div className="card-inner">
              {/* Front Face of the Card */}
              <div className="card-front">
                <img src={article.image} alt="Article" />
                <h4>{article.title}</h4>
                {/* Optional: Add a short blurb here if needed */}
              </div>

              {/* Back Face of the Card */}
              <div className="card-back">
                <h4>{article.title}</h4>
                <p>{article.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
