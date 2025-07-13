import './Card.css'
import ButtonModify from './Button-Modify.jsx'
import ButtonDelete from './Button-Delete.jsx'

export default function Card2({nome, imgURL, descrizione, prezzo}){

    return(
        <div id="cardContainer1" className={"container-xl border p-3 m-3 rounded border-black"}>
            <div className={"row"}>
                <h1 className={"text-justify"}>{nome}</h1></div>
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
                    <ButtonModify></ButtonModify>
                    <ButtonDelete></ButtonDelete>
                </div>
            </div>
        </div>
    )
}