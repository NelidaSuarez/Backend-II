import { Router } from "express";
import cartDao from "../dao/mongoDB/cart.dao.js";
import productDao from "../dao/mongoDB/product.dao.js";
import cartsControllers from "../controllers/carts.controllers.js";
import { checkProducAndCart } from "../middlewares/checkProductAndCart.middleware.js";


const router = Router();

//crea carrito 
router.post("/", cartsControllers.createCart);

//busca carrito por id
router.get("/:cid", cartsControllers.getCartById);

//Agrega el prod al carrito 
router.post("/:cid/product/:pid", checkProducAndCart, cartsControllers.addProductToCart);

//elimina el pro del carrito
router.delete("/:cid/product/:pid", checkProducAndCart, cartsControllers.deleteProductToCart);

//actualiza quantity prod en el cart
router.put("/:cid/product/:pid", checkProducAndCart, cartsControllers.updateQuantityProductInCart);

//Elimina el carrito
router.delete("/:cid", cartsControllers.clearProductsToCart);




export default router;
