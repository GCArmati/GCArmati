import express from 'express';
import dotenv from 'dotenv'; //package per usare .env
import {connectDB} from "./db/connectDB.js"; // importo la funzione connectDB dal file connectDB.js
dotenv.config();

import componentRoutes from "./routes/component.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Metodo Routing: app.'method'("percorso", (req, res) => {})
app.get("/", (req, res) => {
    res.send("Hello World! 123");
})

app.use(express.json()); //allows us to parse incoming requests:req.body

// attivo un middleware, al cui interno ho fissato tutte le rout indicate nel file auth.route.js
app.use("/api/component", componentRoutes);

// configurazione del server
app.listen(PORT, () => {
    connectDB();
    console.log('Server running on port: ', PORT);
});