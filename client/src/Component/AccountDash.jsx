
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import styles from "../Styles/AccountDash.module.css";
import { useAuth } from "../Context/Context.jsx";
import { Helmet } from "react-helmet-async";

const AccountDash = () => {
  const { user,idToken } = useAuth();
  const uid = user?.uid;
  const { accountId } = useParams();

  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;

  return (
    <>
      <Helmet>
      <title>Account Dashboard - Expo-Tracey | Budget Smarter, Spend Wiser</title>
 {/* Additional Tags */}
 <meta name="author" content="Expo-Tracey Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="UTF-8" />
      
      <meta
        name="description"
        content="The Account Dashboard provides an in-depth view of your financial accounts, including balance tracking, transaction management, and visualized spending trends. Monitor your financial health in real-time."
        />
      <meta
        name="keywords"
        content="Account Dashboard, Expense Tracker, Financial Management, Budget Tracker, Track Spending, Account Transactions, Personal Finance"
      />
      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content="Account Dashboard - Expo-Tracey | Budget Smarter, Spend Wiser" />
      <meta
        property="og:description"
        content="Stay on top of your finances with the Account Dashboard. View transactions, monitor balances, and analyze your spending trends effortlessly."
      />
      <meta property="og:image" content={`${originUrl}/images/AccountDash.png`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Account Dashboard - Expo-Tracey | Budget Smarter, Spend Wiser" />
      <meta
        name="twitter:description"
        content="Effortlessly manage accounts, transactions, and budgets. Visualize balance trends and monitor financial health with ease."
      />
      <meta name="twitter:image" content={`${originUrl}/images/AccountDash.png`} />

     
    </Helmet>



    <div className={styles["account-dash"]}>
     
      <AccountHeader
        uid={uid}
        accountId={accountId}
        idToken={idToken}
       
      ></AccountHeader>
    </div>
    </>
  );
};

export default AccountDash;
