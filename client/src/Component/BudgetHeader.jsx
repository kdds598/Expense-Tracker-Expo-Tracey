import React, { useState, useEffect } from "react";
import styles from "../Styles/AccountHeader.module.css";
import { BalanceHistoryChart } from "./BalanceHistoryChart";
import BalancePieChart from "./PieChartComponent";
import TransactionBarChart from "./txnBargraph";
import Modal from "./Modal";
import validator from "validator";  
import { useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import Lodinder from "./Lodinder";
import {
  useCreateBTransactionMutation,
  useDeleteBudgetMutation,
  useGetBudgetByIdQuery,
  useGetBudgetTransactionsQuery,
} from "../../Store/AccRTKQuries";
import { BHeaderStyles } from "./Allstyles";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

const BudgetHeader = ({ uid, budgetId ,idToken}) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [budget, setBudget] = useState(null);
  const [errors, setErrors] = useState({});
    const [isBNameMatched, setisBNameMatched] = useState(true);

  const {
    data: budgetData, // The fetched data
    isLoading: isLoading,
    error: error,
  } = useGetBudgetByIdQuery({budgetId:budgetId,token:idToken}, {
    skip: !budgetId||!idToken, // Skip the request if no accountId is provided
  });

  const {
    data: budgetTransactions = [],
    isLoading: isbtLoading,
    isError: isbterror,
  } = useGetBudgetTransactionsQuery({
    uid,
    BudgetId: budgetId,
    token:idToken
  },{skip:!budgetId||!idToken}
);


  const [totaltransaction, setTT] = useState("");
  // Update `account` state only when `acc` changes
  useEffect(() => {

    if (budgetData) {

      setBudget(budgetData);
      setTT(budgetData.transactions.length);
    }
    if (budgetTransactions) {

      setTT(budgetTransactions.length);
    }
  }, [budgetData, budgetTransactions]);
  // Update windowWidth when the window is resized
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Add event listener for resizing the window
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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







  const navigate = useNavigate();

  const sortedArray = [...budgetTransactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
 
  const [checkfordelete, setfordelete] = useState(null);

  const toggledel = (val) => setfordelete(val);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () =>{ setModalOpen(false);
  setisBNameMatched(true);
  setInputValue("");
  setErrors({});
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

    } catch (er) {
      console.error("Error:", er);
      toast.error(er.data.message);
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
    setisBNameMatched(true);
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

  /////deletion modal
  const [
    deleteBudget,
    {
      data: delb,
      isLoading: delbloading,
      isError: delbiserror,
      error: delberror,
      isSuccess: delbissuxes,
    },
  ] = useDeleteBudgetMutation();


  const [inputValue, setInputValue] = useState("");

  const handleConfirm = async () => {
    setisBNameMatched(true);
    if (inputValue === budget.budgetName) {
      try {
        const response = await deleteBudget({budgetId:budgetId,token:idToken}
          
        ).unwrap();

        toast.success("budget deleted successfully!");
        navigate("/budgets");
      } catch (er) {
        console.error("Error:", er);
        toast.error(er.data.message);

      }
      closeModal();
    } else {
      setisBNameMatched(false);
    }
  };


  if (
    isLoading ||
    isbtLoading ||
    isBtxnsendLoading ||
    !budget ||
    !sortedArray ||
    !budgetTransactions
  ) {
return <div style={{height:"80vh",
      justifyContent: "center",
      alignContent: "center"}}><Lodinder></Lodinder></div>;  }
  
  ////////////////////
  return (
    <>
     <BHeaderStyles></BHeaderStyles>
      <div id={styles.mostouterdiv}>
        <div className={styles.header}>
          <div className={styles.accountInfo}>
            <h1 className={styles.accountName}>
              Budget Name : {budget.budgetName}
            </h1>
            <p className={styles.balance}>
              Total Budget: ${budget.totalBudget}
            </p>
            <p className={styles.balance}>
              Available Budget: ${budget.availableBudget}
            </p>
            <p className={styles.balance}>
              total transaction: {totaltransaction}
            </p>
          </div>

          <div className={styles["button-div-acchead"]}>
            <button
              id="delbudgetbum"
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
                navigate("/budgets/Budget-txns/" + budgetId, { state: { uid } })
              }
              className={styles.viewTransaction}
            ></button>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {checkfordelete ? (
            <div className="modal-overlay">
              <div className="Add-acc-modal modal-content">
                <div style={{ textAlign: "center" }}>
                  <CiWarning size={80} color="red"></CiWarning>
                </div>
                <h2 style={{ color: "red" }} className="Add-acc-modal-heading">
                  Confirm Budget Deletion
                </h2>

                <p>
                  Are you sure you want to delete the Budget{" "}
                  <q>
                    <strong>{budget.budgetName}</strong>
                  </q>
                  ?
                </p>
                <p>Please type the Budget name to confirm!</p>

                <input
                  className="Add-acc-modal-input"
                  type="text"
                  placeholder="Enter budget name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                {!isBNameMatched &&<small style={{color:"red",textAlign:"center"}}>Budget name doesn't match</small>}

                <div style={{ textAlign: "center" }} className="modal-actions">
                  <button
                    style={{ marginRight: "5px", background: "#a8a4a4" }}
                    disabled={delbloading}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ marginLeft: "5px", background: "#ff3d36" }}
                    onClick={handleConfirm}
                    disabled={delbloading}
                  >
                    {delbloading ? "deleting..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-overlay">
              <div className="Add-acc-modal modal-content">
                <h2 className="Add-acc-modal-heading">Add Transaction</h2>
                <form
                // onSubmit={handleSubmit}
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

                  {/* category */}
                  <label className="acc-modal-labels">
                    Category:
                    <input
                      className="Add-acc-modal-input"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      maxLength="30"
                      placeholder=" Category (max 30 characters)"
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
                      maxLength="150"
                      placeholder="Add a note (optional, max 150 characters)"
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
                      disabled={isBtxnsendLoading}
                    >
                      {isBtxnsendLoading ? "creating..." : "Submit"}
                    </button>
                    <button
                      style={{ marginLeft: "5px" }}
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
          <div className={styles["last-transaction"]}>
            <h3 className={styles["last-transaction-h2"]}>
              {windowWidth > 515 ? "Last transaction" : "Last TXN"}
            </h3>
            {sortedArray.length > 0 && totaltransaction - 1 >= 0 ? (
              <div className={styles["outer-div"]}>
                <div className={styles["division-1"]}>
                  <h3 className={styles["last-transaction-h3"]}>
                    Amount : ${sortedArray[totaltransaction - 1].amount}
                  </h3>
                  {/* <h3 className={styles['last-transaction-h3']}>Type : {sampleTransactions[0].type}</h3> */}
                  <h3 className={styles["last-transaction-h3"]}>
                    Category : {sortedArray[totaltransaction - 1].category}
                  </h3>
                </div>
                <div className={styles.line}></div>
                <div className={styles["division-2"]}>
                  <h3 className={styles["last-transaction-h3"]}>
                    Note : {sortedArray[totaltransaction - 1].note}
                  </h3>
                  <h3 className={styles["last-transaction-h3"]}>
                    Date :{" "}
                    {new Date(
                      sortedArray[totaltransaction - 1].date
                    ).toLocaleDateString("en-GB")}
                  </h3>
                </div>
              </div>
            ) : (
              <div className={styles["zero-length-acc-msg"]}>NO txn yet</div>
            )}
          </div>

          <BalancePieChart
            account={false}
            // sampleTransactions={sortedArray}
            totalBudget={budget.totalBudget}
            availableBudget={budget.availableBudget}
          ></BalancePieChart>
        </div>

         <div style={{ marginBottom: "20px" }}>
                <div style={{display:"flex",justifyContent:"space-between",gap:"20px",margin:"20px 20px"}}>
                  <p>Click this button to download your Budget's transactions data : </p>
                   <button
                     onClick={() => downloadExcel(budgetTransactions, "Budget Transactions")}
                     className={styles.downloadButton}
                   >
                     {/* Download txns */}
                     <FaDownload />
        
                    </button>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",gap:"20px",margin:"20px"}}>
                    <p>Click this button to download your Budget's balance History data : </p>
        
                     <button
                       onClick={() => downloadExcel(budget.balanceHistory.balanceHistory, "Balance History")}
                       className={styles.downloadButton}
                     >
                      <FaDownload />
        
                      {/* Download Bal History */}
                   </button>
                   </div>
                  </div>

        <div className={styles["bal-history"]}>
          <BalanceHistoryChart data={budget.balanceHistory} />
        </div>


        <div className={styles["txn-bar"]}>
          <TransactionBarChart transactions={sortedArray}></TransactionBarChart>
        </div>
      </div>
    </>
  );
};

export default BudgetHeader;
