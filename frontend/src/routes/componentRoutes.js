export async function getAll(){
    try{
        const response = await fetch(`http://localhost:3000/api/component/getAll`, {
            method: 'GET',
            credentials: 'include', //serve per includere il cookie - da testare
        });

        if(!response.ok){
            throw new Error('Errore nel recupero dati componenti');
        }

        const data = await response.json();

        if(data.accessToken){
            localStorage.setItem('accessToken',data.accessToken)
        }

        return data;
    }catch(error){
        console.log("Errore in fase di caricamento delle componenti:", error.message)
        throw error;
    }
}

export async function create(component){
    try{
        const response = await fetch(`http://localhost:3000/api/component/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            //credentials: 'include', // da testare
            body: JSON.stringify(component),
        })

        if(!response.ok){
            throw new Error('Errore nel recupero dati del componente');
        }

        return await response.json();

    }catch(error){
        console.log("Errore in fase di modifica", error.message);
        throw error;
    }
}