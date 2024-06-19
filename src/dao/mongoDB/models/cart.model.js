import mongoose from "mongoose";

const productCollection = "cart";

const productSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
});

export const productModel = mongoose.model(productCollection, productSchema);
