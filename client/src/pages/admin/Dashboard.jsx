// TODO: This file needs to be converted to JSX

import React, { useState, useEffect } from "react";
import "../styles/admin/Dashboard.css";
import Orders from "./Orders.jsx";
import Customers from "./Customers.jsx";
import Reviews from "./Reviews.jsx";
import Menu from "./Menu.jsx"; 

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [totalCustomers, setTotalCustomers] = useState(0);


  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/customers/count");
        const data = await res.json();
        console.log("Fetched count:", data);
        setTotalCustomers(data.totalCustomers);
      } catch (err) {
        console.error("Failed to fetch total customers", err);
      }
    };

    fetchCustomerCount();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="dashboard-content">
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <h3>Total Orders</h3>
                <p className="dashboard-stat-number">1,234</p>
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
                <p className="dashboard-stat-number">$12,345</p>
                <p className="dashboard-stat-change positive">
                  ↑ 15% from last month
                </p>
              </div>
            </div>

            <div className="dashboard-charts-grid">
              <div className="dashboard-chart-card">
                <h3>Order Summary</h3>
                <div className="dashboard-chart-placeholder">
                  [Bar Chart Placeholder]
                </div>
              </div>
              <div className="dashboard-trending-card">
                <h3>Trending Menu</h3>
                <div className="dashboard-trending-list">
                  <div className="dashboard-trending-item">
                    <div className="dashboard-item-info">
                      <h4>Ghee Roast</h4>
                      <p>€8.95 • 156 orders</p>
                    </div>
                  </div>
                  <div className="dashboard-trending-item">
                    <div className="dashboard-item-info">
                      <h4>Chicken Biriyani</h4>
                      <p>€14.95 • 142 orders</p>
                    </div>
                  </div>
                  <div className="dashboard-trending-item">
                    <div className="dashboard-item-info">
                      <h4>Payasam</h4>
                      <p>€5.85 • 98 orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-revenue-card">
              <h3>Revenue Overview</h3>
              <div className="dashboard-chart-placeholder">
                [Line Chart Placeholder]
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
        return <Menu />;  // Render the Menu component when the 'menu' tab is clicked
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <div className="dashboard-logo">
          <h2>Restaurant Admin</h2>
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
        </nav>
      </div>

      <div className="dashboard-main-content">
        <header className="dashboard-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="dashboard-header-right">
            {/* <div className="dashboard-search-bar">
              <input type="text" placeholder="Search..." />
              <button className="dashboard-search-button">🔍</button>
            </div> */}
          </div>
        </header>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
