const db = require('./db');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json( {message: 'pong 🏐'} );
});

app.get('/api/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ db_time: result.rows[0].now});
    } catch (error) {
        console.error('Database connection error', error);
        res.status(500).json({ error: 'Database connection failed'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});