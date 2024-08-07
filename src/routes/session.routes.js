import { Router } from "express";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

import userDao from "../dao/mongoDB/user.dao.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";

const router = Router();

//hace registro de usuario, usamos passport
router.post("/register", passport.authenticate("register"),async(req, res)=> {
   try{
    res.status(201).json({status: "ok", msg: "created user 😊"})
    }catch(error) {
        console.log(error);
        resizeBy.status(500).json({status: "error", msg:"Internal server error"});
    }
});
  
//login
router.post("/login", passport.authenticate("login"),async (req, res) => {
    try {
      return res.status(200).json({status:"ok", payload: req.user})
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Internal server error" })
    }
  });

  router.get("/google", passport.authenticate("google", 
    {scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"], 
    session: false, 
    }),
  async (req, res) => {
    try {
      return res.status(200).json({status:"ok", payload: req.user});
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  });
   
  router.get("/current",async (req,res)=>{
    const user = await userDao.getByEmail(req.session.user.email);
  });



  //token
  router.post("/auth",async (req, res) => {
    try {
      const { email, password} = req.body;
      const user = await userDao.getByEmail(email);
      if(!user || !isValidPassword(user.password, password)) return res.status(401).json({status:"error", msg: "invalid user or email"});
      
      const token = createToken(user);
      
      res.cookie("token", token, {httpOnly:true  });
      return res.status(200).json({status:"ok", token });      
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Internal server error" })
    }
  });
  
export default router