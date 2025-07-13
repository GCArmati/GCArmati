import Card2 from './Card2.jsx'
import {getAll} from '../routes/componentRoutes'
import {useState, useEffect} from 'react'
import {data} from "react-router-dom";

export default function ComponentList(){

    const [components, setComponents] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const data = await getAll();
                setComponents(data);
            } catch (err) {
                console.error("Errore nel recupero componenti:", err);
            }
        };
        fetchData();
    }, [components])

    return(
        <>
            {components.map((component) => (
                <Card2 key={component._id}
                       nome={component.name}
                       imgURL={component.imgUrl}
                       descrizione={component.description}
                       prezzo={component.price}
                       componentID={component._id}
                >
                </Card2>
            ))}
            {/*<Card2
                nome={components.nome}
                imgURL={components.imgURL}
                descrizione={components.descrizione}
                prezzo={components.prezzo}
            ></Card2>*/}
        </>
    )
}