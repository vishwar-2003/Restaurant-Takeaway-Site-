import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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
};

const OrderSummaryChart = ({ data }) => {
  const chartData = {
    labels: ['Pending', 'Processing', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Number of Orders',
        data: [
          data?.pending || 0,
          data?.processing || 0,
          data?.completed || 0,
          data?.cancelled || 0,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '400px', padding: '20px' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default OrderSummaryChart; 