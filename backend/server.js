// server.js
const express = require('express');
const cors = require('cors');
const client = require('./db');

const app = express();

// Разрешаем Vercel
app.use(cors({
  origin: 'https://demplatform.vercel.app', // ← замени на свой домен
}));

app.use(express.json());

// Проверка подключения
app.get('/api/health', async (req, res) => {
  try {
    await client.connect();
    const result = await client.query('SELECT NOW() as now');
    await client.end();
    res.json({ status: 'ok', db_time: result.rows[0].now });
  } catch (err) {
    console.error('❌ DB Error:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Пример: регистрация
app.post('/api/register', async (req, res) => {
  const { email, firstName, lastName, birthDate, gender } = req.body;

  try {
    await client.connect();

    const result = await client.query(
      `INSERT INTO users (email, first_name, last_name, birth_date, gender)
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, first_name, last_name`,
      [email, firstName, lastName, birthDate, gender]
    );

    await client.end();
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
    }
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});
