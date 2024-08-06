import bycrypt from "bcrypt";

//HASHEO contraseña

export const createHash = (password) =>{
    return bycrypt.hashSync (password, bycrypt.genSaltSync(10));
};

//VALIDA contraseña

export const isValidPassword = (userPassword, passwod)=>{
    return bycrypt.compareSync(passwod, userPassword);
};