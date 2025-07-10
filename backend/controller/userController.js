const Users =require('../model/userModel')
const RefreshToken=require("../model/tokenModel")
const jwt = require('jsonwebtoken');
require('dotenv').config();

//creo una funzione che genera due tokens

const generateTokens=(userID,userRole)=>{
    const accessToken=jwt.sign({userId:userID,userRole:userRole},process.env.LOGIN_TOKEN,{expiresIn:"3m"});
    const refreshToken=jwt.sign({userId:userID,userRole:userRole},process.env.REFRESH_TOKEN,{expiresIn:"6d"});
    return  {accessToken,refreshToken};

}

//funzione per fare register con la create
//nel body della richiesta ci deve essere username, password ed email
async function register(req,res){
    //da vedere sto fatto di req.body
    const {username,password,email}=req.body;
    try{
        const emailExisting=await Users.findOne({
            email: email
        });
        if(emailExisting)return res.status(400).json({error:"Email già in uso"});
        const existing=await Users.findOne({
            userName: username
        });
        if(existing)return res.status(400).json({error:"Username già in uso: "});

       const errore= await userCreate(username,password,email);
       if(errore){
           res.status(500).json({message:"Errore interno"})
       }
       else{
           res.status(201).json({message:"Registrazione completata"})
       }
    }catch(err){
        //lo so che in console non mi serve a una ciola (forse)
        console.error(err);
        res.status(500).json({error:"Errore interno"});
    }
}



//funzione di login che sfrutta le funzioni per generare tokens
//nel body della richiesta ci deve essere email e password
async function login(req,res){

    const email=req.body.email;
    const password=req.body.password;
    try{
        if(!email||!password){
            return res.status(400).json({message:"Email e password sono obbligatori"})
        }
        const user=await Users.findOne({email:email})
        if(!user) return res.status(400).json({error:"Utente non trovato"})



        const valid= await user.comparePassword(password)
        if(!valid) return res.status(401).json({error:"Password Errata. Login Non effettuato."})

        const {accessToken,refreshToken}=generateTokens(user._id,user.role);
        await RefreshToken.create({
            token:refreshToken,
            userId:user._id,
        });

        //salva refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,         // Accessibile solo dal server web
            secure: process.env.NODE_ENV === 'production', // Solo su HTTPS in produzione, in sviluppo sarà possibile usare anche HTTP
            sameSite: 'Strict',     // Aiuta a prevenire CSRF
            maxAge:  6* 24 * 60 * 60 * 1000 // 6 giorni (come la scadenza del token)
        });
        // Invia l'access token nel corpo della risposta
        res.json({
            message: "Login effettuato con successo!",
            accessToken
        });
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Errore interno durante login"});
    }

}


async function refreshToken(req,res){ //da esportare
    const cookies=req.cookies;

    //controllo con il CHAINING OPERATOR ?. Serve a evitare errori nel caso
    //l'oggetto prima del punto (cookies) sia null o undefined
    //if(!cookies.jwt) errore se cookies è undefined
    //in sostanza se il cookie non esiste o non è definito oppure non c'è
    //il cookie chiamato jwt entra nel corpo dell'if
    if(!cookies?.jwt){
        return res.status(401).json({ message: "Non autorizzato: Refresh token mancante." });
    }
    //prendo dal fottuto BISCOTTO il token che avevo messo nella fase di login
    const refreshTokenFromCookie=cookies.jwt;

    try{
        const foundToken=await RefreshToken.findOne ({
        token: refreshTokenFromCookie
        });
        //se non lo ha trovato nel db ci si fa qualche domanda, evidentemente è una banana
        if(!foundToken){
            //può succedere infatti di trovarlo nel cookie ma non nel DB, molto male amigo
            // può voler dire che è scaduto o compromesso, quindi gli chiedo il login
            // (TODO login)
            return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto. Effettuare il login nuovamente" });
        }

        jwt.verify(refreshTokenFromCookie,process.env.REFRESH_TOKEN,async(err,decoded)=>{
            if(err || foundToken.userId.toString()!== decoded.userId ) {
                // Se la verifica fallisce o l'ID utente nel token non corrisponde a quello nel DB
                //(TODO login)
                return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto. Effettuare il login nuovamente." });
            }
            //dal momento che è valido posso generare il nuovo accessToken
            const newAccessToken = jwt.sign(
                { userId: decoded.userId },
                process.env.LOGIN_TOKEN,
                { expiresIn: '25m' }
            );
            res.json({ accessToken: newAccessToken });
        });

    }catch(e){
        res.status(500).json({message:"Internal Error"})
    }
}


async function logout(req,res){ //da esportare
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }//Nessun cookie da rimuovere per l'utente
    const refreshTokenFromCookie=cookies.jwt;
    try{
        await RefreshToken.deleteOne({
            token:refreshTokenFromCookie
        })
        //pulisco il cookie dal browser
        res.clearCookie("jwt",{
            httpOnly:true,
            secure:process.env.NODE_ENV,
            sameSite:"strict",
        })
        res.status(200).json({message:'Logout effettuato con successo.'})
    }catch(e){
        console.error("Errore durante il logout: "+e);
        res.status(500).json({message:'Errore interno in fase di logout.'})
    }



}

//funzione per creare un utente dando in pasto username e password,

async function userCreate(username,pw,userEmail){
    try{
        const user=await Users.create({
            userName:username,
            password:pw,
            email:userEmail,
        })
        console.log("Utente creato");
        console.log(user)
    }catch(err){
        console.error(err);
        return err;
    }


}


module.exports={
    refreshToken,
    logout,
    register,
    login,

};
