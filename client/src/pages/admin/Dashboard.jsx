// TODO: This file needs to be converted to JSX

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin/Dashboard.css";
import Orders from "./Orders.jsx";
import Customers from "./Customers.jsx";
import Reviews from "./Reviews.jsx";
import Menu from "./Menu.jsx"; 
import OrderSummaryChart from '../../components/OrderSummaryChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch customer count
        const customerRes = await fetch("http://localhost:5000/api/admin/customers/count");
        const customerData = await customerRes.json();
        setTotalCustomers(customerData.totalCustomers);

        // Fetch order statistics
        const orderRes = await fetch("http://localhost:5000/api/admin/orders/stats");
        const orderData = await orderRes.json();
        setTotalOrders(orderData.totalOrders || 0);
        setTotalRevenue(orderData.totalRevenue || 0);
        setAverageOrderValue(orderData.averageOrderValue || 0);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    try {
      // Clear all admin-related data from localStorage
      localStorage.removeItem('adminToken');
      
      // Use navigate for programmatic navigation
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback redirect
      window.location.href = '/admin/login';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="dashboard-content">
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <h3>Total Orders</h3>
                <p className="dashboard-stat-number">{totalOrders}</p>
                <p className="dashboard-stat-change positive">
                  ↑ 12% from last month
                </p>
              </div>
              <div className="dashboard-stat-card">
                <h3>Total Customers</h3>
                <p className="dashboard-stat-number">{totalCustomers}</p>
                <p className="dashboard-stat-change positive">
                  ↑ 8% from last month
                </p>
              </div>
              <div className="dashboard-stat-card">
                <h3>Total Revenue</h3>
                <p className="dashboard-stat-number">${totalRevenue.toFixed(2)}</p>
                <p className="dashboard-stat-change positive">
                  ↑ 15% from last month
                </p>
              </div>
              <div className="dashboard-stat-card">
                <h3>Average Order Value</h3>
                <p className="dashboard-stat-number">${averageOrderValue.toFixed(2)}</p>
                <p className="dashboard-stat-change positive">
                  ↑ 5% from last month
                </p>
              </div>
            </div>

            <div className="order-summary-section">
              <div className="order-summary-chart">
                <h3>Orders by Status</h3>
                <OrderSummaryChart />
              </div>
              <div className="order-summary-chart">
                <h3>Orders by Delivery Type</h3>
                <OrderSummaryChart />
              </div>
              <div className="order-summary-chart">
                <h3>Orders by Payment Status</h3>
                <OrderSummaryChart />
              </div>
            </div>

            <div className="dashboard-bottom-section">
              <div className="sales-trend-section">
                <h3>Sales Trend</h3>
                {/* Sales trend chart will go here */}
              </div>
              <div className="trending-items-section">
                <h3>Trending Items</h3>
                <div className="trending-items-list">
                  {/* Trending items will go here */}
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
          <a
            href="#"
            className={`dashboard-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("dashboard");
            }}
          >
            <i className="dashboard-icon">📊</i>
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("orders");
            }}
          >
            <i className="dashboard-icon">🛍️</i>
            <span>Orders</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${activeTab === "customers" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("customers");
            }}
          >
            <i className="dashboard-icon">👥</i>
            <span>Customers</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${activeTab === "reviews" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("reviews");
            }}
          >
            <i className="dashboard-icon">⭐</i>
            <span>Reviews</span>
          </a>
          <a
            href="#"
            className={`dashboard-nav-item ${activeTab === "menu" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("menu");
            }}
          >
            <i className="dashboard-icon">🍽️</i>
            <span>Menu</span>
          </a>
          <a
            href="#"
            className="dashboard-nav-item logout"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <i className="dashboard-icon">🚪</i>
            <span>Logout</span>
          </a>
        </nav>
      </div>

      <div className="dashboard-main-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
