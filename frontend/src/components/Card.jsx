import './Card.css'

function Card({name,imgURL,description,prezzo}){
    return(
        <div className={"container bg-light border p-3 m-3 rounded"}>
            <div className={"row"}>
                <h1>componente</h1></div>
            <div  className="row">
                <div className="col-4">
                    <img src="https://www.yeppon.it/guide-acquisti/wp-content/uploads/2022/09/miglior-pc-gaming.jpg" alt="immagine"></img>
                </div>
                <div className="col-5">
                    <p>Descrizione</p>
                </div>
                <div className="col-3">
                    <p>Prezzo</p>


                </div>
            </div>

        </div>
    )
}

export default Card
