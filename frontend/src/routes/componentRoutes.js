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
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc1MmJmNWI2NTk2YmIxOTY4NzRlZjAiLCJ1c2VyUm9sZSI6IlV0ZW50ZSIsImlhdCI6MTc1MjUxMDQ4OCwiZXhwIjoxNzUyNTExOTg4fQ.XYYopfwxYETxOLNF95PcR6uyy8M1UWmQJJLYJqmPX6M"
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

export async function editPrice(id, price){
    try{
        const response = await fetch(`http://localhost:3000/api/component/modifyprice/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc1MmJmNWI2NTk2YmIxOTY4NzRlZjAiLCJ1c2VyUm9sZSI6IlV0ZW50ZSIsImlhdCI6MTc1MjUxMDQ4OCwiZXhwIjoxNzUyNTExOTg4fQ.XYYopfwxYETxOLNF95PcR6uyy8M1UWmQJJLYJqmPX6M`
            },
            //credentials: 'include', // da testare
            body: JSON.stringify({price}),
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

export async function removeComponent(id){
    try{
        const response = await fetch(`http://localhost:3000/api/component/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc1MmJmNWI2NTk2YmIxOTY4NzRlZjAiLCJ1c2VyUm9sZSI6IlV0ZW50ZSIsImlhdCI6MTc1MjUxMDQ4OCwiZXhwIjoxNzUyNTExOTg4fQ.XYYopfwxYETxOLNF95PcR6uyy8M1UWmQJJLYJqmPX6M"
            }
        })

        if(!response.ok){
            throw new Error('Errore nel recupero dati del componente');
        }

        return await response.json();

    }catch(error){
        console.log("Errore in fase di cancellazione", error.message);
        throw error;
    }
}

export async function getByCategory(categoria){
    try{
        const response = await fetch(`http://localhost:3000/api/component/category/${categoria}`,{
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok){
            throw new Error('Errore nel recupero dei componenti');
        }

        const data = await response.json();

        if(data.accessToken){
            localStorage.setItem('accessToken',data.accessToken)
        }

        return data;

    }catch(error){
        console.log("Errore nel recupero dati dal DataBase");
        throw error;
    }
}