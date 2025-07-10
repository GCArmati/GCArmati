const jwt=require('jsonwebtoken')
const {refreshTokenFetch}=require('../../frontend/src/routes/authRoutes')

//questo servirà solo nelle varie funzioni della logica della pagina
function verifyToken(req,res,next){
    const authHeader=req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({message:"Non autorizzato:token mancante o malformato"})
    }

    const token=authHeader.split(' ')[1]; //prende la prima parte separata dopo "Bearer "

    jwt.verify(token,process.env.LOGIN_TOKEN, async (err,decoded)=>{
        if(err){
            console.error('Errore nel verifica jwt: ',err.name, err.message);
            await refreshTokenFetch(); //se il refresh token è valido allora tutto bene, altrimenti se c'è un errore bisogna
            //rifare login



        }
        req.user = {
            id: decoded.userId,
            role: decoded.userRole //da aggiustare nella creazione del token
        }
        next();
    })
}


// verifico che l'utente che ha fatto richiesta sia un 'admin'
async function adminRoute(req, res, next){
    // se l'utente è autenticato e ha ruolo 'admin' posso eseguire la successiva operazione
    if(req.user && req.user.role === "Admin"){
        next()
    } else {
        return res.status(401).json({message: "Access denied - Admin only"});
    }
}

module.exports = {
    verifyToken,
    adminRoute
};