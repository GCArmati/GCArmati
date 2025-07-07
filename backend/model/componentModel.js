const mongoose=require('mongoose')

const componentSchema=new mongoose.Schema({
    category:{
        type:String,
        lowercase:true,
        enum:['cpu','case','keyboard','mouse','ram','monitor','gpu'],
        required:true,
    },
    imageURL:{
        type:String,
        required:true,
        unique:[true,'C\'è un\'immagine con lo stesso url nel DB']
    },
    nameTag:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        unique:[true,'C\'è un componente con lo stesso nome nel DB'] //se c'è da prendere in considerazione il fattore amount si fa un
        //altro tipo di controllo
    },
    /*
    amount:{
        type:Number,
        min:0,
        required:true
    },*/
    priceTag:{
        type:Number,
        min:0,
        required:true
    }
})

module.exports=mongoose.model('Component',componentSchema)