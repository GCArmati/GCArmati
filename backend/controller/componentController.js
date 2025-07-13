const Component=require("../model/componentModel")



//funzione per aggiungere al database dei componenti un nuovo pezzo,
// c'è già verifyRole come middleware
async function newComponent(req,res){
    const {category,imageUrl,nameTag/*,amount*/,priceTag}=req.body;
    if(!category||!imageUrl||!nameTag||/*!amount||*/!priceTag){
        res.status(400).json({message:'Bisogna specificare necessariamente tutti i campi di un componente per poterlo inserire!'})
    }
    try{
        const newComp=await Component.create({
            category:category,
            imageURL:imageUrl,
            nameTag:nameTag,
            //amount:amount,
            priceTag:priceTag,
        })
        res.status(201).json({
            message:"Nuovo componente aggiunto al DB correttamente.",
            comp:newComp //capire se necessario
        })
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal error "+e})
    }
}

async function getAllComponents(req,res){
    //funzione pensata per renderizzare nella pagina un totale di 10 card o quante ne vogliamo
    try{
        const page=parseInt(req.query.page)||1;   //prende pagina corrente da query nell'url o setta 1
        const limit=parseInt(req.query.limit)||10; //prende limite da query nell'url o setta 10
        const skip=(page-1)*limit;

        const components=await Component.find()
            .sort({nameTag:1})  //risultati in ordine alfabetico A-->Z
            .skip(skip)
            .limit(limit)

        const totalComponents=await Component.countDocuments(); //easy count dei documenti
        res.json({
            message:'Componenti recuperati con successo.',
            comp:components,
            totalPages:Math.ceil(totalComponents/limit), //arrotondato per eccesso, numero di pagine necessarie per mostrare tutti comp
            totalComponents:totalComponents
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"Errore interno, impossibile caricare i componenti."+err
        })
    }

}

async function getComponentByName(req,res){
    try{
        const name=req.params.nameTag.toLowerCase().trim();
        const searchedComponent=await Component.findOne({nameTag:name})
        if(!searchedComponent){
            console.log("Nessun componente con questo nome trovato nel database")
            res.status(404).json({message:"Component not found in the database."});
        }
        res.json({message:'Componente recuperato.',comp:searchedComponent});
    }catch(e){
        console.error(e);
        res.status(500).json({
            message:"Internal error"
        })
    }

} //beta

module.exports={
    newComponent,
    getAllComponents,
    getComponentByName
}
