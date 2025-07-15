const mongoose=require('mongoose')
const Component=require('./componentModel')


const cartSchema=new mongoose.Schema({
    componentsList:[
        {
            componentElement:{
                type:mongoose.Schema.Types.ObjectId,
                ref:Component,
                required:true, //da vedere meglio
            },
            amount:{
                type:Number,
                default:0,
            }
        }
    ],
    prezzoTotale:{
        type:Number,
        required:true,
        default:0,
    }
});

//tocca provare con evento
cartSchema.pre('save',async function(next){
    const carrello=this;
    let tot=0;
    try{
        for(const item of carrello.componentsList){
            const product =await Component.findOne({_id: item.componentElement});
            if(product){
                tot+=product.price*item.amount;
            }else{
                //debug
                console.log("Elemento "+item.componentElement+" non presente tra i componenti nel database del sito");

            }
        }
        console.log("PREZZO TOTALE: ", tot);
        next();
    }catch(e){
        next(e);
        console.error(e)
    }

})

module.exports=mongoose.model("Cart",cartSchema)