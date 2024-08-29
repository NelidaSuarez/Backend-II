import cartRepository from "../persistence/mongoDB/cart.repository.js";


//crea carrito 
const createCart = async () => {
    return await cartRepository.create()
};  

//busca carrito por id
  const getCartById = async (cid) => {
    return await cartRepository.getById(cid);
  };  

  //Agrega el prod al carrito 
  const addProductToCart = async (cid, pid) => {
      return await cartRepository.addProductToCart(cid, pid);
  };  
  //elimina el pro del carrito
 const deleteProductToCart =  async (cid, pid) => {
    return await cartRepository.deleteProductToCart(cid, pid);
 };  

//actualiza quantity prod en el cart
  const updateQuantityProductInCart = async (cid, pid, quantity) => {
    return await cartRepository.updateQuantityProductInCart(cid, pid, quantity);
  };  

// elimina todos los prod del carrito
const clearProductsToCart = async (cid) => {
    await cartRepository.deleteOne(cid);
};

//ticket services (llama a la capa de persistencia de cart para hacer la logica del negocio)
const purchaseCart = async (cid) => {
  const cart = await cartRepository.getById(cid);
  let total = 0;
  const productsWithOutStock = [];

  for (const productCart of cart.products) {
      const product = await productRepository.getById(productCart.product);

      if (product.stock >= productCart.quantity) {
          total += product.price * productCart.quantity;
          await productRepository.update(product._id, {stock: product.stock - productCart.quantity})
      } else {
          productsWithOutStock.push(productCart);
      }
//Actualiza el carrito solo con los productos que no se pudieron comprar por falta de stock
      await cartRepository.update(cid, { products: productsWithOutStock });
  }

  return total;
};


  export default {
    createCart,
    getCartById,
    addProductToCart, 
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
    purchaseCart,
  }