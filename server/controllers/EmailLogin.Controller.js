import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { OTP } from '../models/OTP.model.js';
import admin from '../firebase.js';

export const EmailLoginsendOTP = async (req, res) => {
  const { email } = req.body;
  
  // Validate input
  if (!email) {
    return res.status(400).send({ message: 'All fields are required.', verified: false, already: false });
  }

  try {
    // Check if user exists
    const user = await admin.auth().getUserByEmail(email);

    if (user) {
      console.log("User exists");
      await admin.auth().updateUser(user.uid, { emailVerified: true });
      return res.status(409).send({ message: 'User already exists, please Signin', verified: true, already: true });
    }
  } catch (error) {
    // Log error but do not throw for user existence check
    console.log("User not found, proceeding with OTP generation.");

  }

  try {
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate OTP as a 6-digit random number
    const salt = await bcrypt.genSalt(10);
    const encryptedOTP = await bcrypt.hash(otp, salt);

    // Save OTP to database
    const otpDocument = new OTP({
      email,
      otp: encryptedOTP,
      expiresAt: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
    });
    await otpDocument.save();

    console.log("OTP saved:", otpDocument);

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Replace with your email
        pass: process.env.PASSWORD, // Replace with your app password
      },
    });
   


    // Email options
    const mailOptions = {
      from: 'expo.tracey@gmail.com',
      to: email,
      subject: 'Your OTP Code for Expo-tracey Login',
      text: `Your OTP code is ${otp}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: 'OTP sent to your email.', sent: true, already: false });
  } catch (error) {
    console.error("Error during OTP generation or email sending:", error);
    res.status(500).send({ message: 'Failed to send OTP.', sent: false, already: false });
  }
};



export const EmailLoginverifyOTP = async (req, res) => {
  const { email, otp } = req.body;
console.log(req.body);

  // Validate input
  if (!email || !otp) {
    return res.status(400).send({ message: 'All fields are required.', verified: false, already: false });
  }

  try {
    // Find OTP in database
    const otpDocument = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpDocument || otpDocument.expiresAt < Date.now()) {
      return res.status(400).send({ message: 'OTP expired or invalid.', verified: false, already: false });
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(otp, otpDocument.otp);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid OTP.', verified: false, already: false });
    }
    else{
      console.log("otp matched");
      
    }


    // Clean up OTP

    await OTP.deleteOne({ email });

    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
      if(user){
      console.log("User exists in Firebase.");
      return res.status(409).send({ message: 'User already exists.', verified: true, already: true });
      }

    } catch (error) {

      if (error.errorInfo.code === 'auth/user-not-found') {
     
        console.log("proceed to verify otp");
      }
        

    }



    res.status(200).send({ message: 'Email verified successfully.', verified: true, already: false });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).send({ message: 'Internal server error.', verified: false, already: false });
  }
};