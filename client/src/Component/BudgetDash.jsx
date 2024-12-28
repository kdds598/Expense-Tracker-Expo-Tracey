import React from "react";
import styles from "../Styles/AccountDash.module.css";
import BudgetHeader from "./BudgetHeader";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/Context";
import { Helmet } from "react-helmet-async";
function BudgetDash() {
  const { user,idToken } = useAuth();
  const uid = user?.uid;
  const { budgetId } = useParams();
  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;

  return (
    <>
<Helmet>
  <title>Budget Dashboard - Expo-Tracey | Budget Smarter, Spend Wiser</title>

  {/* Additional Tags */}
  {/* <meta name="author" content="Expo-Tracey Team" /> */}
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />

  {/* SEO Meta Tags */}
  <meta
    name="description"
    content="On the Budget Dashboard, easily manage your total budget and track your spending. Monitor expenses, stay within budget, and visualize your financial health with real-time insights."
  />
  <meta
    name="keywords"
    content="Budget Dashboard, Manage Budget, Track Spending, Financial Management, Personal Finance, Expense Tracker, Budget Insights, Spending Control"
  />
  <meta name="robots" content="index, follow" />

  <link rel="canonical" href={canonicalUrl} />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Budget Dashboard - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    property="og:description"
    content="Stay in control of your finances with the Budget Dashboard. Track your total budget, monitor spending, and visualize financial trends for a healthier budget management experience."
  />
  <meta property="og:image" content={`${originUrl}/images/BudgetDashboard.png`} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Budget Dashboard - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    name="twitter:description"
    content="Easily track and manage your budget. Monitor expenses, stay within limits, and gain insights into your financial health with the Budget Dashboard."
  />
  <meta name="twitter:image" content={`${originUrl}/images/BudgetDashboard.png`} />
</Helmet>




      <div className={styles["account-dash"]}>

        <BudgetHeader uid={uid} budgetId={budgetId} idToken={idToken}></BudgetHeader>
      </div>

      

    </>
  );
}

export default BudgetDash;
