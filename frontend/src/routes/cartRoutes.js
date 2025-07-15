
export async function customFetch(url, options = {}) { //pensata per richiedere accessToken in automatico e poi ripetere l'operazione
    //da sola
    // Estrae il token attuale
    const token = localStorage.getItem('accessToken');

    // Applica header di autorizzazione se il token è presente
    const authOptions = {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    };

    // Prova la richiesta iniziale
    const response = await fetch(url, authOptions);

    // Se è 401, prova a fare il refresh del token
    if (response.status === 401) {
        try {
            const refreshResponse = await fetch('http://localhost:3000/api/auth/refresh', {
                method: 'POST',
                credentials: 'include' // Include i cookie per inviare il refresh token
            });

            if (!refreshResponse.ok) {
                throw new Error('Refresh token non valido');
            }

            const {accessToken} = await refreshResponse.json();

            if (!accessToken) {
                throw new Error('Nessun accessToken ricevuto');
            }

            // Salva il nuovo token
            localStorage.setItem('accessToken', accessToken);

            // Ritenta la richiesta originale con il nuovo token
            const retryOptions = {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const data = (await fetch(url, retryOptions));
            return data.json();
        } catch (err) {
            console.error('Errore durante il refresh del token:', err);
            throw err;
        }
    }

    // Se non è 401 ritorna normalmente
    return response.json();
}

export async function addToCart(componentId) {
    try {
        const response = await customFetch('http://localhost:3000/api/cart/addCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ componentId }),
            credentials: 'include'
        });

        const data = await response.json();
        return { ok: response.ok, message:data.message };
    } catch (e) {
        return { ok: false, message: "Errore connessione server"  };
    }
}

export async function getCart() {
    try {
        const response = await customFetch('http://localhost:3000/api/cart', {
            method: 'GET',
            credentials: 'include', // se usi cookie-based auth
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return await response.json();
    } catch (e) {
        return {message: 'Errore di connessione al server.'};
    }
}

export async function decreaseAmountFetch(){
    try{



    }catch(e){
        return {message:"Errore di connessione."}
    }

}

export async function increaseAmountFetch(){
    try{

    }catch(e){
        return {message:'Errore di connessione.'}
    }
}