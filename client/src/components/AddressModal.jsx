import React, { useEffect, useState } from "react";
import "./styles/AddressModal.css";

/**
 * AddressModal Component
 * Enables users to add or edit a delivery address.
 *
 * Props:
 * - isOpen (boolean): Controls modal visibility.
 * - onClose (function): Callback to close the modal.
 * - onSave (function): Callback to save the address.
 * - existingAddress (object): Optional pre-filled address data for editing.
 */
const AddressModal = ({ isOpen, onClose, onSave, existingAddress }) => {
  // Local form state
  const [form, setForm] = useState({
    street: "",
    city: "",
    postcode: "",
  });

  // Prefill form when editing an existing address
  useEffect(() => {
    if (existingAddress) {
      setForm({
        street: existingAddress.street || "",
        city: existingAddress.city || "",
        postcode: existingAddress.postcode || "",
      });
    }
  }, [existingAddress]);

  // Predefined delivery cities in County Kildare
  const cities = [
    "Maynooth",
    "Naas",
    "Newbridge",
    "Leixlip",
    "Celbridge",
    "Clane",
    "Kilcock",
    "Kildare Town",
    "Athy",
    "Sallins",
  ];

  // Handle changes in input/select fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission handler with basic validation
  const handleSubmit = () => {
    if (!form.street || !form.city || !form.postcode) {
      alert("Please fill all fields");
      return;
    }
    onSave(form); // Pass form data to parent handler
  };

  // Do not render modal if not active
  if (!isOpen) return null;

  return (
    <div className="solid-modal-overlay">
      <div className="solid-modal-box">
        <h3>{existingAddress ? "Edit" : "Add"} Delivery Address</h3>

        {/* Street input */}
        <label>Street:</label>
        <input name="street" value={form.street} onChange={handleChange} />

        {/* City dropdown */}
        <label>City:</label>
        <select name="city" value={form.city} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Postcode input */}
        <label>Postcode:</label>
        <input name="postcode" value={form.postcode} onChange={handleChange} />

        {/* Modal Actions */}
        <div className="solid-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
