import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React
import axios from 'axios'; // Importing axios for making API calls
import { FaSearch, FaFilter } from 'react-icons/fa'; // Importing icons for search and filter
import '../styles/admin/Customers.css'; // Importing custom CSS for the customers page

/**
 * Customers component displays a list of customers with their order statistics.
 * It includes features like search, filter by customer status, and dynamic data loading.
 */
const Customers = () => {
  // State to manage search query input
  const [searchQuery, setSearchQuery] = useState('');

  // State to manage selected customer status filter
  const [statusFilter, setStatusFilter] = useState('all');

  // State to store customer data
  const [customers, setCustomers] = useState([]);

  // State to manage loading state while fetching data
  const [loading, setLoading] = useState(true);

  // State to store any error message encountered while fetching data
  const [error, setError] = useState(null);

  /**
   * Fetches customers and their order statistics from the backend.
   * This is called once the component is mounted.
   */
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true); // Set loading to true while fetching data
        const response = await axios.get('http://localhost:5000/api/admin/customers-with-stats'); // Fetch customers data from API
        setCustomers(response.data); // Store the fetched data into state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again later.'); // Set error message if fetch fails
        setLoading(false); // Set loading to false after error
      }
    };

    fetchCustomers(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array to run the effect only once on mount

  /**
   * Handles search input changes and updates the searchQuery state.
   * @param {Object} e - The input change event
   */
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  };

  /**
   * Handles the filter change event and updates the statusFilter state.
   * @param {Object} e - The filter change event
   */
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value); // Update the filter based on selected value
  };

  /**
   * Filters customers based on the search query and status filter.
   * It checks the name, email, and customer ID for matching the search query.
   * It also filters customers based on their status (active/inactive).
   */
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      (customer.name && customer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer._id && customer._id.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || (customer.status && customer.status.toLowerCase() === statusFilter.toLowerCase());

    return matchesSearch && matchesStatus; // Return true if both search and status match
  });

  return (
    <div className="customers-container">
      {/* Filters section with search and status filter */}
      <div className="customers-filters">
        {/* Search bar */}
        <form className="customers-search" onSubmit={handleSearch}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
          />
        </form>

        {/* Status filter dropdown */}
        <div className="customers-filter">
          <FaFilter className="filter-icon" />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={handleFilterChange} // Update the filter status on change
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Loading or error state */}
      {loading ? (
        <div className="loading-container">
          <p>Loading customers...</p> {/* Show loading text while fetching data */}
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p> {/* Display error message if fetching fails */}
        </div>
      ) : (
        <>
          {/* Table to display customers */}
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
                {/* Map through the filtered customers and display each customer in a row */}
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer._id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.orders}</td>
                    <td>€{customer.totalSpent.toFixed(2)}</td> {/* Display total spent with 2 decimal places */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No results found message */}
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
