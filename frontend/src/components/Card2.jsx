import './Card.css'
import ButtonDelete from './Button-Delete.jsx'
import {createSearchParams, useNavigate} from "react-router-dom";



export default function Card2({nome, imgURL, descrizione, prezzo, componentID}){

    const navigate = useNavigate()

    const handleModify = () => {
        navigate({
            pathname: "/modify",
            search:createSearchParams({id: componentID,}).toString()
        })
        console.log(componentID);
    }

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
                    <button className={"btn btn-primary"} onClick={handleModify}>
                        Modifica Prezzo
                    </button>
                    <ButtonDelete></ButtonDelete>
                </div>
            </div>
        </div>
    )
}