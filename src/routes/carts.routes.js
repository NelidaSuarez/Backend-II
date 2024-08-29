import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import { checkProducAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

//crea carrito 
router.post("/", cartsControllers.createCart);

//busca carrito por id
router.get("/:cid", cartsControllers.getCartById);

//Agrega el prod al carrito 
router.post("/:cid/product/:pid", passportCall("jwt"),authorization("user"),isUserCart, checkProducAndCart, cartsControllers.addProductToCart);

//elimina el pro del carrito
router.delete("/:cid/product/:pid",passportCall("jwt"),authorization("user"), checkProducAndCart, cartsControllers.deleteProductToCart);

//actualiza quantity prod en el cart
router.put("/:cid/product/:pid",passportCall("jwt"),authorization("user"), checkProducAndCart, cartsControllers.updateQuantityProductInCart);

//Elimina el carrito
router.delete("/:cid",passportCall("jwt"),authorization("user"), cartsControllers.clearProductsToCart);

//ticket
router.get("/:cid/purchase",passportCall("jwt"), authorization("user"), cartsControllers.purchaseCart);




export default router;
