import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderSummaryChart = () => {
  // State to store the chart data (labels and datasets)
  const [chartData, setChartData] = useState({
    labels: [], // Dates or periods for the x-axis
    datasets: [
      {
        label: 'Orders', // Label for the "Orders" dataset
        data: [], // Order count data for the chart
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color for the bars
        borderColor: 'rgba(255, 99, 132, 1)', // Border color for the bars
        borderWidth: 1, // Border width for the bars
      },
      {
        label: 'Revenue', // Label for the "Revenue" dataset
        data: [], // Revenue data for the chart
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color for the bars
        borderColor: 'rgba(54, 162, 235, 1)', // Border color for the bars
        borderWidth: 1, // Border width for the bars
      },
    ],
  });

  // State to store chart options (such as title, responsiveness, and axis settings)
  const [chartOptions, setChartOptions] = useState({
    responsive: true, // Make the chart responsive to screen size
    plugins: {
      legend: {
        position: 'top', // Display the legend at the top
      },
      title: {
        display: true, // Display the title
        text: 'Order Summary', // Title text
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure the y-axis starts at 0
      },
    },
  });

  // Effect hook to fetch data from the API and update the chart data
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Fetch the order summary data from the server
        const response = await axios.get('http://localhost:5000/api/admin/orders/summary');
        const data = response.data; // Assuming the data is an array of objects with 'date', 'count', and 'revenue'

        // Process the data for the chart
        const labels = data.map(item => item.date); // Extract the date for the x-axis
        const orderCounts = data.map(item => item.count); // Extract order count
        const revenues = data.map(item => item.revenue); // Extract revenue

        // Update chart data state with the fetched and processed data
        setChartData({
          labels,
          datasets: [
            {
              label: 'Orders',
              data: orderCounts, // Data for the "Orders" bar
              backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color for the bars
              borderColor: 'rgba(255, 99, 132, 1)', // Border color for the bars
              borderWidth: 1, // Border width for the bars
            },
            {
              label: 'Revenue',
              data: revenues, // Data for the "Revenue" bar
              backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color for the bars
              borderColor: 'rgba(54, 162, 235, 1)', // Border color for the bars
              borderWidth: 1, // Border width for the bars
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching order summary data:', error); // Log errors if the fetch fails
      }
    };

    fetchOrderData(); // Call the function to fetch data when the component mounts
  }, []); // Empty dependency array means this runs only once, after the initial render

  return (
    <div className="dashboard-chart-card">
      <h3>Order Summary</h3> {/* Title for the chart */}
      <div className="chart-container">
        {/* Render the Bar chart with the current chart data and options */}
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default OrderSummaryChart;
