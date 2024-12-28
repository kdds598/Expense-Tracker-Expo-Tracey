import mongoose from "mongoose";
const budgetSchema = new mongoose.Schema({
  userObjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uid:{type: String, required: true},
  budgetName: { type: String, required: true },


    totalBudget: { type: Number, required: true },
    availableBudget: { type: Number, required: true },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BudgetTransaction' }],
    balanceHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BudgetBalHistory', // Reference to the BalanceHistory model
      },
},{ timestamps: true });

budgetSchema.index({ uid: 1, budgetName: 1 }, { unique: true });

export const Budget = mongoose.model("Budget", budgetSchema);
