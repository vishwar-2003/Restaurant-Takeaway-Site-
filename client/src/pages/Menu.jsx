import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Menu.css";
import { Link } from "react-router-dom";

/**
 * MenuPage Component
 * Fetches menu items from the backend and displays them categorized.
 * Users can explore the menu and navigate to the order page.
 */
const MenuPage = () => {
  const [menuItems, setMenuItems] = useState({}); // Menu items grouped by category

  // Fetch and group menu items on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu/")
      .then((res) => {
        const grouped = groupByCategory(res.data.data);
        setMenuItems(grouped);
      })
      .catch((err) => {
        console.error("Error fetching menu items:", err);
      });
  }, []);

  /**
   * Helper function to group menu items by category.
   * Items without a category are grouped under "Others".
   *
   * @param {Array} items - List of menu items
   * @returns {Object} Grouped menu items
   */
  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      const category = item.category || "Others";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  };

  return (
    <div className="menu-background">
      <div className="menu-container">
        {/* Main Title */}
        <h3
          className="menu-title"
          style={{
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          OUR MENU
        </h3>

        {/* Display each menu category and its items */}
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category} className="menu-category">
            <h2 className="menu-category-title">{category}</h2>
            <div className="menu-grid">
              {items.map((item) => (
                <div key={item._id} className="menu-item">
                  <span>{item.name}</span>
                  <span className="menu-price">&#8364;{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action - Navigate to Order Page */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/order" className="order-now-button">
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
