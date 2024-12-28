import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userObjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uid:{type: String, required: true},

    accountName: { type: String, required: true },
    availableBalance: { type: Number, default: 0,required:true },
    AccountTransactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AccountTransaction' }],
   
      balanceHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountBalanceHistory', // Reference to the BalanceHistory model
      },
    
}, { timestamps: true });

accountSchema.index({ uid: 1, accountName: 1 }, { unique: true });
  
export const Account = mongoose.model("Account", accountSchema);














// income: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Income', // Reference to the Income model
  // },
  // expense: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Expense', // Reference to the Income model
  //   },
    