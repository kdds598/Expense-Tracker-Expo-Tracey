import express from "express";
import { createAccount } from "../controllers/Account.Controller.js";
import { User } from "../models/User.model.js";
import { createTransaction, deleteTransaction } from "../controllers/transaction.Controller.js";
import { createBudget } from "../controllers/Budget.Controller.js";
import { createBudgetTransaction, deleteBudgetTransaction } from "../controllers/BudgetTransaction.Controller.js";
import { deleteAccount } from "../controllers/Account.Controller.js";
import { deleteBudget } from "../controllers/Budget.Controller.js";
import { getAccounts } from "../controllers/getAccount.Controller.js";
import { getBudgets } from "../controllers/getBudget.Controller.js";
import { getAccountbyId } from "../controllers/getAccountbyId.Controller.js";
import { getBudgetbyId } from "../controllers/getBudgetbyId.Controller.js";
import { getBudgetTransactionbyId } from "../unusedControllers/getBudgetTransactionbyId.Controller.js";
import { getAccountTransactionbyId } from "../unusedControllers/getAccountTransactionbyId.Controller.js";
import { getAccountTransaction } from "../controllers/getAccountTransaction.Controller.js";
import { getBudgetTransaction } from "../controllers/getBudgetTransaction.Controller.js";
import { updateBudgetTransaction } from "../unusedControllers/editBudgetTransaction.Controller.js";
import { updateAccountTransaction } from "../unusedControllers/editAccountTransaction.Controller.js";
import { updateAccountName } from "../unusedControllers/updateAccountName.Controller.js";
import { updateBudgetName } from "../unusedControllers/updateBudgetName.Controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { createUser } from "../controllers/googleLogin.Controller.js";
import { EmailLoginsendOTP, EmailLoginverifyOTP } from "../controllers/EmailLogin.Controller.js";
import { getUserByUid } from "../controllers/UserInfo.Controller.js";




const router = express.Router();


// account creation

router.post('/account',verifyToken,createAccount); //tested
router.post('/transaction',verifyToken,createTransaction);//tested
router.post('/budget',verifyToken,createBudget);   //tested
router.post('/Btransaction',verifyToken, createBudgetTransaction);//tested

router.delete('/Btransaction/:transactionId',verifyToken,deleteBudgetTransaction)//tested
router.delete('/transaction/:transactionId',verifyToken, deleteTransaction);//tested
router.delete('/account/:accountId',verifyToken,deleteAccount);   //tested
router.delete('/budget/:budgetId',verifyToken,deleteBudget);    //tested

router.get('/accounts',verifyToken, getAccounts);// tested
router.get('/budgets',verifyToken,getBudgets);//tested
router.get('/account/:accountId',verifyToken,getAccountbyId); //tested
router.get('/budget/:budgetId',verifyToken,getBudgetbyId); //tested

router.get('/account-transactions',verifyToken,getAccountTransaction); //tested
router.get('/budget-transactions',verifyToken, getBudgetTransaction);//tested

router.get('/user-info/:uid',verifyToken,getUserByUid);



router.get('/budgetTransaction/:transactionId',getBudgetTransactionbyId);
router.get('/Accounttransaction/:transactionId',getAccountTransactionbyId);

// PUT/PATCH request to update a budget transaction's note or category
router.patch('/budgettransactions/:transactionId', updateBudgetTransaction);
router.patch('/accounttransactions/:transactionId', updateAccountTransaction);
router.patch('/accounts/:accountId', updateAccountName);
// PATCH request to update a budget's name
router.patch('/budgets/:budgetId', updateBudgetName);




router.post("/protected", verifyToken, createUser);


//untracked

router.post("/send-otp",EmailLoginsendOTP);
router.post("/verify-otp",EmailLoginverifyOTP);
  



export default router;