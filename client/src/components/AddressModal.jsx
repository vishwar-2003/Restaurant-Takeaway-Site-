import React, { useEffect, useState } from 'react';
import './styles/AddressModal.css';

/**
 * AddressModal Component
 * Allows customers to add or edit their delivery address.
 * Props:
 *  - isOpen: boolean to control modal visibility
 *  - onClose: function to close the modal
 *  - onSave: function to save the address
 *  - existingAddress: optional object containing current address info for editing
 */
const AddressModal = ({ isOpen, onClose, onSave, existingAddress }) => {
  // Local form state to manage address inputs
  const [form, setForm] = useState({
    street: '',
    city: '',
    postcode: ''
  });

  // Populate form if editing an existing address
  useEffect(() => {
    if (existingAddress) {
      setForm({
        street: existingAddress.street || '',
        city: existingAddress.city || '',
        postcode: existingAddress.postcode || ''
      });
    }
  }, [existingAddress]);

  // Predefined list of allowed delivery cities in County Kildare
  const cities = [
    'Maynooth', 'Naas', 'Newbridge', 'Leixlip', 'Celbridge',
    'Clane', 'Kilcock', 'Kildare Town', 'Athy', 'Sallins'
  ];

  // Handles input and select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Validates and submits form data to parent component
  const handleSubmit = () => {
    if (!form.street || !form.city || !form.postcode) {
      alert('Please fill all fields');
      return;
    }
    onSave(form); // Pass data to parent
  };

  // Do not render the modal if not open
  if (!isOpen) return null;

  return (
    <div className="solid-modal-overlay">
      <div className="solid-modal-box">
        <h3>{existingAddress ? 'Edit' : 'Add'} Delivery Address</h3>

        <label>Street:</label>
        <input name="street" value={form.street} onChange={handleChange} />

        <label>City:</label>
        <select name="city" value={form.city} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <label>Postcode:</label>
        <input name="postcode" value={form.postcode} onChange={handleChange} />

        {/* Modal action buttons */}
        <div className="solid-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
