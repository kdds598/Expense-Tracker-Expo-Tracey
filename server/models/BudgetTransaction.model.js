import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userObjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uid:{type: String, required: true},
  BudgetId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Budget' },
    
    amount: { type: Number, required: true },
    note: { type: String ,required:true},
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },{ timestamps: true }); // timestamp experimental


export const BudgetTransaction = mongoose.model("BudgetTransaction", transactionSchema);
