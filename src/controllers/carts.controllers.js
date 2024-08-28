import cartServices from "../services/cart.services.js";

//crea carrito 
const createCart =  async (req, res) => {
    try {
      const cart = await cartServices.createCart();
      res.status(201).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  };
//busca carrito por id
  const getCartById = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartDao.getById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
  
      res.status(200).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  };

  //Agrega el prod al carrito 
  const addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;  
      const cartUpdate = await cartServices.addProductToCart(cid, pid);
  
      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  };

  //elimina el pro del carrito
 const deleteProductToCart =  async (req, res) => {
    try {
      const { cid, pid } = req.params; 
      const cartUpdate = await cartServices.deleteProductToCart(cid, pid);
  
      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  };

//actualiza quantity prod en el cart
  const updateQuantityProductInCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;  
      const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity));
  
      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  };

// elimina todos los prod del carrito
const clearProductsToCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartServices.deleteOne(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
  
      res.status(200).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  };


  export default {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
  }