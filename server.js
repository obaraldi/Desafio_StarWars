const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//configuração de conexão com servidor
const db = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '123',
   
});

//cria nova base e tabela
db.query(`CREATE OR REPLACE DATABASE starwars_db`);
db.query(`USE starwars_db`);
db.query(`CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL)`);



// Rota para buscar na API Star Wars
app.get('/api/characters', async (req, res) => {
    const search = req.query.search;
    const url = `https://swapi.dev/api/people/?search=${search}`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar personagens.' });
    }
});

// Rota para marcar favoritos
app.post('/api/favorites', (req, res) => {
    const { character } = req.body;

    // Verificar se o personagem já existe na tabela
    db.query('SELECT * FROM favorites WHERE name = ?', [character.name], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao verificar favorito.' });

        if (results.length > 0) {
            // O personagem já está na lista de favoritos
            return res.status(409).json({ error: `${character.name} já está na lista de favoritos.` });
        }

        // Inserir o personagem se não existir
        db.query('INSERT INTO favorites (name) VALUES (?)', [character.name], (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao adicionar favorito.' });
            res.json({ success: true });
        });
    });
});



// Rota para excluir um favorito
app.delete('/api/favorites', (req, res) => {
    const { character } = req.body;
    
    db.query('DELETE FROM favorites WHERE name = ?', [character], (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao remover favorito.' });
        res.json({ success: true });
    });
});


// Rota para listar favoritos
app.get('/api/favorites', (req, res) => {
    db.query('SELECT * FROM favorites ', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar favoritos.' });
        res.json(results);
    });
});


// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');

});

