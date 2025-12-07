// server.js
const express = require('express');
const cors = require('cors');
const client = require('./db');

const app = express();

// --- ИСПРАВЛЕНИЕ: Подключаемся к БД один раз при старте --- 
client.connect()
  .then(() => console.log('✅ База данных успешно подключена'))
  .catch(err => console.error('❌ ОШИБКА ПОДКЛЮЧЕНИЯ К БД:', err.stack));

// Настраиваем CORS
const allowedOrigins = [
  'https://demplatform.vercel.app', 
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// МАРШРУТ: Вход пользователя
app.post('/api/login', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email обязателен' });
  }

  try {
    // УБРАЛИ client.connect() и client.end()
    const result = await client.query('SELECT id, email, first_name, last_name, birth_date, gender FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь с таким email не найден' });
    }

    res.status(200).json({ user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// МАРШРУТ: Проверка подключения
app.get('/api/health', async (req, res) => {
  try {
    // УБРАЛИ client.connect() и client.end()
    const result = await client.query('SELECT NOW() as now');
    res.json({ status: 'ok', db_time: result.rows[0].now });
  } catch (err) {
    console.error('❌ DB Error:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// МАРШРУТ: Регистрация
app.post('/api/register', async (req, res) => {
  const { email, firstName, lastName, birthDate, gender } = req.body;

  try {
    // УБРАЛИ client.connect() и client.end()
    const result = await client.query(
      `INSERT INTO users (email, first_name, last_name, birth_date, gender)
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, first_name, last_name`,
      [email, firstName, lastName, birthDate, gender]
    );

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
