import express from 'express';
import cors from 'cors';

import pharmaRoutes from './routes/pharmacy/api.js';
import db from "./config/db.js";

const app = express();
const { setConnection } = db;
setConnection();

app.use(cors({
    origin: '*', 
    credentials: true,
}));
app.use(express.json());

app.use('/api', pharmaRoutes);

app.listen(3001, () => {
    console.log("Server running on port");
});
