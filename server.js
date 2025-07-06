//main in cui importo mongoose, il modello di studenti, collego il db e creo le funzioni legate all'html
const express=require("express");
const app=express();
const port=3000;
const cookieParser=require('cookie-parser');
const dbCon=require('./backend/controller/DBcontroller')
const authRoutes=require("./backend/routes/authRoutes")
const cartRoutes=require('./backend/routes/cartRoutes')
//parsing dei cookie

app.use(cookieParser());
//Comunico con questo middleware a express di leggere il body delle richieste direttamente come file json
//in particolare analizza il body e se è in formato application/json lo converte automaticamente in un oggetto Javascript
//lo rende disponibile nella variabile req.body
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/cart',cartRoutes);


dbCon().then(()=>{
    app.listen(port, ()=>{
        console.log("Server started on port " + port)
    })
})





