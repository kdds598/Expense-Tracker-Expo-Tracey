import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const TransactionBarChart = ({ transactions }) => {
  // Sort transactions by date
  transactions = transactions.sort((a, b) => a.date - b.date);

  // Prepare data and colors based on transaction type
  const labels = transactions.map((_, index) => `Transaction ${index + 1}`);
  const dataValues = transactions.map(item => item.amount);
  const backgroundColors = transactions.map(item =>
    item.type === 'income' ? '#4caf50' : '#f44336'
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Amount',
        data: dataValues,
        backgroundColor: backgroundColors
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom width and height to take effect
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Transactions'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'All your Transactions'
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const transaction = transactions[tooltipItem.dataIndex];
            const type = transaction.type === 'income' ? 'Income' : 'Expense';
            return `${type}: $${tooltipItem.raw}`;
          }
        }
      },
      legend: {
        display: false
      }
    }
  };

  return (
    <div>
      <Bar data={data} options={options} width={800} height={400} />
      
    </div>
  );
};

export default TransactionBarChart;
