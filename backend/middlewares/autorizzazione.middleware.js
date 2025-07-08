import jwt from 'jsonwebtoken';
import User from '../models/User.js'

// verifico che l'utente che effettua la richiesta sia stavo autenticato
export const protectRoute = async (req, res, next) => {
    try{
        // estraggo dall'oggetto 'request' il suo cookie in cui è contenuto l'Access-Token/Login-Token
        const accessToken = req.cookies.accessToken;

        // se l'utente non è stato autenticato restituisco errore
        if(!accessToken){
            return res.status(401).json({message: "Unauthorized - No access token provided"});
        }

        try{
            const decoded = jwt.verify(accessToken, process.env.LOGIN_TOKEN);
            const user = await User.findById(decoded.userId).select("-password");

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
export const adminRoute = async (req, res, next) => {
    // se l'utente è autenticato e ha ruolo 'admin' posso eseguire la successiva operazione
    if(req.user && req.user.role === "admin"){
        next()
    } else {
        return res.status(401).json({message: "Access denied - Admin only"});
    }
}