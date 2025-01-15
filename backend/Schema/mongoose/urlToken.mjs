import mongoose from "mongoose";

const urlToken = new mongoose.Schema({
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

urlToken.index({ Token: 1 });
export const URLTokensModel = mongoose.model("urlTokens", urlToken);
