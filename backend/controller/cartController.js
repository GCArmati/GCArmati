const Cart=require('../model/cartModel')
const Component=require('../model/componentModel')
const User=require('../model/userModel')
async function addToCart(req,res){

    //in cartRoutes va anteposto il verifyToken per permettere questa azione
try{
    const {componentId}=req.body;
    if(!componentId){res.status(400).json({message:"The server didn't find an item to add"})}
    const userId=req.userId; //ottenuto da verifyToken
    const user=await User.findById({userId})
    const userCart=await Cart.findOne({_id:user.myCart})
    const cartList=userCart.componentsList;
    cartList.

}catch(e){
    console.error(e);
    res.status(500).json({message:"Internal Error"})
}

}

async function removeFromCart(){

}

async function getCart(){

}

