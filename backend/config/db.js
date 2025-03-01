import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connection successfull!!");
  } catch (error) {
    console.log("❌ MongoDB connection unsuccessfull!!");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
