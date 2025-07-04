const jwt=require('jsonwebtoken')

//questo servirà solo nelle varie funzioni della logica della pagina
function verifyToken(req,next){
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

// Esempio di middleware per verificare un ruolo specifico (se necessario)
// const verifyRole = (allowedRoles) => {
//     return (req, res, next) => {
//         if (!req.userRole || !allowedRoles.includes(req.userRole)) {
//             return res.status(403).json({ message: 'Proibito: Ruolo non sufficiente' });
//         }
//         next();
//     };
// };

module.exports = { verifyToken /*, verifyRole */ };