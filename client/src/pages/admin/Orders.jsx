import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin/Orders.css';

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Holds selected order for updating status
  const [newStatus, setNewStatus] = useState(''); // New status to update

  // Fetch orders from the server
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/orders') // Fetch orders from the backend
      .then(res => {
        setOrders(res.data); // Store orders in the state
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
      });
  }, []);

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || (order.status && order.status.toLowerCase() === statusFilter.toLowerCase());
    const matchesSearch =
      (order.customerId && order.customerId.name && order.customerId.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Function to handle status change
  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, { status: newStatus })
      .then(res => {
        const updatedOrder = res.data;
        setOrders(orders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        ));
        setSelectedOrder(null); // Close the modal or form after update
      })
      .catch(err => {
        console.error('Error updating order status:', err);
        alert('Failed to update order status');
      });
  };

  // Function to open the update status form/modal
  const openUpdateStatus = (order) => {
    console.log("View button clicked for order:", order);  // Log to ensure it gets triggered
    setSelectedOrder(order); // Set the selected order
    setNewStatus(order.status); // Pre-fill the current status
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Orders</h2>
        <div className="orders-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id} className="order-row">
                <td>{order._id}</td>
                <td>{order.customerId && order.customerId.name}</td>
                <td>{new Date(order.orderedAt).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  <button
                    className="action-button view"
                    onClick={() => openUpdateStatus(order)} // Trigger modal on View button click
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="no-results">
          <p>No orders found matching your criteria.</p>
        </div>
      )}

      {/* Modal to update order status */}
      {selectedOrder && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <h3>Update Order Status</h3>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Current Status:</strong> {selectedOrder.status}</p>
            <div>
              <label htmlFor="status">New Status:</label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              className="action-button view"
              onClick={() => handleStatusChange(selectedOrder._id, newStatus)} // Update order status
            >
              Update Status
            </button>
            <button
              className="action-button view"
              onClick={() => setSelectedOrder(null)} // Close modal
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Orders;
