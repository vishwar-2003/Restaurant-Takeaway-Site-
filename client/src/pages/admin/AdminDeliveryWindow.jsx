import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin/AdminDeliveryWindow.css';

/**
 * AdminDeliveryWindows Component
 * Allows admin users to create, edit, and delete delivery windows.
 * Displays a list of current delivery windows in a table.
 */
const AdminDeliveryWindows = () => {
  // State to hold list of delivery windows from the backend
  const [windows, setWindows] = useState([]);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    date: '',
    timeFrom: '',
    timeTo: '',
    allocatedSlots: ''
  });

  // Holds the ID of the delivery window being edited (null means add mode)
  const [editId, setEditId] = useState(null);

  // Fetch delivery windows on component mount
  useEffect(() => {
    fetchWindows();
  }, []);

  // Fetch all delivery windows from the backend
  const fetchWindows = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/delivery/windows');
    setWindows(res.data); // Set the fetched data into state
  };

  // Handle input field changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit form for creating or updating a delivery window
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing window
      await axios.put(`http://localhost:5000/api/admin/delivery/windows/${editId}`, formData);
    } else {
      // Create new window
      await axios.post('http://localhost:5000/api/admin/delivery/windows', formData);
    }

    // Reset form and reload windows
    setFormData({ date: '', timeFrom: '', timeTo: '', allocatedSlots: '' });
    setEditId(null);
    fetchWindows();
  };

  // Load a delivery window into the form for editing
  const handleEdit = (window) => {
    setFormData({
      date: window.date,
      timeFrom: window.timeFrom,
      timeTo: window.timeTo,
      allocatedSlots: window.allocatedSlots
    });
    setEditId(window._id); // Set edit mode
  };

  // Delete a delivery window by ID
  const handleDelete = async (id) => {
    if (window.confirm('Delete this delivery window?')) {
      await axios.delete(`http://localhost:5000/api/admin/delivery/windows/${id}`);
      fetchWindows(); // Refresh list
    }
  };

  return (
    <div className="admin-delivery-window">
      <h2>Manage Delivery Windows</h2>

      {/* Form for adding/updating delivery window */}
      <form onSubmit={handleSubmit} className="window-form">
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="timeFrom" value={formData.timeFrom} onChange={handleChange} />
        <input type="time" name="timeTo" value={formData.timeTo} onChange={handleChange} />
        <input
          name="allocatedSlots"
          type="number"
          placeholder="Slots"
          value={formData.allocatedSlots}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Window</button>
      </form>

      {/* Table showing all delivery windows */}
      <table className="window-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Allocated</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {windows.map(win => (
            <tr key={win._id}>
              <td>{win.date}</td>
              <td>{win.timeFrom}</td>
              <td>{win.timeTo}</td>
              <td>{win.allocatedSlots}</td>
              <td>{win.availableSlots}</td>
              <td>
                <button onClick={() => handleEdit(win)}>Edit</button>
                <button onClick={() => handleDelete(win._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDeliveryWindows;
