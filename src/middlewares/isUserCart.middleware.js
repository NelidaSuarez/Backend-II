import { request, response } from "express";


//para que agregue productos a un carrito de un usuario y no a cualquier carrito
export const isUserCart = async ( req= request, res= response, next) =>{
    const { cid } = req.params;
    if(req.user.cart !== cid) return res.status(401).json({ status: "error", msg: "wrong user cart"});
    next();

}
