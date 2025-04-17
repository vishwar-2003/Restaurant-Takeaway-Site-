import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin/Orders.css';

const Orders = () => {
  // State variables
  const [statusFilter, setStatusFilter] = useState('All'); // Filter for order status
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering by order ID or customer name
  const [orders, setOrders] = useState([]); // Stores all fetched orders
  const [selectedOrder, setSelectedOrder] = useState(null); // Stores selected order for modal
  const [newStatus, setNewStatus] = useState(''); // Stores the new status selected by the admin
  const [orderDetails, setOrderDetails] = useState(null); // Stores details for the selected order to show in modal

  // Fetch orders when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/orders')
      .then(res => {
        setOrders(res.data); // Set the fetched orders to state
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
      });
  }, []);

  // Fetch order details when the "View" button is clicked
  const fetchOrderDetails = (orderId) => {
    axios.get(`http://localhost:5000/api/order/${orderId}`)
      .then(res => {
        setOrderDetails(res.data.data); // Set the order details to state for modal
      })
      .catch(err => {
        console.error('Error fetching order details:', err);
      });
  };

  // Filter orders based on search term and selected status
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || (order.status && order.status.toLowerCase() === statusFilter.toLowerCase());
    const matchesSearch =
      (order.customerId && order.customerId.name && order.customerId.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Handle changing order status
  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:5000/api/admin/orders/${orderId}/status`, { status: newStatus })
      .then(res => {
        const updatedOrder = res.data;
        setOrders(orders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        ));
        setSelectedOrder(null); // Close modal after status update
      })
      .catch(err => {
        console.error('Error updating order status:', err);
        alert('Failed to update order status');
      });
  };

  // Open the modal to view and update order status
  const openUpdateStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status); // Set the current status for the dropdown in the modal
    fetchOrderDetails(order._id); // Fetch the order details to populate the modal
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Orders</h2>
        <div className="orders-filters">
          {/* Search bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              className="search-input"
            />
          </div>

          {/* Status filter dropdown */}
          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} // Update status filter
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
              <th>Delivery Type</th> {/* Added column for deliveryType */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Display filtered orders */}
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
                <td>€{order.totalPrice.toFixed(2)}</td>
                <td>{order.deliveryType}</td> {/* Display delivery type */}
                <td>
                  <button
                    className="action-button view"
                    onClick={() => openUpdateStatus(order)} // Open the modal on View button click
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show message if no orders match the filter */}
      {filteredOrders.length === 0 && (
        <div className="no-results">
          <p>No orders found matching your criteria.</p>
        </div>
      )}

      {/* Modal to update order status */}
      {selectedOrder && orderDetails && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <h3>Update Order Status</h3>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Current Status:</strong> {selectedOrder.status}</p>

            {/* Display items if takeaway */}
            {orderDetails.deliveryType === 'takeaway' ? (
              <div>
                <h4>Items:</h4>
                <ul>
                  {orderDetails.items.map(item => (
                    <li key={item.name}>
                      {item.name} - €{item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // Display delivery info if delivery
              <div>
                <h4>Items:</h4>
                <ul>
                  {orderDetails.items.map(item => (
                    <li key={item.name}>
                      {item.name} - €{item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <p><strong>Postcode:</strong> {orderDetails.deliveryAddressId.postcode}</p>
              </div>
            )}

            {/* Status change dropdown */}
            <div>
              <label htmlFor="status">New Status:</label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)} // Update the new status
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Save and Cancel buttons */}
            <button
              className="action-button view"
              onClick={() => handleStatusChange(selectedOrder._id, newStatus)} // Save status change
            >
              Update Status
            </button>
            <button
              className="action-button view"
              onClick={() => setSelectedOrder(null)} // Close the modal
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
