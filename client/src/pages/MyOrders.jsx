import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/MyOrders.css';

/**
 * MyOrders Component
 * Displays a list of all past orders for the logged-in customer.
 * Shows summary for each order: status, total price, type, and a link to view full details.
 */
const MyOrders = () => {
  const [orders, setOrders] = useState([]);     // Stores orders from backend
  const [loading, setLoading] = useState(true); // Controls loading spinner/message

  // Get customerId from local storage (assumes user is logged in)
  const userId = localStorage.getItem('customerId');

  // Fetch all orders of the user on initial load
  useEffect(() => {
    axios.get(`http://localhost:5000/api/order/user/${userId}`)
      .then(res => {
        if (res.data.success) {
          setOrders(res.data.data);
        }
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      });
  }, [userId]);

  // Display loading indicator
  if (loading) return <div className="my-orders"><p>Loading orders...</p></div>;

  return (
    <div className="my-orders">
      <h2 style={{
        textAlign: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
      }}>
        My Orders
      </h2>

      {/* If no orders found */}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <h4>Order #{order._id.slice(-6)}</h4>

              {/* Display meta badges for status, payment, and delivery type */}
              <div className="order-meta">
                <span className={`badge status ${order.status}`}>{order.status}</span>
                <span className={`badge payment ${order.paymentStatus}`}>{order.paymentStatus}</span>
                <span className="badge type">{order.deliveryType}</span>
              </div>

              {/* Order timestamp and total price */}
              <p><strong>Ordered At:</strong> {new Date(order.orderedAt).toLocaleString()}</p>
              <p><strong>Total:</strong> €{order.totalPrice}</p>

              {/* Delivery slot details, only for delivery orders */}
              {order.deliveryType === 'delivery' && order.deliveryDate && order.deliveryWindowId && (
                <p>
                  <strong>Delivery Slot:</strong>{' '}
                  {new Date(order.deliveryDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}{' '}
                  | {order.deliveryWindowId.timeFrom} - {order.deliveryWindowId.timeTo}
                </p>
              )}

              {/* Delivery address if present */}
              {order.deliveryAddress && (
                <p><strong>Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.postcode}</p>
              )}

              {/* Navigation to detailed order view */}
              <Link to={`/order-details/${order._id}`} className="view-details-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
