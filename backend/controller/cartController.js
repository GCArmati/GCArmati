const Cart=require('../model/cartModel')
const Component=require('../model/componentModel')
const User=require('../model/userModel')


async function addToCart(req,res){

    //in cartRoutes va anteposto il verifyToken per permettere questa azione
try{
    //prende dal body della richiesta il componentID, sto supponendo che la
    //richiesta parta dal componente mostrato nel sito
    const {componentId}=req.body;
    //piccolo controllo sul campo component, se manca la richiesta è mal formata,
    if(!componentId){res.status(400).json({message:"The server didn't find an item to add"})}
    //qui non faccio nessun controllo, userId c'è per forza a patto che il token di accesso dell'utente sia valido
    const userId=req.userId; //ottenuto da verifyToken
    //dall'userId risalgo all'account
    const user=await User.findById(userId)
    //dall'account risalgo al carrello dell'utente
    const userCart=await Cart.findOne({_id:user.myCart})

    //uso il metodo find per trovare un componente della lista (caratterizzato dal singolo componente e dalla quantità nel carrello (amount)), che abbia lo stesso id
    //del componente che si sta aggiungendo
    const existingItem=userCart.componentsList.find(item=>item.componentElement===componentId)
    //se c'è nella lista
    if(existingItem){
        //semplicemente aumento di uno la quantità da acquistare, qui si può pensare alla funzione di controllo sulla quantità in magazzino
        existingItem.amount+=1;
        //qui con il save ricalcolo anche il prezzo totale da mostrare in basso
        await userCart.save();
        //nella risposta dico tutto bene e gli mando anche il carrello nuovo
        res.status(201).json({message:"Carrello aggiornato",cart: userCart})
    }else{
        //in questo caso, se il componente non c'è nel carrello, devo pushare un ulteriore elemento
        userCart.componentsList.push({componentElement:componentId,amount:1})
        await userCart.save();
        //nella risposta dico tutto bene e gli mando anche il carrello nuovo
        res.status(201).json({message:"Elemento aggiunto al carrello.",cart: userCart})
    }

}catch(e){
    console.error(e);
    res.status(500).json({message:"Internal Error"})
}

}

async function removeFromCart(req,res){

    try{
        //dal target del click devo prendere id componente da rimuovere COMPLETAMENTE
        const {componentId}=req.body;
        if(!componentId){
            res.status(400).json({message:"ComponentId not found in the request"})
        }
        const userId=req.userId; //ottenuto da verifyToken
        //dall'userId risalgo all'account
        const user=await User.findById(userId)
        if(!userId){res.status(404).json({message:"Utente non trovato"})}
        //dall'account risalgo al carrello dell'utente
        const userCart=await Cart.findOne({_id:user.myCart})
        const newCartList=userCart.componentsList.filter(e=> e.componentElement !== componentId);
        userCart.componentsList=newCartList;
        await userCart.save();
        res.status(200).json({message:"Elemento rimosso dal carrello.",cart: newCartList})

    }catch(e){
        console.error(e)
        res.status(500).json({message:'Internale error'})
    }
}

async function getCart(req,res){

    try{
        //qui non faccio nessun controllo, userId c'è per forza a patto che il token di accesso dell'utente sia valido
        const userId=req.userId; //ottenuto da verifyToken
        //dall'userId risalgo all'account
        const user=await User.findById(userId)
        //dall'account risalgo al carrello dell'utente
        const userCart=await Cart.findOne({_id:user.myCart})
        if(userCart.componentsList.length===0){
            res.status(200).json({
                message:"Il carrello è vuoto. Prova ad aggiungere qualcosa."
            })
        }else{
            res.json({
                cart:userCart,
            })
        }

    }catch(e){
        console.error(e);
        res.status(500).json({message:"Errore Interno, riprovare più tardi"})
    }
}

module.exports={
    addToCart,
    removeFromCart,
    getCart
}

