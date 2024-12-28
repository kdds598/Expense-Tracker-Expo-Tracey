import { User } from "../models/User.model.js";
import { Budget } from "../models/Budget.model.js";
import { BudgetBalHistory } from "../models/BudgetBalHistory.js";
import { BudgetTransaction } from "../models/BudgetTransaction.model.js";


export const createBudgetTransaction =  async (req, res) => {
    console.log(req.body);

    let { BudgetId, amount, note, category, uid } = req.body;
    
  function getFalsyVarNames(obj) {
    return Object.entries(obj)
      .filter(([key, value]) => !value) // Check if the value is falsy
      .map(([key]) => key)              // Extract the keys (variable names)
      .join(', ');                      // Join them into a string
    }
  
  const falsyVars = getFalsyVarNames({ BudgetId, amount, note, category, uid });

    if ( !uid || !BudgetId || !amount || !note || !category  ) {
        return res.status(400).json({ message: 'All fields are required,'+falsyVars+' is not provided' });
    }
    if (amount<1) {
      return res.status(400).json({ message: 'amount should be greater than 0' });
    }
    
    try {

    amount = Number(amount);
    // Find user by uid
      const user = await User.findOne({ uid });
          
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const avlbudget = await Budget.findById(BudgetId);
      if(!avlbudget){
        return res.status(404).json({message:"invalid Budget id"});
      }

      if(avlbudget.availableBudget-amount<0){

        return res.status(400).json({message:"can't spend more than available budget"});
      
      }

  
      // Step 1: Create a new transaction
      const newTransaction = new BudgetTransaction({
        userObjectId:user._id,
        uid,
        BudgetId,
        amount,
        category,
        note
      });
  
      const savedTransaction = await newTransaction.save();
  
      // Step 2: Get the budget and update its balance
      // console.log(savedTransaction);
      
      let updatedBalance = avlbudget.availableBudget - amount;



      
      
  
      // Update the account's balance and add the transaction ID to AccountTransactions
      avlbudget.availableBudget = updatedBalance;
      avlbudget.transactions.push(savedTransaction._id);
      await avlbudget.save();
  
      // Step 3: Update the balance history for the account
      let balanceHistory = await BudgetBalHistory.findOne({ BudgetId: BudgetId });
      if(!balanceHistory){
        balanceHistory = new AccountBalHistory({uid:uid,
            BudgetId:BudgetId
        })

      }



      balanceHistory.balanceHistory.push({
        balance: updatedBalance,
        timestamp: Date.now()
      });
      await balanceHistory.save();
      
  
      // Respond with the created transaction and updated balance

      // res.status(201).json({
      //   message: 'Transaction created, account balance and history updated successfully',
      //   transaction: savedTransaction
      // });
      res.status(201).json({
        message: 'Transaction created successfully',
        transaction: savedTransaction
      });
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({
        message: 'Failed to create transaction',
        error: error.message
      });
    }
};



  //del budgettransaction
  // DELETE method to remove a transaction and update balance history
  export const deleteBudgetTransaction =  async (req, res) => {
    console.log(req);
    
    try {
      const { transactionId } = req.params;

     
      

  
      // Find the transaction to delete
      const transaction = await BudgetTransaction.findById(transactionId);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      // console.log(transaction);
      
      // Get the account associated with the transaction
      const avlbudget = await Budget.findById(transaction.BudgetId);
      if (!avlbudget) {
        return res.status(404).json({ message: 'Budget not found' });
      }
  
      // Remove the transaction ID from the account's AccountTransactions
      avlbudget.transactions.pull(transactionId);
      await avlbudget.save();
  
      // Remove the transaction
      await BudgetTransaction.findByIdAndDelete(transactionId);
  
      // Get the current balance history for the account
      const balanceHistory = await BudgetBalHistory.findOne({ BudgetId: avlbudget._id });
  
      // Rebuild the balance history
      const updatedBalanceHistory = [];
      
      let currentBalance = avlbudget.totalBudget;
      updatedBalanceHistory.push({ balance: currentBalance, timestamp: balanceHistory.balanceHistory[0].timestamp });

  
      // Start with the initial balance (you might want to fetch the initial balance if needed)
      // updatedBalanceHistory.push({ balance: currentBalance, timestamp: balanceHistory.balanceHistory[0].timestamp });
  
      // Recalculate balances based on existing transactions
      const transactions = await BudgetTransaction.find({ BudgetId: avlbudget._id }).sort({ date: 1 });
  
      // Traverse through transactions and calculate balance
      for (const txn of transactions) {
       
          currentBalance -= txn.amount;
        
        updatedBalanceHistory.push({ balance: currentBalance, timestamp: txn.date });
      }
      avlbudget.availableBudget = currentBalance;

      await avlbudget.save();
  
      // Clear current balance history and update with the new calculated history
      balanceHistory.balanceHistory = updatedBalanceHistory;
      await balanceHistory.save();
  
      // res.status(200).json({ message: 'Transaction deleted and balance history updated' });
      res.status(200).json({ message: 'Transaction deleted successfully!' ,deletedTransaction:transaction });
    } catch (error) {

      console.error('Error deleting transaction:', error);
      res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
    }
  };
  
  
