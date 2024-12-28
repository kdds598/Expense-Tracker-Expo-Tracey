import { Account } from "../models/Account.model.js";

// Function to get account by accountId
// router.get('/account/:accountId',
export const getAccountbyId = async (req, res) => {
  try {
    const { accountId } = req.params;

    // Validate if accountId is provided
    if (!accountId) {
      return res.status(400).json({ message: 'Account ID is required' });
    }
    
    // Find the account by its ObjectId
    const account = await Account.findById(accountId)
      .populate('AccountTransactions')  // Populate transactions
      .populate('balanceHistory')       // Populate balance history
      .exec();

    // If account is not found
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Return the account data
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

