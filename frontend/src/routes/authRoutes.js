
export async function register(email, password, username) {
    try {
        const response = await fetch(`http://localhost:3000/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, username })
        });

        return await response.json();


    } catch (err) {
        console.error('Errore durante la registrazione:', err);
        throw err;
    }
}

export async function login(email,password){
    try{
        const response=await fetch(`http://localhost:3000/api/auth/login`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include',
            body:JSON.stringify({email,password})
        });

        const data=await response.json();

        if(data.accessToken){
            localStorage.setItem('accessToken',data.accessToken)
        }
        if(data.role){
            localStorage.setItem('currentUser',data.role)
        }
        return data;
    }catch(err){
        console.error("Errore in fase di login:",err);
        throw err;
    }
}
/*
export async function refreshTokenFetch(){
    try{
        const response=await fetch(`http://localhost:3000/api/auth/refresh`,{
            method:'POST',
            credentials:'include',

        });
        const data=await response.json();
        if(data.accessToken){
            localStorage.setItem('accessToken',data.accessToken)
        }
        return data;
    }catch(e){
        console.error("Errore in fase di refresh token: ",e);
        throw e;
    }
}
*/
export async function logout(){
    try{
        const response=await customFetch(`http://localhost:3000/api/auth/logout`,{
            method:'POST',
            credentials:'include',
        });
        return await response.json();
    }catch(e){
        console.error("Errore in fase di refresh token: ",e);
        throw e;
    }
}

