import express from "express";
import mongoose from "mongoose";
import admin from "./firebase.js"; // Ensure the correct file extension
import {User} from "./models/User.model.js"; // Ensure the correct file extension
import cors from 'cors';

//models
import { Account } from "./models/Account.model.js";
import { AccountTransaction } from "./models/AccountTransaction.model.js";
import router from "./Routes/Router.js";
import dotenv from 'dotenv';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());  
app.use(express.urlencoded({extended:false}));       
app.use(cors()); 

app.use('/api',router);

const __dirname = path.resolve();
// console.log(__dirname);





if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"))
  );
}

app.use(express.static(path.join(__dirname, '../client', 'public')));





// POST method to create a transaction, update account balance, and update balance history
console.log(process.env.PORT);
console.log(process.env.DBURL);



mongoose.connect(process.env.DBURL)
.then(()=>console.log("db connected")
)
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});











////////////////////////////////////// auth /////////////////////////////////////////////////////////////
// async function verifyToken(req, res, next) {
//   const idToken = req.headers.authorization;

//   if (!idToken) {
//     return res.status(401).send("Unauthorized");
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     return res.status(401).send("Unauthorized");
//   }
// }

// app.post("/api/protected", verifyToken, async (req, res) => {
//   const { uid, name, email, picture } = req.user;

//   let user = await User.findOne({ uid });

//   if (!user) {
//     user = new User({ uid, name, email, picture });
//     await user.save();
//   }

//   res.send(user);
// });


////////////////////////////////////////////////////////////