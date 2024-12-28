// AccountHeader.js
import React, { useState, useEffect } from "react";
import validator from "validator"
import styles from "../Styles/AccountHeader.module.css";
import { BalanceHistoryChart } from "./BalanceHistoryChart";
// import BarChartComponent from "./BalanaceHistoryBar";
import BalancePieChart from "./PieChartComponent";
import TransactionBarChart from "./txnBargraph";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import { useGetAccountByIdQuery } from "../../Store/AccRTKQuries.js";
import { useCreateTransactionMutation } from "../../Store/AccRTKQuries.js";
import { useGetAccountTransactionsQuery, useDeleteAccountMutation } from "../../Store/AccRTKQuries.js";
import { AccHeaderStyles } from "./Allstyles.jsx";
import Lodinder from "./Lodinder.jsx";
import { toast } from "react-toastify";
import{ FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx"; //ex



const AccountHeader = ({ uid, accountId ,idToken}) => {

 
  

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [account, setAccount] = useState(null);
  const [errors, setErrors] = useState({});
  const [isAccnameMatched, setisAccnameMached] = useState(true);

  const {
    data: acc,
    isLoading: isLoading,
    error: error,
  } = useGetAccountByIdQuery({accountId:accountId,token:idToken},
    {
    skip: !accountId||!idToken, // Skip the request if no accountId is provided
  }
);

  const {
    data: AccountTransactions = [],
    isLoading: isatLoading,
    isError: isaterror,
  } = useGetAccountTransactionsQuery({
    uid:uid,
    AccountId: accountId,
    token:idToken
  },{
    skip:!idToken
  }
);
  const [totaltransaction, setTT] = useState("");

  useEffect(() => {
    if (acc) {
      setAccount(acc);
      setTT(acc.AccountTransactions.length);
    }


  }, [acc, AccountTransactions]);

//excel 
 const downloadExcel = (data, fileName) => {
    if (!data || data.length === 0) {
      toast.warning("No data available for download");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
    toast.success(`${fileName} downloaded has started!`);
  };






  // Render the component

  // Update windowWidth when the window is resized
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    // Add event listener for resizing the window
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const navig = useNavigate();

  const sortedArray = [...AccountTransactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );


  //modal

  const [checkfordelete, setfordelete] = useState(null);

  const toggledel = (val) => setfordelete(val);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {setModalOpen(false);      
    setisAccnameMached(true);  
    setInputValue(""); 
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

  const [
    createTransaction,
    {
      data: acctxnData,
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
          skip:!idToken, // Skip the request if no accountId is provided
        }).unwrap();
        toast.success("Transaction created Successfully!");
      } catch (er) {
        console.error("Error:", er.message);
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
    setisAccnameMached(true);

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

  ///// Account deletion modal

  const [
    deleteAccount,
    {
      data: delacc,
      isLoading: delaccloading,
      isError: delacciserror,
      error: delaccerror,
      isSuccess: delaccissuxes,
    },
  ] = useDeleteAccountMutation();

  const [inputValue, setInputValue] = useState("");

  const handleConfirm = async () => {
      setisAccnameMached(true);
    if (inputValue === account.accountName) {
      try {
        const response = await deleteAccount({accountId:accountId,token:idToken}, {
          skip: !idToken, // Skip the request if no accountId is provided
        }).unwrap();

        toast.success("Accounted deleted successfully!");
        navig("/accounts");
      } catch (er) {
        toast.error(er.data.message);
      }
      // onConfirm();
      closeModal();
    } else {
      setisAccnameMached(false);
  }
  };


  if (
    isLoading ||
    isatLoading ||
    isacctxnsendLoading ||
    !account ||
    !sortedArray ||
    !AccountTransactions
  ) {
    return <div style={{height:"80vh",
      justifyContent: "center",
      alignContent: "center"}}><Lodinder></Lodinder></div>;
  }




  return (
    <>

           <AccHeaderStyles></AccHeaderStyles>

      <div id={styles.mostouterdiv}>
        <div className={styles.header}>
          <div className={styles.accountInfo}>
            <h1 className={styles.accountName}>
              Account Name : {account.accountName}
            </h1>
            <p className={styles.balance}>
              Available Balance: ${account.availableBalance}
            </p>
            <p className={styles.balance}>
              total transaction: {totaltransaction}
            </p>
          </div>

          <div className={styles["button-div-acchead"]}>
            <button
              title="view detailed transaction"
              onClick={() => {
                toggledel(true);

                openModal();
              }}
              className={styles.deleteButton}
            ></button>
            <button
              onClick={() => {
                toggledel(false);
                openModal();
              }}
              className={styles.addTransaction}
            ></button>
            <button
              onClick={() =>
                navig("/accounts/Acc-txns/" + accountId, { state: { uid },idToken:idToken })
              }
              className={styles.viewTransaction}
            ></button>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {checkfordelete ? 
          
          (
            <div className="modal-overlay">
              <div className="Add-acc-modal modal-content">
                <div style={{ textAlign: "center" }}>
                  <CiWarning size={80} color="red"></CiWarning>
                </div>
                <h2 style={{ color: "red" }} className="Add-acc-modal-heading">
                  Confirm Account Deletion
                </h2>

                <p>
                  Are you sure you want to delete the account{" "}
                  <q><strong>{account.accountName}</strong></q>?
                </p>
                <p>Please type the account name to confirm! </p>

                <input
                  className="Add-acc-modal-input"
                  type="text"
                  placeholder="Enter account name"
                  value={inputValue}
                  
                  onChange={(e) => setInputValue(e.target.value)}
                />
                {!isAccnameMatched &&<small style={{color:"red",textAlign:"center"}}>Account name doesn't match</small>}
                <div style={{ textAlign: "center" }} className="modal-actions">
                  <button
                    disabled={delaccloading}
                    style={{ marginRight: "5px", background: "#a8a4a4" }}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ marginLeft: "5px", background: "#ff3d36" }}
                    onClick={handleConfirm}
                    disabled={delaccloading}
                  >
                    {delaccloading ? "deleting..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-overlay">
              <div className="Add-acc-modal modal-content">
                <h2 className="Add-acc-modal-heading">Add Transaction</h2>
                <form>
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
                      {/* <option value="">Select Category</option> */}
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
                      placeholder="Add a note (optional,min 2 and max 150 characters)"
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
                      {isacctxnsendLoading ? "creating..." : "Submit"}
                    </button>
                    <button
                      style={{ marginRight: "5px" }}
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

        <div className={styles["lvl-1-dash"]}>
          {sortedArray.length === 0 ? (
            <div>No transactions found</div>
          ) : (
            <div className={styles["last-transaction"]}>
              <h3 className={styles["last-transaction-h2"]}>
                {windowWidth > 515 ? "Last transaction" : "Last TXN"}
              </h3>

              {totaltransaction - 1 >= 0 ? (
                <div className={styles["outer-div"]}>
                  <div className={styles["division-1"]}>
                    <h3 className={styles["last-transaction-h3"]}>
                      Amount : {sortedArray[totaltransaction - 1]?.amount}
                    </h3>
                    <h3 className={styles["last-transaction-h3"]}>
                      Type : {sortedArray[totaltransaction - 1]?.type}
                    </h3>
                    <h3 className={styles["last-transaction-h3"]}>
                      Category : {sortedArray[totaltransaction - 1]?.category}
                    </h3>
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles["division-2"]}>
                    <h3 
                    // style={{maxWidth:"calc(50ch)"}}
                      className={styles["last-transaction-h3"]}>
                      Note : {sortedArray[totaltransaction - 1]?.note}
                      {/* Managing accounts efficiently is essential. A system with features like transaction tracking, balance visualization, and robust validation ensures user convenience and financial control. */}
                    </h3>
                    {/* {const date = new Date("2024-12-17T16:10:09.938Z")
    const formattedDate = date.toLocaleDateString("en-GB")
    } */}
                    <h3 className={styles["last-transaction-h3"]}>
                      Date :{" "}
                      {new Date(sortedArray[0].date).toLocaleDateString(
                        "en-GB"
                      )}
                    </h3>
                  </div>
                </div>
              ) : (
                <div>No transactions found</div>
              )}
            </div>
          )}
          <BalancePieChart
            account={true}
            sampleTransactions={sortedArray}
          ></BalancePieChart>
        </div>

          {/* Download Buttons */}
       <div style={{ marginBottom: "20px" }}>
        <div style={{display:"flex",justifyContent:"space-between",gap:"20px",margin:"20px 20px"}}>
          <p>Click this button to download your account's transactions data : </p>
           <button
             onClick={() => downloadExcel(AccountTransactions, "Account Transactions")}
             className={styles.downloadButton}
           >
             {/* Download txns */}
             <FaDownload />

            </button>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",gap:"20px",margin:"20px"}}>
            <p>Click this button to download your account's balance History data : </p>

             <button
               onClick={() => downloadExcel(account.balanceHistory.balanceHistory, "Balance History")}
               className={styles.downloadButton}
             >
              <FaDownload />

              {/* Download Bal History */}
           </button>
           </div>
          </div>

        <div className={styles["bal-history"]}>
          <BalanceHistoryChart data={account.balanceHistory} />
        </div>

        <div className={styles["txn-bar"]}>
          <TransactionBarChart transactions={sortedArray}></TransactionBarChart>
        </div>
      </div>
    </>
  );
};

export default AccountHeader;



// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import styles from "../Styles/AccountHeader.module.css";
// import { BalanceHistoryChart } from "./BalanceHistoryChart";
// import Modal from "./Modal";
// import { useNavigate } from "react-router-dom";
// import { useGetAccountByIdQuery, useGetAccountTransactionsQuery } from "../../Store/AccRTKQuries.js";
// import Lodinder from "./Lodinder.jsx";
// import { toast } from "react-toastify";

// const AccountHeader = ({ uid, accountId, idToken }) => {
//   const [account, setAccount] = useState(null);
//   const {
//     data: acc,
//     isLoading: isLoading,
//   } = useGetAccountByIdQuery({ accountId, token: idToken }, { skip: !accountId || !idToken });

//   const {
//     data: AccountTransactions = [],
//     isLoading: isatLoading,
//   } = useGetAccountTransactionsQuery({ uid, AccountId: accountId, token: idToken }, { skip: !idToken });

//   useEffect(() => {
//     if (acc) setAccount(acc);
//   }, [acc]);

//   const downloadExcel = (data, fileName) => {
//     if (!data || data.length === 0) {
//       toast.warning("No data available for download");
//       return;
//     }
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, `${fileName}.xlsx`);
//     toast.success(`${fileName} downloaded successfully!`);
//   };

//   if (isLoading || isatLoading || !account || !AccountTransactions) {
//     return (
//       <div style={{ height: "80vh", justifyContent: "center", alignContent: "center" }}>
//         <Lodinder />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div id={styles.mostouterdiv}>
//         <div className={styles.header}>
//           <div className={styles.accountInfo}>
//             <h1 className={styles.accountName}>Account Name: {account.accountName}</h1>
//             <p className={styles.balance}>Available Balance: ${account.availableBalance}</p>
//             <p className={styles.balance}>Total Transactions: {AccountTransactions.length}</p>
//           </div>

//           <div className={styles["button-div-acchead"]}>
//             {/* Add Transaction/Other Buttons */}
//           </div>
//         </div>

//         {/* Download Buttons */}
//         <div style={{ marginBottom: "20px" }}>
//           <button
//             onClick={() => downloadExcel(AccountTransactions, "AccountTransactions")}
//             className={styles.downloadButton}
//           >
//             Download Transactions
//           </button>
//           <button
//             onClick={() => downloadExcel(account.balanceHistory, "BalanceHistory")}
//             className={styles.downloadButton}
//           >
//             Download Balance History
//           </button>
//         </div>

//         {/* Balance History Chart */}
//         <div>
//           <BalanceHistoryChart data={account.balanceHistory} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AccountHeader;
