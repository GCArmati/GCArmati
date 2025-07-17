const Cart=require('../model/cartModel')
const Component=require('../model/componentModel')
const User=require('../model/userModel')


async function addToCart(req,res){

    try{

        const {componentId}=req.body;

        if(!componentId){res.status(400).json({message:"The server didn't find an item to add"})}

        const userId=req.user.id; //ottenuto da verifyToken

        if(!userId) {
            console.error("Errore nella ricerca dello userId")
            res.status(400).json({message:"No userId found"})}


        const user=await User.findById(userId)
        if(!user){
            console.error("Manca utente")
            res.status(400).json({message:"No user found"})
        }


        const userCart=await Cart.findOne({_id:user.myCart})


        console.log("componentId: ", componentId.toString())
        const existingItem=userCart.componentsList.find(item=>{
            console.log("Item.componentElement", String(item.componentElement))
            return String(item.componentElement)===componentId
        })
        console.log("DUPLICATO: ",existingItem);

        if(existingItem){
            console.log("Quantità nel db prima: ")

            existingItem.amount+=1;


            await userCart.save();

            res.status(201).json({message:"Carrello aggiornato"})
        }else{

            userCart.componentsList.push({componentElement:componentId,amount:1})
            await userCart.save();

            res.status(201).json({message:"Elemento aggiunto al carrello.",cart: userCart})
        }

    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal Error"})
    }

}

async function removeFromCart(req,res){

    try{

        const {componentId}=req.body;
        if(!componentId){
            res.status(400).json({message:"ComponentId not found in the request"})
        }
        const userId=req.user.id;

        const user=await User.findById(userId)
        if(!userId){res.status(404).json({message:"Utente non trovato"})}

        const userCart=await Cart.findOne({_id:user.myCart})
        const newCartList=userCart.componentsList.filter(e=>{
            console.log("DEBUG componenti: ",String(e.componentElement),' ',componentId)
            return String(e.componentElement) !== componentId
        } )
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

        const userId=req.user.id;
        console.log('UTENTEID ',userId)

        const user=await User.findById(userId)
        console.log('UTENTE ',user)


        const userCart=await Cart.findOne({_id:user.myCart})
        console.log('CARRELLO ',userCart)
        if(userCart.componentsList.length===0){
            console.log("Carrello vuoto")
            res.status(200).json({
                message:"Il carrello è vuoto. Prova ad aggiungere qualcosa."
            })
        }else{
            const components=await Promise.all(userCart.componentsList.map(async item=>{
                console.log("COMPONENTE ", await Component.findById(item.componentElement));
                return{
                    component:await Component.findById(item.componentElement),
                    amount:item.amount
                }
            }));

            res.json({
                cart:components,
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
    const userId=req.user.id;
    const user=await User.findById(userId);
    const userCartId=user.myCart;
    const userCart=await Cart.findById(userCartId);
    const itemToDecrease=userCart.componentsList.find(item=>String(item.componentElement)===componentId);
    itemToDecrease.amount-=1;
    await userCart.save();
    res.sendStatus(200)
}

async function increaseAmount(req,res){
    const {componentId}=req.body;
    const userId=req.user.id; //da verifyToken
    const user=await User.findById(userId);
    const userCartId=user.myCart;
    const userCart=await Cart.findById(userCartId);
    const itemToIncrease=userCart.componentsList.find(item=>String(item.componentElement)===componentId);
    itemToIncrease.amount+=1;
    await userCart.save();
    res.sendStatus(200)
}

module.exports={
    addToCart,
    removeFromCart,
    getCart,
    decreaseAmount,
    increaseAmount
}