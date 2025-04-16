import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Menu.css';
import { Link } from 'react-router-dom';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu/')
      .then(res => {
        const grouped = groupByCategory(res.data.data);
        setMenuItems(grouped);
      })
      .catch(err => {
        console.error('Error fetching menu items:', err);
      });
  }, []);

  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      const category = item.category || 'Others';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  };

  return (
    <div className="menu-background">
      <div className="menu-container">
      <h3 className="menu-title" style={{ textAlign: 'center', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>OUR MENU</h3>
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category} className="menu-category">
            <h2 className="menu-category-title">{category}</h2>
            <div className="menu-grid">
              {items.map(item => (
                <div key={item._id} className="menu-item">
                  <span>{item.name}</span>
                  <span className="menu-price">&#8364;{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/order" className="order-now-button">
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;