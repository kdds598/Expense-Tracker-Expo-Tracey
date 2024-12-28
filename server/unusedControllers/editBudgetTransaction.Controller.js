import { BudgetTransaction } from '../models/BudgetTransaction.model.js';


// Controller function to update note or category
export const updateBudgetTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params; // Get the transaction ID from request parameters
    const { note, category } = req.body;  // Get the note and category from the request body

    // Build an update object with the provided fields
    let updateData = {};
    if (note) updateData.note = note;
    if (category) updateData.category = category;

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No fields provided to update' });
    }

    // Find the transaction by ID and update only the provided fields
    const updatedTransaction = await BudgetTransaction.findByIdAndUpdate(
      transactionId,
      { $set: updateData }, // Use $set to update the specific fields
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Send the updated transaction as the response
    res.status(200).json({msg:'txn updated succesfully',ob:updatedTransaction});
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

