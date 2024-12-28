import mongoose from "mongoose";

const balanceHistorySchema = new mongoose.Schema({
    balanceHistory: [{ // Renamed to avoid confusion
      balance: {
        type: Number,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }
    }],
    BudgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget', // Reference to the Account model
      required: true, // Optional: Make it required if every history must be linked to an account
    },
    uid:{type: String, required: true},

  });
  
  // Create the BalanceHistory Model
  export const BudgetBalHistory = mongoose.model('BudgetBalHistory', balanceHistorySchema);
 