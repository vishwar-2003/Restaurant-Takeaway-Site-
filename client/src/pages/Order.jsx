import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Order.css';
import AddressModal from '../components/AddressModal';
import OrderConfirmationModal from '../components/OrderConfirmationModal';
import OrderSuccessModal from '../components/OrderSuccessfulModal';

/**
 * OrderPage Component
 * Main interface for customers to browse menu, build their cart, select delivery or takeaway,
 * provide address (if delivery), and place the order.
 */
const OrderPage = () => {
  // Core state management
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('MAIN COURSE');
  const [orderType, setOrderType] = useState('TAKEAWAY');
  const [searchTerm, setSearchTerm] = useState('');

  // Delivery-related state
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliverySlots, setDeliverySlots] = useState([]);
  const [selectedWindow, setSelectedWindow] = useState(null);

  // User address & delivery charges
  const [userAddress, setUserAddress] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState([]);

  // Modal toggles
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [confirmedOrder, setConfirmedOrder] = useState(null); // Used after placing order

  // Card payment details
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });

  const userId = localStorage.getItem('customerId');
  const navigate = useNavigate();

  const kildareCities = [ 'Maynooth', 'Naas', 'Newbridge', 'Leixlip', 'Celbridge',
    'Clane', 'Kilcock', 'Kildare Town', 'Athy', 'Sallins'
  ];

  // Fetch available delivery slots for selected date
  useEffect(() => {
    if (orderType === 'DELIVERY' && deliveryDate) {
      axios.get(`http://localhost:5000/api/delivery/windows?date=${deliveryDate}`)
        .then(res => setDeliverySlots(res.data.windows))
        .catch(err => console.error('Failed to fetch delivery windows', err));
    }
  }, [deliveryDate, orderType]);

  // Initial data fetching (menu, user address, delivery charges)
  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => {
        if (res.data.success) {
          setMenuItems(res.data.data);
        }
      }).catch(err => console.error('Failed to fetch menu items', err));

    axios.get(`http://localhost:5000/api/address/${userId}`)
      .then(res => {
        if (res.data.success) setUserAddress(res.data.data);
      })
      .catch(() => setUserAddress(null));

    axios.get('http://localhost:5000/api/delivery/charges')
      .then(res => {
        if (res.data) setDeliveryCharges(res.data);
      })
      .catch(() => setDeliveryCharges([]));
  }, [userId]);

  // Save or update address
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

  // Add item to cart
  const handleAdd = (item) => {
    setCart(prev => ({
      ...prev,
      [item._id]: {
        ...item,
        quantity: prev[item._id] ? prev[item._id].quantity + 1 : 1
      }
    }));
  };

  // Remove or decrement item from cart
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

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const key = item.category.toUpperCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
  const categories = Object.keys(groupedItems);

  // Get delivery charge for selected city
  const deliveryCharge = deliveryCharges.find(
    charge => charge.area.toLowerCase() === userAddress?.city?.toLowerCase()
  )?.delivery_charge || 0;

  // Calculate totals
  const subtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = orderType === 'DELIVERY' ? subtotal + deliveryCharge : subtotal;

  return (
    <div className="order-page">
      {/* Top Menu Filter and Search */}
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

      {/* Menu and Cart Sections */}
      <div className="content-wrapper">
        <div className="menu-section">
          <div className="category-group">
            <div className="items-grid">
              {groupedItems[selectedCategory]
                ?.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(item => (
                  <div key={item._id} className="menu-card">
                    <h4>{item.name}</h4>
                    <p>€{item.price}</p>
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
                <li key={item._id}>{item.name} × {item.quantity} = €{item.price * item.quantity}</li>
              ))}
            </ul>
          )}

          {/* Delivery Options */}
          {orderType === 'DELIVERY' && (
            <>
              <div className="delivery-slot-section">
                <label>Select Delivery Date:</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => {
                    setDeliveryDate(e.target.value);
                    setSelectedWindow(null);
                  }}
                />
                {deliverySlots.length > 0 ? (
                  <>
                    <label>Select Time Slot:</label>
                    <select
                      value={selectedWindow?._id || ''}
                      onChange={(e) => {
                        const slot = deliverySlots.find(s => s._id === e.target.value);
                        setSelectedWindow(slot || null);
                      }}
                      className="slot-dropdown"
                    >
                      <option value="" disabled>Select a time slot</option>
                      {deliverySlots.map(slot => (
                        <option key={slot._id} value={slot._id} disabled={slot.availableSlots <= 0}>
                          {slot.timeFrom} - {slot.timeTo}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <p style={{ marginTop: '10px', color: '#aa0000' }}>
                    No slots available for this date.
                  </p>
                )}
              </div>

              {/* Address Management */}
              {userAddress ? (
                <div className="delivery-address-details">
                  <p><strong>Delivery Address:</strong></p>
                  <p>{userAddress.street}, {userAddress.city}, {userAddress.postcode}</p>
                  <p><strong>Delivery Charge:</strong> €{deliveryCharge}</p>
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
          <h4>Total: €{total}</h4>

          {/* Place Order Button */}
          <button
            className="place-order-button"
            disabled={
              Object.values(cart).length === 0 ||
              (orderType === 'DELIVERY' && (!userAddress || !deliveryCharge || !selectedWindow))
            }
            onClick={() => setShowConfirmationModal(true)}
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

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        total={total}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        deliveryType={orderType.toLowerCase()}
        userAddress={userAddress}
        deliveryDate={deliveryDate}
        selectedWindow={selectedWindow}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
        onConfirm={async () => {
          if (paymentMethod === 'card') {
            const { name, number, expiry, cvv } = cardDetails;
            if (!name || !number || !expiry || !cvv) {
              alert('Please fill in all card details.');
              return;
            }
          }

          try {
            const payload = {
              customerId: userId,
              paymentMethod,
              deliveryType: orderType.toLowerCase(),
              deliveryAddressId: userAddress._id,
              totalPrice: total,
              items: Object.values(cart),
              deliveryDate,
              deliveryWindowId: selectedWindow?._id
            };

            const res = await axios.post('http://localhost:5000/api/order', payload);
            if (res.data.success) {
              setConfirmedOrder({
                _id: res.data.orderId,
                totalPrice: total,
                deliveryType: orderType.toLowerCase(),
                deliveryDate,
                deliveryWindowId: selectedWindow,
                deliveryAddress: userAddress,
                items: Object.values(cart)
              });

              setCart({});
              setShowConfirmationModal(false);
              setShowSuccessModal(true);
            } else {
              alert('Something went wrong.');
            }
          } catch (err) {
            console.error(err);
            alert('Failed to place order');
          }
        }}
      />

      {/* Success Modal after order is placed */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate(`/order-details/${confirmedOrder._id}`);
        }}
        orderInfo={confirmedOrder}
      />
    </div>
  );
};

export default OrderPage;
