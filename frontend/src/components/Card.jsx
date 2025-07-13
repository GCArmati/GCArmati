import './Card.css'
import Button1 from './Button1.jsx'

function Card({name,imgURL,description,prezzo}){
    return(
        <div id="cardContainer1" className={"container-xl border p-3 m-3 rounded border-black"}>
            <div className={"row"}>
                <h1 className={"text-justify"}>componente</h1></div>
            <div  className="row">
                <div className="col-md-5">
                    <img src="https://www.yeppon.it/guide-acquisti/wp-content/uploads/2022/09/miglior-pc-gaming.jpg" alt="immagine"></img>
                </div>
                <div className="col-3 col-md-4">
                    <p className={"text-left"}>Descrizione</p>
                </div>
                <div className="col-3 col-md-3 ">
                    <p>Prezzo</p>
                    <Button1></Button1>

                </div>
            </div>
        </div>
    )
}

export default Card
