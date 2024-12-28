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
    }] ,
    
    uid:{type: String, required: true},
    AccountObjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },

  });
  
  // Create the BalanceHistory Model
  export const AccountBalHistory = mongoose.model('AccountBalanceHistory', balanceHistorySchema);
 