import React, { useState, useEffect } from "react";
import styles from "../Styles/AccountTxn2.module.css";
import Modal from "./Modal.jsx";
import validator from "validator";
import Searchbartxn from "./SearchTxnBar.jsx";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiWarning } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom";
import { useCreateTransactionMutation } from "../../Store/AccRTKQuries.js";
import {
  useGetAccountTransactionsQuery,
  useDeleteTransactionMutation,
} from "../../Store/AccRTKQuries.js";
import { AccTxnStyles } from "./Allstyles.jsx";
import Lodinder from "./Lodinder.jsx";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../Context/Context.jsx";

const Accountstxn = () => {
  const location = useLocation();
  const { accountId } = useParams();
  const [errors, setErrors] = useState({});

  const { uid } = location.state || {};
  const [sampleTransactions, setTransactions] = useState([]);
  const {idToken}= useAuth();
  

  const {
    data: AccountTransactions = [],
    isLoading: isatLoading,
    isError: isaterror,
  } = useGetAccountTransactionsQuery({
    uid,
    AccountId: accountId,
    token:idToken
  }, {
    skip: !accountId||!idToken, // Skip the request if no accountId is provided
  });

  useEffect(() => {
    if (AccountTransactions) {
      setTransactions(AccountTransactions);
    }
  }, [sampleTransactions, AccountTransactions]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [isAscending, setIsAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  // Filtering transactions based on search term
  const filteredTransactions = sampleTransactions.filter((txn) =>
    ["type", "category", "amount", "note", "date"].some((key) =>
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

  // const handletxndelete=(id)=>{

  //   setTransactions(prev => prev.filter(txn => txn._id !== id)); // Remove the transaction
  //   if (isExpanded === id) setIsExpanded(null); // Reset expansion if the deleted txn was expanded

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

    setErrors({}); 
    setFormData((f) => ({...f, amount: "", note: "", category: "Salary", type: "income",}));


  }
  const incomeCategories = [
    "Salary",
    "Freelancing",
    "Investments",
    "Rental Income",
    "Interest",
    "Gifts & Donations",
    "Business Income",
    "Refunds",
    "Bonuses",
    "Others",
    "Account creation",
  ];
  const expenseCategories = [
    "Food & Dining",
    "Transportation",
    "Housing",
    "Entertainment",
    "Shopping",
    "Health & Fitness",
    "Travel",
    "Education",
    "Bills & Subscriptions",
    "Personal Care",
    "Insurance",
    "Donations & Charity",
    "Others",
  ];

  //txn creation

  const [
    createTransaction,
    {
      data: acctxnResponse,
      isLoading: isacctxnsendLoading,
      isSuccess: isacctxnSuccess,
      isError: isacctxnError,
      error: acctxnerror,
    },
  ] = useCreateTransactionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
       const newErrors={};
          const { amount, note, category, type } = formData;
    
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
          if(Object.keys(newErrors).length>0){
            setErrors(newErrors);
            return;
          }
          setErrors({});
    

    if (
      (formData.type === "income" &&
        incomeCategories.includes(formData.category)) ||
      (formData.type === "expenditure" &&
        expenseCategories.includes(formData.category))
    ) {
      try {
        const response = await createTransaction({transaction:formData,token:idToken}, {
          skip: !idToken, // Skip the request if no accountId is provided
        }).unwrap();
        toast.success("Transaction created successfully!");

      } catch (er) {
        console.error("Error:", er);
        toast.error(er.data.message)
      }
      if (!isacctxnsendLoading) {
        setFormData((f) => ({
          ...f,
          amount: "",
          note: "",
          category: "Salary",
          type: "income",
        })); // Reset form
      }
    } else {
      toast.warning(
        `Invalid category: ${formData.category} for the selected type ${formData.type}`
      );
    }
    setModalOpen(false); // Close the modal
  };


  const [formData, setFormData] = useState({
    AccountId: accountId,
    uid: uid,
    amount: "",
    note: "",
    category: "Salary",
    type: "income",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Update category to the first item of the respective array when type changes
      if (name === "type") {
        updatedData.category =
          value === "income" ? incomeCategories[0] : expenseCategories[0];
      }

      return updatedData;
    });
  };

  // deleting  transaction
  const [
    deleteAcctransaction,
    {
      data: delResponse,
      isLoading: deltxnLoading,
      Error: deltxnerror,
      isError: deltxniserror,
      isSuccess: deltxnSuccess,
    },
  ] = useDeleteTransactionMutation();

  // const handleDeleteTransaction = async (transactionId) => {
  //   try {
  //     const response = await deleteAcctransaction(transactionId).unwrap();
  //     console.log('Transaction Deleted:', response);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }

  // }

  const handleConfirm = async (e) => {
    try {
      
      const response = await deleteAcctransaction({transactionId:checkfordelete.ittd,token:idToken},{          skip: !idToken, // Skip the request if no accountId is provided
      }).unwrap();

      toast.success("Transaction deleted successfully!");
    } catch (er) {
      console.error("Error:", er);
      toast.error(er.data.message)
    }

    toggleExpand({ a: null, b: null });

    closeModal();
  };

  ////////////////////
  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;



  return (
    <>
   <Helmet>
  <title>Account Transactions - Expo-Tracey | Budget Smarter, Spend Wiser</title>

  {/* Additional Tags */}
  {/* <meta name="author" content="Expo-Tracey Team" /> */}
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />

  {/* SEO Meta Tags */}
  <meta
    name="description"
    content="The Account Transactions page, easily view, create, delete, and manage your transactions. Track income, expenses, and balances to gain better control over your finances."
  />
  <meta
    name="keywords"
    content="Account Transactions, Manage Transactions, Financial Management, Track Finances, Track Expenses, Track Income, Sort Transactions, Search Transactions, Expense Tracker"
  />
  <meta name="robots" content="index, follow" />

  <link rel="canonical" href={canonicalUrl} />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Account Transactions - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    property="og:description"
    content="Manage your transactions effortlessly on the Account Transactions page. Create, view, delete, search, and sort transactions with full control over your finances."
  />
  <meta property="og:image" content={`${originUrl}/images/AccountTransactions.png`} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Account Transactions - Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    name="twitter:description"
    content="Keep track of all your transactions. Create new entries, delete old ones, and sort or search for specific transactions with ease."
  />
  <meta name="twitter:image" content={`${originUrl}/images/AccountTransactions.png`} />
</Helmet>









     <AccTxnStyles></AccTxnStyles>
      <div>
        <div className={styles["Acc-info-container"]}>
          <h1 className={styles["Acc-heading"]}>Transactions</h1>
          <p className={styles["Acc-sub-text"]}>
            On this Account Transactions page, user can view all their
            transaction details, create new transactions, or delete existing
            ones. This page allows users to manage their financial activities
            seamlessly, ensuring they can keep track of income, expenses, and
            balances easily.{" "}
          </p>
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
                      disabled={deltxnLoading}
                      style={{ marginLeft: "5px", background: "#ff3d36" }}
                      onClick={() => handleConfirm()}
                    >
                      {deltxnLoading ? "deleting..." : "Confirm"}
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
                        max="10000000"
                      />

                    </label>
                    {errors.amount && <small style={{color:"red",textAlign:"center"}} className="error">{errors.amount}</small>}

                    {/* Type */}
                    <label className="acc-modal-labels">
                      Type:
                      <select
                        className="Add-acc-modal-input"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="income">Income</option>
                        <option value="expenditure">Expenditure</option>
                      </select>
                    </label>
                    {/* Category */}
                    <label className="acc-modal-labels">
                      Category:
                      <select
                        className="Add-acc-modal-input"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {formData.type === "income"
                          ? incomeCategories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))
                          : expenseCategories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                      </select>
                    </label>
                    {/* Note */}
                    <label className="acc-modal-labels">
                      Note:
                      <textarea
                        className="Add-acc-modal-input"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        maxLength="150"
                        placeholder="Add a note (optional, min 2 and max 150 characters)"
                      ></textarea>
                    </label>
                    {errors.note && <small style={{color:"red",textAlign:"center"}} className="error">{errors.note}</small>}


                    {/* Submit */}
                    <div style={{ textAlign: "center" }}>
                      <button
                        type="submit"
                        style={{ marginRight: "5px" }}
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                        disabled={isacctxnsendLoading}
                      >
                        {isacctxnsendLoading ? "Loading..." : "Submit"}
                      </button>
                      <button
                        style={{ marginRight: "5px" }}
                        disabled={isacctxnsendLoading}
                        type="button"
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
                <option value="type">Type (Income/Expenditure)</option>
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
          {isatLoading ? <Lodinder></Lodinder>:(
             isaterror?<div className={styles["zero-length-acc-msg"]}>
                                         <h1> unable to fetch Account's transactions, something wrong with the network. </h1>
                                       </div>:

          (AccountTransactions.length<1)?
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
                    <p style={{ margin: "0px" }}>
                      Type:{" "}
                      <b
                        style={{
                          color: txn.type === "income" ? "green" : "red",
                        }}
                      >
                        {txn.type}
                      </b>
                    </p>
                  )}
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
                    // onClick={(e)=>handletxndelete(e,txn.uid)
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
         ) )}
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

export default Accountstxn;
