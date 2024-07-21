const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;



pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/save-score', async (req, res) => {
    const { username, score } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO user_scores (username, score) VALUES ($1, $2) RETURNING id',
            [username, score]
        );
        const insertedId = result.rows[0].id;
        client.release();
        res.json({ success: true, insertedId });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

app.get('/api/high-scores', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT username, score FROM user_scores ORDER BY score DESC LIMIT 5'
        );
        client.release();
        res.json({ success: true, highScores: result.rows });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

app.get('/api/words', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT word, hint FROM words');
        client.release();
        res.json({ success: true, words: result.rows });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});