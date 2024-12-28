import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const BalanceHistoryChart = ({ data }) => {
  // Extract the timestamps and balances from the data
  if (!data) {
    return <div>Loading...</div>;
  }

  const labels = data.balanceHistory.map((entry) =>
    new Date(entry.timestamp).toLocaleDateString("en-GB")
  );

  // const labels = data.balanceHistory.map(entry => entry.timestamp.toLocaleDateString());
  const balances = data.balanceHistory.map((entry) => entry.balance);

  // Chart data configuration
  const chartData = {
    labels, // Dates on the X-axis
    datasets: [
      {
        label: "Account Balance",
        data: balances, // Balances on the Y-axis
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Optional fill color under the line
        tension: 0.4, // Line smoothness
        pointRadius: 4, // Radius of points on the line
      },
    ],
  };

  // Chart options configuration
  const options = {
    maintainAspectRatio: false, // Allow chart to resize within its container
    responsive: true, // Ensure responsiveness
    plugins: {
      title: {
        display: true,
        text: "Account Balance Over Time",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          maxTicksLimit: 7, // Limits the number of ticks to prevent overcrowding
        },
      },
      y: {
        title: {
          display: true,
          text: "Balance",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    // <div style={{ width: '100%', height: '400px' }}>
    <Line data={chartData} options={options} />
    // </div>
  );
};
