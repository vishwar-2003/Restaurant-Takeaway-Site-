import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Menu.css';
import { Link } from 'react-router-dom';

/**
 * MenuPage Component
 * Displays a categorized menu of available items fetched from the backend.
 * Users can view items grouped by category and navigate to the order page.
 */
const MenuPage = () => {
  // menuItems will store grouped items in the format: { category: [items] }
  const [menuItems, setMenuItems] = useState({});

  // Fetch menu items from API on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/menu/')
      .then(res => {
        const grouped = groupByCategory(res.data.data); // Group items by category
        setMenuItems(grouped); // Save to state
      })
      .catch(err => {
        console.error('Error fetching menu items:', err);
      });
  }, []);

  /**
   * Groups menu items by category.
   * If an item doesn't have a category, it's added under "Others".
   */
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
        {/* Title */}
        <h3 className="menu-title" style={{
          textAlign: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
        }}>
          OUR MENU
        </h3>

        {/* Loop through each category and render its items */}
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

        {/* Call to action */}
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
