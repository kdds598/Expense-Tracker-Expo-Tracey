import React from "react";
import "../Styles/HowItWorks.css";
import {
  FaUser,
  FaWallet,
  FaExchangeAlt,
  FaChartBar,
  FaChartPie,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2 className="heading">Getting Started Is Easy!</h2>
      <div className="steps-container">
        <div className="step">
          <div className="icon-container">
            <FaUser className="icon" size={"25px"} />
          </div>
          <div className="inner-con-div">
            <h3>Step 1: Login/Signup</h3>
            <p>Signup through any feasable method</p>
          </div>{" "}
        </div>
        <div className="step">
          <div className="icon-container">
            <FaWallet className="icon" size={"25px"} />
          </div>
          <div className="inner-con-div">
            <h3>Step 2: Create Your Accounts</h3>
            <p>Set up multiple accounts tailored to your financial needs.</p>
          </div>
        </div>
        <div className="step">
          <div className="icon-container">
            <FaExchangeAlt className="icon" size={"25px"} />
          </div>
          <div className="inner-con-div">
            <h3>Step 3: Track Your Transactions</h3>
            <p>Categorize all your expenses and incomes effortlessly.</p>
          </div>
        </div>
        <div className="step">
          <div className="icon-container">
            <FaChartBar className="icon" size={"25px"} />
          </div>
          <div className="inner-con-div">
            <h3>Step 4: Set Your Budgets</h3>
            <p>Define your financial goals and track your progress.</p>
          </div>
        </div>
        <div className="step">
          <div className="icon-container">
            <FaChartPie className="icon" size={"25px"} />
          </div>
          <div className="inner-con-div">
            <h3>Step 5: Analyze Your Data</h3>
            <p>Use visual tools to gain insights into your spending habits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
