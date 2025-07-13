import {useEffect, useState} from "react";
import {getCart} from "../routes/cartRoutes.js";
import Card from "./Card.jsx";

export default function Cart(){
    const [cart,setCart]=useState(null);
    const [message,setMessage]=useState('');

    useEffect(() => {
        async function fetchCart(){
            const {data}=await getCart();
            if(data.message){
                setMessage(data.message);
            }else{
                setCart(data.cart)
            }
        }
        fetchCart();
    }, []);
    if(message)return<p>{message}</p>;

    return(
        <>
            <p id={"testoSup"}>Il Tuo Carrello</p>
            {cart && cart.componentsList.map(item=>(
                <Card key={item.componentElement} amount={item.amount}></Card>
            ))}
            {cart && <h3>Totale:{cart.prezzoTotale}€</h3>}
        </>
    )

}