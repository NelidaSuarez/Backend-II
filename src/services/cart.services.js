import cartDao from "../dao/mongoDB/cart.dao.js";


//crea carrito 
const createCart = async () => {
    return await cartDao.create()
};  

//busca carrito por id
  const getCartById = async (id) => {
    return await cartDao.getById(cid);
  };  

  //Agrega el prod al carrito 
  const addProductToCart = async (cid, pid) => {
      return await cartDao.addProductToCart(cid, pid);
  };  
  //elimina el pro del carrito
 const deleteProductToCart =  async (cid, pid) => {
    return await cartDao.deleteProductToCart(cid, pid);
 };  

//actualiza quantity prod en el cart
  const updateQuantityProductInCart = async (cid, pid, quantity) => {
    return await cartDao.updateQuantityProductInCart(cid, pid, quantity);
  };  

// elimina todos los prod del carrito
const clearProductsToCart = async (cid) => {
    await cartDao.deleteOne(cid);
};

  export default {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
  }