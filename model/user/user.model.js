import mongoose from "mongoose";

const userScheam = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      // index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      // index: true,
    },

    password: {
      type: String,
      required: true,
      // select: false,
    },
    
    avatar: {
      type: String,
      required: true,
    },

    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userScheam);
