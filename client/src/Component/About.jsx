import React, { useState } from "react";
import styles from "../Styles/About.module.css";

import { useNavigate } from "react-router-dom";
import manblue from "./../assets/girlsitting.png";
import ps from "./../assets/peoplesitting.png";
import dev from "./../assets/underlamp.png";
import discussion from "./../assets/discussion.jpg";
import Footer from "./Footer.jsx";
import { IoLogoLinkedin } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

const About = () => {
  const navigate1 = useNavigate();

  //modal maintainer
  return (
    <>
       <Helmet>
        {/* Primary Meta Tags */}
        <title>About Us - Expo-Tracey | Budget Smarter, Spend Wiser</title>
        <meta
          name="description"
          content="Learn about Expo-Tracey, the ultimate expense tracking solution designed to help you manage your finances, track budgets, and achieve your financial goals effortlessly."
        />
        <meta
          name="keywords"
          content="About Expo-Tracey, Expense Tracker App, Budget Management, Financial Goals, Money Tracking, Expense Management,Account Management"
        />
        {/* <meta name="author" content="Expo-Tracey Team" /> */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="About Expo-Tracey | Budget Smarter, Spend Wiser"
        />
        <meta
          property="og:description"
          content="Discover how Expo-Tracey revolutionizes expense tracking and budget management with an easy-to-use platform for your financial success."
        />
        <meta
        property="og:image"
        content={`${window.location.origin}/images/About.png`}
      />
      <meta property="og:url" content={window.location.href} />

        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Expo-Tracey | Budget Smarter, Spend Wiser"
        />
        <meta
          name="twitter:description"
          content="Learn more about how Expo-Tracey makes managing expenses and budgets simple and efficient."
        />
        <meta
          name="twitter:image"
          content={`${window.location.origin}/images/About.png`}
          />
      </Helmet>

    {/* Meta data */}

      {" "}
      <div className={styles["Acc-info-container-1"]}>
        <div className={styles["intothewild1"]}>
          <div>
            <h1 className={styles["Acc-heading"]}>About us</h1>
            <p className={styles["Acc-sub-text"]}>
              Welcome to Exto-Tracey, your trusted partner in financial
              management! Our platform is designed to help you take control of
              your finances effortlessly. Whether you’re tracking daily
              expenses, managing multiple accounts, or setting budgets to
              achieve your goals, we’ve got you covered.
            </p>
          </div>

          <img
            id={styles["img11"]}
            src={manblue}
            style={{ borderRadius: "25px", alignSelf: "center" }}
            height={"260px"}
            width={"360px"}
            alt="img"
          />
        </div>
      </div>
      <div className={styles["Acc-info-container-2"]}>
        <div className={styles["intothewild2"]}>
          <img
            id={styles["img12"]}
            src={dev}
            height={"260px"}
            style={{ borderRadius: "25px", alignSelf: "center" }}
            width={"300px"}
            alt="img"
          />

          <div>
            <h1 className={styles["Acc-heading"]}>Meet the Developer</h1>

            <p className={styles["Acc-sub-text-3"]}>
              Hi there! I'm Rishi, a passionate web developer with a strong
              focus on building user-friendly and impactful solutions.
              Expo-Tracey is a project close to my heart, crafted to simplify
              financial management for everyone. My aim is to blend technology
              and simplicity, helping you achieve your financial goals without
              stress. With expertise in mention relevant technologies like
              React.js, Firebase, MongoDB, etc., I’ve ensured this platform is
              secure, efficient, and easy to use. Thank you for being part of
              this journey!
              <b
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "10px",
                  fontSize: "20px",
                  fontWeight: "bolder",
                  textDecoration: "none",
                }}
              >
                <IoLogoLinkedin color="#0d66c5" size={40} />
                Linkedin{" "}
                <a
                  id={styles["linkedinbutton"]}
                  target="_blank"
                  href="https://www.linkedin.com/in/rishi-raj-sharma-kdds598/"
                >
                  Let's Connect
                </a>
              </b>
            </p>
          </div>
        </div>
      </div>
      <div className={styles["Acc-info-container-4"]}>
        <div className={styles["intothewild3"]}>
          <div>
            <h1 className={styles["Acc-heading"]}>Why Choose Us?</h1>

            <p className={styles["Acc-sub-text-2"]}>
              <b>Smart Expense Tracking:</b> Log your transactions with ease and
              categorize them for better understanding.
            </p>
            <p className={styles["Acc-sub-text-2"]}>
              <b>Account and Budget Management:</b> Create multiple accounts and
              budgets to organize your finances efficiently.
            </p>
            <p className={styles["Acc-sub-text-2"]}>
              <b>Data Insights: </b>Visualize your spending habits with
              intuitive charts and graphs.
            </p>
            <p className={styles["Acc-sub-text-2"]}>
              <b>Flexible Login Options:</b> Access your account via email,
              Google, or as a guest for seamless usability.
            </p>
            <p className={styles["Acc-sub-text-2"]}>
              <b>Secure and Private: </b>We prioritize your data’s security and
              ensure your information stays confidential.
            </p>
          </div>{" "}
          <img
            id={styles["img13"]}
            src={ps}
            style={{ borderRadius: "25px", alignSelf: "center" }}
            height={"260px"}
            width={"360px"}
            alt="img"
          />
        </div>
      </div>
      <div className={styles["Acc-info-container-3"]}>
        <div className={styles["intothewild4"]}>
          <img
            id={styles["img14"]}
            src={discussion}
            height={"240px"}
            style={{ borderRadius: "25px", alignSelf: "center" }}
            width={"360px"}
            alt="img"
          />
          <div>
            <h1 className={styles["Acc-heading"]}>Let's get started</h1>
            <p className={styles["Acc-sub-text"]}>
              {/* 
        Get Started Today!
        Join our growing community of financially empowered users and start your journey toward better financial health. Expense Tracker Name is your all-in-one solution for staying organized and stress-free. */}
              Get started today and take the first step toward financial
              freedom! Join our growing community of financially empowered
              individuals who are making smarter decisions and living
              stress-free with Expense Tracker Name. Our easy-to-use platform is
              designed to help you track your expenses, set budgets, and gain
              valuable insights into your spending habits. Whether you're
              managing your personal budget or keeping track of multiple
              accounts, Expense Tracker Name is here to simplify your financial
              life.
              {/*  Don’t let the burden of managing your
          expenses hold you back—empower yourself with the tools you need to
          make informed financial decisions every day!
         */}
            </p>
          </div>
        </div>
      </div>
      <div className={styles["account-li"]}></div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default About;
