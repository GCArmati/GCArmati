const mongoose=require('mongoose')
const Component=require('./componentModel')

const cartSchema=new mongoose.Schema({
    list:[
        {
            component:{
                type:mongoose.Schema.Types.ObjectId,
                ref:Component,
                required:true, //da vedere meglio
            },
            amount:{
                type:Number,
                min:1,
                default:1,
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
        for(const item of carrello){
            const prodotto=await Component.findOne(item.component);
            if(prodotto){
                tot+=prodotto.priceTag;
            }else{
                //debug
                console.log("Elemento non presente tra i componenti nel database del sito");
            }
        }
    }catch(e){
        console.error(e)
    }

})