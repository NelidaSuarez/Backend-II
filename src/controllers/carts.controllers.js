import cartServices from "../services/cart.services.js";
import { request, response } from "express";
import ticketServices from "../services/ticket.services.js";

//crea carrito
const createCart = async (req = request, res = response) => {
  try {
    const cart = await cartServices.createCart();
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};
//busca carrito por id
const getCartById = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.getCartById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

//Agrega el prod al carrito
const addProductToCart = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const cartUpdate = await cartServices.addProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

//elimina el pro del carrito
const deleteProductToCart = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const cartUpdate = await cartServices.deleteProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

//actualiza quantity prod en el cart
const updateQuantityProductInCart = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartUpdate = await cartServices.updateQuantityProductInCart(
      cid,
      pid,
      Number(quantity)
    );

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

// elimina todos los prod del carrito
const clearProductsToCart = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.clearProductsToCart(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

//crea ticket
const purchaseCart = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.getCartById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", msg: "Carrito no encontrado" });
    // console.log("ACAAAAAAAAAA") no es
    const total = await cartServices.purchaseCart(cid);
    // console.log("ACAAAAAAAAAAOOOOOOOOOO", req.user) tampoco
    const ticket = await ticketServices.createTicket(req.user.email, total);
    // console.log("ACAAAAAAAAAAGGGGGGGGGG") aparecio al final!
    res.status(200).json({ status: "success", ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

export default {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart,
  purchaseCart,
};
