import {decreaseAmountFetch, increaseAmountFetch, removeFromCart} from "../routes/cartRoutes.js";
import {useState} from 'react'


export default function CartCard({component, amount, setCart, cart}){
    const [quant,setQuant]=useState(amount)

    const handleIncrease = async () => {
        console.log(component._id);
        await increaseAmountFetch(component._id)
        setQuant(quant+1);
        setCart(prev =>
            prev.map(item =>
                item.component._id === component._id
                    ? {...item, amount: item.amount + 1}
                    : item
            ))
    };

    const handleDecrease = async () => {
        if (quant === 1) {
            await removeFromCart(component._id);
            setCart(prev => prev.filter(item => item.component._id !== component._id));
            alert("Rimosso dal carrello.");
        } else {
            await decreaseAmountFetch(component._id);
            setQuant(quant-1);
            setCart(prev =>
                prev.map(item =>
                    item.component._id === component._id
                        ? {...item, amount: item.amount - 1}
                        : item
                )
            );
        }
    };

    const handleRemove = async () => {
        try {
            await removeFromCart(component._id);
            setCart(prev => prev.filter(item => item.component._id !== component._id));
            alert("Rimosso dal carrello.");
        } catch (error) {
            alert("Errore");
        }

    };

    return(
        <div id="cardContainer1" className={"container-xl border p-3 m-3 rounded border-black"}>
            <div className="row">
                <h1 className="text-justify">{component.name}</h1>
            </div>
            <div className="row">
                <div className="row">
                    <h2 className="text-justify">{component.category}</h2>
                </div>
                <div className="col-md-5">
                    <img src={component.imgUrl} alt="immagine"></img>
                </div>
                <div className="col-3 col-md-4">
                    <p className="text-left">Descrizione</p>
                    <p className="text-left">{component.description}</p>
                </div>
                {/* Bottoni e prezzo raggruppati e allineati in basso */}
                <div className="col-auto col-md-auto d-flex flex-column justify-content-end align-items-end">
                    <p>Prezzo</p>
                    <p>{component.price}€</p>
                    <p>Quantità</p>
                    <p>{quant}</p>
                    <div className="d-flex gap-2">
                        <button className="btn btn-success" onClick={handleIncrease} >
                            +
                        </button>
                        <button className="btn btn-warning" onClick={handleDecrease}>
                            -
                        </button>
                        <button className="btn btn-danger" onClick={handleRemove}>
                            Rimuovi dal carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}