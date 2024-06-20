import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect("mongodb+srv://NelidaSuarez:eccMHyNfJVMvIAxF@kaiju.jomdzru.mongodb.net/clase15");
    console.log("MongoDB conneted");
  } catch (error) {
    console.log(`$(error)`);
  }
};
