import mongoose from "mongoose";

const urlPassToken = new mongoose.Schema({
  Token: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: String,
    required: true,
  },
  expiresAT: {
    type: Date,
    required: true,
  },
});

urlPassToken.index({ Token: 1 });
export const URLPassToken = mongoose.model("urlPassToken", urlPassToken);
