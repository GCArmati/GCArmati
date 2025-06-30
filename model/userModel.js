const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const v=require("validator");


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    email:{
        type:String,
    },



    createdAt:{
        type:Date,
        overwriteImmutable:true,
        default: ()=> Date.now(),
    },
    updatedAt:{
        type:Date,
        default: ()=> Date.now(),
    }
});


module.exports=mongoose.model("Utenti",userSchema);