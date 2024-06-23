import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect("");
    console.log("MongoDB conneted");
  } catch (error) {
    console.log(`$(error)`);
  }
};
