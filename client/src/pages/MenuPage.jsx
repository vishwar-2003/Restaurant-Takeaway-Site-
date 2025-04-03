import React, { useEffect, useState } from 'react';
import axios from 'axios'; // or from ../services/api if you created that

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu/items') // your real API
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
    <div style={{
      padding: '2rem',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#fffdf7'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '36px',
        marginBottom: '2rem',
        fontWeight: '700',
        color: '#222'
      }}>
        Our Menu
      </h1>
  
      {Object.entries(menuItems).map(([category, items]) => (
        <div key={category} style={{
          marginBottom: '3rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          borderLeft: '5px solid #d32f2f'
        }}>
          <h2 style={{
            color: '#d32f2f',
            fontSize: '24px',
            marginBottom: '1rem',
            borderBottom: '1px solid #eee',
            paddingBottom: '0.3rem'
          }}>
            {category}
          </h2>
  
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem 2rem'
            }}>
            {items.map(item => (
                <div key={item._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                borderBottom: '1px dotted #ccc',
                paddingBottom: '4px',
                color: '#333',
                fontWeight: '700' // ✅ Make both name & price bold
                }}>
                <span>{item.name}</span>
                <span style={{ color: '#d32f2f' }}>₹{item.price}</span>
                </div>
            ))}
            </div>
        </div>
      ))}
    </div>
  );  
};

export default MenuPage;