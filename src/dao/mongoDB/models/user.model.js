import mongoose, { Types } from "mongoose";


const userCollection = "user";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true ,
    },
    last_name: {
        type: String,
        required: true ,
    },
        email: {
        type: String,
        required: true ,
        unique: true,
    },
    age: {
        type: Number,
        
    },
    password: {
        type: String,
        
    },

});

export const userModel = mongoose.model(userCollection, userSchema);