const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    imgUrl:{
        type:String,
        required:true,
        //mettere errore
    },
    description: {
        //statica
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: 0,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ['processor','motherboard','cpu-cooler','case','graphics-card','ram','storage','case-cooler','power-supply']
    }
}, {timestamps: true});

module.exports = mongoose.model('Component', componentSchema);