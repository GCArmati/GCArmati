import {Component} from '../models/Component.js'

export const add = async (req,res) => {
    const {name, category, price, brand} = req.body;
    try{
        if(!name || !category || !price || !brand){
            throw new Error("All fields are required");
        }

        const componentAlreadyExist = await Component.findOne({name});
        if(componentAlreadyExist){
            return res.status(400).json({success:false, message: "Component already exists"});
        }

        const component = new Component({
            name,
            category,
            price,
            brand
        })

        await component.save();

        res.status(201).json({success:true,
            message: "Component created successfully",
            component: {
                ...component._doc,
            }
        });
    }catch(error){
        res.status(400).json({success:false, message: error.message});
    }
}