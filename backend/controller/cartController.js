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
        const userId=req.user.id; //ottenuto da verifyToken

        if(!userId) {
            console.error("Errore nella ricerca dello userId")
            res.status(400).json({message:"No userId found"})}
        //dall'userId risalgo all'account

        const user=await User.findById(userId)
        if(!user){
            console.error("Manca utente")
            res.status(400).json({message:"No user found"})
        }

        //dall'account risalgo al carrello dell'utente
        const userCart=await Cart.findOne({_id:user.myCart})

        //uso il metodo find per trovare un componente della lista (caratterizzato dal singolo componente e dalla quantità nel carrello (amount)), che abbia lo stesso id
        //del componente che si sta aggiungendo
        console.log("componentId: ", componentId.toString())
        const existingItem=userCart.componentsList.find(item=>{
            console.log("Item.componentElement", String(item.componentElement))
            return String(item.componentElement)===componentId
        })
        console.log("DUPLICATO: ",existingItem);
        //se c'è nella lista
        if(existingItem){
            console.log("Quantità nel db prima: ")
            //semplicemente aumento di uno la quantità da acquistare, qui si può pensare alla funzione di controllo sulla quantità in magazzino
            existingItem.amount+=1;
            //qui con il save ricalcolo anche il prezzo totale da mostrare in basso

            await userCart.save();
            //nella risposta dico tutto bene e gli mando anche il carrello nuovo
            res.status(201).json({message:"Carrello aggiornato"})
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
        console.log(req.body);
        //dal target del click devo prendere id componente da rimuovere COMPLETAMENTE
        const {componentId}=req.body;
        console.log("COMPONENTID REMOVE: ",componentId)
        if(!componentId){
            res.status(400).json({message:"ComponentId not found in the request"})
        }
        const userId=req.user.id; //ottenuto da verifyToken
        //dall'userId risalgo all'account
        const user=await User.findById(userId)
        if(!userId){res.status(404).json({message:"Utente non trovato"})}
        //dall'account risalgo al carrello dell'utente
        const userCart=await Cart.findOne({_id:user.myCart})
        console.log("USERCART: ",userCart)
        userCart.componentsList=userCart.componentsList.filter(item=> String(item.componentElement) !== componentId);
        await userCart.save();
        res.status(200).json({message:"Elemento rimosso dal carrello."})

    }catch(e){
        console.error(e)
        res.status(500).json({message:'Internal error'})
    }
}

async function getCart(req,res){

    try{
        //qui non faccio nessun controllo, userId c'è per forza a patto che il token di accesso dell'utente sia valido
        const userId=req.user.id; //ottenuto da verifyToken
        console.log('UTENTEID ',userId)
        //dall'userId risalgo all'account
        const user=await User.findById(userId)
        console.log('UTENTE ',user)

        //dall'account risalgo al carrello dell'utente
        const userCart=await Cart.findOne({_id:user.myCart})
        console.log('CARRELLO ',userCart)
        if(userCart.componentsList.length===0){
            console.log("Carrello vuoto")
            res.status(200).json({
                message:"Il carrello è vuoto. Prova ad aggiungere qualcosa."
            })
        }else{
            const components=await Promise.all(userCart.componentsList.map(async item=>{
                return{
                    component:await Component.findById(item.componentElement),
                    amount:item.amount
                }
            }));

            res.json({
                cart:components, //array di oggetti formati da un componente e dalla relativa quantità
                prezzoTot:userCart.prezzoTotale,
            })
        }

    }catch(e){
        console.error(e);
        res.status(500).json({message:"Errore Interno, riprovare più tardi"})
    }
}

async function decreaseAmount(req,res){
    const {componentId}=req.body;
    const userId=req.user.id; //da verifyToken
    const user=await User.findById(userId);
    const userCartId=user.myCart;
    const userCart=await Cart.findById(userCartId);
    const itemToDecrease=userCart.componentsList.find(item=>String(item.componentElement)===componentId);

    console.log("amount ",itemToDecrease.amount);

    if(itemToDecrease.amount===1){
        userCart.componentsList.filter(item=>String(item.componentElement)!==componentId); //lo toglie dalla lista
        await userCart.save();
        res.status(200).json({
            message:"Componente rimosso dal carrello.",
            cart:userCart
        })
    }else{
        itemToDecrease.amount-=1;
        await userCart.save();
        console.log("CART AGGIORNATO: ",userCart);
        res.status(200).json({
            message:"Ne rimangono "+itemToDecrease.amount+" nel carrello dell'utente.",
            cart:userCart
        })
    }
}

async function increaseAmount(req,res){
    const {componentId}=req.body;
    const userId=req.user.id; //da verifyToken
    const user=await User.findById(userId);
    const userCartId=user.myCart;
    const userCart=await Cart.findById(userCartId);
    const itemToIncrease=userCart.componentsList.find(item=>String(item.componentElement)===componentId);
    console.log(itemToIncrease)
    itemToIncrease.amount+=1;
    await userCart.save();
    res.status(200).json({
        message:"Componente aggiunto correttamente.",
        cart:userCart
    })
}

module.exports={
    addToCart,
    removeFromCart,
    getCart,
    decreaseAmount,
    increaseAmount
}