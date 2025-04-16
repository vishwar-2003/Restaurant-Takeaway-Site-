import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/MyOrderDetails.css';

/**
 * MyOrderDetailsPage Component
 * Displays a detailed view of a specific order placed by the logged-in user.
 * Shows order status, delivery information, item list, and total amount.
 */
const MyOrderDetailsPage = () => {
  const { orderId } = useParams(); // Get the order ID from the route parameter
  const [order, setOrder] = useState(null); // Holds order data
  const [loading, setLoading] = useState(true); // Controls loading state

  // Fetch the order details from backend when component mounts or orderId changes
  useEffect(() => {
    axios.get(`http://localhost:5000/api/order/${orderId}`)
      .then(res => {
        if (res.data.success) {
          setOrder(res.data.data); // Set fetched order data
        }
        setLoading(false); // Disable loading indicator
      })
      .catch(err => {
        console.error('Error fetching order:', err);
        setLoading(false);
      });
  }, [orderId]);

  // Loading and error UI
  if (loading) return <div className="my-orders"><p>Loading order details...</p></div>;
  if (!order) return <div className="my-orders"><p>Order not found.</p></div>;

  return (
    <div className="order-details-page">
      <div className="order-details-card">
        <h3>Order #{order._id.slice(-6)}</h3>

        {/* Order meta information (status, payment, delivery type) */}
        <div className="order-meta">
          <span className={`badge status ${order.status}`}>{order.status}</span>
          <span className={`badge payment ${order.paymentStatus}`}>{order.paymentStatus}</span>
          <span className="badge type">{order.deliveryType}</span>
        </div>

        {/* Date and price */}
        <p><strong>Ordered At:</strong> {new Date(order.orderedAt).toLocaleString()}</p>
        <p><strong>Total Price:</strong> €{order.totalPrice}</p>

        {/* Delivery slot details (only for delivery orders) */}
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

        {/* Delivery address (if available) */}
        {order.deliveryAddressId && (
          <p><strong>Delivery Address:</strong> {order.deliveryAddressId.street}, {order.deliveryAddressId.city}, {order.deliveryAddressId.postcode}</p>
        )}

        {/* Items ordered */}
        <div className="order-items">
          <h4>Items Ordered</h4>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} × {item.quantity} = €{item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation button back to orders list */}
        <Link to="/my-order" className="view-details-button">
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default MyOrderDetailsPage;
