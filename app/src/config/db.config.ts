import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const mongoURI = process.env.DB_URI || "";

    if (!mongoURI) {
      throw new Error("MongoDB URI is not provided");
    }

    await mongoose.connect(mongoURI);

    isConnected = true;
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
