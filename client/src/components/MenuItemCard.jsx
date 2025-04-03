// A card to display each menu item

import React from 'react';

const MenuItemCard = ({ item }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3>{item.name}</h3>
      <p style={{ fontStyle: 'italic', color: '#666' }}>{item.category}</p>
      <p>{item.description}</p>
      <strong style={{ fontSize: '1.2rem' }}>${item.price.toFixed(2)}</strong>
    </div>
  );
};

export default MenuItemCard;