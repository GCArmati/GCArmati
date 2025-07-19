import './Card.css'
import {createSearchParams, useNavigate, useLocation} from "react-router-dom";
import {addToCart} from '../routes/cartRoutes.js'

export default function Card({nome, imgURL, descrizione, prezzo, categoria, componentID,userLogin}) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleAdd = async () => {
        navigate({
            pathname: "/category",
            search: createSearchParams({category: categoria}).toString()
        })
        console.log(categoria);
    }

    const handleAddToCart = async () => {
        console.log(componentID);
        const {ok,message}= await addToCart(componentID);

        if (ok) {
            alert("Aggiunto al carrello!");
        } else {
            alert(message || "Errore nell'aggiunta al carrello");
        }

        navigate("/");
    };
    
    return location.pathname==="/category"?(
        <div id="cardContainer1" className={"container-xl border p-3 m-3 rounded border-black"}>
            <div className="row">
                <h1 className="text-justify">{nome}</h1>
            </div>
            <div className="row">
                <div className="row">
                    <h2 className="text-justify">{categoria}</h2>
                </div>
                <div className="col-md-5">
                    <img src={imgURL} alt="immagine"></img>
                </div>
                <div className="col-3 col-md-4">
                    <p className="text-left">Descrizione</p>
                    <p className="text-left">{descrizione}</p>
                </div>

                <div className="col-auto col-md-auto d-flex flex-column justify-content-end align-items-end">
                    <p>Prezzo</p>
                    <p>{prezzo}€</p>
                    <p style={"background-color:red"}>Stato userLogin: {userLogin}</p>
                    <div className="d-flex gap-2">
                        {userLogin !==null && (
                            <>
                                <button className={"btn btn-primary"} onClick={handleAddToCart} value={componentID}>
                                    Aggiungi al Carrello
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div id="cardContainer1" className={"container-xl border p-3 m-3 rounded border-black"}>
            <div className={"row"}>
                <h1 className={"text-justify"}>{categoria}</h1>
            </div>
            <div className="col-3 col-md-4">
                <p className="text-left">{descrizione}</p>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={handleAdd}>
                    Componenti disponibili
                </button>
            </div>

        </div>
    )

}
