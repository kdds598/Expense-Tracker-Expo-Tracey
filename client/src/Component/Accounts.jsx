import React, { useState } from "react";
import styles from "../Styles/Accounts.module.css";
import Searchbar from "./searchbar.jsx";
import { MdAccountBalanceWallet, MdBluetooth } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import Modal from "./Modal.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Context.jsx";
import validator from "validator";
import {
  useGetAccountsQuery,
  useCreateAccountMutation,
  useDeleteAccountMutation,
} from "../../Store/AccRTKQuries.js";
import Lodinder from "./Lodinder.jsx";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Accounts = () => {
  
  const { user ,idToken} = useAuth();
  const [errors, setErrors] = useState({});


  const uid = user?.uid;
  const {
    data: accounts = [],
    isLoading,
    isError,
  }= useGetAccountsQuery(
    { uid ,token:idToken},
    { skip: !idToken } // Skip the query until the ID token is available

  );
  
  const [formData, setFormData] = useState({
    uid: uid,
    accountName: "",
    availableBalance: "",
  });

  const [
    createAccount,
    { caisLoading, isSuccess,
       caisError, caerror }
    ] =useCreateAccountMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    const newErrors = {};
    const { accountName, availableBalance } = formData;

    if (!validator.isLength(accountName, { min: 4, max: 30 })) {
      newErrors.accountName = "Account Name must be between 4 and 30 characters.";
    }
    if (!validator.isNumeric(availableBalance) || availableBalance < 1|| availableBalance > 10000000) {
      newErrors.availableBalance = "Initial Balance must be a number between 1 and 10,000,000.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if any
      return;
    }
    setErrors({}); // Reset errors


    try {
      const result = await createAccount({newAccount:formData,token:idToken},{skip:!idToken}).unwrap(); // Wait for the result
      toast.success("Account created successfully!");
      setFormData({ uid: uid, accountName: "", availableBalance: "" }); // Reset form
      setModalOpen(false);

    } catch (err) {
      toast.error(err.data.message);
      console.error("Failed to create account:", err); // Log the error
    }
  };


  const navigate1 = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  //pagination conent

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredAccounts = accounts.filter((account) =>
    account.accountName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  

  //modal maintainer

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {setModalOpen(false);
    setFormData({ uid: uid, accountName: "", availableBalance: "" }); // Reset form
    setErrors({}); // Reset errors
  };


  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;



//ui
  return (
    <>
<Helmet>
  <title>Accounts - Expo-Tracey | Budget Smarter, Spend Wiser</title>

  {/* Additional Tags */}
  <meta name="author" content="Expo-Tracey Team" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />

  {/* SEO Meta Tags */}
  <meta
    name="description"
    content="Create, list, and manage multiple accounts effortlessly on this page. Track balances, transactions, and balance history to gain full control of your financial activity."
  />
  <meta
    name="keywords"
    content="Expo-Tracey, Accounts Page, Manage Accounts, Financial Management, Track Finances, Create Account, Personal Finance, Expense Tracker"
  />
  <meta name="robots" content="index, follow" />

  <link rel="canonical" href={canonicalUrl} />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Accounts - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    property="og:description"
    content="Effortlessly manage multiple accounts on the Accounts page. Track balances, transactions, and visualize financial trends with ease."
  />
  <meta property="og:image" content={`${originUrl}/images/Accounts.png`} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Accounts - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    name="twitter:description"
    content="Create and manage multiple accounts. Track financial activity, visualize trends, and gain full control over your finances effortlessly."
  />
  <meta name="twitter:image" content={`${originUrl}/images/Accounts.png`} />
</Helmet>








      {" "}
      <div className={styles["Acc-info-container"]}>
        <h1 className={styles["Acc-heading"]}>Accounts</h1>
        <p className={styles["Acc-sub-text"]}>
          This page allows users to create, list and manage multiple accounts
          effortlessly. Each account tracks its balance, transactions, and
          balance history, giving users a detailed overview of their financial
          activity. With the ability to categorize transactions and visualize
          balance changes over time, this page ensures users have full control
          and insight into their finances.
        </p>
      </div>
      <div className={styles["mid-sec-account-info-list"]}>
        <MdAccountBalanceWallet id={styles["logo-acc"]} />
        <Searchbar
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles["searchbar"]}
        ></Searchbar>

        <button
          onClick={openModal}
          className={styles["add-acc-button"]}
        ></button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className={styles["Add-acc-modal"]}>
            <h1 className={styles["Add-acc-modal-heading"]}>
              Create an account
            </h1>

            <div className={styles["Add-acc-modaL-input-div"]}>
              <label className={styles["acc-modal-labels"]}>
                <h3 style={{ marginTop: "20px" }}>Account Name :</h3>
              </label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                className={styles["Add-acc-modal-input"]}
                placeholder="Account Name"
                value={formData.accountName}
                onChange={handleChange}
                required={true}
              ></input>
              {errors.accountName && <small style={{color:"red",textAlign:"center"}} className="error">{errors.accountName}</small>}

              <label className={styles["acc-modal-labels"]}>
                <h3 style={{ marginTop: "20px" }}>Initial Balance :</h3>
              </label>
              <input
                type="number"
                id="availableBalance"
                name="availableBalance"
                className={styles["Add-acc-modal-input"]}
                placeholder="Amount"
                value={formData.availableBalance}
                onChange={handleChange}
                required={true}
              ></input>
                {errors.availableBalance && <small style={{color:"red",textAlign:"center"}}  className="error">{errors.availableBalance}</small>}
              <button
                className={styles["modal-add-button"]}
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                disabled={caisLoading}
              >
                {" "}
                {caisLoading ? "loading..." : "ADD ACCOUNT"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className={styles["account-list"]}>
     
      { isLoading ?  <Lodinder></Lodinder>
        :(
          isError? <div className={styles["zero-length-acc-msg"]}>
                  <h1> unable to fetch Budgets, something wrong with the network, try refreshing. </h1>
                  </div>:

        !accounts.length ? (
          <div className={styles["zero-length-acc-msg"]}>
            <h1> You haven't created any accounts yet. </h1>
          </div>
        ) : paginatedAccounts.length ? (
          paginatedAccounts.map((account) => (
            <div key={account._id} className={styles["account-li"]}>
              <div className={styles["account-li-inner"]}>
                <div className={styles["logo-money"]}>
                  <RiMoneyDollarCircleFill />|
                </div>
                <div className={styles["card"]}>
                  <div key={account.id}>
                    <h3 style={{ wordBreak: "break-word" }}>
                      {account.accountName}
                    </h3>
                    <p>Balance: ${account.availableBalance.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate1(`/accounts/dash/${account._id}`)}
                className={styles["view-acc-button"]}
              >
                <FaEye className={styles["eye-logo"]}></FaEye>{" "}
              </button>
            </div>
          ))
        ) : (
          <div className={styles["zero-length-acc-msg"]}>
            <h1> You have no such accounts. </h1>
          </div>
        )
      )
      }
      </div>
      
      
      <div className={styles["pagination-acc"]}>
        <span>
          <span id={styles["inner-span"]}></span>
          Page {currentPage} of {totalPages}
        </span>

        <div>
          <button
            className={styles["pagination-acc-button"]}
            id={styles["prev-button"]}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          ></button>

          <button
            className={styles["pagination-acc-button"]}
            id={styles["next-button"]}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          ></button>
        </div>
      </div>
    </>
  );
};
export default Accounts;
