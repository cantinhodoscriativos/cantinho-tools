const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const RAPIDAPI_KEY = '0c4a1629d7mshc59344e3acb6d37p15aba5jsn4addb171fcc';
const RAPIDAPI_HOST = 'instagram-scraper-stable-api.p.rapidapi.com';

app.get('/api/media', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'O nome de usuário é obrigatório.' });
    }

    try {
        const response = await axios.post(
            `https://${RAPIDAPI_HOST}/AccountData`,
            new URLSearchParams({ username: username }),
            {
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Erro na requisição da API:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'Erro ao buscar mídias do Instagram.',
            details: error.response ? error.response.data : error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
