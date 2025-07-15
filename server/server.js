require('dotenv').config();

console.log('API Key from env:', process.env.SUPABASE_API_KEY);

const axios = require('axios');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json( {message: 'pong 🏐'} );
});

app.get('/api/test-db', async (req, res) => {
    try {
        const { SUPABASE_URL, SUPABASE_API_KEY } = process.env;

        const response = await axios.get(`${SUPABASE_URL}/rest/v1/bookings`, {
            headers: {
                apikey: SUPABASE_API_KEY,
                Authorization: `Bearer ${SUPABASE_API_KEY}`,
                Prefer: 'return=representation'
            },
            params: {
                select: '*'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Supabase REST API error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch data from Supabase' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});