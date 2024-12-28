import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const BalancePieChart = ({
  sampleTransactions,
  account,
  totalBudget,
  availableBudget,
}) => {
  if (account === true) {
    const totalIncome = sampleTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpenses = sampleTransactions
      .filter((transaction) => transaction.type === "expenditure")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const availableBalance = totalIncome - totalExpenses;

    // Define chart data

    const chartData = {
      labels: ["Income", "Expenses", "avl bal"],
      datasets: [
        {
          label: "Balance",
          data: [totalIncome, totalExpenses, availableBalance], // replace with the actual income and expense data
          backgroundColor: ["#36A2EB", "#FF6384", "#fbf00e"],
          hoverOffset: 4,
        },
      ],
    };

    // Define chart options if needed
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return (
      <div
        style={{
          width: "50%",
          height: "300px",
          alignSelf: "center",
          padding: "5px",
        }}
      >
        <Doughnut data={chartData} options={options} />
      </div>
    );
  } else {
    const chartData = {
      labels: ["Total Budget", "avl bal", "spent"],
      datasets: [
        {
          label: "Balance",
          data: [totalBudget, availableBudget, totalBudget - availableBudget], // replace with the actual income and expense data
          backgroundColor: ["#36A2EB", "#FF6384", "#fbf00e"],
          hoverOffset: 4,
        },
      ],
    };

    // Define chart options if needed
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return (
      <div
        style={{
          width: "50%",
          height: "300px",
          alignSelf: "center",
          padding: "5px",
        }}
      >
        <Doughnut data={chartData} options={options} />
      </div>
    );
  }
};

export default BalancePieChart;
