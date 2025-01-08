import { User } from "../models/User.model.js";
import { Account } from "../models/Account.model.js";
import { AccountBalHistory } from "../models/AccountBalHistory.model.js";
import { AccountTransaction } from "../models/AccountTransaction.model.js";
import mongoose from "mongoose";

export const createAccount = async (req, res) => {

    let {  uid, accountName, availableBalance } = req.body;


  function getFalsyVarNames(obj) {
  return Object.entries(obj)
    .filter(([key, value]) => !value) // Check if the value is falsy
    .map(([key]) => key)              // Extract the keys (variable names)
    .join(', ');                      // Join them into a string
  }

const falsyVars = getFalsyVarNames({ uid, accountName, availableBalance });
    
  
    availableBalance = parseInt(availableBalance);
    // Validate required fields
    if ( !uid || !accountName || availableBalance === undefined) {
        return res.status(400).json({ message: "All fields are required, "+falsyVars+" is not provided" });
    }
    if (availableBalance<1) {
        return res.status(400).json({ message: 'Account\'s balance can\'t be less than 1.' });
    }
  
    try {
         // Find user by uid
         const user = await User.findOne({ uid });
          
         if (!user) {
             return res.status(404).json({ message: 'User not found.' });
        }
  
        // Create a new account using objectid
        const newAccount = new Account({
            userObjectId:user._id,
            uid,
            accountName,
            availableBalance,
            AccountTransactions: [], // Initialize with an empty array
            balanceHistory: null, // Set to null or provide an ObjectId if available
        });
  
        // Save the account to the database
        const savedAccount = await newAccount.save();

        let balanceHistory = new AccountBalHistory({uid:uid,
                AccountObjectId:savedAccount._id
        })
    
    
        //bal history creation
    
          balanceHistory.balanceHistory.push({
            balance: availableBalance,
            timestamp: Date.now()
          });
          const bhob = await balanceHistory.save();

          savedAccount.balanceHistory = bhob._id;

          await savedAccount.save();

            //modification
          const newTransaction = new AccountTransaction({
            userObjectId:user._id,
            uid,
            AccountId:savedAccount._id,
            amount:availableBalance,
            type:'income',
            category:'Account creation',
            note:'Account creation'
          });
      
          const savedTransaction = await newTransaction.save();
          savedAccount.AccountTransactions.push(savedTransaction._id);
          await savedAccount.save();

          //////

        user.accounts = user.accounts || []; // Ensure the accounts array is initialized
        user.accounts.push(savedAccount._id); // Add the new account's ObjectId to the array
        
        await user.save(); // Save the updated user document

        // Respond with the created account
        // res.status(201).json({msg:"acc. created and ref added to user's account array and accbalhistory created",accountobject:savedAccount});
        console.log("accounted created and ref added to user's account array and accbalhistory created");
        
        res.status(201).json({message:"account created successfully",account:savedAccount});
    } catch (error) {
        console.error(error);

        if(error.code===11000){
            res.status(500).json({ message: `already have an account with name \"${accountName}\"`});
        }else{

        res.status(500).json({ message: 'Server error',error:error });
        }
    }
};






// del account 
export const deleteAccount =   async (req, res) => {
  const { accountId } = req.params;
  

  try {
      // 1. Find the account by its ID
      const account = await Account.findById(accountId);

      if (!account) {
          return res.status(404).json({ message: 'Account not found' });
      }
      
      let uid = account.uid;

      const user = await User.findOne({ uid });
          
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }
      




      // 2. Remove the account reference from the user's accounts array
      await User.updateOne(
          { _id: account.userObjectId },
          { $pull: { accounts: accountId} }
      );

      // 3. Delete all transactions associated with the account
      await AccountTransaction.deleteMany({ AccountId: accountId });


      await AccountBalHistory.deleteOne({ AccountObjectId:accountId });


      // 4. Delete the account itself
      const deletedAccount = await Account.findByIdAndDelete(accountId);

      

    //   res.status(200).json({ message: 'Account and its transactions deleted successfully' });
      res.status(200).json({ message: 'Account deleted successfully',deleteAccount:deletedAccount });
  } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Server error' ,error:error});
  }
};
