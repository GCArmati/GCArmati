import {useEffect, useState} from "react";
import {getCart} from "../routes/cartRoutes.js";
import CartCard from "../components/CartCard.jsx";
import {Link} from "react-router-dom";
import './Checkout.css';

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
            //console.log(message);
        }
        fetchCart().catch(err=>console.log(err));
    }, []);

    useEffect(() => {

        if (cart) {
            const prezzoTot = cart.reduce((tot, item) => {
                return tot + item.component.price * item.amount;
            }, 0);
            setTot(prezzoTot);

            if(prezzoTot===0)setMessage("Il carrello è vuoto. Prova ad aggiungere qualcosa.")

        }
    }, [cart]);


    if(tot===0 ){
        console.log(message);
        return(
            <div className="checkout-form text-sm-center">
                <p className="text-form">{message}</p>
            </div>)
    }


    return(
        <>
            <p id={"testoSup"}>Il Tuo Carrello</p>
            {cart && cart.map(item=>(
                <CartCard key={item.component._id} component={item.component} amount={item.amount} setCart={setCart}
                          cart={cart} ></CartCard>
            ))}
            {cart && <h3>Totale:{tot}€</h3>}
            <div id={"navbar-container"}>
                <button><Link to={"/Checkout"}>Checkout</Link></button>
            </div>
        </>
    )
}