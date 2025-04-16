import React from 'react';
import './styles/OrderConfirmationModal.css';

/**
 * OrderConfirmationModal Component
 * Modal used to confirm the order before final submission.
 * 
 * Props:
 * - isOpen: boolean – whether the modal is visible
 * - onClose: function – to close the modal
 * - onConfirm: function – triggered when the user confirms the order
 * - total: number – total price to be shown
 * - paymentMethod: string – selected payment method ('cash' or 'card')
 * - setPaymentMethod: function – updates the selected payment method
 * - deliveryType: string – either 'delivery' or 'takeaway'
 * - userAddress: object – user's selected delivery address
 * - deliveryDate: string – selected delivery date (if delivery)
 * - selectedWindow: object – selected delivery time window
 * - cardDetails: object – contains card name, number, expiry, CVV
 * - setCardDetails: function – updates the card details object
 */
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
  // Don't render anything if modal is not open
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-box">
        <h3>Confirm Your Order</h3>

        {/* Show delivery address if applicable */}
        {deliveryType === 'delivery' && userAddress && (
          <div className="confirmation-address">
            <p><strong>Deliver To:</strong></p>
            <p>{userAddress.street}</p>
            <p>{userAddress.city}, {userAddress.postcode}</p>
          </div>
        )}

        {/* Show delivery date & time slot if selected */}
        {deliveryType === 'delivery' && deliveryDate && selectedWindow && (
          <div className="confirmation-slot">
            <p><strong>Delivery Date:</strong> {deliveryDate}</p>
            <p><strong>Time Slot:</strong> {selectedWindow.timeFrom} - {selectedWindow.timeTo}</p>
          </div>
        )}

        {/* Total price summary */}
        <p><strong>Total:</strong> €{total}</p>

        {/* Payment method selection */}
        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </select>

        {/* Card details form shown only if card is selected */}
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

            {/* Row for expiry and CVV side-by-side */}
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

        {/* Modal action buttons */}
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
