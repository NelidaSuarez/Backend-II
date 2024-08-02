import mongoose from "mongoose";
import env from "./env.config.js";


export const connectMongoDB = async () => {
  try {
    mongoose.connect(env.MONGO_URL);
    console.log("MongoDB conneted 🎇");
  } catch (error) {
    console.log("Error connecting to that",error);
  }
};
