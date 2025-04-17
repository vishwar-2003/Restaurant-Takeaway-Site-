import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin/AdminDeliveryWindow.css';

/**
 * AdminDeliveryWindows Component
 * Allows admin users to create, edit, and delete delivery windows.
 * Displays a list of current delivery windows in a table.
 */
const AdminDeliveryWindows = () => {
  // State to store delivery window data, form data, and current edit ID
  const [windows, setWindows] = useState([]);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    date: '',
    timeFrom: '',
    timeTo: '',
    allocatedSlots: ''
  });
  const [editId, setEditId] = useState(null);  // Keeps track of the ID of the window being edited

  // Fetch delivery windows from the backend when the component mounts
  useEffect(() => {
    fetchWindows();  // Call to fetch existing delivery windows from the API
  }, []);

  // Function to fetch delivery windows from the server
  const fetchWindows = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/delivery/windows');
      setWindows(res.data);  // Update state with fetched windows
    } catch (err) {
      console.error('Error fetching delivery windows:', err);
    }
  };

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value  // Update specific field in the formData state
    }));
  };

  // Handle form submission for adding or updating a delivery window
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    try {
      if (editId) {
        // If an ID is set, update the existing window
        await axios.put(`http://localhost:5000/api/admin/delivery/windows/${editId}`, formData);
      } else {
        // Otherwise, create a new delivery window
        await axios.post('http://localhost:5000/api/admin/delivery/windows', formData);
      }

      // Reset form data after submit
      setFormData({ date: '', timeFrom: '', timeTo: '', allocatedSlots: '' });
      setEditId(null);  // Clear edit ID
      fetchWindows();  // Fetch updated list of windows
    } catch (err) {
      console.error('Error submitting delivery window:', err);
    }
  };

  // Handle edit button click to pre-fill form data with the selected window's details
  const handleEdit = (window) => {
    setFormData({
      date: window.date,
      timeFrom: window.timeFrom,
      timeTo: window.timeTo,
      allocatedSlots: window.allocatedSlots
    });
    setEditId(window._id);  // Set the ID of the window to be edited
  };

  // Handle delete button click for a specific delivery window
  const handleDelete = async (id) => {
    if (window.confirm('Delete this delivery window?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/delivery/windows/${id}`);
        fetchWindows();  // Refresh the list after deletion
      } catch (err) {
        console.error('Error deleting delivery window:', err);
      }
    }
  };

  return (
    <div className="admin-delivery-window">
      <h2>Manage Delivery Windows</h2>

      {/* Form for adding or updating a delivery window */}
      <form onSubmit={handleSubmit} className="window-form">
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="timeFrom"
          value={formData.timeFrom}
          onChange={handleChange}
        />
        <input
          type="time"
          name="timeTo"
          value={formData.timeTo}
          onChange={handleChange}
        />
        <input
          name="allocatedSlots"
          type="number"
          placeholder="Slots"
          value={formData.allocatedSlots}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editId ? 'Update' : 'Add'} Window
        </button>
      </form>

      {/* Table displaying the delivery windows */}
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
          {windows.map((win) => (
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
