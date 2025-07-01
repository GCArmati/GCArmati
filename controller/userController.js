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
    await dbCon();
    //da vedere sto fatto di req.body
    const {username,password,userEmail}=req.body;
    try{
        const emailExisting=await Users.findOne({userEmail});
        if(emailExisting)return res.status(400).json({error:"Email già in uso"});
        const existing=await Users.findOne({username});
        if(existing)return res.status(400).json({error:"Username già in uso"});

        await userCreate(username,password,userEmail);

        res.status(201)
        res.json({message:"Registrazione completata"})
    }catch(err){
        //lo so che in console non mi serve a una ciola (forse)
        console.error(err);
        res.status(500).json({error:"Errore interno"});
    }
    await mongoose.disconnect();

}
//creo una funzione che genera due tokens

const generateTokens=(userID,username)=>{
    const accessToken=jwt.sign({userId:userID},process.env.LOGIN_TOKEN,{expiresIn:"25m"});
    const refreshToken=jwt.sign({userId:userID},process.env.REFRESH_TOKEN,{expiresIn:"6d"});
    return  {accessToken,refreshToken};

}


//funzione di login che sfrutta le funzioni per generare tokens

async function login(req,res){
    await dbCon()

    const userEmail=req.body.userEmail;
    const password=req.body.password;
    try{
        if(!userEmail||!password){
            return res.status(400).json({message:"Email e password sono obbligatori"})
        }
        const user=await Users.findOne({username})
        if(!user) return res.status(400).json({error:"Utente non trovato"})



        const valid= await user.passwordCompare(pwd)
        if(!valid) return res.status(401).json({error:"Password Errata. Login Non effettuato."})

        const {accessToken,refreshToken}=generateTokens(user.__id,username);
        await RefreshToken.create({token:refreshToken,userId:user.__id});

        //salva refresh cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,         // Accessibile solo dal server web
            secure: process.env.NODE_ENV === 'production', // Solo su HTTPS in produzione
            sameSite: 'Strict',     // Aiuta a prevenire CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni (come la scadenza del token)
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
    await mongoose.disconnect();

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
    try{const foundToken=await RefreshToken.findOne({token:refreshTokenFromCookie});
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
    await dbCon()
    try{
        const user=await Users.create({
            userName:username,
            password:pw,
            email:userEmail,
        })
        console.log("Utente creato");
        console.log(user)
    }catch(err){
        console.error(err)
    }
    await mongoose.disconnect()

}




module.exports={
    register,
    login,

};
