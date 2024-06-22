import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: {
    type: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, quantity: Number }], //hace ref a la collection de prod
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
