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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderSummaryChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Orders',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Revenue',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Summary',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Fetch order summary data from MongoDB
        const response = await axios.get('http://localhost:5000/api/admin/orders/summary');
        const data = response.data;

        // Process the data for the chart
        const labels = data.map(item => item.date);
        const orderCounts = data.map(item => item.count);
        const revenues = data.map(item => item.revenue);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Orders',
              data: orderCounts,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Revenue',
              data: revenues,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching order summary data:', error);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className="dashboard-chart-card">
      <h3>Order Summary</h3>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default OrderSummaryChart; 