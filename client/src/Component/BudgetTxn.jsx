import React, { useState, useEffect } from "react";
import styles from "../Styles/AccountTxn2.module.css";
// import Searchbartxn from "./searchbar.jsx";
import Modal from "./Modal.jsx";
import Searchbartxn from "./SearchTxnBar.jsx";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiWarning } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom";
import validator from "validator";
import { Helmet } from "react-helmet-async";
import {
  useGetBudgetTransactionsQuery,
  useCreateBTransactionMutation,
  useDeleteBTransactionMutation,
} from "../../Store/AccRTKQuries.js";
import { BtxnStyles } from "./Allstyles.jsx";
import Lodinder from "./Lodinder.jsx";
import { toast } from "react-toastify";
import { useAuth } from "../Context/Context.jsx";

const Budgettxn = () => {
  const location = useLocation();
  const { budgetId } = useParams();
    const [errors, setErrors] = useState({});
  

  const { uid } = location.state || {};
const {idToken}=useAuth();
  const [sampleTransactions, setTransactions] = useState([]);

  const {
    data: budgetTransactions = [],
    isLoading: isbtLoading,
    isError: isbterror,
  } = useGetBudgetTransactionsQuery({
    uid,
    BudgetId: budgetId,
    token:idToken
  },
  {skip:!budgetId||!idToken}
);

  useEffect(() => {
    if (budgetTransactions) {
      setTransactions(budgetTransactions);
    }
  }, [sampleTransactions, budgetTransactions]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [isAscending, setIsAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  // Filtering transactions based on search term
  const filteredTransactions = sampleTransactions.filter((txn) =>
    ["category", "amount", "note", "date"].some((key) =>
      txn[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sorting logic
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    // Convert date objects to numbers for comparison
    if (sortField === "date") {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }

    // Sort by ascending or descending
    if (isAscending) {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleToggleOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  //mainatain expanding
  const [isExpanded, setIsExpanded] = useState(null);

  const toggleExpand = (id) => {
    if (isExpanded === id) {
      setIsExpanded(null);
      return;
    }

    setIsExpanded(id);
  };

  // const handletxndelete=(uid)=>{
  //   setTransactions(prev => prev.filter(txn => txn.uid !== uid)); // Remove the transaction
  //   if (isExpanded === uid) setIsExpanded(null); // Reset expansion if the deleted txn was expanded

  // }

  //modal

  const [checkfordelete, setfordelete] = useState({
    chkdflag: null,
    ittd: null,
  });

  const toggledel = (val) => setfordelete({ chkdflag: val.a, ittd: val.b });

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {setModalOpen(false);
  
    setErrors({}); // Reset errors
    setFormData({ BudgetId: budgetId, uid: uid, amount: "", category: "", note: "" });
  }
  // create b txn
  const [
    createBTransaction,
    {
      data: cbtxresponse,
      isLoading: isBtxnsendLoading,
      isSuccess: isBtxnSuccess,
      isError: isBtxnError,
      error: Btxnerror,
    },
  ] = useCreateBTransactionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      const newErrors = {};
        const { amount, note, category } = formData;
    
         if (!note || !validator.isLength(note, { min: 2, max: 150 })) {
                newErrors.note = "Note must be between 2 and 150 characters.";
              }
            
              // Validate amount
              if (!amount || !validator.isNumeric(amount.toString())) {
                newErrors.amount = "Amount must be a valid number.";
              } 
              else if (Number(amount) < 1 || Number(amount) > 10000000) {
                newErrors.amount = "Amount must be between 1 and 10,000,000.";
              }
              if (!category || !validator.isLength(category, { min: 2, max: 30 })) {
                newErrors.category = "Category must be between 2 and 30 characters.";
              }         
              
              if(Object.keys(newErrors).length>0){
                setErrors(newErrors);
                return;
              }
              setErrors({});

    try {
      const response = await createBTransaction({transaction:formData,token:idToken}).unwrap();
      toast.success("Transaction created successfully!");

    } catch (err) {
      console.error("Error:", err);
      toast.error(err.data.message)
    }
    if (!isBtxnsendLoading) {
      setFormData((f) => ({
        ...f,
        amount: "",
        note: "",
        category: "",
      })); // Reset form
    }
    setModalOpen(false); // Close the modal
  };

  const [formData, setFormData] = useState({
    BudgetId: budgetId,
    uid: uid,
    amount: "",
    category: "",
    note: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [
    deleteBTransaction,
    {
      isLoading: isBtxnDelLoading,
      isSuccess: isBtxnDelSuccess,
      isError: isBtxnDelError,
      error: BtxnDelerror,
    },
  ] = useDeleteBTransactionMutation();

  const handleConfirm = async (e) => {

    try {
      const response = await deleteBTransaction({transactionId:checkfordelete.ittd,token:idToken}).unwrap();

      toast.success("Transaction deleted successfully!");
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.data.message)

    }

    toggleExpand({ a: null, b: null });

    closeModal();
  };
  /////////////////////
  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;

  return (
    <>

<Helmet>
  <title>Budget Transactions - Expo-Tracey | Budget Smarter, Spend Wiser</title>

  {/* Additional Tags */}
  <meta name="author" content="Expo-Tracey Team" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />

  {/* SEO Meta Tags */}
  <meta
    name="description"
    content="View, create, delete and manage budget transactions on the Budget Transactions page. Track your expenses, manage spending, and stay on top of your budget goals with ease."
  />
  <meta
    name="keywords"
    content="Budget Transactions, Manage Transactions, Track Expenses, Budget Tracker, Budget Goals, Create Transaction, Delete Transaction, Financial Management"
  />
  <meta name="robots" content="index, follow" />

  <link rel="canonical" href={canonicalUrl} />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Budget Transactions - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    property="og:description"
    content="Manage your budget expenses effectively. View, create, delete, and track budget transactions to stay on top of your financial goals."
  />
  <meta property="og:image" content={`${originUrl}/images/BudgetTransactionsPage.png`} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Budget Transactions - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    name="twitter:description"
    content="Track and manage your budget transactions. View details, create new entries, and monitor your spending to stay on track with your financial goals."
  />
  <meta name="twitter:image" content={`${originUrl}/images/BudgetTransactionsPage.png`} />
</Helmet>



      
    <BtxnStyles></BtxnStyles>
      <div>
        <div className={styles["Acc-info-container"]}>
          <h1 className={styles["Acc-heading"]}>Transactions</h1>
          <p className={styles["Acc-sub-text"]}>
            On this Budget Transactions page, user can view, add, or remove
            transactions related to their budgets. This page helps users track
            their spending and progress towards budget goals, offering a clear
            overview of all budget-related transactions and their impact on
            available funds.
          </p>{" "}
        </div>

        <div className={styles["mid-sec-account-info-list"]}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Searchbartxn value={searchTerm} onChange={handleSearchChange} />
            <button
              style={{ color: "black" }}
              onClick={(e) => {
                toggledel({ a: false, b: null });

                openModal();
              }}
              className={styles["add-acc-button"]}
            ></button>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {checkfordelete.chkdflag ? (
              <div className="modal-overlay">
                <div className="Add-acc-modal modal-content">
                  <div style={{ textAlign: "center" }}>
                    <CiWarning size={80} color="red"></CiWarning>
                  </div>
                  <h2
                    style={{ color: "red" }}
                    className="Add-acc-modal-heading"
                  >
                    Confirm Transaction Deletion
                  </h2>

                  <p>
                    Are you sure you want to delete this transaction{" "}
                    <strong></strong>?
                  </p>

                  <div
                    style={{ textAlign: "center" }}
                    className="modal-actions"
                  >
                    <button
                      style={{ marginRight: "5px", background: "#a8a4a4" }}
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isBtxnDelLoading}
                      style={{ marginLeft: "5px", background: "#ff3d36" }}
                      onClick={() => handleConfirm()}
                    >
                      {isBtxnDelLoading ? "deleting..." : "Confirm"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="modal-overlay">
                <div className="Add-acc-modal modal-content">
                  <h2 className="Add-acc-modal-heading">Add Transaction</h2>
                  <form
                  //  onSubmit={handleSubmit}
                  >
                    {/* Amount */}
                    <label className="acc-modal-labels">
                      Amount:
                      <input
                        className="Add-acc-modal-input"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="1000000"
                      />
                    </label>
                    {errors.amount && <small style={{color:"red",textAlign:"center"}} className="error">{errors.amount}</small>}

                    {/* category */}
                    <label className="acc-modal-labels">
                      Category:
                      <input
                        className="Add-acc-modal-input"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        maxLength="40"
                        placeholder=" Category (max 40 characters)"
                      />
                    </label>
                    {errors.category && <small style={{color:"red",textAlign:"center"}} className="error">{errors.category}</small>}

                    {/* Note */}
                    <label className="acc-modal-labels">
                      Note:
                      <textarea
                        className="Add-acc-modal-input"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        maxLength="200"
                        placeholder="Add a note (optional, max 200 characters)"
                      ></textarea>
                    </label>
                    {errors.note && <small style={{color:"red",textAlign:"center"}} className="error">{errors.note}</small>}

                    {/* Submit */}
                    <div style={{ textAlign: "center" }}>
                      <button
                        type="submit"
                        style={{ marginRight: "5px" }}
                        disabled={isBtxnsendLoading}
                        onClick={(e) => {
                          handleSubmit(e);
                          // setModalOpen(false); // Close the modal
                        }}
                      >
                        {isBtxnsendLoading ? "Loading..." : "Submit"}
                      </button>
                      <button
                        style={{ marginRight: "5px" }}
                        type="button"
                        disabled={isBtxnsendLoading}
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
       
          </Modal>

          <div className={styles["sort-controls"]}>
            <div className={styles["inner-ppp"]}>
              <p style={{ margin: "0px", alignSelf: "center" }}> Sort By:</p>
              <select
                className={styles.select}
                onChange={handleSortFieldChange}
                value={sortField}
              >
                <option value="amount">Amount</option>
                <option value="date">Date</option>
                {/* <option value="type">Type (Income/Expenditure)</option> */}
              </select>
            </div>
            <div className={styles["inner-ppp"]}>
              <p style={{ margin: "0px", alignSelf: "center" }}> Order By:</p>

              <button className={styles.buttonAsc} onClick={handleToggleOrder}>
                {isAscending ? "Asc" : "Desc"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles["transaction-list"]}>

            {isbtLoading ? <Lodinder/>: (

           isbterror?<div className={styles["zero-length-acc-msg"]}>
                             <h1> unable to fetch Budget's transactions, something wrong with the network. </h1>
                           </div>:

            (budgetTransactions.length<1)?
             <div className={styles["zero-length-msg"]}>
                        <h1 style={{textAlign:"center"}}> You haven't created any transaction yet. </h1>
                        </div>
             :


          paginatedTransactions.length > 0 ? (

            paginatedTransactions.map((txn) => (
              <div
                key={txn._id}
                className={styles["transaction-item"]}
                onClick={() => {
                  toggleExpand(txn._id);
                }}
                style={{ transition: "all 0.3s ease", display: "flex" }}
              >
                <div>
                  <h3
                    style={{
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      margin: "0px",
                    }}
                  >
                    {txn.category}
                  </h3>

                  <p style={{ margin: "0px" }}>Amount: ${txn.amount}</p>

                  {isExpanded === txn._id && (
                    <p style={{ margin: "0px" }}>Note: {txn.note}</p>
                  )}
                  {isExpanded === txn._id && (
                    <p style={{ margin: "0px" }}>
                      Date: {new Date(txn.date).toDateString()}
                    </p>
                  )}
                </div>
                {
                  <button
                    onClick={(e) => {
                      toggledel({ a: true, b: txn._id });

                      openModal();

                      e.stopPropagation();
                    }}
                    style={{
                      alignSelf: isExpanded === txn._id ? "start" : "center",
                      border: "none",
                      background: "white",
                    }}
                  >
                    <RiDeleteBin6Fill size={26} color="red" />
                  </button>
                }
              </div>
            ))
          ) : (
            <div className={styles["zero-length-msg"]}>
              <h1 style={{textAlign:"center"}}>No such Transactions Found</h1>
              </div>
          ))}
        </div>

        <div className={styles["pagination"]}>
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
      </div>
    </>
  );
};

export default Budgettxn;
