import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middlewares/passport.middleware.js";
import sessionControllers from "../controllers/session.controllers.js";

const router = Router();

//hace registro de usuario, usamos passport
router.post("/register", passportCall("register"), sessionControllers.register);

//login
router.post("/login", passportCall("login"), sessionControllers.login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),sessionControllers.googleAuth
);

router.get("/current", passportCall("jwt"),sessionControllers.current);

//token
router.post("/auth",sessionControllers.auth);

export default router;
