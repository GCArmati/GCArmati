import './Card.css'
import {createSearchParams, useNavigate, useLocation} from "react-router-dom";
import {useState} from "react";

export default function Card({nome, imgURL, descrizione, prezzo, categoria, componentID, onAddToCart}) {
    const navigate = useNavigate();
    const location = useLocation();
    const page = location.pathname;

    const handleAdd = async () => {
        navigate({
            pathname: "/category",
            search: createSearchParams({category: categoria}).toString()
        })
        console.log(categoria);
    }

    const handleAddToCart = async (e) => {
        console.log(e.target.value);
        /*const {ok,message}= await addToCart(componentID); // <--- ECCO L'USO DEL componentId

        if (ok) {
            alert("Aggiunto al carrello!");
        } else {
            alert(message || "Errore nell'aggiunta al carrello");
        }*/
        navigate("/");
    };

    let tagButton;

    if(page==="/category"){
        tagButton = (
            <button className={"btn btn-primary"} onClick={handleAddToCart} value={componentID}>
                Aggiungi al Carrello
            </button>
        );
    } else if(page==="/" && componentID!==undefined){
        console.log(componentID);
        tagButton = (
            <button className={"btn btn-primary"} /*onClick={}*/>
                Elimina
            </button>
        );
    }else if(page==="/"){
        tagButton = (
            <button className={"btn btn-primary"} onClick={handleAdd}>
                Aggiungi
            </button>
        );
    }


    return(
        <div id="cardContainer1" className={"container-xl border p-3 m-3 rounded border-black"}>
            <div className={"row"}>
                <h1 className={"text-justify"}>{categoria}</h1>
            </div>
            <div className={"row"}>
                <h2 className={"text-justify"}>{nome}</h2>
            </div>
            <div  className="row">
                <div className="col-md-5">
                    <img src={imgURL} alt="immagine"></img>
                </div>
                <div className="col-3 col-md-4">
                    <p className={"text-left"}>Descrizione</p>
                    <p className={"text-left"}>{descrizione}</p>
                </div>
                <div className="col-3 col-md-3 ">
                    <p>Prezzo</p>
                    <p>{prezzo}</p>

                </div>
            </div>
            <div>
                {tagButton}
            </div>
        </div>
    )
}