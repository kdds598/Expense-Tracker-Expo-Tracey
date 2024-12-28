import { BudgetTransaction } from "../models/BudgetTransaction.model.js";

// Function to get BudgetTransaction by transactionId
export const getBudgetTransactionbyId = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Validate if transactionId is provided
    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    // Find the BudgetTransaction by its ObjectId
    const transaction = await BudgetTransaction.findById(transactionId)
      // .populate('userObjectId')    // Populate the User details if needed
            // .populate('BudgetId')        // Populate the referenced Budget

      .exec();

    // If transaction is not found
    if (!transaction) {
      return res.status(404).json({ message: 'Budget Transaction not found' });
    }

    // Return the transaction data
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

