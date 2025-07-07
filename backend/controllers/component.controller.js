import Component from '../models/Component.js'

// function to create a component in db
export const createComponent = async (req, res) => {
    try{
        const {name, description, price, category} = req.body;

        if(!name || !description || !price || !category){
            res.status(400).json({message: "All the fields are required"});
        }

        const component = await Component.create({
            name,
            description,
            price,
            category,
        })

        res.status(200).json(component);
    }catch(error){
        console.log("Error in createComponent controller",error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
}

export const deleteComponent = async (req, res) => {
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

export const getComponentsByCategory = async (req, res) => {
    const {category} = req.params;
    try{
        const components = await Component.find({category});
        res.json(components);
    }catch(error){
        console.log("Error in getComponentsByCategory controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
}