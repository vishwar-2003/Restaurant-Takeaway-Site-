// TODO: This file needs to be converted to JSX

import React, { useState } from 'react';
import '../styles/admin/Customers.css';

// Mock data for customers
const mockCustomers = [
  { id: 'CUS-001', name: 'John Doe', email: 'john.doe@example.com', phone: '(555) 123-4567', joinDate: '2023-01-15' },
  { id: 'CUS-002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '(555) 234-5678', joinDate: '2023-02-20' },
  { id: 'CUS-003', name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '(555) 345-6789', joinDate: '2023-03-10' },
  { id: 'CUS-004', name: 'Emily Davis', email: 'emily.davis@example.com', phone: '(555) 456-7890', joinDate: '2023-04-05' },
  { id: 'CUS-005', name: 'Michael Wilson', email: 'michael.wilson@example.com', phone: '(555) 567-8901', joinDate: '2023-05-12' },
  { id: 'CUS-006', name: 'Sarah Brown', email: 'sarah.brown@example.com', phone: '(555) 678-9012', joinDate: '2023-06-18' },
  { id: 'CUS-007', name: 'David Miller', email: 'david.miller@example.com', phone: '(555) 789-0123', joinDate: '2023-07-22' },
  { id: 'CUS-008', name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com', phone: '(555) 890-1234', joinDate: '2023-08-30' },
  { id: 'CUS-009', name: 'William Anderson', email: 'william.anderson@example.com', phone: '(555) 901-2345', joinDate: '2023-09-14' },
  { id: 'CUS-010', name: 'Elizabeth Thomas', email: 'elizabeth.thomas@example.com', phone: '(555) 012-3456', joinDate: '2023-10-25' },
];

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter customers based on search term
  const filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h2>Customers</h2>
        <div className="customers-search">
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="customer-row">
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                <td>
                  <button className="action-button view">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="no-results">
          <p>No customers found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Customers; 