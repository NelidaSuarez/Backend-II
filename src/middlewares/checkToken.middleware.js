import { request, response } from "express";
import { verifyToken } from "../utils/jwt.js";



export const checkToken = async (req = request, res = response, next )=>{
    try {
        const token = req.cookies.token;
        console.log(token)
        if(!token ) return res.status(401).json( {status: "error", msg: "token not provided" });

        const tokenVerify = verifyToken(token)
        if(!tokenVerify) return res.status(401).json( {status: "error", msg: "Invalid token" });

        req.user = verifyToken;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Internal server error" })
    }
}