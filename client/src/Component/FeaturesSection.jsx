import React from "react";
import styles from "../Styles/FeatureSection.module.css"; // Import your CSS file
import { FcAddressBook } from "react-icons/fc";

function FeatureSection() {
  return (
    <div className={styles["component-container"]}>
      <header className={styles["header"]}>
        <h2>Why Choose Our Expense Tracker?</h2>
        <p>Track, visualize and manage your finance efficiently.</p>
      </header>
      <div className={styles["main-content"]}>
        <div className={styles["section"]}>
          <div>
            <FcAddressBook size={"30px"}></FcAddressBook>
          </div>
          <p> Real-time updates on account balances and spending</p>
        </div>
        <div className={styles["section"]}>
          <div>
            <FcAddressBook size={"30px"}></FcAddressBook>
          </div>
          <p> User-friendly interface for seamless navigation</p>
        </div>
        <div className={styles["section"]}>
          <div>
            <FcAddressBook size={"30px"}></FcAddressBook>
          </div>

          <p>
            {" "}
            Visualize your financial health with various interactive graphics
          </p>
        </div>

        <div className={styles["section"]}>
          <div>
            <FcAddressBook size={"30px"}></FcAddressBook>
          </div>
          <p> Access to detailed transaction history and insights</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
