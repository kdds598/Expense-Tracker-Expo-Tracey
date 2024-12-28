import { AccountTransaction } from "../models/AccountTransaction.model.js";


// Function to get AccountTransaction by transactionId
export const getAccountTransactionbyId = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Validate if transactionId is provided
    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    // Find the AccountTransaction by its ObjectId
    const transaction = await AccountTransaction.findById(transactionId)
      // .populate('AccountId')       // Populate the referenced account
      // .populate('userObjectId')    // Populate user details if needed
      .exec();

    // If transaction is not found
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Return the transaction data
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

