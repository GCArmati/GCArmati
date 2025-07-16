import {customFetch} from './cartRoutes'

export async function getAll(){
    try{
        const response = await customFetch(`http://localhost:3000/api/component/getAll`, {
            method: 'GET',
            credentials: 'include',
        });

        return await response;

    }catch(error){
        console.log("Errore in fase di caricamento delle componenti:", error.message)
        throw error;
    }
}

export async function create(component){
    try{
        const response = await customFetch(`http://localhost:3000/api/component/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(component),
        })

        const res = await response;

        console.log(localStorage.getItem('currentUser'));

        if(localStorage.getItem('currentUser')!=="Admin"){
            throw new Error("Non sei autorizzato");
        }

        return res;

    }catch(error){
        console.log("Errore in fase di modifica", error.message);
        throw error;
    }
}

export async function editPrice(id, price){
    try{
        const response = await customFetch(`http://localhost:3000/api/component/modifyprice/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({price}),
        })

        const res = await response;

        console.log(localStorage.getItem('currentUser'));

        if(localStorage.getItem('currentUser')!=="Admin"){
            throw new Error("Non sei autorizzato");
        }

        return res;

    }catch(error){
        console.log("Errore in fase di modifica", error.message);
        throw error;
    }
}

export async function removeComponent(id){
    try{
        const response = await customFetch(`http://localhost:3000/api/component/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const res = await response;

        console.log(localStorage.getItem('currentUser'));

        if(localStorage.getItem('currentUser')!=="Admin"){
            throw new Error("Non sei autorizzato");
        }

        return res;


    }catch(error){
        console.log("Errore in fase di cancellazione", error.message);
        throw error;
    }
}

export async function getByCategory(categoria){
    try{
        const response = await customFetch(`http://localhost:3000/api/component/category/${categoria}`, {
            method: 'GET',
            credentials: 'include',
        });

        return await response;

    }catch(error){
        console.log("Errore nel recupero dati dal DataBase");
        throw error;
    }
}