import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin/Dashboard.css";
import Orders from "./Orders.jsx";
import Customers from "./Customers.jsx";
import Reviews from "./Reviews.jsx";
import Menu from "./Menu.jsx";
import DeliveryWindow from "./AdminDeliveryWindow.jsx";
import OrderSummaryChart from "../../components/OrderSummaryChart";

/**
 * Dashboard component displays various statistics and tabs for the admin panel.
 * It fetches data like total orders, total revenue, and other statistics on page load.
 */
const Dashboard = () => {
  const navigate = useNavigate(); // Navigate for routing
  const [activeTab, setActiveTab] = useState("dashboard"); // Active tab to display
  const [totalCustomers, setTotalCustomers] = useState(0); // State for total customers count
  const [totalOrders, setTotalOrders] = useState(0); // State for total orders count
  const [totalRevenue, setTotalRevenue] = useState(0); // State for total revenue
  const [averageOrderValue, setAverageOrderValue] = useState(0); // State for average order value

  /**
   * Fetch dashboard data including customer count and order statistics.
   * This function is executed when the component is mounted.
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetching customer count
        const customerRes = await fetch(
          "http://localhost:5000/api/admin/customers/count"
        );
        const customerData = await customerRes.json();
        setTotalCustomers(customerData.totalCustomers); // Set customer count

        // Fetching order statistics (total orders, revenue, and average order value)
        const orderRes = await fetch(
          "http://localhost:5000/api/admin/orders/stats"
        );
        const orderData = await orderRes.json();
        setTotalOrders(orderData.totalOrders || 0); // Set total orders
        setTotalRevenue(orderData.totalRevenue || 0); // Set total revenue
        setAverageOrderValue(orderData.averageOrderValue || 0); // Set average order value
      } catch (err) {
        console.error("Failed to fetch dashboard data", err); // Log error if fetch fails
      }
    };

    fetchDashboardData(); // Call the fetch function
  }, []); // Empty dependency array ensures the effect runs only once on mount

  /**
   * Handles the logout functionality by clearing the admin token from localStorage
   * and redirecting to the login page.
   */
  const handleLogout = () => {
    try {
      // Clear admin-related data from localStorage
      localStorage.removeItem("adminToken");

      // Use navigate to programmatically redirect the user to the login page
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error); // Log error in case of failure
      // Fallback in case the navigate method fails
      window.location.href = "/admin/login";
    }
  };

  /**
   * Renders the content of the active tab.
   * @returns The content of the active tab (dashboard, orders, customers, etc.)
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="dashboard-content">
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-info-centered">
                  <h4 className="dashboard-stat-title">Total Orders</h4>
                  <p className="dashboard-stat-value">{totalOrders}</p>
                </div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-info-centered">
                  <h4 className="dashboard-stat-title">Total Customers</h4>
                  <p className="dashboard-stat-value">{totalCustomers}</p>
                </div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-info-centered">
                  <h4 className="dashboard-stat-title">Total Revenue</h4>
                  <p className="dashboard-stat-value">
                    €{totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-info-centered">
                  <h4 className="dashboard-stat-title">Average Order Value</h4>
                  <p className="dashboard-stat-value">
                    €{averageOrderValue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "orders":
        return <Orders />;
      case "customers":
        return <Customers />;
      case "reviews":
        return <Reviews />;
      case "menu":
        return <Menu />;
      case "deliveryWindow":
        return <DeliveryWindow />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <div className="dashboard-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="dashboard-nav-menu">
          {/* Dashboard navigation menu items */}
          <a
            href="#"
            className={`dashboard-nav-item ${
              activeTab === "dashboard" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("dashboard"); // Switch to the "dashboard" tab
            }}
          >
            <i className="dashboard-icon">📊</i>
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${
              activeTab === "orders" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("orders"); // Switch to the "orders" tab
            }}
          >
            <i className="dashboard-icon">🛍️</i>
            <span>Orders</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${
              activeTab === "customers" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("customers"); // Switch to the "customers" tab
            }}
          >
            <i className="dashboard-icon">👥</i>
            <span>Customers</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${
              activeTab === "reviews" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("reviews"); // Switch to the "reviews" tab
            }}
          >
            <i className="dashboard-icon">💬</i>
            <span>Reviews</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${
              activeTab === "menu" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("menu"); // Switch to the "menu" tab
            }}
          >
            <i className="dashboard-icon">🍽️</i>
            <span>Menu</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${
              activeTab === "deliveryWindow" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("deliveryWindow"); // Switch to the "deliveryWindow" tab
            }}
          >
            <i className="dashboard-icon">🚚</i>
            <span>Delivery Window</span>
          </a>
          <a
            href="#"
            className="dashboard-nav-item logout"
            onClick={(e) => {
              e.preventDefault();
              handleLogout(); // Call the logout function
            }}
          >
            <i className="dashboard-icon">🚪</i>
            <span>Logout</span>
          </a>
        </nav>
      </div>

      <div className="dashboard-main-content">
        {renderTabContent()} {/* Render the content based on the active tab */}
      </div>
    </div>
  );
};

export default Dashboard;
