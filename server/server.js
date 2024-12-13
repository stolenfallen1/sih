import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pharmaRoutes from './routes/pharmacy/api.js';
import ancillaryRoutes from './routes/ancillary/api.js';
import db from "./config/db.js";

dotenv.config();
const app = express();
const { setConnection } = db;
setConnection();

const PORT = process.env.PORT || 'Check your .env file!! :P';

app.use(cors({
    origin: '*', 
    credentials: true,
}));
app.use(express.json());

app.use('/api', pharmaRoutes);
app.use('/api', ancillaryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
