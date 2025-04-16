import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin/AdminDeliveryWindow.css';

const AdminDeliveryWindows = () => {
  const [windows, setWindows] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    timeFrom: '',
    timeTo: '',
    allocatedSlots: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchWindows();
  }, []);

  const fetchWindows = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/delivery/windows');
    setWindows(res.data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/admin/delivery/windows/${editId}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/admin/delivery/windows', formData);
    }
    setFormData({ date: '', timeFrom: '', timeTo: '', allocatedSlots: '' });
    setEditId(null);
    fetchWindows();
  };

  const handleEdit = (window) => {
    setFormData({
      date: window.date,
      timeFrom: window.timeFrom,
      timeTo: window.timeTo,
      allocatedSlots: window.allocatedSlots
    });
    setEditId(window._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this delivery window?')) {
      await axios.delete(`http://localhost:5000/api/admin/delivery/windows/${id}`);
      fetchWindows();
    }
  };

  return (
    <div className="admin-delivery-window">
      <h2>Manage Delivery Windows</h2>

      <form onSubmit={handleSubmit} className="window-form">
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="timeFrom" value={formData.timeFrom} onChange={handleChange}/>
        <input type="time" name="timeTo" value={formData.timeTo} onChange={handleChange}/>
        <input name="allocatedSlots" type="number" placeholder="Slots" value={formData.allocatedSlots} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update' : 'Add'} Window</button>
      </form>

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
