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
    const user=await User.findById({userId})
    //dall'account risalgo al carrello dell'utente
    const userCart=await Cart.findOne({_id:user.myCart})
    //prendo dal carrello la lista di componenti e amount (oggetti)
    const cartList=userCart.componentsList;
    //uso il metodo find per trovare un componente della lista (caratterizzato dal singolo componente e dalla quantità nel carrello (amount)), che abbia lo stesso id
    //del componente che si sta aggiungendo
    const existingItem=cartList.find(item=>item.componentElement===componentId)
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
        cartList.push({componentElement:componentId,amount:1})
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


}

async function getCart(){

}

