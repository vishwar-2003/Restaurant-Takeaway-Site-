import React, { useState } from 'react';
import './faq.css';

const faqs = [
  {
    question: 'What are your restaurant hours?',
    answer: 'We’re open daily from 11:00 AM to 11:00 PM, including weekends and holidays.'
  },
  {
    question: 'Do you offer home delivery?',
    answer: 'Yes! We offer delivery within 8km radius. You can order via our website or call us directly.'
  },
  {
    question: 'Are there vegan options on your menu?',
    answer: 'Absolutely! We have a wide variety of vegan and vegetarian South Indian dishes.'
  }
];

const articles = [
  {
    title: 'How to book a table?',
    blurb: 'Learn how to reserve your seat online in just a few clicks.',
    image: '/assets/img/book.jpg'
  },
  {
    title: 'Top 5 Signature Dishes',
    blurb: 'Explore the most loved items.',
    image: '/assets/img/sign.png'
  },
  {
    title: 'Allergen Information',
    blurb: 'Everything you need to know about allergens in our dishes.',
    image: '/assets/img/fo.jpg'
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>How can we help?</h2>
      <div className="search-bar">
        <input type="text" placeholder="Ask a question" />
        <button className="search-button">
            <img src="/assets/img/svg/sr.svg" alt="Search" />
            </button>



      </div>

      <h3 className="subheading">Featured food articles</h3>
      <div className="article-row">
        {articles.map((article, i) => (
          <div key={i} className="article-card">
            <img src={article.image} alt="Article" />
            <h4>{article.title}</h4>
            <p>{article.blurb}</p>
          </div>
        ))}
      </div>

      <h3 className="subheading">FAQ</h3>
      <div className="faq-section">
        {faqs.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(i)}>
              {item.question}
              <span>{openIndex === i ? '−' : '+'}</span>
            </div>
            {openIndex === i && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>

      <div className="support-box">
        <div>
          <h4>Talk to an expert</h4>
          <p>Need help with booking or dietary info? We’re here to help.</p>
          <a href="/contact" className="support-btn">Contact support</a>
        </div>
        <img src="/assets/img/sappu.png" alt="Support" />
      </div>
    </div>
  );
}

export default FAQSection;
