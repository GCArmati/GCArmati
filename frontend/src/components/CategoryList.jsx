import Card from './Card.jsx'
import {useState, useEffect} from 'react'
import {getByCategory} from "../routes/componentRoutes.js";
import {useSearchParams} from "react-router-dom";

export default function CategoryList(){

    const [searchParams] = useSearchParams()
    const categoria = searchParams.get('category')
    const [components, setComponents] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const data = await getByCategory(categoria);
                setComponents(data);
                console.log(data);
            } catch (err) {
                console.error("Errore nel recupero componenti:", err);
            }
        };
        fetchData();
    }, [categoria])

    return(
        <>
            {components.map((component) => (
                <Card key={component._id}
                       nome={component.name}
                       imgURL={component.imgUrl}
                       descrizione={component.description}
                       prezzo={component.price}
                       componentID={component._id}
                >
                </Card>
            ))}
        </>
    )
}