import React from "react";
import styles from "../Styles/Footer.module.css"; // Make sure to import your CSS
import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io5";
import pic from "../assets/logo1.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.intofooterinner}>
        <div className={styles.footerContainer}>
          <div className={styles.entryText}>
            <img
              style={{ borderRadius: "10px" }}
              src={pic}
              width={160}
              alt=""
            />
            <p
            // style={{color:"white"}}
            >
              Expo-Tracey – Simplify your finances effortlessly. Designed with passion and
              care <b style={{color:"white"}}>♥</b> by Rishi. Stay organized, track expenses, and thrive!
            </p>
          </div>

          <div id={styles.contactus1}>
            <h2>Connect with us</h2>
            <div>
              <h3 style={{ color: "white" }}>mail : expo.tracey@gmail.com</h3>

              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "10px",
                  color: "white",
                }}
              >
                <IoLogoLinkedin color="white" size={40} />
                Linkedin
                <a
                  id={styles.linkedinbutton}
              
                  target="_blank"
                  href="https://www.linkedin.com/in/rishi-raj-sharma-kdds598/"
                >
                  Let's Connect
                </a>
              </h4>
            </div>
          </div>
        </div>

        <div className={styles.wholeindiv}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Quick Links
          </h2>

          <div className={styles.centerContainer}>
            <Link className={styles.flink} to="/">
              Home
            </Link>
            <Link className={styles.flink} to="/about">
              About Us
            </Link>
            <Link className={styles.flink} to="/accounts">
              Accounts
            </Link>
            <Link className={styles.flink} to="/budgets">
              Budgets
            </Link>
            <Link className={styles.flink} to="/userProfile">
              Profile
            </Link>
          </div>
        </div>
      </div>

      <div id={styles.contactus2}>
        <h2>Connect with us</h2>
        <div>
          <h3 style={{ color: "white" }}>mail : expo.tracey@gmail.com</h3>

          <h4
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "10px",
              color: "white",
            }}
          >
            <IoLogoLinkedin color="white" size={40} />
            Linkedin
            <a
              id={styles.linkedinbutton}
              // style={{
              //   textDecoration: "none",
              //   color: "white",
              //   padding:"2px 6px ",
              //   border:"solid 1px white",
              //   borderRadius:"10px"
              //   // marginLeft: "20px",
              // }}
              target="_blank"
              href="https://www.linkedin.com/in/rishi-raj-sharma-kdds598/"
            >
              Let's Connect
            </a>
          </h4>
        </div>
      </div>

      <div className={styles["footer-bottom"]}>
        <p style={{ textAlign: "center" }}>
          &copy; 2024 Expo-Tracey, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
