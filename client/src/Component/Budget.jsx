import React, { useState } from "react";
import styles from "../Styles/Budget.module.css";
import Searchbar from "./searchbar.jsx";
import { MdAccountBalanceWallet, MdBluetooth } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import Modal from "./Modal.jsx";
import { useNavigate } from "react-router-dom";
import {
  useGetBudgetsQuery,
  useCreateBudgetMutation,
} from "../../Store/AccRTKQuries.js";
import { useAuth } from "../Context/Context.jsx";
import validator from "validator";
import Lodinder from "./Lodinder.jsx";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Budgets = () => {
  const { user,idToken } = useAuth();
    const [errors, setErrors] = useState({});
  
  const uid = user?.uid;
  const {
    data: budgets = [],
    isLoading,
    isError,
  } = useGetBudgetsQuery({ uid:uid,token: idToken },{skip:!uid||!idToken});

  // console.log(isError);
  
  
  // method for add budget button

  const [formData, setFormData] = useState({
    uid: uid,
    budgetName: "",
    totalBudget: "",
  });
  const [
    createBudget,
    {
      isLoading: crbisLoading,
      isSuccess: crbisSuccess,
      isError: crbisError,
      error: crbError,
    },
  ] = useCreateBudgetMutation();

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
        const { budgetName, totalBudget } = formData;
    
        if (!validator.isLength(budgetName, { min: 4, max: 30 })) {
          newErrors.budgetName = "Budget Name must be between 4 and 30 characters.";
        }
        if (!validator.isNumeric(totalBudget) || totalBudget < 1|| totalBudget > 1000000000) {
          newErrors.totalBudget = "Total Budget must be a number between 1 and 1000,000,000.";
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors); // Set errors if any
          return;
        }
        setErrors({}); // Reset errors
    

    try {
      const result = await createBudget({newBudget:formData,token:idToken},{          skip: !idToken, // Skip the request if no accountId is provided
      }).unwrap(); // Wait for the result
      toast.success("Budget created successfully!");
      setFormData({ uid: uid, budgetName: "", totalBudget: "" }); // Reset form
    } catch (err) {
      toast.error(err.data.message);
      console.error("Failed to create budget:", err); // Log the error
    }
    setModalOpen(false);

  };

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  //pagination conent

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredBudgets = budgets.filter((budget) =>
    budget.budgetName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBudgets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBudgets = filteredBudgets.slice(
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
    setFormData({ uid: uid, budgetName: "", totalBudget: "" });
    setErrors({});
  }
  //////

  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;


  return (
    <>

<Helmet>
  <title>Budgets - Expo-Tracey | Budget Smarter, Spend Wiser</title>

  {/* Additional Tags */}
  <meta name="author" content="Expo-Tracey Team" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />

  {/* SEO Meta Tags */}
  <meta
    name="description"
    content="Easily create and manage multiple budgets for different categories. Track your financial goals, monitor spending, view transaction details, and check your budget balance history in real time."
  />
  <meta
    name="keywords"
    content="Budgets Page, Create Budget, Manage Budget, Financial Goals, Budget Tracker, Personal Finance, Budget Progress, Expense Management, Track Spending"
  />
  <meta name="robots" content="index, follow" />

  <link rel="canonical" href={canonicalUrl} />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Budgets - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    property="og:description"
    content="Track and manage your financial goals efficiently by creating multiple budgets, monitoring expenses, and tracking balance history to see your financial progress over time."
  />
  <meta property="og:image" content={`${originUrl}/images/Budgets.png`} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Budgets - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    name="twitter:description"
    content="Create and manage multiple budgets. Track financial goals, monitor spending, view transaction details, and see your budget balance history to manage your finances effectively."
  />
  <meta name="twitter:image" content={`${originUrl}/images/Budgets.png`} />
</Helmet>


      {" "}
      <div className={styles["Acc-info-container"]}>
        <h1 className={styles["Acc-heading"]}>Budgets</h1>
        <p className={styles["Acc-sub-text"]}>
          This page allows users to create and manage their financial goals
          efficiently through creating multiple budgets. Users can set specific
          budgets for different categories, view transaction details related to
          each budget, and track their progress in real time. user can easily
          access key financial details, including the total budget, available
          budget, and detailed transactions. Additionally, users can track the
          balance history for each budget, allowing them to see how their
          finances evolve over time. This comprehensive view helps users manage
          their budgets effectively and stay on top of their financial goals.
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
            <h1 className={styles["Add-acc-modal-heading"]}>Create a Budget</h1>

            <div className={styles["Add-acc-modaL-input-div"]}>
              <label className={styles["acc-modal-labels"]}>
                <h3 style={{ marginTop: "20px" }}>Budget Name :</h3>
              </label>
              <input
                type="text"
                id="budgetName"
                name="budgetName"
                className={styles["Add-acc-modal-input"]}
                placeholder="Budget Name"
                value={formData.budgetName}
                onChange={handleChange}
              ></input>
                {errors.budgetName && <small style={{color:"red",textAlign:"center"}} className="error">{errors.budgetName}</small>}

              <label className={styles["acc-modal-labels"]}>
                <h3 style={{ marginTop: "20px" }}>Total Budget :</h3>
              </label>
              <input
                type="number"
                id="totalBudget"
                name="totalBudget"
                className={styles["Add-acc-modal-input"]}
                placeholder="Amount"
                value={formData.totalBudget}
                onChange={handleChange}
              ></input>
                {errors.totalBudget && <small style={{color:"red",textAlign:"center"}}  className="error">{errors.totalBudget}</small>}

              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className={styles["modal-add-button"]}
              >
                {crbisLoading ? "loading..." : "ADD Budget"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className={styles["account-list"]}>
       {isLoading?<div><Lodinder></Lodinder></div>:(
        isError? <div className={styles["zero-length-acc-msg"]}>
                  <h1> unable to fetch Budgets, something wrong with the network, try refreshing. </h1>
                  </div>
      :

        !budgets.length ? (
          <div className={styles["zero-length-acc-msg"]}>
            <h1> You haven't created any Budgets yet. </h1>
          </div>
        ) : paginatedBudgets.length ? (
          paginatedBudgets.map((budget) => (
            <div key={budget._id} className={styles["account-li"]}>
              <div className={styles["account-li-inner"]}>
                <div className={styles["logo-money"]}>
                  <RiMoneyDollarCircleFill />|
                </div>
                <div>
                  <div key={budget._id} className="card">
                    <h3 style={{ wordBreak: "break-word" }}>
                      {budget.budgetName}
                    </h3>
                    <p>Total Budget: ${budget.totalBudget.toFixed(2)}</p>
                    <p>Balance left: ${budget.availableBudget.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/budgets/dash/${budget._id}`)}
                className={styles["view-acc-button"]}
              >
                <FaEye className={styles["eye-logo"]}></FaEye>{" "}
              </button>
            </div>
          ))
        ) : (
          <div className={styles["zero-length-acc-msg"]}>
            <h1> You have no such Budget. </h1>
          </div>
        ))}
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

export default Budgets;
