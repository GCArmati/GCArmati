import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
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
        enum: ['processor','motherboard','cpu-cooler','case','graphics card','ram','storage','case-cooler','power-supply']
    }
}, {timestamps: true});

const Component = mongoose.model('Component', componentSchema);
export default Component;