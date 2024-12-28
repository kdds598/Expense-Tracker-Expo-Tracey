import { Budget } from "../models/Budget.model.js";
// Controller function to update budgetName in Budget
export const updateBudgetName = async (req, res) => {
  try {
    const { budgetId } = req.params; // Get the budget ID from request parameters
    const { budgetName } = req.body;  // Get the budgetName from the request body

    // Validate budgetName
    if (!budgetName) {
      return res.status(400).json({ message: 'budgetName is required' });
    }

    // Find the budget by ID and update the budgetName
    const updatedBudget = await Budget.findByIdAndUpdate(
      budgetId,
      { budgetName },
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Send the updated budget as the response
    res.status(200).json({ message: ' budget updated',ob:updatedBudget });
  } catch (error) {
    console.error('Error updating budget name:', error);
    res.status(500).json({ message: 'Internal server error',error:error });
  }
};
