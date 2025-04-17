import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./styles/MyOrderDetails.css";

/**
 * MyOrderDetailsPage Component
 * Renders detailed information about a specific order.
 * Displays order ID, status, payment info, delivery details, item list, and price.
 */
const MyOrderDetailsPage = () => {
  const { orderId } = useParams(); // Get order ID from route parameters
  const [order, setOrder] = useState(null); // Holds order data
  const [loading, setLoading] = useState(true); // Loading indicator

  // Fetch order data on component mount or when orderId changes
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/order/${orderId}`)
      .then((res) => {
        if (res.data.success) {
          setOrder(res.data.data); // Save order to state
        }
        setLoading(false); // Turn off loading spinner
      })
      .catch((err) => {
        console.error("Error fetching order:", err);
        setLoading(false);
      });
  }, [orderId]);

  // Loading state UI
  if (loading) {
    return (
      <div className="my-orders">
        <p>Loading order details...</p>
      </div>
    );
  }

  // If no order is found
  if (!order) {
    return (
      <div className="my-orders">
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="order-details-card">
        {/* Order Header */}
        <h3>Order #{order._id.slice(-6)}</h3>

        {/* Order Status & Type */}
        <div className="order-meta">
          <span className={`badge status ${order.status}`}>{order.status}</span>
          <span className={`badge payment ${order.paymentStatus}`}>
            {order.paymentStatus}
          </span>
          <span className="badge type">{order.deliveryType}</span>
        </div>

        {/* Order Time and Total Price */}
        <p>
          <strong>Ordered At:</strong>{" "}
          {new Date(order.orderedAt).toLocaleString()}
        </p>
        <p>
          <strong>Total Price:</strong> €{order.totalPrice}
        </p>

        {/* Delivery Slot Info (if applicable) */}
        {order.deliveryType === "delivery" &&
          order.deliveryDate &&
          order.deliveryWindowId && (
            <p>
              <strong>Delivery Slot:</strong>{" "}
              {new Date(order.deliveryDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
              | {order.deliveryWindowId.timeFrom} -{" "}
              {order.deliveryWindowId.timeTo}
            </p>
          )}

        {/* Delivery Address (if available) */}
        {order.deliveryAddressId && (
          <p>
            <strong>Delivery Address:</strong> {order.deliveryAddressId.street},{" "}
            {order.deliveryAddressId.city}, {order.deliveryAddressId.postcode}
          </p>
        )}

        {/* Ordered Items */}
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

        {/* Back to Orders Button */}
        <Link to="/my-order" className="view-details-button">
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default MyOrderDetailsPage;
