const url="http://localhost:3000"

async function register(email, password, username) {
    try {
        const response = await fetch(`${url}api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, username })
        });

        const data=await response.json();
        if(data.accessToken){
            localStorage.setItem('accessToken',data.accessToken)
        }
        return data;

    } catch (err) {
        console.error('Errore durante la registrazione:', err);
        throw err;
    }
}

async function login(email,password){
    try{
        const response=await fetch(`${url}api/auth/login`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include',
            body:JSON.stringify({email,password})
        });

        return await response.json();
    }catch(err){
        console.error("Errore in fase di login:",err);
        throw err;
    }
}

async function refreshTokenFetch(){
    try{
        const response=await fetch(`${url}api/auth/refresh`,{
            method:'POST',
            credentials:'include',

        });
        const data=await response.json();
        if(data.accessToken){
            localStorage.setItem('accessToken',data.accessToken)
        }
    }catch(e){
        console.error("Errore in fase di refresh token: ",e);
        throw e;
    }

}

async function logout(){
    try{
        const response=await fetch(`${url}api/auth/logout`,{
            method:'POST',
            credentials:'include',
        });
        return await response.json();
    }catch(e){
        console.error("Errore in fase di refresh token: ",e);
        throw e;
    }
}

module.exports={
    refreshTokenFetch
}