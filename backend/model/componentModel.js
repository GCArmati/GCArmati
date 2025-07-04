const mongoose=require('mongoose')

const componentSchema=new mongoose.Schema({
    category:{
        type:String,
        lowercase:true,
        enum:['cpu','case','keyboard','mouse','ram','monitor','gpu']
    },
    imageURL:{
        type:String,
        required:true
    },
    nameTag:{
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        min:0,
        max:12
    },
    priceTag:{
        type:Number,
        min:0,
    }
})