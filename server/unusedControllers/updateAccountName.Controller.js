import { Account } from "../models/Account.model.js";
// Controller function to update accountName in Account
export const updateAccountName = async (req, res) => {
  try {
    const { accountId } = req.params; // Get the account ID from request parameters
    const { accountName } = req.body;  // Get the accountName from the request body

    // Validate accountName
    if (!accountName) {
      return res.status(400).json({ message: 'accountName is required' });
    }

    // Find the account by ID and update the accountName
    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      { accountName },
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Send the updated account as the response
    res.status(200).json({ message: ' accname updated',ob:updatedAccount });
  } catch (error) {
    console.error('Error updating account name:', error);
    res.status(500).json({ message: 'Internal server error',error:error });
  }
};
