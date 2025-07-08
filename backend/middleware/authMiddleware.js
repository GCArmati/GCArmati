const jwt=require('jsonwebtoken')
const Users =require('../model/userModel')

//questo servirà solo nelle varie funzioni della logica della pagina
function verifyToken(req,res,next){
    const authHeader=req.header.authorization || req.header.Authorization;

    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({message:"Non autorizzato:token mancante o malformato"})
    }

    const token=authHeader.split(' ')[1]; //prende la prima parte separata dopo "Bearer "

    jwt.verify(token,process.env.LOGIN_TOKEN, (err,decoded)=>{
        if(err){
            console.error('Errore nel verifica jwt: ',err.name, err.message);
            return res.status(403).json({message:'Proibito: Token non valido o scaduto'})
        }
        req.userId=decoded.userId;
        // req.userRole = decoded.role; solo se serve il ruolo
        next();
    })
}

// verifico che l'utente che effettua la richiesta sia stavo autenticato
async function protectRoute(req, res, next){
    try{
        // estraggo dall'oggetto 'request' il suo cookie in cui è contenuto l'Access-Token/Login-Token
        const accessToken = req.cookies.accessToken;

        // se l'utente non è stato autenticato restituisco errore
        if(!accessToken){
            return res.status(401).json({message: "Unauthorized - No access token provided"});
        }

        try{
            const decoded = jwt.verify(accessToken, process.env.LOGIN_TOKEN);
            const user = await Users.findById(decoded.userId).select("-password");

            // se l'utente non esiste nel DB restituisco errore
            if(!user){
                return res.status(401).json({message: "User not found"});
            }

            // pongo i dati dell'utente nel DB in quello dell'oggetto 'request' per futuri controller
            req.user = user;

            next();
        }catch(error){
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({message: "Unauthorized - Access token expired"});
            }

            throw error;
        }

    }catch(error){
        console.log("Error in protectRoute middleware", error.message);
        res.status(401).json({message: "Unauthorized - Invalid access token"});
    }
}

// verifico che l'utente che ha fatto richiesta sia un 'admin'
async function adminRoute(req, res, next){
    // se l'utente è autenticato e ha ruolo 'admin' posso eseguire la successiva operazione
    if(req.user && req.user.role === "admin"){
        next()
    } else {
        return res.status(401).json({message: "Access denied - Admin only"});
    }
}

module.exports = {
    verifyToken,
    protectRoute,
    adminRoute
};