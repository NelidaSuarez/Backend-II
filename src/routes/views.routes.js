import { Router } from "express";
import productManager from "../dao/fileSystem/productManager.js";
import { io } from "../app.js";

const router = Router();
router.get("/", (req,res)=>{
  res.render("index");
});



router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    io.emit("products", products);

    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//agrega el prod.
router.post("/realTimeProducts", async (req, res) => {
  try {
    console.log("pasa por aca");
    const { title, price, description } = req.body;
    await productManager.addProduct({ title, price, description });
    const products = await productManager.getProducts();
    io.emit("products", products);
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
//elimina prod.
router.delete("/realTimeProducts", async (req, res) => {
  try {
    const { id } = req.body;
    await productManager.deleteProduct(Number(id));
    const products = await productManager.getProducts();
    io.emit("products", products);
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

  //cookies
router.get("/setCookie" , (req,res)  => {
    res.cookie("userData","Welcome profe" , {maxAge: 100000} ).send("Cookie setted");
});

//cookie asegurada
router.get("/setSignedCookie" , (req,res)  => {
  res.cookie("userData","Welcome profe" , {maxAge: 100000, signed: true} ).send("Cookie setted");
});


//valor de la cookie
router.get("/getCookie" , (req,res)  => {
  res.send(req.cookies.userData);
});

router.get("/getSignedCookie" , (req,res)  => {
  res.send(req.signedCookies.userData);
});

//delete cokkie
router.get("/deleteCookie" , (req,res)  => {
  res.clearCookie("userData").send("Cookie deleted");
});

//postman crea
router.post("/setData" , (req, res)=>{

  const { user, email} =req.body;
  res.cookie("user", { user , email}, {maxAge: 100000, signed : true}).send("User set cookie");

})

//postman consulta
router.get("/getData",(req, res)=>{
  res.send(req.signedCookies.user);
});

//SESSION

router.get("/session", (req,res)=>{
  if(req.session.counter){
    req.session.counter++
    res.send(`Entro al sitio ${req.session.counter} veces 😍`)
  }else{
    req.session.counter = 1;
    res.send("Bienvenidos al sitio");
  }
});

//login user
router.get("/login", (req, res)=>{

  const { username, password} = req.query;
  if (username !== "Jhon" || password !== "123"){    
    return res.send("Invalid username or password 😒");
  };
  req.session.user = username;
  req.session.admin = true;
  res.send (`Welcome ${username} 😁`)
});

//login admin

router.get("/admin", (req, res)=>{

  if(!req.session.admin){
    return res.send("Access denied 🤔");
  }
  
  res.send (`Welcome administrator ${req.session.user} 😘`);
});

//cerrar session

router.get ("/logout", (req, res) =>{
  req.session.destroy()
  res.send("session expired 😢");
});

export default router;
