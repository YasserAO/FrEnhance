import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL =
  process.env.MONGO_URI ||
  process.env.MONGO_DOCKER_URI ||
  "mongodb://127.0.0.1:27017/frenhance";

const connectToDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to DataBase at:", URL);
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

export default connectToDB;

