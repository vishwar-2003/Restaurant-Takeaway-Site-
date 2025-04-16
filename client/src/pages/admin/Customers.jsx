import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/admin/Customers.css';
import axios from 'axios';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/admin/customers');
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again later.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality is handled by the filteredCustomers variable
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter customers based on search query and status filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer._id && customer._id.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
      (customer.status && customer.status.toLowerCase() === statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  // Calculate customer statistics
  const getCustomerStats = (customer) => {
    return {
      orders: customer.orders ? customer.orders.length : 0,
      totalSpent: customer.totalSpent || 0,
      status: customer.status || 'active',
      joinDate: customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'
    };
  };

  return (
    <div className="customers-container">
      <div className="customers-filters">
        <form className="customers-search" onSubmit={handleSearch}>
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search customers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="customers-filter">
          <FaFilter className="filter-icon" />
          <select 
            className="filter-select" 
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <p>Loading customers...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="customers-table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => {
                  const stats = getCustomerStats(customer);
                  return (
                    <tr key={customer._id}>
                      <td>{customer._id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{stats.orders}</td>
                      <td>${stats.totalSpent.toFixed(2)}</td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="no-results">
              No customers found matching your criteria.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Customers;
