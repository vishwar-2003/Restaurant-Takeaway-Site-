// TODO: This file needs to be converted to JSX

import React, { useState } from 'react';
import '../styles/admin/Orders.css';

// Mock data for orders
const mockOrders = [
  { id: 'ORD-001', customerName: 'John Doe', date: '2023-06-15', status: 'Completed', total: 45.99 },
  { id: 'ORD-002', customerName: 'Jane Smith', date: '2023-06-14', status: 'Pending', total: 32.50 },
  { id: 'ORD-003', customerName: 'Robert Johnson', date: '2023-06-14', status: 'Completed', total: 78.25 },
  { id: 'ORD-004', customerName: 'Emily Davis', date: '2023-06-13', status: 'Completed', total: 120.75 },
  { id: 'ORD-005', customerName: 'Michael Wilson', date: '2023-06-13', status: 'Pending', total: 55.00 },
  { id: 'ORD-006', customerName: 'Sarah Brown', date: '2023-06-12', status: 'Completed', total: 95.50 },
  { id: 'ORD-007', customerName: 'David Miller', date: '2023-06-12', status: 'Pending', total: 65.25 },
  { id: 'ORD-008', customerName: 'Jennifer Taylor', date: '2023-06-11', status: 'Completed', total: 42.75 },
  { id: 'ORD-009', customerName: 'William Anderson', date: '2023-06-11', status: 'Completed', total: 88.00 },
  { id: 'ORD-010', customerName: 'Elizabeth Thomas', date: '2023-06-10', status: 'Pending', total: 72.50 },
];

const Orders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter orders based on status and search term
  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
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
            {filteredOrders.map((order) => (
              <tr key={order.id} className="order-row">
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <button className="action-button view">View</button>
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
    </div>
  );
};

export default Orders; 