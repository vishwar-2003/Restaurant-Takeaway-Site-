import React from 'react';
import './styles/OrderConfirmationModal.css';

const OrderSuccessModal = ({ isOpen, onClose, orderInfo }) => {
  if (!isOpen || !orderInfo) return null;

  const {
    _id,
    totalPrice,
    deliveryType,
    deliveryDate,
    deliveryWindowId,
    deliveryAddress,
    items
  } = orderInfo;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-box">
        <h3>🎉 Order Confirmed!</h3>

        <p><strong>Order ID:</strong> #{_id.slice(-6)}</p>
        <p><strong>Total Paid:</strong> ₹{totalPrice}</p>

        {deliveryType === 'delivery' && deliveryDate && deliveryWindowId && (
          <>
            <p><strong>Delivery Date:</strong> {deliveryDate}</p>
            <p><strong>Time Slot:</strong> {deliveryWindowId.timeFrom} - {deliveryWindowId.timeTo}</p>
          </>
        )}

        {deliveryType === 'delivery' && deliveryAddress && (
          <>
            <p><strong>Delivery Address:</strong></p>
            <p>{deliveryAddress.street}</p>
            <p>{deliveryAddress.city}, {deliveryAddress.postcode}</p>
          </>
        )}

        <div className="order-success-items">
          <h4>Items Ordered</h4>
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                {item.name} × {item.quantity} = ₹{item.quantity * item.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-actions">
          <button className="confirm-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
