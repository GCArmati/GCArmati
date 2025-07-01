import express from 'express';
import {connectDB} from './db/connectDB.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse body delle richieste

app.listen(PORT, ()=>{
    connectDB(); // connessione al DB
    console.log(`Server running on port ${PORT}`);
});