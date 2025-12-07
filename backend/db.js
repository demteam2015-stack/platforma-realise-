// backend/db.js
const { Client } = require('pg');
require('dotenv').config();

// Render предоставляет переменную окружения DATABASE_URL, которая содержит все необходимое.
// Это предпочтительный и самый надежный способ подключения.
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString,
  // Для продакшена на Render всегда требуется SSL.
  // Эта конфигурация будет работать как на Render, так и локально, если у локальной БД нет SSL.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = client;
