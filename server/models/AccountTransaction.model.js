import mongoose from "mongoose";

const incomeCategories = ['Salary', 'Freelancing', 'Investments', 'Rental Income', 'Interest', 'Gifts & Donations', 'Business Income', 'Refunds', 'Bonuses', 'Others','Account creation'];
const expenseCategories = ['Food & Dining', 'Transportation', 'Housing', 'Entertainment', 'Shopping', 'Health & Fitness', 'Travel', 'Education', 'Bills & Subscriptions', 'Personal Care', 'Insurance', 'Donations & Charity', 'Others'];


const transactionSchema = new mongoose.Schema({
    userObjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uid:{type: String, required: true},
    AccountId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' },


    
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expenditure'], required: true },
    category: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          // If the type is 'income', ensure the category is one of the income categories
          if (this.type === 'income') {
            return incomeCategories.includes(value);
          }
          // If the type is 'expense', ensure the category is one of the expense categories
          if (this.type === 'expenditure') {
            return expenseCategories.includes(value);
          }
          return false;
        },
        message: props => `${props.value} is not a valid category for ${this.type}.`
      }
    },
    note: { type: String },
    date: { type: Date, default: Date.now },
  },{ timestamps: true }); // timestamp experimental

  

export const AccountTransaction = mongoose.model("AccountTransaction", transactionSchema);
