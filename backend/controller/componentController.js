const Component=require("../model/componentModel")


//funzione per aggiungere al database dei componenti un nuovo pezzo,
// c'è già verifyRole come middleware
async function newComponent(req,res){
    const {category,imageUrl,nameTag,amount,priceTag}=req.body;
    if(!category||!imageUrl||!nameTag||!amount||!priceTag){
        res.status(400).json({message:'Bisogna specificare necessariamente tutti i campi di un componente per poterlo inserire!'})
    }
}