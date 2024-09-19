import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = `mongodb+srv://${process.env.MONGODBACCT}:${process.env.MONGODBACCESS}@cluster0.kmyksfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDB = async () => {
  try {
    const connected = await mongoose.connect(URL);
    console.log("Connected to DataBase");
  } catch (err) {
    console.log("not Connecting", err);
  }
};

export default connectToDB;
