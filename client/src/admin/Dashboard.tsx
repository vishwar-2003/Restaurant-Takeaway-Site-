import React, { useState } from "react";
import "./Dashboard.css";
import Orders from "./Orders.tsx";
import Customers from "./Customers.tsx";
import Reviews from "./Reviews.tsx";


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

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
                <p className="dashboard-stat-number">856</p>
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
                    <img
                      src="https://source.unsplash.com/random/100x100?tacos"
                      alt="Spicy Shrimp Tacos"
                    />
                    <div className="dashboard-item-info">
                      <h4>Spicy Shrimp Tacos</h4>
                      <p>$12.99 • 156 orders</p>
                    </div>
                  </div>
                  <div className="dashboard-trending-item">
                    <img
                      src="https://source.unsplash.com/random/100x100?salmon"
                      alt="Grilled Salmon"
                    />
                    <div className="dashboard-item-info">
                      <h4>Grilled Salmon</h4>
                      <p>$18.99 • 142 orders</p>
                    </div>
                  </div>
                  <div className="dashboard-trending-item">
                    <img
                      src="https://source.unsplash.com/random/100x100?cake"
                      alt="Chocolate Lava Cake"
                    />
                    <div className="dashboard-item-info">
                      <h4>Chocolate Lava Cake</h4>
                      <p>$8.99 • 98 orders</p>
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
            className={`dashboard-nav-item ${
              activeTab === "dashboard" ? "active" : ""
            }`}
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
            className={`dashboard-nav-item ${
              activeTab === "orders" ? "active" : ""
            }`}
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
            className={`dashboard-nav-item ${
              activeTab === "customers" ? "active" : ""
            }`}
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
            className={`dashboard-nav-item ${
              activeTab === "reviews" ? "active" : ""
            }`}
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
            className={`dashboard-nav-item ${
              activeTab === "menu" ? "active" : ""
            }`}
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
            className={`dashboard-nav-item ${
              activeTab === "inventory" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("inventory");
            }}
          >
            <i className="dashboard-icon">📦</i>
            <span>Inventory</span>
          </a>
        </nav>
      </div>

      <div className="dashboard-main-content">
        <header className="dashboard-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="dashboard-header-right">
            <div className="dashboard-search-bar">
              <input type="text" placeholder="Search..." />
              <button className="dashboard-search-button">🔍</button>
            </div>
            <div className="dashboard-profile">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="dashboard-avatar"
              />
            </div>
          </div>
        </header>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
