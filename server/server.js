import express from "express";
import sql from "mssql";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cors());

const config = {
    user: 'sa',
    password: 'P@ssw0rd!',
    server: '10.4.15.101',
    port: 1433,
    options: {
        encrypt: false,  
    },
};

app.get('/test-cdgcore', async (req, res) => {
    try {
        const con = await sql.connect({ ...config, database: 'CDG_CORE' });
        const result = await con.request().query('SELECT 1 as result');
        res.send('Database connected successfully');
        console.log(result);
    } catch (err) {
        console.log(err);
        res.send('Database connection failed');
    } finally {
        sql.close();
    }
});

app.get('/test-cdgpatientadata', async (req, res) => {
    try {
        const con = await sql.connect({ ...config, database: 'CDG_PATIENT_DATA' });
        const result = await con.request().query('SELECT 1 as result');
        res.send('Database connected successfully');
        console.log(result);
    } catch (err) {
        console.log(err);
        res.send('Database connection failed');
    } finally {
        sql.close();
    }
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});