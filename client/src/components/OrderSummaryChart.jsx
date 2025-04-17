import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register necessary components for Chart.js to work
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart options – defines responsiveness, legend position, and chart title
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top", // legend appears at the top of the chart
    },
    title: {
      display: true,
      text: "Order Summary", // chart heading
    },
  },
};

/**
 * OrderSummaryChart Component
 * Displays a bar chart showing the count of orders by status.
 *
 * Props:
 * - data: Object with keys: pending, processing, completed, cancelled
 */
const OrderSummaryChart = ({ data }) => {
  // Prepare chart data using incoming props with fallback defaults
  const chartData = {
    labels: ["Pending", "Processing", "Completed", "Cancelled"], // x-axis labels
    datasets: [
      {
        label: "Number of Orders",
        data: [
          data?.pending || 0,
          data?.processing || 0,
          data?.completed || 0,
          data?.cancelled || 0,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.5)", // Yellow
          "rgba(54, 162, 235, 0.5)", // Blue
          "rgba(75, 192, 192, 0.5)", // Teal
          "rgba(255, 99, 132, 0.5)", // Red
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px", padding: "20px" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default OrderSummaryChart;
