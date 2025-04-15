import React from 'react';
import './styles/OrderConfirmationModal.css';

const OrderConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    total,
    paymentMethod,
    setPaymentMethod,
    deliveryType,
    userAddress
  }) => {
    if (!isOpen) return null;
  

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-box">
        <h3>Confirm Your Order</h3>
        {deliveryType === 'delivery' && userAddress && (
        <div className="confirmation-address">
            <p><strong>Deliver To:</strong></p>
            <p>{userAddress.street}</p>
            <p>{userAddress.city}, {userAddress.postcode}</p>
        </div>
        )}
        <p><strong>Total:</strong> ₹{total}</p>

        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </select>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
