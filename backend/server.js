import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './lib/connectDB.js';
import componentRoutes from './routes/component.route.js';

dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/components", componentRoutes);

app.listen(Port, () => {
    connectDB();
    console.log(`Server is running on: http://localhost:${Port}`);
})