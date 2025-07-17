const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser=require('cookie-parser');

const dbCon = require('./controller/DBcontroller');
const authRoutes = require('./routes/authRoutes');
const componentRoutes = require('./routes/componentRoutes');
const cartRoutes=require('./routes/cartRoutes')

const app = express();

const Port = 3000;

app.use(cors({
    origin: 'https://polibuilder-7mce.onrender.com', //5173
    credentials: true
}));
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/component", componentRoutes);
app.use("/api/cart", cartRoutes);

dbCon().then(()=>{
    app.listen(Port, ()=>{
        console.log(`Server is running on: http://localhost:${Port}`)
    })
})