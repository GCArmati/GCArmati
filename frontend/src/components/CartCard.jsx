


export default function CartCard({component, amount}){

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
                    <div className="d-flex gap-2">
                        <button className="btn btn-success" >
                            +
                        </button>
                        <button className="btn btn-warning" >
                            -
                        </button>
                        <button className="btn btn-danger" >
                            Rimuovi dal carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}