import React, { useEffect, useState } from 'react';
import './styles/AddressModal.css';

const AddressModal = ({ isOpen, onClose, onSave, existingAddress }) => {
  const [form, setForm] = useState({
    street: '',
    city: '',
    postcode: ''
  });

  useEffect(() => {
    if (existingAddress) {
      setForm({
        street: existingAddress.street || '',
        city: existingAddress.city || '',
        postcode: existingAddress.postcode || ''
      });
    }
  }, [existingAddress]);

  const cities = [
    'Maynooth', 'Naas', 'Newbridge', 'Leixlip', 'Celbridge',
    'Clane', 'Kilcock', 'Kildare Town', 'Athy', 'Sallins'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.street || !form.city || !form.postcode) {
      alert('Please fill all fields');
      return;
    }
    onSave(form);
  };

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

        <div className="solid-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
