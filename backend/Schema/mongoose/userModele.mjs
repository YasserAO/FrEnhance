import mongoose from "mongoose";

const UserRegistration = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pfp: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verification: {
    verificationToken: {
      type: Number,
    },
    verificationURL: {
      type: String,
    },
    expiresAT: {
      type: Date,
    },
  },
  coins: {
    quantity: {
      type: Number,
    },
    lastReset: {
      type: Date,
    },
  },
  editText: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    savebutton: {
      type: Boolean,
    },
  },
});

export const UserModel = mongoose.model("User", UserRegistration);
