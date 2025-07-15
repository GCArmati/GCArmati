import {useSearchParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {editPrice, getAll} from "../routes/componentRoutes.js";
import './FormModifyComponent.css';


export default function FormModifyComponent(){
    const [searchParams] = useSearchParams()
    const componentId = searchParams.get('id')
    const [component, setComponent] = useState(null)

    let navigate = useNavigate();

    useEffect(()=> {
        const fetchData = async () => {
            try {
                console.log(componentId)
                const data = await getAll();
                const selected = data.find((object) => object._id===componentId);
                setComponent(selected);
                console.log(selected);
            } catch (err) {
                console.error("Errore nel recupero componenti:", err);
            }
        };
        fetchData();
    }, [componentId]);

    const handleInput = (e) => {
        const { name, value, type } = e.target;
        setComponent((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await editPrice(componentId, component.price);
            alert("Dati salvati con successo!");
        } catch (error) {
            alert("Errore nel salvataggio.");
        }
        navigate("/dashboard");
    }

    if (!component) {
        return <p>Caricamento in corso...</p>;
    }

    return (
        <form className="modify-form mx-auto p-2" onSubmit={handleEdit}>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">Nome:</label>
                <input
                    type="text"
                    name="nome"
                    value={component.name}
                    disabled
                />
            </div>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">URL Immagine:</label>
                <input
                    type={"text"}
                    name={"imgUrl"}
                    value={component.imgUrl}
                    disabled
                />
            </div>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">Descrizione:</label>
                <textarea
                    cols="30"
                    rows="10"
                    name="descrizione"
                    value={component.description}
                    disabled
                >
                </textarea>
            </div>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">Prezzo:</label>
                <input
                    type="number"
                    min="0"
                    required
                    name={"price"}
                    onChange={handleInput}
                    value={component.price}
                />
            </div>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">Categoria:</label>
                <select name="categoria" value={component.category} disabled >
                    <option value=""></option>
                    <option value={"processor"}>Processor</option>
                    <option value={"motherboard"}>Motherboard</option>
                    <option value={"cpu-cooler"}>CPU Cooler</option>
                    <option value={"case"}>Case</option>
                    <option value={"graphics-card"}>Graphics Card</option>
                    <option value={"ram"}>RAM</option>
                    <option value={"storage"}>Storage</option>
                    <option value={"case-cooler"}>Case Cooler</option>
                    <option value={"power-supply"}>Power Supply</option>
                </select>
            </div>
            <button type="submit" className="modify-button">Salva</button>
        </form>
    )
}