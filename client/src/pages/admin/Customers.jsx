import React, { useState, useEffect } from 'react';
import '../styles/admin/Customers.css';
import axios from 'axios';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/customers')  // Admin route for customers
      .then((res) => {
        console.log('Fetched customers:', res.data);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error('Error fetching customers:', err);
      });
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer._id.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer._id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    <button className="action-button view">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No customers found matching your search criteria.</td>
              </tr>
            )}
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

export default AdminCustomers;
