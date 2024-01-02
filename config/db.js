import mongoose from "mongoose";
import dotenv from "dotenv";

// initialize configuration
dotenv.config();
const uri = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    // console.log('MongoDB Connected... 🎯');
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    // console.log(`MongoDB Connected: ${conn.connection.host} 🎯`);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;