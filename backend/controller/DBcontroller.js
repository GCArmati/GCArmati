const mongoose=require('mongoose');
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

module.exports = dbCon;