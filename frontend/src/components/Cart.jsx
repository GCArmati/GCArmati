import {useEffect, useState} from "react";
import {getCart} from "../routes/cartRoutes.js";
import CartCard from "../components/CartCard.jsx";

export default function Cart(){
    const [cart,setCart]=useState(null);
    const [tot,setTot]=useState(0);
    const [message,setMessage]=useState('');

    useEffect(() => {
        async function fetchCart(){
            const {cart,message}=await getCart();

            if(message){
                console.log(message);
                setMessage(message);
            }else{
                console.log(cart);
                setCart(cart)
            }
            const prezzoTot=cart.reduce((tot,item)=>{
                return tot+item.component.price*item.amount;
            },0)
            setTot(prezzoTot)

            //console.log(message);
        }

        fetchCart().catch(err=>console.log(err));
    }, []);


    if(message)return<p>{message}</p>;


    return(
        <>
            <p id={"testoSup"}>Il Tuo Carrello</p>
            {cart && cart.map(item=>(
                <CartCard key={item.component._id} component={item.component} amount={item.amount} ></CartCard>
            ))}
            {cart && <h3>Totale:{tot}€</h3>}
        </>
    )
}