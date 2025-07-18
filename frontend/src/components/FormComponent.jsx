import {create} from "../routes/componentRoutes.js";
import {useState} from "react";
import './FormModifyComponent.css';

export default function FormComponent(){
    const [formData, setFormData] = useState({
        nome: "",
        imgUrl: "",
        descrizione: "",
        prezzo: 0,
        categoria: "",
    })

    const handleInput = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        const component = {
            name: formData.nome,
            imgUrl: formData.imgUrl,
            description: formData.descrizione,
            price: formData.prezzo,
            category: formData.categoria,
        };
        setFormData({
            nome: "",
            imgUrl: "",
            descrizione: "",
            prezzo: 0,
            categoria: "",
        });
        try {
            await create(component);
            alert("Dati salvati con successo!");
        } catch (error) {
            alert("Errore nel salvataggio.");
        }
    }

    return(
        <form className="modify-form mx-auto p-2 " onSubmit={handleCreate}>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">Nome:</label>
                <input
                    required
                    type="text"
                    name="nome"
                    onChange={handleInput}
                    value={formData.nome}
                />
            </div>
            <div className="modify-group row mb-3 align-items-center">
            <label className="modify-label col-sm-3 col-form-label text-sm-start">Immagine:</label>
                <input
                    type={"text"}
                    required
                    name={"imgUrl"}
                    onChange={handleInput}
                    value={formData.imgUrl}
                />
            </div>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">Descrizione:</label>
                <textarea
                    cols="30"
                    rows="10"
                    name="descrizione"
                    onChange={handleInput}
                    value={formData.descrizione}
                >
                </textarea>
            </div>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">Prezzo:</label>
                <input
                    type="number"
                    min="0"
                    required
                    name={"prezzo"}
                    onChange={handleInput}
                    value={formData.prezzo}
                />
            </div>
            <div className="modify-group row mb-3 align-items-center">
                <label className="modify-label col-sm-3 col-form-label text-sm-start">Categoria:</label>
                <select name="categoria" required onChange={handleInput} value={formData.categoria}>
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
            <button type={"submit"}>Crea Componente</button>
        </form>
    )
}