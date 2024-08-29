import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productsControllers from "../controllers/products.controllers.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router();

//Muestra todos los prod
router.get ("/", productsControllers.getAllProducts);

// Busca el prod. por id
router.get ("/:pid", productsControllers.getProductById);

// Cambia el estado del prod. no lo elimina
router.delete("/:pid", authorization("admin"), productsControllers.deleteProduct);

// Actualiza del prod.
router.put("/:pid",authorization("admin"), productsControllers.updateProduct);

// Crea el prod.
router.post("/", checkProductData,authorization("admin"), productsControllers.createProduct);


export default router;
