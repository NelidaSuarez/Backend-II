import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import env from "./config/env.config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import { initializePassport } from "./config/passport.config.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import { Server } from "socket.io";


//const PORT = 8080;
const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); //inicia plantilla
app.set("views", __dirname + "/views"); //rutas que se encuentran las vistas
app.set("view engine", "handlebars"); //motor que utilizaremos , las vistas
app.use(express.static("public"));


app.use(cookieParser("secretCoder"));
app.use(session({
  secret: "envs.SECRET_CODE", //palabra secreta
  resave:true, //mantiene activa, si estuviera en false la  cierra al cierto tiempo
  saveUninitialized: true,//guarda session
}));

//passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use("/api", routes); // ruta de la appi
app.use("/", viewsRoutes); //ruta de las vistas

const httpServer = app.listen(env.PORT, () => {
  console.log(`Server listening on port http://localhost:${env.PORT}`); //ruta de la vista
});

//configuracion de socket
export const io = new Server(httpServer);

io.on("connection", async (Socket) => {
  console.log("New user connected");
});
