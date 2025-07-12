const Component = require('../model/componentModel');
const Users =require('../model/userModel')

// funzione per creare un componente
async function createComponent(req, res){
    try{
        const {name, description, price, category, imgUrl} = req.body;

        if(!name || !description || !price || !category){
            res.status(400).json({message: "All the fields are required"});
        }

        const component = await Component.create({
            name,
            description,
            price,
            category,
            imgUrl,
        })

        res.status(200).json(component);
    }catch(error){
        console.log("Error in createComponent controller",error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// funzione per rimuovere un componente
async function deleteComponent(req, res){
    try{
        const component = await Component.findById(req.params.id);

        if(!component){
            res.status(404).json({message: "Component not found"});
        }
        // può andare bene? await Component.deleteOne({_id:req.params.id})

        await Component.findByIdAndDelete(req.params.id);
    }catch(error){
        console.log("Error in deleteComponent controller",error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// funzione per ottenere una lista di componenti in base alla loro categoria
async function getComponentsByCategory(req, res) {
    const {category} = req.params;
    try{
        const components = await Component.find({category});
        res.json(components);
    }catch(error){
        console.log("Error in getComponentsByCategory controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// funzione per modificare il prezzo di un componente
async function modifyPrice(req, res){
    try{
        const component = await Component.findById(req.params.id);
        const {price} = req.body;

        if(!component){
            res.status(404).json({message: "Component not found"});
        }

        if(price<0){
            res.status(400).json({message: "Price value not valid"});
        }

        component.price = price;

        await component.save();

        res.status(200).json(component);

    }catch(error){
        console.log("Error in modifyPrice controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
}

async function getAllComponents(req, res){
    try{
        const components = await Component.find({});
        res.json(components);
    }catch(error){
        console.log("Error in getAllComponents controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
}

module.exports = {
    createComponent,
    deleteComponent,
    getComponentsByCategory,
    modifyPrice,
    getAllComponents
}