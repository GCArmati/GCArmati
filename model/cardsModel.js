const mongoose=require("mongoose");
const carteSchema=new mongoose.Schema({
    OBIETTIVO:{
        required:true,
        type:Boolean
    },
    territorio:{
        type:String,
        unique:true,
    },
    trisValue:{
        type:Number,
        enum:[1,2,3],
        required:true,
    },
    img:String,
});




module.exports=mongoose.model("Carte",carteSchema);


