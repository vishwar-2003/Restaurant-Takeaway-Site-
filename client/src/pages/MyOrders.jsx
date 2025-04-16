import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('customerId');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/order/user/${userId}`)
      .then(res => {
        if (res.data.success) {
          setOrders(res.data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="my-orders"><p>Loading orders...</p></div>;

  return (
    <div className="my-orders">
      <h2 style={{ textAlign: 'center', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <h4>Order #{order._id.slice(-6)}</h4>
              <div className="order-meta">
                <span className={`badge status ${order.status}`}>{order.status}</span>
                <span className={`badge payment ${order.paymentStatus}`}>{order.paymentStatus}</span>
                <span className="badge type">{order.deliveryType}</span>
              </div>
              <p><strong>Ordered At:</strong> {new Date(order.orderedAt).toLocaleString()}</p>
              <p><strong>Total:</strong> €{order.totalPrice}</p>
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
              {order.deliveryAddress && (
                <p><strong>Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.postcode}</p>
              )}
              <Link to={`/order-details/${order._id}`} className="view-details-button">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;