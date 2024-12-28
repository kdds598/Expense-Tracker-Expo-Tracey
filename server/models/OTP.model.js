import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m' // Document will automatically delete after 10 minutes
  }
});

export const OTP = mongoose.model("OTP", OTPSchema);

//untracked