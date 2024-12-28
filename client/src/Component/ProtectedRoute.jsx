import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Context"; // Assuming you have a context for authentication
import { FaExclamationCircle } from "react-icons/fa";
import Lodinder from "./Lodinder";
import { Helmet } from "react-helmet-async";

const ProtectedRoute = ({ element, ...rest }) => {
  const { user, uloading } = useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (!uloading) {
      if (!user) {
        setIsUserLoggedIn(false);
        // Optionally, you can redirect to the login page or display a message
        // alert('Please log in to access this page.');
        // history.push('/login'); // Redirect to login page
      } else {
        setIsUserLoggedIn(true);
      }
    }
  }, [user, uloading]);
  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;


  // If the user is logged in, display the children (protected content)
  if (isUserLoggedIn) {
    return <>{element}</>;
  }

  // If the user is not logged in, display a message or redirect to login
  if(uloading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          margin: "60px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap:"20px",
            backgroundColor: "rgba(65, 126, 239, 0.17)",
            color: "rgb(50, 19, 164)",
            padding: "30px 40px",
            borderRadius: "10px",
            border: "1px solid rgba(63, 17, 228, 0.12)",
            fontWeight: "bold",
            fontSize: "24px", // Larger text size
            textAlign: "center",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            width: "100%", // Ensures the alert fills its container
            maxWidth: "600px", // Maximum width to prevent it from becoming too large
          }}
        >
          <div>
          <FaExclamationCircle
            style={{
              marginRight: "10px",
              fontSize: "20px",
            }}
          />
          <span >Getting your Signup details ...</span>
          </div>
          <Lodinder></Lodinder>
        </div>
      </div>
    );

  }
  
  else{
  return (
    <>
  <Helmet>
  <title>Protected Route - Expo-Tracey | Budget Smarter, Spend Wiser</title>

  {/* Additional Tags */}
  <meta name="author" content="Expo-Tracey Team" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />

  {/* SEO Meta Tags */}
  <meta
    name="description"
    content="This page is protected and only accessible to authenticated users. Manage your financial data securely and privately with Expo-Tracey."
  />
  <meta
    name="keywords"
    content="Protected Route, Secure Access, Financial Management, Budget Tracker, Expense Tracker, Private Dashboard"
  />
  <meta name="robots" content="noindex, nofollow" />

  <link rel="canonical" href={canonicalUrl} />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Protected Route - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    property="og:description"
    content="This page is for authenticated users only. Access your private dashboard and manage your financial data securely."
  />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Protected Route - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    name="twitter:description"
    content="Access your secure dashboard for managing finances with Expo-Tracey. Only accessible to authenticated users."
  />
</Helmet>


    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        margin: "60px 0",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "30px 40px",
          borderRadius: "10px",
          border: "2px solid #f5c6cb",
          fontWeight: "bold",
          fontSize: "24px", // Larger text size
          textAlign: "center",
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
          width: "100%", // Ensures the alert fills its container
          maxWidth: "600px", // Maximum width to prevent it from becoming too large
        }}
      >
        <FaExclamationCircle
          style={{
            marginRight: "10px",
            fontSize: "20px",
          }}
        />
        <span>Your are not logged in, Sign in to use this feature</span>
      </div>
    </div>
    </>
  );
}


};

export default ProtectedRoute;
