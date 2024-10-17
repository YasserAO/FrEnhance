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
  editText: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
  },
});

export const UserModel = mongoose.model("User", UserRegistration);
