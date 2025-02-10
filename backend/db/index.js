import mongoose from "mongoose";
import "dotenv/config";

const DB_NAME = "taskify";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
  } catch (error) {
    console.log("MONGODB connection failed");
  }
};

export default connectDB;
