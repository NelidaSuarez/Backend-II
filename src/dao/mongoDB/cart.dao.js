import { cartModel } from "./models/cart.model.js";

const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

const addProductToCart = async (cid, pid) => {
  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  );
  if (!productInCart) {
    await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
  }

  const cartUpdate = await cartModel.findById(cid);
  return cartUpdate;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
};
