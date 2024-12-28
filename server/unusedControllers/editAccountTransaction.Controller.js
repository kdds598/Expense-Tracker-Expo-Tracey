import { AccountTransaction } from "../models/AccountTransaction.model.js";

// Controller function to update note or category in AccountTransaction
export const updateAccountTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params; // Get the transaction ID from the request parameters
    const { note, category } = req.body;  // Get the note and category from the request body

    // Find the transaction by ID first
    const transaction = await AccountTransaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update note if provided
    if (note) {
      transaction.note = note;
    }

    // Update category if provided
    if (category) {
      const incomeCategories = ['Salary', 'Freelancing', 'Investments', 'Rental Income', 'Interest', 'Gifts & Donations', 'Business Income', 'Refunds', 'Bonuses', 'Others', 'Account creation'];
      const expenseCategories = ['Food & Dining', 'Transportation', 'Housing', 'Entertainment', 'Shopping', 'Health & Fitness', 'Travel', 'Education', 'Bills & Subscriptions', 'Personal Care', 'Insurance', 'Donations & Charity', 'Others'];

      // Validate the category based on the transaction type
      if (transaction.type === 'income' && !incomeCategories.includes(category)) {
        return res.status(400).json({ message: ' Invalid category for income type' });
      } 
      if (transaction.type === 'expenditure' && !expenseCategories.includes(category)) {
        return res.status(400).json({ message: ' Invalid category for expenditure type' });
      }

      // If valid, update the category
      transaction.category = category;
    }

    // Save the updated transaction
    const updatedTransaction = await transaction.save();

    // Send the updated transaction as the response
    res.status(200).json({ message: ' acc txn updated',ob:updatedTransaction });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
