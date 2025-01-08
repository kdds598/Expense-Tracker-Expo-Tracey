import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, sparse: true,unique: true },
  picture: String,
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Budget' }]
},
{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
