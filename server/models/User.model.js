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


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     uid: { type: String, required: true, unique: true },
//     name: String,
//     email: {
//       type: String,
//       sparse: true, // Allow multiple null/undefined emails
//       validate: {
//         validator: async function (value) {
//           if (value) {
//             try {
//               const existingUser = await this.constructor.findOne({ email: value });
//               if (existingUser && !existingUser._id.equals(this._id)) {
//                 return false; // Email already exists in another document
//               }
//             } catch (error) {
//               console.error("Error during email validation:", error);
//               return false;
//             }
//           }
//           return true; // No validation needed if email is null/undefined
//         },
//         message: "Email already exists",
//       },
//     },
//     picture: String,
//     accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
//     budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }],
//   },
//   { timestamps: true }
// );

// export const User = mongoose.model("User", userSchema);