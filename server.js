const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'SUA_CHAVE_AQUI';
const RAPIDAPI_HOST = 'instagram-scraper-api2.p.rapidapi.com';

app.get('/api/stories', async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'Username é obrigatório' });

    try {
        const response = await fetch(`https://${RAPIDAPI_HOST}/v1/stories?username_or_id_or_url=${username}`, {
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do Instagram' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
