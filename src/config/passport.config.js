import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20"
import userDao from "../dao/mongoDB/user.dao.js";
import envs from "./env.config.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;

export const initializePassport = () => {
  passport.use(
    "register", // Nombre de la estrategia
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
     
      try {
        const { first_name, last_name, age } = req.body;
        const user = await userDao.getByEmail(username);
        if (user) return done(null, false, { message: "User already exists" });

        const newUser = {
          first_name,
          last_name,
          password: createHash(password),
          email: username,
          age,
        };

        const userCreate = await userDao.create(newUser);

        return done(null, userCreate);
      } catch (error) {
        return done(error);
      }
    })
  );


  passport.use(
    "login",
    new LocalStrategy({usernameField:"email"}, async (username, password, done) => {
      
      try {

        const user = await userDao.getByEmail(username);
        if (!user || !isValidPassword(user.password, password)) return done(null, false);

        return done(null, user);
        
      } catch (error) {
        done(error)
      }
    })
  ) 

//serializacion y desearilacion de usuarios; convierte un obj, de usuario en identificador unico (almacena y recupera datos) en cada sesion

//creacion de usuario
  passport.serializeUser((user, done) => {
    done(null, user._id); 
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }); 

//login de usuario

passport.use(
    "login",
    new LocalStrategy({ usernameField: "email"}, async (username,password,done)=>{
        try {
            const user = await userDao.getByEmail(username);
            if (!user || !isValidPassword(user.password, password) ) done(null, false);

            return done(null, user);

        } catch (error) {
            done(error)
        }
    })
)

//estrategia de Google
passport.use(
  "google",
    new GoogleStrategy(
      {
        clientID: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/google",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { name, emails } = profile;
          console.log(profile);

          
        } catch (error) {
          return cb(error);
      }
    }
  )
)

};