import mongoose from "mongoose";
import { config } from "dotenv";

config();

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    // if (conn) {
    //   // console.log("Connected to MongoDB");
    // } else {
    //   console.log("Failed to connect to MongoDB");
    // }
  } catch (error) {
    console.log(error);
  }
};

export { dbConnect };
