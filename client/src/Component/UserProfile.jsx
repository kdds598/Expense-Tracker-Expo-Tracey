import React, { useState, useEffect } from "react";
import styles from "../Styles/UserProfile.module.css";
import { FaUserSecret, FaUserAstronaut } from "react-icons/fa";
import { useAuth } from "../Context/Context.jsx";
import { Form } from "react-router-dom";
import { useGetUserByUidQuery } from "../../Store/AccRTKQuries.js";
import Lodinder from "./Lodinder.jsx";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
 
  const [loginmethod, setLoginmethod] = useState(null);
  const [photoURL, setphotoURL] = useState("");

  


  // Auth context
  const { user, uloading,idToken } = useAuth();

  
  const uid =user.uid;
// console.log(uid);

  const {
      data: Uinfo={user:{accounts:[],budgets:[]}},
      isLoading: isuinfoLoading,
      isError: isuinfoerror,

    } = useGetUserByUidQuery({uid:uid,token:idToken},{skip:!idToken||!uid});
    // console.log(idToken);
    
    // console.log(Uinfo);
    
  let formattedDate = "";
  if (!uloading && user) {
    const creationTime = user.metadata.creationTime;
    const date = new Date(creationTime);
    formattedDate = date.toLocaleDateString();
  }

  // Set login method using useEffect
  useEffect(() => {
    if (user) {
      setphotoURL(user.photoURL);

      try {
        if (user.isAnonymous) {
          setLoginmethod("anonymous");
        } else {
          setLoginmethod(user.providerData[0]?.providerId || "unknown");
        }
      } catch (error) {
        console.error("Error determining login method:", error);
      }
    }
  }, [user]);
  
  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;
  // Check if the user is not logged in
  if (!user) {
    return<div style={{marginTop:"300px"}}><Lodinder></Lodinder></div> ;
  }

  // Check if the user data is still loading
  if (uloading||isuinfoLoading||isuinfoerror) {
    return<div style={{marginTop:"100px"}}><Lodinder></Lodinder></div> ;
  }
  // setphotoURL(user.photoURL)
  return (
<>
<Helmet>
        {/* Basic Meta Tags */}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{user.displayName || user.name}'s Profile - Expo-Tracey</title>
        <meta name="description" content={`View ${user.displayName || user.name}'s profile in My Expense Tracker, see your user info.`} />
        
        {/* Open Graph (OG) Meta Tags */}
        <meta property="og:title" content={`${user.displayName || user.name}'s Profile - Expo-Tracey`} />
        <meta property="og:description" content={`View ${user.displayName || user.name}'s profile in My Expense Tracker, see your user info.`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content={`${user.displayName || user.name}'s Profile - Expo-Tracey`} />
        <meta name="twitter:description" content={`View ${user.displayName || user.name}'s profile in My Expense Tracker, see your user info.`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Additional Meta Tags for SEO */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>


    <div className={styles["Acc-info-container"]}>
      <h1 className={styles["Acc-heading"]}>User Profile</h1>
      <p>
        Welcome to your profile page, where you can view your personal
        information and details!
      </p>

      <div className={styles["Acc-sub-text"]}>
        <div className={styles["inn1subt"]}>
          <h2 style={{ wordBreak: "break-word" }}>
            User name: {user.displayName || user.name || "N/A"}
          </h2>
          <h2 id={styles["fft"]} style={{ wordBreak: "break-word" }}>
            Email: {user.email || "N/A"}
          </h2>
          <h3 style={{ color: "#334155" }}>Login method: {loginmethod}</h3>
          <h3 style={{ color: "#334155" }}>Member since: {formattedDate}</h3>
        </div>

        

        <div className={styles["inn2subt"]} style={{ alignSelf: "center" }}>
          {loginmethod === "anonymous" && <FaUserSecret size={160} />}
          {(loginmethod === "password"||"google.com") && (
            <FaUserAstronaut size={160} color="white" />
          )}
          {/* {loginmethod === "" && (photoURL && !uloading ? (
         <img src={user.photoURL} width={160} alt="Profile" />
          ) : (
        <FaUserAstronaut size={160} />
         ))} */}
        </div>
      </div>

      <div className={styles["Acc-sub-text"]}>
        <h2 id={styles["dif1"]}>{isuinfoLoading?"Loading...":Uinfo.user.accounts.length}</h2>
        <h2 id={styles["dif2"]}>{isuinfoLoading?"Loading...":Uinfo.user.budgets.length}</h2>
      </div>
    </div>
</>
  );
};

export default UserProfile;
