import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";
import pic from "../assets/logo1.png";
import { useSelector } from "react-redux";
import { useAuth } from "../Context/Context";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
const Navbar = () => {
  //demo
  // const demoobj = useSelector((store)=> store.fslice)
  // console.log("jj",demoobj);
  const { auth, user, uloading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("User logged out successfully!");
      // Redirect or handle post-logout logic
    } catch (er) {
      console.error("Error logging out:", er.message);
            toast.error(er.data.message)
      
    }
  };

  return (
    <>
      <div className={styles["navbar-div"]}>
        <nav className={styles["navbar"]}>
          <div className={styles["logo"]}>
            <img className={styles["logoimg"]} src={pic} alt="jj" />
          </div>
          <div className={styles["right-nav"]}>
            {uloading ? (
              <button id={styles["login"]} onClick={handleLogout}>
                Loading...
              </button>
            ) : user ? (
              <button id={styles["login"]} onClick={handleLogout}>
                Sign out
              </button>
            ) : (
              <Link id={styles["login"]} to={"/signup"}>
                signin
              </Link>
            )}
            <div className={styles["menu-toggle"]} onClick={toggleMenu}>
              <span className={styles["bar"]}></span>
              <span className={styles["bar"]}></span>
              <span className={styles["bar"]}></span>
            </div>
          </div>
        </nav>

        <ul className={styles["nav-links"]}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
          <li>
            <Link to="/budgets">Budgets</Link>
          </li>
          <li>
            <Link to="/userProfile">Profile</Link>
          </li>
        </ul>
      </div>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margintop: "20px",
          }}
        >
          <div className={styles["menu-toggle2"]} onClick={toggleMenu}>
            <span className={styles["bar2"]}></span>
            <span className={styles["bar2"]}></span>
            <span className={styles["bar2"]}></span>
          </div>
        </div>
        <ul className={styles["sidebar-links"]}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/accounts" onClick={toggleMenu}>
              Accounts
            </Link>
          </li>
          <li>
            <Link to="/budgets" onClick={toggleMenu}>
              Budgets
            </Link>
          </li>
          <li>
            <Link to="/userProfile" onClick={toggleMenu}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
