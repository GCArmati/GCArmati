const Users =require("../model/userModel");
const mongoose=require('mongoose');
const RefreshToken=require("../model/tokenModel")
const jwt = require('jsonwebtoken');
require('dotenv').config();


//funzione INTERNA per connettersi al db,
// mantengo pulite tutte le operazioni effettuando disconnessione
async function dbCon(){
    try{
        await mongoose.connect("mongodb+srv://commercialfra:"+process.env.DB_CON_PSW+"@cluster0.cezfbna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connesso al database, operazione:")
    }catch(err) {
        console.error(err);
    }
}


//funzione per fare register con la create

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
        if(existing)return res.status(400).json({error:"Username già in uso"});

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
//creo una funzione che genera due tokens

const generateTokens=(userID)=>{
    const accessToken=jwt.sign({userId:userID},process.env.LOGIN_TOKEN,{expiresIn:"25m"});
    const refreshToken=jwt.sign({userId:userID},process.env.REFRESH_TOKEN,{expiresIn:"6d"});
    return  {accessToken,refreshToken};

}


//funzione di login che sfrutta le funzioni per generare tokens

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

        const {accessToken,refreshToken}=generateTokens(user._id);
        await RefreshToken.create({
            token:refreshToken,
            userId:user._id,
        });

        //salva refresh cookie
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
        res.status(500).json({error:"Errore interno"});
    }

}


async function refreshToken(req,res){ //da esportare
    const cookies=req.cookies;

    //controllo con il CHAINING OPERATOR ?. serve a evitare errori nel caso
    //l'oggetto prima del punto (cookies) sia null o undefined
    //if(!cookies.jwt) errore se cookies è undefined
    //in sostanza se il cookie non esiste o non è definito oppure non c'è
    //il cookie chiamato jwt entra nel corpo dell'if
    if(!cookies?.jwt){
        return res.status(401).json({ message: "Non autorizzato: Refresh token mancante." });
    }
    const refreshTokenFromCookie=cookies.jwt;
    try{const foundToken=await RefreshToken.findOne({
        token:refreshTokenFromCookie
        });
        if(!foundToken){
            //può voler dire che è scaduto o compromesso
            return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto." });
        }

        jwt.verify(refreshTokenFromCookie,process.env.REFRESH_TOKEN,async(err,decoded)=>{
            if(err||foundToken.userId.toString() !==decoded.userId) {
                // Se la verifica fallisce o l'ID utente nel token non corrisponde a quello nel DB
                return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto." });
            }
        });
        // Il refresh token è valido, genera un nuovo access token
        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken: newAccessToken });

    }catch(e){
    }
}


async function logout(req,res){ //da esportare



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
    dbCon,
    register,
    login,

};
