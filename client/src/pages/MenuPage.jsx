// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // or from ../services/api if you created that

// const MenuPage = () => {
//   const [menuItems, setMenuItems] = useState({});

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/menu/items') // your real API
//       .then(res => {
//         const grouped = groupByCategory(res.data.data);
//         setMenuItems(grouped);
//       })
//       .catch(err => {
//         console.error('Error fetching menu items:', err);
//       });
//   }, []);

//   const groupByCategory = (items) => {
//     return items.reduce((acc, item) => {
//       const category = item.category || 'Others';
//       if (!acc[category]) acc[category] = [];
//       acc[category].push(item);
//       return acc;
//     }, {});
//   };

//   return (
//     <div style={{
//       padding: '2rem',
//       maxWidth: '900px',
//       margin: '0 auto',
//       fontFamily: 'Segoe UI, sans-serif',
//       backgroundColor: '#fffdf7'
//     }}>
//       <h1 style={{
//         textAlign: 'center',
//         fontSize: '36px',
//         marginBottom: '2rem',
//         fontWeight: '700',
//         color: '#222'
//       }}>
//         Our Menu
//       </h1>
  
//       {Object.entries(menuItems).map(([category, items]) => (
//         <div key={category} style={{
//           marginBottom: '3rem',
//           padding: '1rem 1.5rem',
//           backgroundColor: '#fff',
//           borderRadius: '12px',
//           boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
//           borderLeft: '5px solid #d32f2f'
//         }}>
//           <h2 style={{
//             color: '#d32f2f',
//             fontSize: '24px',
//             marginBottom: '1rem',
//             borderBottom: '1px solid #eee',
//             paddingBottom: '0.3rem'
//           }}>
//             {category}
//           </h2>
  
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: '1rem 2rem'
//             }}>
//             {items.map(item => (
//                 <div key={item._id} style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 fontSize: '16px',
//                 borderBottom: '1px dotted #ccc',
//                 paddingBottom: '4px',
//                 color: '#333',
//                 fontWeight: '700' // ✅ Make both name & price bold
//                 }}>
//                 <span>{item.name}</span>
//                 <span style={{ color: '#d32f2f' }}>€{item.price}</span>
//                 </div>
//             ))}
//             </div>
//         </div>
//       ))}
//     </div>
//   );  
// };

// export default MenuPage;



// OrderPage.jsx (updated)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderPage.css';
import AddressModal from '../components/AddressModal';
import OrderConfirmationModal from '../components/OrderConfirmationModal';

const OrderPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('MAINCOURSE');
  const [orderType, setOrderType] = useState('TAKEAWAY');
  const [searchTerm, setSearchTerm] = useState('');

  const [userAddress, setUserAddress] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({ street: '', city: '', postcode: '' });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');


  const userId = '67f51d6a2ab1a61c37c3fa8b';

  const kildareCities = [
    'Maynooth', 'Naas', 'Newbridge', 'Leixlip', 'Celbridge',
    'Clane', 'Kilcock', 'Kildare Town', 'Athy', 'Sallins'
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu/items')
      .then(res => {
        if (res.data.success) {
          setMenuItems(res.data.data);
        }
      })
      .catch(err => console.error('Failed to fetch menu items', err));

    axios.get(`http://localhost:5000/api/address/${userId}`)
      .then(res => {
        if (res.data.success) {
          setUserAddress(res.data.data);
        }
      })
      .catch(() => setUserAddress(null));

    axios.get('http://localhost:5000/api/delivery_charges')
      .then(res => {
        if (res.data) {
          setDeliveryCharges(res.data);
        }
      })
      .catch(() => setDeliveryCharges([]));
  }, [userId]);

  const handleSaveAddress = async (formData) => {
    try {
      const endpoint = userAddress
        ? `http://localhost:5000/api/address/${userId}`
        : 'http://localhost:5000/api/address';
      const method = userAddress ? 'put' : 'post';

      const payload = {
        ...formData,
        userId,
        state: 'Kildare',
        country: 'Ireland'
      };

      const res = await axios[method](endpoint, payload);
      if (res.data.success) {
        setUserAddress(res.data.data);
        setShowAddressModal(false);
      }
    } catch (err) {
      console.error('Error saving address', err);
    }
  };

  const handleAdd = (item) => {
    setCart(prev => ({
      ...prev,
      [item._id]: {
        ...item,
        quantity: prev[item._id] ? prev[item._id].quantity + 1 : 1
      }
    }));
  };

  const handleRemove = (itemId) => {
    setCart(prev => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev };
      if (updated[itemId].quantity > 1) {
        updated[itemId].quantity -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    const key = item.category.toUpperCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedItems);

  const deliveryCharge = deliveryCharges.find(
    charge => charge.area.toLowerCase() === userAddress?.city?.toLowerCase()
  )?.delivery_charge || 0;

  const subtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = orderType === 'DELIVERY' ? subtotal + deliveryCharge : subtotal;

  return (
    <div className="order-page">
      <div className="top-bar">
        <div className="category-toggle-with-search">
          <div className="category-toggle">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <input
            type="text"
            className="menu-search"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="order-type-toggle">
          <button
            className={`toggle-button ${orderType === 'TAKEAWAY' ? 'active' : ''}`}
            onClick={() => setOrderType('TAKEAWAY')}
          >
            Takeaway
          </button>
          <button
            className={`toggle-button ${orderType === 'DELIVERY' ? 'active' : ''}`}
            onClick={() => setOrderType('DELIVERY')}
          >
            Delivery
          </button>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="menu-section">
          <div className="category-group">
            <div className="items-grid">
              {groupedItems[selectedCategory]
                ?.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(item => (
                  <div key={item._id} className="menu-card">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <p>{item.description}</p>
                    <div className="card-controls">
                      <button onClick={() => handleRemove(item._id)} disabled={!cart[item._id]}>-</button>
                      <span>{cart[item._id]?.quantity || 0}</span>
                      <button onClick={() => handleAdd(item)}>+</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="cart-section">
          <h3>Order Summary</h3>

          {Object.values(cart).length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul>
              {Object.values(cart).map(item => (
                <li key={item._id}>{item.name} × {item.quantity} = ₹{item.price * item.quantity}</li>
              ))}
            </ul>
          )}

          {orderType === 'DELIVERY' && (
            <>
              {userAddress ? (
                <div className="delivery-address-details">
                  <p><strong>Delivery Address:</strong></p>
                  <p>{userAddress.street}, {userAddress.city}, {userAddress.postcode}</p>
                  <p><strong>Delivery Charge:</strong> ₹{deliveryCharge}</p>
                  <button className="add-address-button" onClick={() => setShowAddressModal(true)}>
                    Change Address
                  </button>
                </div>
              ) : (
                <button className="add-address-button" onClick={() => setShowAddressModal(true)}>
                  Add Delivery Address
                </button>
              )}
            </>
          )}

          <hr />
          <h4>Total: ₹{total}</h4>

          <button
            className="place-order-button"
            disabled={
              Object.values(cart).length === 0 ||
              (orderType === 'DELIVERY' && (!userAddress || !deliveryCharge))
            }
            onClick={() => setShowConfirmationModal(true)}  // ✅ THIS MUST EXIST
          >
            Place Order
          </button>


        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={handleSaveAddress}
        existingAddress={userAddress}
      />

      <OrderConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        total={total}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        deliveryType={orderType.toLowerCase()}
        userAddress={userAddress}
        onConfirm={async () => {
          try {
            const payload = {
              customerId: userId,
              paymentMethod,
              deliveryType: orderType.toLowerCase(),
              deliveryAddressId: userAddress._id,
              totalPrice: total,
              items: Object.values(cart)
            };

            const res = await axios.post('http://localhost:5000/api/orders', payload);
            if (res.data.success) {
              alert('Order placed successfully!');
              setCart({});
              setShowConfirmationModal(false);
            } else {
              alert('Something went wrong.');
            }
          } catch (err) {
            console.error(err);
            alert('Failed to place order');
          }
        }}
      />


    </div>
  );
};

export default OrderPage;

