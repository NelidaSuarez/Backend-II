import mongoose from "mongoose";

const ticketCollection = "ticket";

const ticketSchema = new mongoose.Schema({
  products: [{
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now() },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  }],
});
ticketSchema.pre("find", function (){
  this.populate("products.product")
})

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
