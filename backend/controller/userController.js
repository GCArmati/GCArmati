const Users =require('../model/userModel')
const RefreshToken=require("../model/tokenModel")
const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateTokens=async (userID)=>{
    let dataBase=true;

    const accessToken=jwt.sign({userId:userID},process.env.LOGIN_TOKEN,{expiresIn:"1m"});
    const refreshTokenFromDataBase=await RefreshToken.findOne({userId: userID});
    if(!refreshTokenFromDataBase){
        dataBase=false;
        const refreshToken=jwt.sign({userId:userID},process.env.REFRESH_TOKEN,{expiresIn:"6d"});
        return {accessToken,refreshToken,dataBase};
    }else{
        const refreshToken=refreshTokenFromDataBase.token
        return {accessToken,refreshToken,dataBase};
    }
}


async function register(req,res){
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

        console.error(err);
        res.status(500).json({error:"Errore interno"});
    }
}



async function login(req,res){
    const email=req.body.email;
    const password=req.body.password;

    try{
        if(!email||!password){
            return res.status(400).json({error:"Email e password sono obbligatori"})
        }
        const user=await Users.findOne({email: email})

        if(!user) return res.status(400).json({error:"Utente non trovato"})

        const valid= await user.comparePassword(password)
        if(!valid) return res.status(401).json({error:"Password Errata. Login Non effettuato."})

        const {accessToken,refreshToken,dataBase}=await generateTokens(user._id);
        console.log(dataBase," ", refreshToken)
        if(!dataBase){
            await RefreshToken.create({
                token:refreshToken,
                userId:user._id,
            });
        }


        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge:  6* 24 * 60 * 60 * 1000,
        });


        res.json({
            message: "Login effettuato con successo!",
            accessToken,
            role:user.role
        });
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Errore interno durante login"});
    }

}


async function refreshToken(req,res){ //da esportare
    const cookies=req.cookies;

    if(!cookies?.jwt){
        return res.status(401).json({ message: "Non autorizzato: Refresh token mancante." });
    }

    const refreshTokenFromCookie=cookies.jwt;

    try{
        const foundToken=await RefreshToken.findOne ({
            token: refreshTokenFromCookie
        });

        if(!foundToken){

            return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto." });
        }

        jwt.verify(refreshTokenFromCookie,process.env.REFRESH_TOKEN,async(err,decoded)=>{
            if(err || foundToken.userId.toString()!== decoded.userId ) {

                return res.status(403).json({ message: "Proibito: Refresh token non valido o scaduto." });
            }

            const newAccessToken = jwt.sign(
                { userId: decoded.userId,},
                process.env.LOGIN_TOKEN,
                { expiresIn: '1m' }
            );
            res.json({ accessToken: newAccessToken });
        });

    }catch(e){
        res.status(500).json({message:"Internal Error"})
    }
}


async function logout(req,res){
    const cookies=req.cookies;

    if(!cookies?.jwt){
        return res.sendStatus(204);
    }
    const refreshTokenFromCookie=cookies.jwt;

    try{
        await RefreshToken.deleteOne({
            token:refreshTokenFromCookie
        })

        res.clearCookie("jwt",{
            httpOnly:true,
            secure:true,
            sameSite:"None",
        })

        res.status(200).json({message:'Logout effettuato con successo.'})
    }catch(e){
        console.error("Errore durante il logout: "+e);
        res.status(500).json({message:'Errore interno in fase di logout.'})
    }
}


async function userCreate(username,pw,userEmail){
    try{
        const user=await Users.create({
            userName:username,
            password:pw,
            email:userEmail
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
