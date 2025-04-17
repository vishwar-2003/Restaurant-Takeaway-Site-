import React from "react";
import "../styles/modals/OrderSuccessfulModal.css";

/**
 * OrderSuccessModal Component
 * Displays a confirmation modal after a successful order.
 *
 * Props:
 * - isOpen: boolean – controls visibility of the modal
 * - onClose: function – callback to close the modal
 * - orderInfo: object – order details (id, total, delivery info, item list)
 */
const OrderSuccessModal = ({ isOpen, onClose, orderInfo }) => {
  // Do not render modal if closed or no order info
  if (!isOpen || !orderInfo) return null;

  // Destructure order fields
  const {
    _id,
    totalPrice,
    deliveryType,
    deliveryDate,
    deliveryWindowId,
    deliveryAddress,
    items,
  } = orderInfo;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-box">
        <h3>🎉 Order Confirmed!</h3>

        {/* Order Summary */}
        <p>
          <strong>Order ID:</strong> #{_id.slice(-6)}
        </p>
        <p>
          <strong>Total Paid:</strong> €{totalPrice}
        </p>

        {/* Delivery Info */}
        {deliveryType === "delivery" && deliveryDate && deliveryWindowId && (
          <>
            <p>
              <strong>Delivery Date:</strong> {deliveryDate}
            </p>
            <p>
              <strong>Time Slot:</strong> {deliveryWindowId.timeFrom} -{" "}
              {deliveryWindowId.timeTo}
            </p>
          </>
        )}

        {/* Address Info */}
        {deliveryType === "delivery" && deliveryAddress && (
          <>
            <p>
              <strong>Delivery Address:</strong>
            </p>
            <p>{deliveryAddress.street}</p>
            <p>
              {deliveryAddress.city}, {deliveryAddress.postcode}
            </p>
          </>
        )}

        {/* Item List */}
        <div className="order-success-items">
          <h4>Items Ordered</h4>
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                {item.name} × {item.quantity} = €{item.quantity * item.price}
              </li>
            ))}
          </ul>
        </div>

        {/* Close Button */}
        <div className="modal-actions">
          <button className="confirm-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
