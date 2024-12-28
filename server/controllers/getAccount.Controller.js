import { Account } from "../models/Account.model.js";
import { User } from "../models/User.model.js";



export const getAccounts =  async (req, res) => {
    try {
      const { uid, sortField, sortOrder, searchText } = req.query;
      
      // Validate if uid is provided
      if (!uid) {
        return res.status(400).json({ message: 'UID is required' });
      }

      const user = await User.findOne({ uid });
          
     if (!user) {
             return res.status(404).json({ message: 'User not found.' });
    }

  
      // Define valid sort fields and their default orders
      const validSortFields = ['createdAt', 'updatedAt', 'availableBalance', 'accountName',  'transactionCount'];
      const validSortOrder = ['asc', 'desc'];
  
      const sortBy = validSortFields.includes(sortField) ? sortField : 'createdAt'; // Default to 'createdAt'
      const order = validSortOrder.includes(sortOrder?.toLowerCase())
              ? (sortOrder.toLowerCase() === 'desc' ? -1 : 1)
              : 1; // Default to ascending order
  
      // Find accounts by UID
      const accounts = await Account.find({ uid })
        // .populate('AccountTransactions')  // Populate the referenced transactions
        // .populate('balanceHistory')     //populate the referenced balanceHistory
        .exec();
  
      // Filter accounts based on searchText if provided
      const filteredAccounts = accounts.filter(account => {
        const lowerCaseSearchText = searchText ? searchText.toLowerCase() : '';
        return (
          account.accountName.toLowerCase().includes(lowerCaseSearchText) ||  // Search by account name
          account.uid.toLowerCase().includes(lowerCaseSearchText) ||        // Search by UID
          account.userObjectId.toString().includes(lowerCaseSearchText) ||  // Search by userObjectId
          account.availableBalance.toString().includes(lowerCaseSearchText) || // Search by available balance
          account._id.toString().includes(lowerCaseSearchText)  ||             // Search by account ID
          account.balanceHistory.toString().includes(lowerCaseSearchText)  // search by balance history
        );
      });
  
      // Sort filtered accounts
      const sortedAccounts = filteredAccounts.sort((a, b) => {
        const aValue = sortBy === 'transactionCount' ? a.AccountTransactions.length : a[sortBy];
        const bValue = sortBy === 'transactionCount' ? b.AccountTransactions.length : b[sortBy];
        return (order === 1 ? aValue - bValue : bValue - aValue);
      });
      
      // Return the sorted accounts
      res.status(200).json(sortedAccounts);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };




















