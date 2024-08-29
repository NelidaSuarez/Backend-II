import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: {
    type: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, quantity: Number }], //hace ref a la collection de prod
    default:[],
  },
});
cartSchema.pre("find", function (){
  this.populate("products.product")
})

export const cartModel = mongoose.model(cartCollection, cartSchema);
