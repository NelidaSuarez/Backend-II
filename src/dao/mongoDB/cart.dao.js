import { cartModel } from "./models/cart.model.js";

//muestra todo
const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

//busca por id
const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

//crea
const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

//actualiza
const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

//elimina el carrito
const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

//agrega el prod del cart
const addProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);

  const productInCart = cart.products.find((element) => element.product == pid);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save(); // Guardamos los cambios realizado en la base de datos de mongo
  return cart;
};

//elimina el prod (todos con ese id ) del cart
const deleteProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);
  cart.products = cart.products.filter((element) => element.product != pid);
  await cart.save();
  return cart;
};

//actualiza la cantidad del prod en el cart
const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const cart = await cartModel.findById(cid);
  const product = cart.products.find((element) => element.product == pid);
  product.quantity = quantity;

  await cart.save();
  return cart;
};

//elimina los prod del carrito (lo vacia)
const clearProductsToCart = async (cid) => {
  const cart = await cartModel.findById(cid);
  cart.products = [];
  await cart.save();
  return cart;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart,
};
