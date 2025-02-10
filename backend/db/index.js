import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://harneet:harneet@cluster0.z7e9l.mongodb.net/taskify"
    );
  } catch (error) {
    console.log("MONGODB connection failed");
  }
};

export default connectDB;
