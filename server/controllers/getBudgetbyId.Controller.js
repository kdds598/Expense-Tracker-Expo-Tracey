import { Budget } from "../models/Budget.model.js";


// Function to get budget by budgetId
export const getBudgetbyId =  async (req, res) => {
  try {
    const { budgetId } = req.params;

    // Validate if budgetId is provided
    if (!budgetId) {
      return res.status(400).json({ message: 'Budget ID is required' });
    }

    // Find the budget by its ObjectId
    const budget = await Budget.findById(budgetId)
      .populate('transactions')  // Populate transactions
      .populate('balanceHistory') // Populate balance history
      .exec();

    // If budget is not found
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Return the budget data
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};