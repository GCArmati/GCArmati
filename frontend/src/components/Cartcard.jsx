

export default function Cartcard(props){

    return(
        <div id="cardContainer1" className={"container-xl border p-3 m-3 rounded border-black"}>
            <div className="row">
                <h1 className="text-justify">{props.nome}</h1>
            </div>
            <div className="row">
                <div className="row">
                    <h2 className="text-justify">{props.categoria}</h2>
                </div>
                <div className="col-md-5">
                    <img src={props.imgURL} alt="immagine"></img>
                </div>
                <div className="col-3 col-md-4">
                    <p className="text-left">Descrizione</p>
                    <p className="text-left">{props.descrizione}</p>
                </div>
                {/* Bottoni e prezzo raggruppati e allineati in basso */}
                <div className="col-auto col-md-auto d-flex flex-column justify-content-end align-items-end">
                    <p>Prezzo</p>
                    <p>{props.prezzo}</p>
                    <div className="d-flex gap-2">
                        <button className="btn btn-success" onClick={handleModify}>
                            +
                        </button>
                        <button className="btn btn-warning" onClick={handleDelete}>
                            -
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete}>
                            Rimuovi dal carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}