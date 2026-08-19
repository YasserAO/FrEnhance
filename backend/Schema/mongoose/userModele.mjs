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
    provider: {
      type: String,
      enum: ["local", "google", "local-google"],
      default: "local",
      required: true,
    },
  },
  provider: {
    type: String,
    default: "local",
  },
  googleId: {
    type: String,
    required: function () {
      return this.provider == "google" || this.provider == ["local-google"];
    },
  },
  password: {
    type: String,
    required: function () {
      return this.provider == "local";
    },
  },
  pfp: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: function () {
      return this.provider == "google";
    },
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
    verificationCooldown: {
      type: Date,
    },
  },
  coins: {
    quantity: {
      type: Number,
    },
    dailyLimit: {
      type: Number,
    },
    lastReset: {
      type: Date,
    },
  },
  editText: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    text: {
      type: Array,
    },
    savebutton: {
      type: Boolean,
    },
  },
});

export const UserModel = mongoose.model("User", UserRegistration);
