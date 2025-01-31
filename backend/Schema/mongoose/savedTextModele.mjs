import mongoose from "mongoose";

const TextRegistration = new mongoose.Schema({
  access: {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  text: {
    type: mongoose.Schema.Types.Array,
    required: true,
  },
  savebutton: {
    type: mongoose.Schema.Types.Boolean,
  },
  questions: {
    type: mongoose.Schema.Types.String,
  },
  answers: {
    type: mongoose.Schema.Types.String,
  },
});

export const TextModel = mongoose.model("texts", TextRegistration);
