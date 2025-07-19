
export async function customFetch(url, options) {
    const token = localStorage.getItem('accessToken');

    const authOptions = {
        ...options,
        headers: {
            ...(options.headers ||{}),
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    };

    const response = await fetch(url, authOptions);

    if (response.status === 401 || response.status === 403) {
        try {
            const refreshResponse = await fetch('https://polibuilderv1.onrender.com/api/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            });


            if (!refreshResponse.ok) {
                console.error("PROBLEMA REFRESH TOKEN")
                throw new Error('Refresh token non valido');
            }

            const {accessToken} = await refreshResponse.json();

            if (!accessToken) {
                throw new Error('Nessun accessToken ricevuto');
            }

            localStorage.setItem('accessToken', accessToken);

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

    return response.json();
}

export async function addToCart(componentId) {
    try {
        const response = await customFetch('https://polibuilderv1.onrender.com/api/cart/addCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ componentId }),
            credentials: 'include'
        });

        const data = await response;
        return { ok: response.ok, message:data.message };
    } catch (e) {
        return { ok: false, message: "Devi effettuare il Login per aggiungere al carrello."  };
    }
}

export async function getCart() {
    try {
        const response = await customFetch('https://polibuilderv1.onrender.com/api/cart', {
            method: 'GET',
            credentials: 'include',

        });

        return {cart:response.cart, tot:response.prezzoTot,message:response.message}
    } catch (e) {
        return {message: 'Errore di connessione al server.'};
    }
}

export async function removeFromCart(componentId) {
    await customFetch("https://polibuilderv1.onrender.com/api/cart/remove", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ componentId }),
    });

}

export async function decreaseAmountFetch(componentId){
    try{
        await customFetch('https://polibuilderv1.onrender.com/api/cart/decrease', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ componentId }),
            credentials: 'include'
        });
    }catch(e){
        return {message:"Errore di connessione."}
    }
}

export async function increaseAmountFetch(componentId){

    try{
        await customFetch('https://polibuilderv1.onrender.com/api/cart/increase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ componentId }),
            credentials: 'include'
        });

    }catch(e){
        return {message:'Errore di connessione.'}
    }
}