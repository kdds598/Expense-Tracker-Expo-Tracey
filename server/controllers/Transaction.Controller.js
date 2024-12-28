// POST method to create a transaction, update account balance, and update balance history
import { Account } from "../models/Account.model.js";
import { AccountTransaction } from "../models/AccountTransaction.model.js";
import { User } from "../models/User.model.js";
import { AccountBalHistory } from "../models/AccountBalHistory.model.js";


const incomeCategories = ['Salary', 'Freelancing', 'Investments', 'Rental Income', 'Interest', 'Gifts & Donations', 'Business Income', 'Refunds', 'Bonuses', 'Others','Account creation'];
const expenseCategories = ['Food & Dining', 'Transportation', 'Housing', 'Entertainment', 'Shopping', 'Health & Fitness', 'Travel', 'Education', 'Bills & Subscriptions', 'Personal Care', 'Insurance', 'Donations & Charity', 'Others'];



//// create transaction
export const createTransaction =  async (req, res) => {
    // console.log(req.body);
    let { AccountId, amount, note, category, type, uid } = req.body;

    function getFalsyVarNames(obj) {
      return Object.entries(obj)
        .filter(([key, value]) => !value) // Check if the value is falsy
        .map(([key]) => key)              // Extract the keys (variable names)
        .join(', ');                      // Join them into a string
      }
    
    const falsyVars = getFalsyVarNames({ AccountId, amount, note, category, type, uid });
        


    if ( !uid || !AccountId || !amount ||!note||!category||!type ) {
        return res.status(400).json({ message: 'All fields are required, '+falsyVars+' is not provided' });  
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a valid number, and should be greater than zero' });
    }


    if(type!=="income" && type!=="expenditure"){
      return res.status(400).json({ message: `invalid transaction type, ${type} is not a valid transaction type!`});
    }
    if (type === "income" && !incomeCategories.includes(category)) {
      return res.status(400).json({ message: `${category} is not a valid income category.` });
    }
    if (type === "expenditure" && !expenseCategories.includes(category)) {
      return res.status(400).json({ message: `${category} is not a valid expenditure category.` });
    }

    amount = Number(amount);
    
    try {

      const user = await User.findOne({ uid });
          
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      const account = await Account.findById(AccountId);
      if(!account){
        return res.status(404).json({msg:"invalid account id"});
      }

      //calculate updated balance
      const updatedBalance = type === 'income' 
      ? account.availableBalance + amount 
      : account.availableBalance - amount;

      if ( updatedBalance < 0) {
        return res.status(400).json({ 
          message: `Insufficient balance. Available balance: your account balance : ${account.availableBalance}.` 
        });
      }

  
      // Step 1: Create a new transaction
      const newTransaction = new AccountTransaction({
        userObjectId:user._id,
        uid,
        AccountId,
        amount,
        type,
        category,
        note
      });
  
      const savedTransaction = await newTransaction.save();
  
      // Step 2: Get the account and update its balance
      // console.log(AccountId);
      
     


      // console.log(account);
      // console.log('before ',account.availableBalance);
      // console.log('type:',typeof account.availableBalance);

      // console.log('after ',account.availableBalance+amount);
      // console.log('type:',typeof (account.availableBalance+amount)      );

      

  
      // Update the account's balance and add the transaction ID to AccountTransactions
      account.availableBalance = updatedBalance;
      account.AccountTransactions.push(savedTransaction._id);
      await account.save();
  
      // Step 3: Update the balance history for the account
      let balanceHistory = await AccountBalHistory.findOne({ AccountObjectId: AccountId });
      if(!balanceHistory){
        balanceHistory = new AccountBalHistory({uid:uid,
            AccountObjectId:AccountId
        })

      }



      balanceHistory.balanceHistory.push({
        balance: updatedBalance,
        timestamp: Date.now()
      });
      await balanceHistory.save();
  
      // Respond with the created transaction and updated balance
      res.status(201).json({
        message: 'Transaction created successfully',
        transaction: savedTransaction
      });
      // res.status(201).json({
      //   message: 'Transaction created successfully',
      //   transaction: savedTransaction
      // });
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({
        message: 'Failed to create transaction',
        error: error.message
      });
    }
  };










//del  transaction
  // DELETE method to remove a transaction and update balance history
  export const deleteTransaction =  async (req, res) => {
    try {
      const { transactionId } = req.params;
  
      // Find the transaction to delete
      const transaction = await AccountTransaction.findById(transactionId);
      console.log(transaction);
      
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      // Get the account associated with the transaction
      const account = await Account.findById(transaction.AccountId);
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }


       // Calculate the resulting balance if the transaction is deleted
    let resultingBalance = 
    transaction.type === 'income' 
      ? account.availableBalance - transaction.amount 
      : account.availableBalance + transaction.amount;

console.log(resultingBalance);

  // Prevent deletion if resulting balance is negative
  if (Number(resultingBalance) < 0) {
    return res.status(400).json({
      message: `Transaction cannot be deleted as it would result in a negative balance. Available balance: ${account.availableBalance}.`
    });
  }






  
      // Remove the transaction ID from the account's AccountTransactions
      account.AccountTransactions.pull(transactionId);
      await account.save();
  
      // Remove the transaction
      await AccountTransaction.findByIdAndDelete(transactionId);
  
      // Get the current balance history for the account
      const balanceHistory = await AccountBalHistory.findOne({ AccountObjectId: account._id });
  
      // Rebuild the balance history
      const updatedBalanceHistory = [];
      
      let currentBalance = 0;
  
      // Start with the initial balance (you might want to fetch the initial balance if needed)
      // updatedBalanceHistory.push({ balance: currentBalance, timestamp: balanceHistory.balanceHistory[0].timestamp });
  
      // Recalculate balances based on existing transactions
      const transactions = await AccountTransaction.find({ AccountId: account._id }).sort({ date: 1 });
  
      // Traverse through transactions and calculate balance
      for (const txn of transactions) {
        if (txn.type === 'income') {
          currentBalance += txn.amount;
        } else if (txn.type === 'expenditure') {
          currentBalance -= txn.amount;
        }
        updatedBalanceHistory.push({ balance: currentBalance, timestamp: txn.date });
      }
  
      account.availableBalance = currentBalance;
      account.save();
      // Clear current balance history and update with the new calculated history
      balanceHistory.balanceHistory = updatedBalanceHistory;
      await balanceHistory.save();
  
      res.status(200).json({ message: 'Transaction deleted and balance history updated',deleteTransaction:transaction });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
    }
  };
  
  
