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
    userAddress,
    deliveryDate,         
    selectedWindow,
    cardDetails,
    setCardDetails      
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

          {deliveryType === 'delivery' && deliveryDate && selectedWindow && (
            <div className="confirmation-slot">
              <p><strong>Delivery Date:</strong> {deliveryDate}</p>
              <p><strong>Time Slot:</strong> {selectedWindow.timeFrom} - {selectedWindow.timeTo}</p>
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

          {paymentMethod === 'card' && (
          <div className="card-details-form">
            <label>Cardholder Name:</label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
            />

            <label>Card Number:</label>
            <input
              type="text"
              maxLength="16"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            />

            <div className="card-details-row">
              <div>
                <label>Expiry:</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
              </div>
              <div>
                <label>CVV:</label>
                <input
                  type="password"
                  maxLength="4"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}


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
